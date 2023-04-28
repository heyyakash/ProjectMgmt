import React, { useState } from 'react'
import Signup from './Signup'
import { useForm } from 'react-hook-form'
// import { SupabaseClient } from '@supabase/supabase-js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { redirect } from 'next/dist/server/api-utils'
import { useQueryClient } from 'react-query'

const AddUser = (props: any) => {
    const { register, handleSubmit } = useForm()
    const supabase = useSupabaseClient()
    const queryClient = useQueryClient()
    const { company, team } = props.metadata
    const [success,setSuccess] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)

    const createUser = async (payload: any) => {
        setError(null)
        // const { email, password, image, gender, fname, lname } = payload
        payload.company = company
        payload.team = team
        const res = await fetch(`/api/userapi`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: payload })
        })
        const result = await res.json()
        if (result.success){
            queryClient.invalidateQueries("members")
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 5000);
        }
        else {
            setError(result.msg.message)
            // console.log(result.msg.message.toString())
        }
    }



    return (
        <>
            <div className='mt-5 px-8 border-b-[1.75px] border-sec h-[50px]'>
                <h2 className='text-2xl font-bold'>Add a member</h2>
            </div>
            <form onSubmit={handleSubmit(createUser)} className='flex flex-col px-8 mt-10 gap-5 max-w-[800px] font-lilbold text-white/80'>
                <div className='grid grid-cols-2 gap-4'>

                    <div className='flex flex-col'>
                        <label htmlFor="fname">First Name</label>
                        <input required type="text" id="fname" {...register("fname")} className='input-sec' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="lname">Last Name</label>
                        <input required type="text" id="lname" {...register("lname")} className='input-sec' />
                    </div>

                </div>
                <div className='grid grid-cols-2 gap-4'>

                    <div className='flex flex-col'>
                        <label htmlFor="company">Company Name</label>
                        <input required type="text" defaultValue={company} disabled id="company" {...register("company")} className='input-sec' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="team`">Team Name</label>
                        <input required type="text" defaultValue={team} disabled id="team`" {...register("team`")} className='input-sec' />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="skill">Skill</label>
                    <select {...register("skills")} className='input-sec' id="skill">
                        <option value="Web Development">Web Developer</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Mobile App">App Developer</option>
                        <option value="UI/UX">UI /UX</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input required type="email" id="email" {...register("email")} className='input-sec' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input required type="password" id="password" {...register("password")} className='input-sec' />
                </div>
                <div className='grid grid-cols-2 gap-4'>

                    <div className='flex flex-col'>
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" {...register("gender")} className='input-sec'>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="lname">Photo URL</label>
                        <input required type="text" id="lname" {...register("image")} className='input-sec' />
                    </div>

                    <input required type="submit" value={success?"Successfully Added":"Create"} className={`${success?"bg-green-500":"bg-pink-500"} mt-4 cursor-pointer hover:text-pink-500 hover:bg-white trans font-lilbold py-3`} />
                </div>
                <p className='text-red-500'>{error?error:""}</p>
            </form>
        </>
    )
}

export default AddUser