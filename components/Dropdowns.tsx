import React, { useState } from 'react'
import {AiOutlineDown,AiOutlineUp} from 'react-icons/ai'

type props = {
    name: string
    list: string[]
}


const Dropdowns = ({ name,list }: props) => {
    const [show,setShow] = useState<boolean>(true)

    return (
        <div className={`flex flex-col w-full trans ${show?"my-4":"mt-2"}`}>
            <div className='flex items-center text-white text-[1rem] cursor-pointer justify-between font-lilbold p-2' onClick={()=>setShow(!show)}>
                <p>{name.toUpperCase()}</p>
                {
                    show?<AiOutlineUp />:<AiOutlineDown />
                }
            </div>
            <div className={`text-md flex flex-col w-full p-2 text-white/50 font-[500] gap-3 trans ${show?"":"hidden"}`}>
                {list.map(x=><p>{x}</p>)}
            </div>
        </div>
    )
}

export default Dropdowns