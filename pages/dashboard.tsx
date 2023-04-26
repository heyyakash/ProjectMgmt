import Dashboard from '@/components/Dashboard'
import { supabase } from '@/helper/supabaseClient'
import { SupabaseClient, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { QueryClient, dehydrate } from 'react-query'

const App = (props: any) => {
    
    return (
        <Dashboard {...props} />
    )
}

App.getLayout = ({ children }: any) => {
    return (
        <>
            {children}
        </>
    )
}


const userData = async(supabase:SupabaseClient<any, 'public', any>,email:string) => {
    const {data,error} = await supabase.from("Users").select("*").eq("email",email)
    return data
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

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['testdata'],async()=>await userData(supabase,session.user.email as string))
    const {data:metadata,error} = await supabase.from("Users").select("*").eq("email", session.user.email)
    if (!error) {

        const { data: members, error } = await supabase.from("Users").select("*").eq("company", metadata[0].company).eq("team", metadata[0].team)
        if (!error) {
            return {
                props: {
                    // initialSession: session,
                    user: session.user,
                    metadata:metadata[0],
                    members
                },
            }
        }
    }

    
    
}

export default App