import React from 'react'
import ChatMemberBox from './ChatMemberBox'

const Chat = (props: any) => {
    const { members } = props
    return (
        <div className="flex flex-col h-full">
            <div className='p-8 py-6 border-sec border-b'>
            </div>
            <div className='w-full flex h-full'>
                <div className='w-[350px]  border-r border-sec flex flex-col'>
                    <div className='px-8 py-6 border-b border-sec grid place-items-center'>
                        <h3 className='text-xl font-lilbold'>Members</h3>
                    </div>
                    <div className='px-8 py-6 flex flex-col gap-4 overflow-auto'>
                        {members.map((member: any) => {
                            return (
                                <ChatMemberBox member={member} key={member.email} />
                            )
                        })}
                    </div>

                </div>

                <div className='flex flex-col w-[calc(100%-350px)]'>
                    <div className=' py-[1.38rem] flex items-center border-b border-sec justify-center'>
                        <h2 className='text-2xl font-lilbold'>Chat / Discussion</h2>
                    </div>
                    <div className='mt-auto w-full h-[70px] border-t border-sec flex'>
                        <input type="text" placeholder='Enter you message !' className='h-[97%] grow outline-none text-xl p-2 bg-transparent' />
                        <button className='button bg-pink-500 text-white trans hover:bg-white ml-auto hover:text-pink-500 p-4 '>Send</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Chat