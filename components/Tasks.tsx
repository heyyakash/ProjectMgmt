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
        <div className=' md:overflow-auto border-r border-sec'>
            <div className='h-[70px] flex w-full px-8 items-center gap-2 justify-between flex-row-reverse border-b border-sec '>
                <div className={`h-2 w-2  rounded-full ${color[name]}`}></div>
                <p className='font-semibold text-sm'>{name}</p>
            </div>
            <div className='w-full p-4 md:p-6 flex flex-col gap-6'>
                {list.map(x=><Post id= {x.id} image = {x.user_image} category={x.task_category} type = {name} heading={x.task_title} text = {x.task_desc} key = {x.id} />)}

           
            </div>
        </div>
    )
}

export default Tasks