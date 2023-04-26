import MindsDB from 'mindsdb-js-sdk';
import { NextApiRequest, NextApiResponse } from "next"
import moment from 'moment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { task, company, team, deadline ,project} = req.body
        try {
            await MindsDB.connect({
                user: process.env.NEXT_PUBLIC_USER_EMAIL as string,
                password: process.env.NEXT_PUBLIC_USER_PASSWORD as string
            })
            console.log("Connected")
        } catch (error) {
            return res.status(500).json({ msg: "Couldn't connect", success: false })
        }


        let query = `SELECT * FROM oneshot3 WHERE task_desc="${task}";`
        // console.log(query)

        let queryResult = await MindsDB.SQL.runQuery(query)
        if (queryResult.error_message) {
            return res.status(500).json({ success: false, msg: "ZeroShot failed", err: queryResult.error_message })
        }

        const category = queryResult.rows[0].result

        query = `SELECT * FROM summarization2
        WHERE task_desc="${task}"`
        queryResult = await MindsDB.SQL.runQuery(query)
        if (queryResult.error_message) {
            return res.status(500).json({ success: false, msg: "Summarization failed" })
        }
        const title = queryResult.rows[0].result

        const result = await fetch(`https://yggyysemhotnqjuzxjow.supabase.co/rest/v1/Users?company=eq.${company}&team=eq.${team}&skills=eq.${category}&select=*`, {
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string}`
            }
        })

        const user = await result.json()
        console.log(category,user)
        console.log(req.body)

        if (user.length !== 0) {
            const assign = await fetch(`https://yggyysemhotnqjuzxjow.supabase.co/rest/v1/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string}`,
                },
                body: JSON.stringify({
                    company,
                    team,
                    task_desc: task,
                    task_category: category,
                    assigned_to: user[0].email,
                    deadline_date: moment(deadline, "DD-MM-YYYY").toISOString(),
                    project,
                    user_image:user[0].image,
                    status: "new",
                    task_title: title
                })
            })
            // const assignResult = await assign.json()
            // console.log(assignResult)
            return res.status(200).json({ category, title, user ,success:true})
        }


        res.status(500).json({ err: "err" })


    } else {
        res.status(401).json({ success: false })
    }
}
