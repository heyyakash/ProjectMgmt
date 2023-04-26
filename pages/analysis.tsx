import Analysis from '@/components/Analysis'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import MindsDB from 'mindsdb-js-sdk';
import getInitialProps from '@/helper/getInitalProps';
import { useQuery } from 'react-query';
import getMembers from '@/helper/getMembers';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { BsChatDotsFill, BsPeopleFill } from 'react-icons/bs';

const App = (props: any) => {
    const supabase = useSupabaseClient()

    const getSentiments = async (company: string, team: string) => {
        const res = await fetch("/api/analyze", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ company, team })

        })
        return await res.json()
    }

    const { company, team } = props.metadata
    const { data: members, isError, isLoading: memberLoading } = useQuery("members", async () => await getMembers(supabase, company, team))
    const { data: sentiment, isLoading: sentimentLoading } = useQuery("sentiment", async () => await getSentiments(company, team))
    if (memberLoading) {
        return (
            <div className='h-full w-full flex text-white justify-center text-sm gap-4 items-center'>
                <BsPeopleFill className='animate-ping text-2xl' />

                <p>Fetching Members..</p>
            </div>
        )
    }

    if (sentimentLoading) {
        return (
            <div className='h-full w-full flex text-white justify-center text-sm gap-4 items-center'>
                <BsChatDotsFill className='animate-ping text-2xl' />

                <p>Analyzing Chats..</p>
            </div>
        )
    }

    return <Analysis {...props} members={members} sentiment = {sentiment.result} />
}

App.getLayout = ({ children }: any) => {
    return (
        <>
            {children}
        </>
    )
}

export const getServerSideProps = async (ctx: any) => {

    const res = getInitialProps(ctx)
    return res

}


export default App