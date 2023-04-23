import React from 'react'

type props = {
    email:string,
    message:string,
    direction:'float-left' | 'float-right'
}

const ChatMessage = ({email,message,direction}:props) => {
  return (
    <div className={`flex gap-2 mt-2 ${direction==="float-right"?"items-end":"items-start" } flex-col ${direction} clear-both`}>
        <p className='text-sm text-lilbold'>{email.split("@")[0]}</p>
        <div className={`${direction==="float-right"?"bg-white text-black":"bg-sec"} p-2 rounded-xl`}>{message}</div>
    </div>
  )
}

export default ChatMessage