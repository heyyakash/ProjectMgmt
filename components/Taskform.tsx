import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Taskform = () => {
    const { register } = useForm()
    const projects = ["Xylem", "Nike", "Vercel", "Hasura"]
    const category = ["UI/UX","Dev","Marketing"]
    const [show, setShow] = useState<boolean>(false)
    return (
        <form className='w-full'>
            <div className='px-8 py-5 border-b border-sec'>
                <h2 className='text-2xl  font-bold'>Create Task</h2>
            </div>
            <div className={`px-8 trans border-b border-sec flex flex-col gap-4 ${show ? "py-10" : "py-8"} `}>
                <h3 className='text-xl font-bold'>Select Project</h3>
                <div className="flex gap-4">
                    <select className='input-sec w-[400px]' {...register("project")} id="projects">
                        {projects.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                    <button onClick={() => setShow(!show)} className='input-sec text-sm font-bold px-4 hover:bg-white hover:text-slate-800'>Add Project + </button>

                </div>
                {show ? (<div className='flex gap-4'>
                    <input placeholder='Enter project name' type="text" className='input-sec w-[400px]' />
                    <button className='input-sec text-sm font-bold px-4 hover:bg-white hover:text-slate-800' > +  </button>
                </div>) : (<></>)}
            </div>
            <div className={`px-8 py-8 trans border-b border-sec flex flex-col gap-4`}>
                <h3 className='text-xl font-bold'>Define Task</h3>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="title" className='text-sm font-lilbold text-white/70'>Select Category</label>
                    <select className='input-sec w-[400px]'>
                        {category.map((x)=><option key = {x} value = {x}>{x}</option>)}
                    </select>
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="title">Title</label>
                    <input {...register("title")} type="text" className='input-sec w-[400px]' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="title">Description</label>
                    <textarea rows={2} {...register("description")} className='input-sec w-[400px] h-[100px]' />
                </div>

            </div>

        </form>
    )
}

export default Taskform