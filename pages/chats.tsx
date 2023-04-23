import Chat from '@/components/Chat'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

const App = (props:any) => {
    return (
        <Chat {...props} />
    )
}

App.getLayout = ({ children }: any) => {
    return (
        <>
            {children}
        </>
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

    const { data: metadata, error } = await supabase.from("Users").select("*").eq("email", session.user.email)
    if (!error) {

        const { data: members, error } = await supabase.from("Users").select("*").eq("company", metadata[0].company).eq("team", metadata[0].team)
        if (!error) {
            const {data: chats,error} = await supabase.from("Chats").select("*").eq("company",metadata[0].company).eq("team",metadata[0].team)
            return {
                props: {
                    initialSession: session,
                    user: session.user,
                    metadata,
                    members,
                    chats
                },
            }
        }
    }
}


export default App