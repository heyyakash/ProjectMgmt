import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery, useQueryClient } from 'react-query'
import getMembers from '@/helper/getMembers'

const Layout = (props: any) => {

    const supabase = useSupabaseClient()
    const {company,team} = props.metadata
    const {data:members, isError} = useQuery("members",async() => await getMembers(supabase,company, team))


    return (
        <div className='w-full h-[100vh] flex '>
            <Navbar image={props.metadata.image} />
            <Sidebar {...props}  />
            <section className='w-[calc(100%-390px+.5rem)]  flex flex-col  text-white'>
                <div className='flex w-full p-4 gap-2 items-end'>
                    <h1 className='text-[1.6rem] font-semibold'>{company} /</h1> <p className='text-white/50 mb-1'>{team}</p>

                    <Link href="/calendar" className='bg-pink-500 p-2 rounded-lg ml-auto cursor-pointer text-white trans hover:text-pink-500 hover:bg-white font-semibold text-sm'>Add Task</Link>
                    <div className='ml-2 flex'>
                        {members?.length !== 0 ?
                            members?.map((x: any) => {
                                return <img src={x.image} key={x.email} className='h-10 w-10 rounded-full object-cover' alt="profilePicture" />
                            }) : (<></>)
                        }

                        <Link href={"/adduser"} className='ml-2 bg-sec rounded-full h-10 w-10 text-bold text-4xl hover:bg-white trans hover:text-purple-500 grid place-items-center'>
                            +
                        </Link>
                    </div>
                </div>
                {props.children}
            </section>
        </div>
    )
}

export default Layout