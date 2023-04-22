import React from 'react'
import { Taskprops, color } from './Tasks'

type props = {
    type: Taskprops["name"]
    heading: string,
    text: string
}

const Post = ({type,heading,text}:props) => {
    return (
        <div className=" w-full flex flex-col items-start gap-3 rounded-lg shadow bg-sec p-4 drop-shadow-2xl">
            {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}
            <div className={`cursor-pointer py-1 px-3 ${color[type]} bg-opacity-40 rounded-xl`}>
               <p className={`text-transparent ${color[type]} bg-clip-text text-sm font-lilbold `}>Web Design</p>
            </div>
            <div >
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {heading}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {text}
                </p>

            </div>
        </div>

    )
}

export default Post