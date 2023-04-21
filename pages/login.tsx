import React, { useState } from 'react'

const login = () => {
    const [option, setOption] = useState<"login" | "signup">("login")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    return (
        <div className='w-full h-[100vh] grid place-items-center overflow-hidden relative'>
        <div className='w-[230px] h-[230px] gradient-bg rounded-full absolute -top-[6rem] -left-[5rem] md:-top-[3rem] md:left-[25%]'></div>
        <div className='w-[100px] h-[100px] md:w-[180px] md:h-[180px] gradient-bg-dark rounded-full absolute top-5 right-5 md:top-[3rem] md:right-[28%]'></div>
            <form className='flex flex-col items-center py-[2rem] text-white w-full md:w-[400px]' action="">
                
                <h1 className="text-[2.5rem] font-extrabold">Sign in.</h1>
                <div className='mt-7 w-full px-8 md:p-4 '>
                    <input type="email" name="id" required id="id" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='form-input' />
                    <input type="password" name="id" required id="id" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Room' className='form-input' />
                    <input type="submit" value={"Submit"} className='w-full p-4 button mt-9 rounded-xl gradient-bg' />
                </div>

            </form>
        </div>
    )
}

export default login