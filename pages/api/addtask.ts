import MindsDB from 'mindsdb-js-sdk';
import { NextApiRequest, NextApiResponse } from "next"
import moment from 'moment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { task } = req.body
        try {
            await MindsDB.connect({
                user: process.env.NEXT_PUBLIC_USER_EMAIL as string,
                password: process.env.NEXT_PUBLIC_USER_PASSWORD as string
            })
            console.log("Connected")
        } catch (error) {
            return res.status(500).json({ msg: "Couldn't connect", success: false })
        }

        //fetching category using zero-shot classification
        let query = `SELECT * FROM zeroshotsummarizer WHERE task_desc="${task}";`
        let queryResult = await MindsDB.SQL.runQuery(query)
        if (queryResult.error_message) {
            return res.status(500).json({ success: false, msg: "ZeroShot failed", err: queryResult.error_message })
        }
        const category = queryResult.rows[0].result
        res.status(200).json({category, success:true})



    } else {
        res.status(401).json({msg:"Wrong Method", success: false })
    }
}
