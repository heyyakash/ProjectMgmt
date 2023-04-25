import { useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CgArrowsExchange, CgArrowsExchangeV } from 'react-icons/cg'
import {HiSparkles} from 'react-icons/hi'

type props = {
    date: string | null,
    setDate: React.Dispatch<React.SetStateAction<string | null>>,
    mode: 'calendar' | 'form',
    setMode: React.Dispatch<React.SetStateAction<"calendar" | "form">>
    task: string,
    setTask: React.Dispatch<React.SetStateAction<string>>
    company: string,
    team: string

}

const Taskform = ({ date, setDate, company, team, setMode, task, setTask }: props) => {
    const { register } = useForm()
    const projects = ["Xylem", "Nike", "Vercel", "Hasura"]
    const [assigning, setAssigning] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setAssigning(true)
        const res = await fetch("/api/addtask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task, company, team, deadline: date })
        })
        const result = await res.json()
        setAssigning(false)
        // console.log(result)
    }

    const changeDate = () => {
        setDate(null)
        setMode("calendar")
    }
    return (
        <form className='w-full'>
            <div className='px-8 py-5 border-b border-sec'>
                <h2 className='text-2xl  font-bold'>Create Task</h2>
            </div>
            <div className={`px-8 trans border-b border-sec flex flex-col gap-4 ${show ? "py-10" : "py-8"} `}>
                <h3 className='text-xl font-bold'>Select Project</h3>
                <div className="flex gap-4">
                    <select className='input-sec w-[456px]' {...register("project")} id="projects">
                        {projects.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                    <button onClick={() => setShow(!show)} className='input-sec text-sm font-bold px-4 hover:bg-white hover:text-slate-800'>Add Project + </button>

                </div>
                {show ? (<div className='flex gap-4'>
                    <input placeholder='Enter project name' type="text" className='input-sec w-[400px]' />
                    <button className='input-sec text-sm font-bold px-4 hover:bg-white hover:text-slate-800' > +  </button>
                </div>) : (<></>)}
            </div>
            <div className={`px-8 py-8 trans border-b border-sec flex flex-col gap-4`}>
                <h3 className='text-xl font-bold mb-4'>Describe Task</h3>
                <div className='flex flex-col gap-2'>
                    {/* <label htmlFor="title">Description</label> */}
                    <textarea placeholder='Task description' value={task} onChange={(e) => setTask(e.target.value)} className='input-sec w-[600px] p-3 text-md font-lilbold h-[200px]' />
                </div>
                <div className='flex gap-4 w-[600px]'>
                    <div className='flex flex-[.7] input-sec p-0 items-center px-2'>
                        <p className='text-xl font-lilbold'>{"Deadline - " + date}</p>
                        <CgArrowsExchangeV onClick={() => changeDate()} className='cursor-pointer ml-auto text-2xl' />
                    </div>
                    <button disabled = {assigning} onClick={(e) => handleSubmit(e)} className="input-sec text-sm font-bold w-[600px] flex-[.3] grid place-items-center trans px-4 hover:bg-white hover:text-slate-800">
                        {assigning?<HiSparkles className='text-lg animate-ping ' />:<>Assign</>}
                    </button>
                </div>

            </div>
        </form>

    )
}

export default Taskform