import { project } from '@/types/projects.types'
import React, { useState } from 'react'
import { TiTick } from 'react-icons/ti'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { BsFillTrash2Fill } from 'react-icons/bs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMutation, useQueryClient } from 'react-query'

type props = {
    name: string
    list: any
}

type DropDownOptionProps = {
    id: number
    name: string
    status: 'completed' | 'current'
}

const DropDownOption = ({ name, id, status }: DropDownOptionProps) => {
    const supabase = useSupabaseClient()
    const queryClient = useQueryClient()

    const updateProject = async () => {
        await supabase.from("tasks").update({ status: "completed" }).eq("project_id", id)
        await supabase.from("Projects").update({ status: "completed" }).eq("id", id)    
        queryClient.invalidateQueries("tasks")
        queryClient.invalidateQueries("projects")
    }
    const deleteProject = async () => {
        await supabase.from("tasks").delete().eq("project_id", id)
        await supabase.from("Projects").delete().eq("id", id)
        queryClient.invalidateQueries("tasks")
        queryClient.invalidateQueries("projects")
    }

    const { mutate: updateProjectMutation } = useMutation(updateProject)
    const { mutate: deleteProjectMutation } = useMutation(deleteProject)

    return (
        <div className='hover:bg-sec group trans rounded-xl items-center hover:text-white flex justify-between p-2'>
            <p className='text-[.9rem]'>{name}</p>
            <div className='hidden text-[.9rem] group-hover:flex gap-3'>
                {status !== "completed" ? <TiTick onClick={() => updateProjectMutation()} className='hover:text-green-500 cursor-pointer' /> : <></>}

                <BsFillTrash2Fill onClick={() => deleteProjectMutation()} className='hover:text-red-500 cursor-pointer' />
            </div>
        </div>

    )
}


const Dropdowns = ({ name, list }: props) => {
    const [show, setShow] = useState<boolean>(true)

    return (
        <div className={`flex flex-col w-full trans ${show ? "mt-2" : "mt-1"}`}>
            <div className='flex items-center text-white text-[1rem] cursor-pointer justify-between font-lilbold p-2' onClick={() => setShow(!show)}>
                <p className='text-sm font-lilbold'>{name}</p>
                {
                    show ? <AiOutlineUp /> : <AiOutlineDown />
                }
            </div>
            <div className={`text-md flex flex-col w-full p-2 text-white/50 font-[500] gap-3 trans ${show ? "" : "hidden"}`}>
                {list.map((x: project) => <DropDownOption name={x.name} id={x.id} key={x.id} status={x.status} />)}
            </div>
        </div>
    )
}

export default Dropdowns