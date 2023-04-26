import { SupabaseClient } from "@supabase/supabase-js"

const getMembers = async (supabase:SupabaseClient<any,"public",any>,company:string, team:string) => {
    const {data,error} = await supabase.from("Users").select("*").eq("company",company).eq("team",team)
    console.log(data)
    return data
}

export default getMembers