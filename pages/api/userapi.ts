import { supabase } from "@/helper/supabaseClient"
import {  NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {data} = req.body
        const { email, password, image, gender, fname, lname , company,team} = data
        const {error} = await supabase.auth.signUp({
            email:data.email,
            password:data.password
        })
        if (!error){
            const { error } = await supabase
                    .from('Users')
                    .insert([
                        { email, image, gender, fname, lname , company,team,role: "member" },
                    ])
                if (!error) {
                    return res.status(200).json({success:true})
                }
        }
        res.status(500).json({success:false})
    } else {
      res.status(401).json({success:false})
    }
  }
  