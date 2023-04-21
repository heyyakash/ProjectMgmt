import { supabase } from '@/helper/supabaseClient'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Signup = () => {
    const {register, handleSubmit} = useForm()
    const onSubmit = async (data:any) => {
        const {email,password} = data
        const {user, session, error}:any = await supabase.auth.signUp({
            email,password
        })
        if(error) console.log(error)
        else{
            supabase
            console.log(user,session)
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center py-[2rem] text-white w-full md:w-[400px]' action="">

            <h1 className="text-[2.5rem] font-extrabold">Sign up.</h1>
            <div className='mt-7 w-full px-8 md:p-4 '>
                <div className="grid grid-cols-2 grid-row-1 gap-2">
                    <input className='form-input' type="text" id="fname" placeholder='First Name' required {...register("fname")} />
                    <input className='form-input' type="text" id="lname" placeholder='Last Name' required {...register("lname")} />
                </div>
                <div className="grid grid-cols-2 grid-row-1 gap-2">
                    <input className='form-input' type="text" id="age" placeholder='Photo URL' required {...register("image")} />
                    <select className='form-input' {...register("gender")} id="gender">
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <input type="email" required id="id"  placeholder='email' className='form-input' {...register("email")} />
                <input type="password" required id="password" placeholder='password' className='form-input' {...register("password")} />
                <div className="grid grid-cols-2 grid-row-1 gap-2">
                    <input className='form-input' type="text" id="fname" placeholder='Company Name' required {...register("company")} />
                    <input className='form-input' type="text" id="lname" placeholder='Team Name' required {...register("team")} />
                </div>
                <input type="submit" value={"Submit"} className='w-full p-4 button mt-9 rounded-xl gradient-bg' />
            </div>

        </form>

    )
}

export default Signup