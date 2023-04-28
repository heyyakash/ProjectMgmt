import getMembers from '@/helper/getMembers'
import getProjects from '@/helper/getProjects'
import { project } from '@/types/projects.types'
import { User } from '@/types/user.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import moment from 'moment'
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
    const [error, setError] = useState<string | null>(null)
    const [assigning, setAssigning] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const [newProject, setNewProject] = useState<string>("")
    const supabase = useSupabaseClient()

    const { data: projects, isError } = useQuery('projects', () => getProjects(supabase, company, team))


    const addProject = async () => {
        const { data, error } = await supabase.from("Projects").insert({ name: newProject, company, team, status: "current" })
        if (!error) {
            setNewProject("")
            queryClient.invalidateQueries('projects')
        }
    }


    const { mutate } = useMutation(addProject)
    const router = useRouter()
    const { data: members } = useQuery('members', async () => getMembers(supabase, company, team))



    const handleTask = async (data: any) => {
        if (data.project === "") {
            setError("Select Project!")
        }
        else {
            setAssigning(true)
            setError(null)
            const res = await fetch("/api/addtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ task: data.task, project: data.project, company, team, deadline: date })
            })
            const result = await res.json()
            setAssigning(false)
            if (result.success) {

                const users = members?.filter((x) => x.skills === result.category)
                if (users && users.length !== 0) {
                    const { error } = await supabase.from("tasks").insert({
                        company,
                        team,
                        task_desc: data.task,
                        task_category: result.category,
                        assigned_to: users[0]?.email,
                        deadline_date: moment(date, "DD-MM-YYYY").toISOString(),
                        project_id: parseInt(data.project.split("*")[0]),
                        project: data.project.split("*")[1],
                        user_image: users[0].image,
                        status: "new",
                        task_title: data.project.split("*")[1]
                    })
                    if (error) setError(error.message)
                    else router.push('/dashboard')
                }
                else {
                    setError(`Cannot find any user with the skills of ${result.category}`)
                }
                // console.log(users[0])
                // router.push('/dashboard')
            }
            else {
                setError(result.msg)
            }
        }
    }

    const changeDate = () => {
        setDate(null)
        setMode("calendar")
    }
    return (
        <div className='w-full overflow-y-auto'>
            <div className='p-4 border-b border-sec'>
                <h2 className='text-md font-lilbold'>Create Project</h2>
                <div className='flex gap-2 flex-col items-start'>
                    <div className='flex gap-3'>
                        <input value={newProject} onChange={(e) => setNewProject(e.target.value)} placeholder='project name' type="text" className='input-sec text-[.9rem] w-full md:w-[calc(600px-2rem-.75rem)] text-md font-lilbold ' />
                        <button onClick={() => mutate()} disabled={newProject.length === 0} className='input-sec text-sm font-bold px-4 hover:bg-white hover:text-slate-800' > +  </button>
                    </div>

                </div>
            </div>

            <form onSubmit={handleSubmit(handleTask)} className='flex flex-col p-4   '>
                <div className=' border-sec'>
                    <h2 className='text-md  font-lilbold'>Create Task</h2>
                </div>
                <div className={` trans border-sec flex flex-col gap-2 mt-1`}>
                    {/* <h3 className='text-md text-white/70 font-lilbold'>Select Project</h3> */}
                    <div className="flex gap-4">
                        <select {...register("project")} className='input-sec w-[600px]' {...register("project")} id="projects">
                            <option value="" disabled selected>Select Project</option>
                            {projects?.map((x: project) => <option className='text-black' key={x.name} value={(x.id).toString() + "*" + x.name}>{x.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className={` trans flex flex-col mt-2 gap-2`}>


                    <textarea placeholder='Task description' {...register("task")} required className='input-sec md:w-[600px] p-3 text-md font-lilbold h-[200px]' />

                    <div className='flex gap-4 md:w-[600px]'>
                        <div className='flex flex-[.7] input-sec p-0 items-center px-2'>
                            <p className='text-md font-lilbold'>{"Deadline - " + date}</p>
                            <CgArrowsExchangeV onClick={() => changeDate()} className='cursor-pointer ml-auto text-2xl' />
                        </div>
                        <input type="submit" disabled={projects?.length === 0} id="submit" name="submit" className='hidden' />
                        <label htmlFor="submit" className="input-sec text-sm font-bold w-[600px] flex-[.3] grid place-items-center trans px-4 hover:bg-white hover:text-slate-800">
                            {assigning ? <HiSparkles className='text-lg animate-ping ' /> : <>Assign</>}
                        </label>
                    </div>
                    <p className='text-red-500 text-lg font-bold'>{error && error}</p>
                </div>
            </form>
        </div>

    )
}

export default Taskform