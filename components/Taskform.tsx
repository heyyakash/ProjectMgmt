import getProjects from '@/helper/getProjects'
import { project } from '@/types/projects.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CgArrowsExchange, CgArrowsExchangeV } from 'react-icons/cg'
import { HiSparkles } from 'react-icons/hi'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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
    const { register, handleSubmit } = useForm()
    // const projects = ["Xylem", "Nike", "Vercel", "Hasura"]
    const [assigning, setAssigning] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const [newProject, setNewProject] = useState<string>("")
    const supabase = useSupabaseClient()

    const { data:projects, isError } = useQuery('projects', () => getProjects(supabase, company, team))
    

    const addProject = async () => {
        const { data, error } = await supabase.from("Projects").insert({ name: newProject, company, team, status: "current" })
        if (!error){
            setNewProject("")
            queryClient.invalidateQueries('projects')
        }
    }


    const {mutate} = useMutation(addProject)
    const router = useRouter()




    const handleTask = async (data:any) => {
        setAssigning(true)
        const res = await fetch("/api/addtask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task:data.task,project:data.project, company, team, deadline: date })
        })
        const result = await res.json()
        setAssigning(false)
        if(result.success)  router.push('/dashboard')

    }

    const changeDate = () => {
        setDate(null)
        setMode("calendar")
    }
    return (
        <div className='w-full'>
            <div className='px-8 py-5 border-b border-sec'>
                <h2 className='text-2xl  font-bold'>Create Project</h2>
                <div className='flex gap-2 flex-col items-start mt-8'>
                    <h3 className='text-md text-white/70 font-lilbold'>Enter project name</h3>
                    <div className='flex gap-3'>
                        <input value={newProject} onChange={(e) => setNewProject(e.target.value)} placeholder='project name' type="text" className='input-sec w-[calc(600px-2rem-.75rem)] text-md font-lilbold ' />
                        <button onClick={() => mutate()} className='input-sec text-sm font-bold px-4 hover:bg-white hover:text-slate-800' > +  </button> 
                    </div>

                </div>
            </div>

            <form onSubmit={handleSubmit(handleTask)} className='flex flex-col px-8 py-6 border-b border-sec '>
                <div className=' border-sec'>
                    <h2 className='text-2xl  font-bold'>Create Task</h2>
                </div>
                <div className={` trans border-sec flex flex-col gap-2 mt-8`}>
                    <h3 className='text-md text-white/70 font-lilbold'>Select Project</h3>
                    <div className="flex gap-4">
                        <select {...register("project")} className='input-sec w-[600px]' {...register("project")} id="projects">
                            {projects?.map((x:project) => <option key={x.name} value={x.name}>{x.name}</option>)}
                        </select>

                    </div>
                </div>
                <div className={` trans flex flex-col mt-5 gap-4`}>
                    <h3 className='text-md text-white/70 font-lilbold'>Describe Task</h3>


                    <textarea placeholder='Task description' {...register("task")} required className='input-sec w-[600px] p-3 text-md font-lilbold h-[200px]' />

                    <div className='flex gap-4 w-[600px]'>
                        <div className='flex flex-[.7] input-sec p-0 items-center px-2'>
                            <p className='text-xl font-lilbold'>{"Deadline - " + date}</p>
                            <CgArrowsExchangeV onClick={() => changeDate()} className='cursor-pointer ml-auto text-2xl' />
                        </div>
                        <input type = "submit" id = "submit" name = "submit" className='hidden' />
                        <label htmlFor="submit" className="input-sec text-sm font-bold w-[600px] flex-[.3] grid place-items-center trans px-4 hover:bg-white hover:text-slate-800">
                            {assigning ? <HiSparkles className='text-lg animate-ping ' /> : <>Assign</>}
                        </label>
                    </div>

                </div>
            </form>
        </div>

    )
}

export default Taskform