import { SupabaseClient } from "@supabase/supabase-js"

const getChats =  async (supabase:SupabaseClient, company:string, team:string) => {
    const {data: chats,error} = await supabase.from("Chats").select("*").eq("company",company).eq("team",team)
    return chats
}

export default getChats