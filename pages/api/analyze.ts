import { supabase } from "@/helper/supabaseClient"
import { NextApiRequest, NextApiResponse } from "next"
import MindsDB from "mindsdb-js-sdk"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { company, team } = req.body
        try {
            await MindsDB.connect({
                user: process.env.NEXT_PUBLIC_USER_EMAIL as string,
                password: process.env.NEXT_PUBLIC_USER_PASSWORD as string
            })
            const query = `SELECT input.message, model.sentiment, input.email , input.company, input.team
            FROM NEWDB.Chats AS input
            JOIN sentiment_analyzer AS model
            WHERE input.company='${company}' AND input.team='${team}';`
            const queryResult = await MindsDB.SQL.runQuery(query)
            res.status(200).json({result:queryResult.rows})
        }
        catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(401).json({ success: false })
    }
}
