import Chat from '@/components/Chat'
import getChats from '@/helper/getChats'
import getInitialProps from '@/helper/getInitalProps'
import getMembers from '@/helper/getMembers'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import React from 'react'
import { BsChatDotsFill, BsPeopleFill } from 'react-icons/bs'
import { useQuery } from 'react-query'

const App = (props:any) => {
    const supabase = useSupabaseClient()
    const {company,team} = props.metadata
    const {data:members, isLoading:memberLoading} = useQuery('members', async () => await getMembers(supabase,company,team))
    const {data:chats, isLoading:chatLoading} = useQuery('chats' ,async () => await getChats(supabase, company,team))

    if (memberLoading) {
        return (
            <div className='h-full w-full flex text-white justify-center text-sm gap-4 items-center'>
                <BsPeopleFill className='animate-ping text-2xl' />

                <p>Fetching Members..</p>
            </div>
        )
    }

    if (chatLoading) {
        return (
            <div className='h-full w-full flex text-white justify-center text-sm gap-4 items-center'>
                <BsChatDotsFill className='animate-ping text-2xl' />

                <p>Fetching Chats..</p>
            </div>
        )
    }

    return (
        <Chat {...props} members = {members} chats ={chats}  />
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

    const res = getInitialProps(ctx)
    return res
    // const supabase = createServerSupabaseClient(ctx)
    // const {
    //     data: { session },
    // } = await supabase.auth.getSession()


    // if (!session)
    //     return {
    //         redirect: {
    //             destination: '/login',
    //             permanent: false,
    //         },
    //     }

    // const { data: metadata, error } = await supabase.from("Users").select("*").eq("email", session.user.email)
    // if (!error) {

    //     const { data: members, error } = await supabase.from("Users").select("*").eq("company", metadata[0].company).eq("team", metadata[0].team)
    //     if (!error) {
    //         const {data: chats,error} = await supabase.from("Chats").select("*").eq("company",metadata[0].company).eq("team",metadata[0].team)
    //         return {
    //             props: {
    //                 initialSession: session,
    //                 user: session.user,
    //                 metadata,
    //                 members,
    //                 chats
    //             },
    //         }
    //     }
    // }
}


export default App