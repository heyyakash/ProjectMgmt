import Analysis from '@/components/Analysis'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import MindsDB from 'mindsdb-js-sdk';

const App = (props: any) => {
    console.log(props)
    return <Analysis {...props} />
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


    try {
        await MindsDB.connect({
            user: process.env.NEXT_PUBLIC_USER_EMAIL as string,
            password: process.env.NEXT_PUBLIC_USER_PASSWORD as string
        })
        console.log("Connected")
    } catch (error) {
        console.log("Failed")
        // Failed to authenticate.
    }

   

    const { data: metadata, error } = await supabase.from("Users").select("*").eq("email", session.user.email)
    if (!error) {

        const { data: members, error } = await supabase.from("Users").select("*").eq("company", metadata[0].company).eq("team", metadata[0].team)
        if (!error) {
            const { data: chats, error } = await supabase.from("Chats").select("*").eq("company", metadata[0].company).eq("team", metadata[0].team)

            const query = `SELECT input.message, model.sentiment, input.email , input.company, input.team
            FROM NEWDB.Chats AS input
            JOIN sentiment_analyzer AS model
            WHERE input.company='${metadata[0].company}' AND input.team='${metadata[0].team}';`
        
            const queryResult = await MindsDB.SQL.runQuery(query)
        

            return {
                props: {
                    initialSession: session,
                    user: session.user,
                    metadata,
                    members,
                    chats,
                    sentiment: !queryResult.error_message?queryResult.rows:queryResult.error_message
                },
            }
        }

    }
}


export default App