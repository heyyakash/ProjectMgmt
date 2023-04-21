// import { supabase } from '@/helper/supabaseClient'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
    const {register, handleSubmit} = useForm()
    const supabase = useSupabaseClient()
    const router = useRouter()
    const handleLogin = async (payload:any) =>{
        
        const {email,password} = payload
        const {data,error}:any = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(!error){
            localStorage.setItem("user",JSON.stringify(data))
            router.push("/dashboard")
        }
    }


    return (
        <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col items-center py-[2rem] text-white w-full md:w-[400px]' action="">

            <h1 className="text-[2.5rem] font-extrabold">Sign in.</h1>
            <div className='mt-7 w-full px-8 md:p-4 '>
                <input type="email" required id="email" {...register("email")}  placeholder='email' className='form-input' />
                <input type="password" required id="password" {...register("password")} placeholder='password' className='form-input' />
                <input type="submit" value={"Submit"} className='w-full p-4 button mt-9 rounded-xl gradient-bg' />
            </div>

        </form>
    )
}

export default Login