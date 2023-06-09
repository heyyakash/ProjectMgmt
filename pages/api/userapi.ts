import { supabase } from "@/helper/supabaseClient"
import {  NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {data} = req.body
        const { email, password, image, gender, fname, lname , company,team,skills} = data
        const {error} = await supabase.auth.signUp({
            email:data.email,
            password:data.password
        })
        if (!error){
            const { error } = await supabase
                    .from('Users')
                    .insert([
                        { email, image, gender, fname, lname , company,team,skills,role: "member" },
                    ])
                if (!error) {
                    return res.status(200).json({success:true})
                }
                return res.status(500).json({success:false, msg:error})
        }
        res.status(500).json({success:false,msg:error})
    } else {
      res.status(401).json({success:false})
    }
  }
  