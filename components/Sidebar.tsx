import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Dropdowns from './Dropdowns'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from 'react-query'
import { project } from '@/types/projects.types'
import getProjects from '@/helper/getProjects'

const Sidebar = (props: any) => {
    const supabase = useSupabaseClient()
    const { company, team } = props.metadata
    const [current, setCurrent] = useState<project[]>([])
    const [all, setAll] = useState<project[]>([])
    const [completed, setCompleted] = useState<project[]>([])

    const { data:projects,isError } = useQuery('projects', () => getProjects(supabase, company, team), {
        onSuccess: (d: project[]) => {
            setCurrent(d.filter(x => x.status === "current"))
            setAll(d)
            setCompleted(d.filter(x => x.status === "completed"))
        }
    })


    return (
        <div className="w-[300px] hidden border-r-[1px] border-indigo-500/20 h-full overflow-auto rounded-l-2xl bg-[#222131] -ml-2 xl:flex flex-col p-4 items-center ">
            <div className='w-full h-[50px] mb-4 bg-indigo-500/10 px-4 rounded-xl flex items-center gap-3'>
                <BsSearch className="text-white" />
                <input type="text" className='text-white w-full bg-transparent border-none text-sm outline-none' placeholder='Search here' />
            </div>

            <Dropdowns name="Current" list={current} />
            <Dropdowns name="All Projects" list={all} />
            <Dropdowns name="Completed" list={completed} />
        </div>
    )
}

export default Sidebar