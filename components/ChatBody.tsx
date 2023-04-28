import { useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useQuery, useQueryClient } from 'react-query'

const ChatBody = (props:any) => {
    const supabase = useSupabaseClient()
    const queryClient = useQueryClient()
    const chat = queryClient.getQueryData("chats")
    const [messages,setMessages] = useState<any>(chat)
    const email = props.user.email
    

    
    useEffect(() => {
        const subscription = supabase.channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'Chats', filter: `company=eq.${props.metadata.company}` },
                (payload:any) => {
                    if(payload.new.team===props.metadata.team)
                    setMessages((messages:any)=>[...messages,payload.new])
                }
            )
            .subscribe()

        return () => {
            subscription.unsubscribe()    
        }
    }, [])


    const sendMessage = async () => {
        const {error} = await supabase.from("Chats").insert([{
            email:props.user.email, team:props.metadata.team, company:props.metadata.company, message:msg
        }])
        if(!error){
            setMsg("")
        }
    }

    const [msg, setMsg] = useState<string>("")
    return (
        <div className='flex flex-col relative w-full h-full  lg:w-[calc(100%-350px)]'>
    
            <div className='w-full h-[590px] overflow-y-auto p-6'>
                {messages.length>0? messages.map((x:any)=> <ChatMessage key = {x.id} email = {x.email} message={x.message} direction={x.email===email?"float-right":"float-left"} />):<div className='w-full h-full grid place-items-center text-md font-bold'>You are the first one here! Say Hi..</div>}
                
            </div>
            <div className='w-full bottom-0 bg-sec absolute h-[70px]  border-t border-sec flex'>
                <input value={msg} onChange={(e) => setMsg(e.target.value)} type="text" placeholder='Enter you message !' className='h-[97%] grow outline-none text-xl p-2 bg-transparent' />
                <button onClick = {()=>sendMessage()} className='button bg-pink-500 text-white trans hover:bg-white ml-auto hover:text-pink-500 p-4 '>Send</button>
            </div>
        </div>
    )
}

export default ChatBody