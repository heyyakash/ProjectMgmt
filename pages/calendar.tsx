import CalenderContainer from '@/components/Calendar'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

const App = (props:any) => {
  return (
    <CalenderContainer />
  )
}


export const getServerSideProps = async (ctx: any) => {

    const supabase = createServerSupabaseClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()


    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    console.log(session.user.email)
    const { data: metadata, error } = await supabase.from("Users").select("*").eq("email",session.user.email)
    if (!error){
        const {data:members, error} = await supabase.from("Users").select("*").eq("company",metadata[0].company).eq("team",metadata[0].team)
        if(!error) {
            return {
                props: {
                    initialSession: session,
                    user: session.user,
                    metadata,
                    members
                },
            }
        }
    }
    
  
   
}


export default App