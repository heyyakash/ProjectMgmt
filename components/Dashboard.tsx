import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { FaListAlt } from 'react-icons/fa'
import { BsFillKanbanFill } from 'react-icons/bs'
import tasks from './Tasks'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { taskstype } from '@/types/tasks.types'
import Tasks from './Tasks'

const Dashboard = (props: any) => {
    const supabase = useSupabaseClient()
    const { company, team, email } = props.metadata
    const [newList, setNewList] = useState<taskstype[]>([])
    const [progressList, setProgressList] = useState<taskstype[]>([])
    const [reviewList, setReviewList] = useState<taskstype[]>([])
    const [completeList, setCompleteList] = useState<taskstype[]>([])
    const { data: role, isError } = useQuery('role', () => props.metadata.role)
    // console.log(email)

    const getTasks = async () => {
        if (props.metadata.role === "admin") {
            const { data, error } = await supabase.from("tasks").select("*").eq("company", company).eq("team", team)
            return data
        }
        const { data, error } = await supabase.from("tasks").select("*").eq("company", company).eq("team", team).eq("assigned_to", email)
        return data
    }


    const { data: tasks } = useQuery('tasks', async () => await getTasks(), {
        onSuccess: (d: taskstype[]) => {
            if (d) {
                setNewList(d.filter(x => x.status === "new"))
                setCompleteList(d.filter(x => x.status === "completed"))
                setReviewList(d.filter(x => x.status === "review"))
                setProgressList(d.filter(x => x.status === "progress"))
            }
        }
    })


    // console.log(tasks)
    return (
        <div className='w-full flex flex-col  items-center h-[calc(100vh-100px)]'>
            <div className='mt-5 flex justify-between items-center h-[90px] text-white/50  w-[95%] border-b-2 border-b-indigo-500/20'>
                <div className='flex px-2 gap-3 items-center font-lilbold'>
                    <p>Discussion</p>
                    <p className='text-white'>Tasks</p>
                    <p>Timeline</p>
                    <p>Overview</p>
                </div>
                {/* <p className='font-lilbold'>{(new Date()).toLocaleString()}</p> */}
            </div>
            <div className='w-full border-b-2 border-b-indigo-500/20 h-[90px] gap-2 flex items-center px-8'>
                <button className='py-1 px-4 bg-sec rounded-2xl text-white font-lilbold items-center flex gap-2'>
                    <BsFillKanbanFill />
                    <p>Kanban</p>
                </button>
                <button className='py-1 px-4 bg-sec rounded-2xl text-white font-lilbold items-center flex gap-2'>
                    <FaListAlt />
                    <p>List</p>
                </button>
            </div>
            <div className='grid grid-rows-1 grid-cols-4 w-full h-full overflow-x-auto'>
                <Tasks list={newList} name="New Tasks" />
                <Tasks list={progressList} name="In Progress" />
                <Tasks list={reviewList} name="In Review" />
                <Tasks list={completeList} name="Completed" />
            </div>


        </div>


    )
}

export default Dashboard