import Login from '@/components/Login'
import Signup from '@/components/Signup'
import React, { useState } from 'react'

const LoginPage = () => {
    const [option, setOption] = useState<"login" | "signup">("login")


    return (
        <div className='w-full h-[100vh] flex items-center justify-center flex-col gap-4 overflow-hidden relative'>
            <div className='w-[230px] h-[230px] gradient-bg rounded-full absolute -top-[6rem] -left-[5rem] md:-top-[3rem] md:left-[25%]'></div>
            <div className='w-[100px] h-[100px] md:w-[180px] md:h-[180px] gradient-bg-dark rounded-full absolute top-5 right-5 md:top-[3rem] md:right-[28%]'></div>
            <div className="grid p-2 bg-black/20 absolute top-10 rounded-xl grid-cols-2 grid-rows-1 w-[300px] h-[70px] ">
                <button onClick={()=>setOption("login")} className={`button grid place-items-center ${option === "login" ? "bg-white text-black" : " text-white/50"} rounded-xl `}>Sign in</button>
                <button onClick={()=>setOption("signup")} className={`button grid place-items-center ${option === "signup" ? "bg-white text-black" : " text-white/50"} rounded-xl  `}>Sign up</button>
            </div>
            {option === "login" ? <Login /> : <Signup />}
        </div>
    )
}

export default LoginPage