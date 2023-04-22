import AddUser from '@/components/AddUser'
import Dashboard from '@/components/Dashboard'
import { supabase } from '@/helper/supabaseClient'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

const App = (props: any) => {
    return (
        <AddUser {...props} />
    )
}

export const getServerSideProps = async (ctx: any) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
    // Check if we have a session
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

    return {
        props: {
            initialSession: session,
            user: session.user,
            metadata
        },
    }
}

export default App