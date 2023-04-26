import React, { useEffect, useState } from 'react'
import ChatMemberBox from './ChatMemberBox'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import ChatBody from './ChatBody'

const Chat = (props: any) => {
   
    const { members } = props
    console.log(members,props.chats)
 

    return (
        <div className="flex flex-col h-full">
            <div className='p-4 border-sec border-b'>
        <h2 className='text-xl font-semibold'>Team Chat</h2>
            </div>
            <div className='w-full flex h-full'>
                <div className='w-[350px]  border-r border-sec flex flex-col'>
               
                    <div className='p-4 flex flex-col gap-4 overflow-auto'>
                        {members.map((member: any) => {
                            return (
                                <ChatMemberBox member={member} key={member.email} />
                            )
                        })}
                    </div>

                </div>

                <ChatBody {...props} />

            </div>

        </div>
    )
}

export default Chat