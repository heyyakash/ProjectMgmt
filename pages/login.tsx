import Login from '@/components/Login'
import Signup from '@/components/Signup'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React, { useState } from 'react'

const LoginPage = () => {
    const [option, setOption] = useState<"login" | "signup">("login")

    return (
        <div className='w-full h-[100vh] flex items-center justify-center flex-col gap-4 overflow-hidden relative'>
            <div className='w-[230px] h-[230px] gradient-bg rounded-full absolute -top-[6rem] -left-[5rem] md:-top-[3rem] md:left-[25%]'></div>
            <div className='w-[100px] h-[100px] md:w-[180px] md:h-[180px] gradient-bg-dark rounded-full absolute top-5 right-5 md:top-[3rem] md:right-[28%]'></div>
            <div className="grid p-1 bg-black/20 absolute top-10 rounded-xl text-sm grid-cols-2 grid-rows-1 w-[300px] h-[50px] font-lilbold">
                <button onClick={() => setOption("login")} className={`button grid place-items-center ${option === "login" ? "bg-white text-black" : " text-white/50"} rounded-lg `}>Sign in</button>
                <button onClick={() => setOption("signup")} className={`button grid place-items-center ${option === "signup" ? "bg-white text-black" : " text-white/50"} rounded-lg  `}>Sign up</button>
            </div>
            {option === "login" ? <Login /> : <Signup />}
        </div>
    )
}

export default LoginPage

export const getServerSideProps = async (ctx: any) => {

    const supabase = createServerSupabaseClient(ctx)
    const {
        data: { session },
    } = await supabase.auth.getSession()


    if (session)
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        }
    return {
        props:{
            login:false
        }
    }
}