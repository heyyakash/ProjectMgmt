import React from 'react'
import { Taskprops, color } from './Tasks'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMutation, useQueryClient } from 'react-query'
import { useAtom } from 'jotai'
import { role } from '@/pages/dashboard'

type props = {
    type: Taskprops["name"]
    category: string
    heading: string,
    id: number
    text: string
    image:string
}



const Post = ({ type, heading, text, category, id,image }: props) => {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient()
    const [userType] = useAtom(role)
    const updateTask = async (value: string) => {
        const { data, error } = await supabase.from("tasks").update({ status: value }).eq("id", id)
        if(!error) queryClient.invalidateQueries('tasks')
        else console.log(error)
    }

    const { mutate } = useMutation(updateTask, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
        }
    })

    return (
        <div className=" w-full flex flex-col items-start gap-3 rounded-lg shadow bg-sec p-4 drop-shadow-2xl">
            {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}
            <div className={`cursor-pointer py-1 px-3 ${color[type]} bg-opacity-20 rounded-xl`}>
                <p className={`text-transparent ${color[type]} bg-clip-text text-sm font-bold `}>{category}</p>
            </div>
            <div >
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                        {heading}
                    </h5>
                </a>
                <p className="mb-3 text-gray-400 font-lilbold">
                    {text}
                </p>
                {userType === "admin" ?
                    (<>
                       <img src={image} alt="portrait" className='h-12 w-12 rounded-full object-cover' /> 
                    </>) :
                    (<div className="flex gap-2 flex-wrap">
                        {type !=="In Progress"?<button onClick={() => mutate("progress")} className='bg-orange-500/70 p-1 px-2 rounded-xl hover:bg-orange-500 trans font-semibold border-2 border-orange-500 text-xs'>Progress</button>:<></>}
                        {type !== "In Review" ? <button onClick={() => mutate("review")} className='bg-blue-500/70 p-1 hover:bg-blue-500 trans rounded-xl px-2 font-semibold border-2 border-blue-500  text-xs'>Review</button> : <></>}
                        {type !== "Completed" ? <button onClick={() => mutate("completed")} className='bg-green-500/70 p-1 hover:bg-green-500 trans rounded-xl px-2 border-2 border-green-500  font-semibold text-xs'>Completed</button> : <></>}
                    </div>
                    )}

            </div>
        </div>

    )
}

export default Post