import React from 'react'
import Post from './Post'

export type Taskprops = {
    name: "New Tasks" | "Completed" | "In Review" | "In Progress"
}

export const color = {
    "New Tasks": "bg-pink-500",
    "Completed": "bg-green-500",
    "In Review": "bg-indigo-500",
    "In Progress": "bg-orange-500"
}

const Tasks = ({ name }: Taskprops) => {
    return (
        <div className=' overflow-auto border-r-[1.75px] border-sec'>
            <div className='h-[80px] flex w-full px-8 items-center gap-2 border-b-[1.75px] border-sec '>
                <div className={`h-2 w-2  rounded-full ${color[name]}`}></div>
                <p className='font-bold text-lg'>{name}</p>
            </div>
            <div className='w-full p-10 flex flex-col gap-10'>
                <Post type={name} heading='Create a Admin Dashboard' text='Create an admin dashboard for Xylem with features to monitor sales' />
           
            </div>
        </div>
    )
}

export default Tasks