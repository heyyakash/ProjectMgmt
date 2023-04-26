import React from 'react'
import Post from './Post'
import { taskstype } from '@/types/tasks.types'

export type Taskprops = {
    name: "New Tasks" | "Completed" | "In Review" | "In Progress"
    list:taskstype[]
}

export const color = {
    "New Tasks": "bg-pink-600",
    "Completed": "bg-green-600",
    "In Review": "bg-indigo-600",
    "In Progress": "bg-orange-600"
}

const Tasks = ({ name, list }: Taskprops) => {
    return (
        <div className=' overflow-auto border-r-[1.75px] border-sec'>
            <div className='h-[80px] flex w-full px-8 items-center gap-2 border-b-[1.75px] border-sec '>
                <div className={`h-2 w-2  rounded-full ${color[name]}`}></div>
                <p className='font-bold text-lg'>{name}</p>
            </div>
            <div className='w-full p-10 flex flex-col gap-10'>
                {list.map(x=><Post id= {x.id} image = {x.user_image} category={x.task_category} type = {name} heading={x.task_title} text = {x.task_desc} key = {x.id} />)}
                {/* <Post type={name} heading='Create a Admin Dashboard' text='Create an admin dashboard for Xyl    em with features to monitor sales' />``                <Post type={name} heading='Create a Admin Dashboard' text='Create an admin dashboard for Xylem with features to monitor sales' /> */}

           
            </div>
        </div>
    )
}

export default Tasks