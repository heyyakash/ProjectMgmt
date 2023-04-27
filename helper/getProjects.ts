const getProjects = async (supabase:any,company:string,team:string) => {
    const { data, error } = await supabase.from("Projects").select("*").eq("company", company).eq("team", team)
    return data
}

export default getProjects