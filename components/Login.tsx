import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (
        <form className='flex flex-col items-center py-[2rem] text-white w-full md:w-[400px]' action="">

            <h1 className="text-[2.5rem] font-extrabold">Sign in.</h1>
            <div className='mt-7 w-full px-8 md:p-4 '>
                <input type="email" name="id" required id="id" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' className='form-input' />
                <input type="password" name="id" required id="id" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='form-input' />
                <input type="submit" value={"Submit"} className='w-full p-4 button mt-9 rounded-xl gradient-bg' />
            </div>

        </form>
    )
}

export default Login