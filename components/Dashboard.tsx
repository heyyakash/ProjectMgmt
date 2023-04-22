import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { FaListAlt } from 'react-icons/fa'
import { BsFillKanbanFill } from 'react-icons/bs'
import Tasks from './Tasks'
import Link from 'next/link'

const Dashboard = (props: any) => {
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
                <Tasks name="New Tasks" />
                <Tasks name="In Progress" />
                <Tasks name="In Review" />
                <Tasks name="Completed" />
            </div>


        </div>


    )
}

export default Dashboard