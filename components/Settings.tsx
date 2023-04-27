import { User } from '@/types/user.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


const Settings = (props:any) => {
    const {metadata}:{metadata:User} = props
    const [success,setSuccess] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)
    const {handleSubmit, register} = useForm()
    const supabase = useSupabaseClient()
    const updateUser = async (payload:any) => {
        setError(null)
        const {data,error} = await supabase.from("Users").update(payload).eq("id",metadata.id)
        if(!error) setSuccess(true)
        else{
            setError("Some Error Occured")
        }
    }
    return (
        <>
            <div className='mt-5 p-4 border-b-[1.75px] border-sec h-[50px]'>
                <h2 className='text-md  font-bold'>Update Details</h2>
            </div>
            <form onSubmit={handleSubmit(updateUser)} className='flex flex-col p-4  gap-5 max-w-[800px] font-lilbold text-white/80'>
                <div className='grid grid-cols-2 gap-4'>

                    <div className='flex flex-col'>
                        <label htmlFor="fname">First Name</label>
                        <input required type="text" defaultValue={metadata.fname} id="fname" {...register("fname")} className='input-sec' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="lname">Last Name</label>
                        <input required type="text" defaultValue={metadata.lname} id="lname" {...register("lname")} className='input-sec' />
                    </div>

                </div>
                <div className='grid grid-cols-2 gap-4'>

                    <div className='flex flex-col'>
                        <label htmlFor="company">Company Name</label>
                        <input required type="text" defaultValue={metadata.company} disabled id="company" {...register("company")} className='input-sec' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="team`">Team Name</label>
                        <input required type="text" defaultValue={metadata.team} disabled id="team`" {...register("team`")} className='input-sec' />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="skill">Skill</label>
                    <select {...register("skills")} className='input-sec' id="skill">
                        <option value={metadata.skills} disabled>{metadata.skills}</option>
                        <option value="Web Development">Web Developer</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Marketing">Marketing</option>
                        <option value="App Development">App Developer</option>
                        <option value="Design">UI /UX</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input required type="email" disabled defaultValue={metadata.email} id="email" {...register("email")} className='input-sec' />
                </div>
                <div className='grid grid-cols-2 gap-4'>

                    <div className='flex flex-col'>
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" {...register("gender")} className='input-sec'>
                            <option value={metadata.gender} disabled>{metadata.gender==="M"?"Male":"Female"}</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="lname">Photo URL</label>
                        <input defaultValue={metadata.image}  required type="text" {...register("image")} className='input-sec' />
                    </div>

                    <input required type="submit" value={success ? "Successfully Updated" : "Update"} className={`${success ? "bg-green-500" : "bg-pink-500"} mt-4 cursor-pointer hover:text-pink-500 hover:bg-white trans font-lilbold py-3`} />
                </div>
                {error? <p className='text-sm font-bold'>{error}</p>:<></>}
            </form>
        </>
    )
}

export default Settings