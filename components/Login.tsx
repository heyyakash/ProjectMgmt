// import { supabase } from '@/helper/supabaseClient'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
    const [loading,setLoading] = useState<boolean>(false)
    const {register, handleSubmit} = useForm()
    const supabase = useSupabaseClient()
    const [error,setError] = useState<string | null>(null)
    const router = useRouter()
    const handleLogin = async (payload:any) =>{
        setLoading(true)
        setError(null)
        const {email,password} = payload
        const {data,error}:any = await supabase.auth.signInWithPassword({
            email,
            password
        })
        setLoading(false)
        if(!error){
            // localStorage.setItem("user",JSON.stringify(data))
            router.push("/dashboard")
        }
        else{
            const text = error.toString().split(":")[1]
            // console.log(error.toString())
            setError(text)
        }
    }


    return (
        <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col items-center py-[2rem] text-white w-full md:w-[400px]' action="">

            <h1 className="text-[1.85rem] font-extrabold">Sign in.</h1>
            <div className='mt-4 w-full px-8 md:p-4 '>
                <input type="email" required id="email" {...register("email")}  placeholder='email' className='form-input' />
                <input type="password" required id="password" {...register("password")} placeholder='password' className='form-input' />
                {error?<p className='text-red-600 font-lilbold mt-4 -mb-4 flex justify-center items-center'>{error}</p>:<></>}
                <input type="submit" value={loading?"Logging In..." : "Log In"} className={`w-full p-4 button mt-9 rounded-xl  ${loading?"bg-white text-pink-500":"gradient-bg"}`} />
            </div>
            
        </form>
    )
}

export default Login