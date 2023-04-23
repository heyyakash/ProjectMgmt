import React from 'react'

const ChatMemberBox = ({member}:any) => {
    return (
        <div key={member.email} className='bg-sec p-4 rounded-xl gap-3 flex'>
            <img src={member.image} alt="profilepic" className='h-12 w-12 rounded-full object-cover' />
            <div className="flex flex-col items-start">
                <p className='text-md font-lilbold'>{member.fname + " " + member.lname}</p>
                <p className={`${member.role === "admin" ? "bg-pink-500/30 text-pink-500" : "bg-green-500/30 text-green-400"} rounded-xl px-2 text-sm capitalize`}>{member.role}</p>
            </div>
        </div>
    )
}

export default ChatMemberBox