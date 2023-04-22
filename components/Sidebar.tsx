import React from 'react'
import { BsSearch } from 'react-icons/bs'
import Dropdowns from './Dropdowns'

const Sidebar = () => {
    const currList = [
        "Redbull", "Xylem", "Rockstar"
    ]
    const allList = [...currList,"EA Sports","Netflix"]
    const compList = ["EA sports","Netflix"]
    return (
        <div className="w-[340px] border-r-[1px] border-indigo-500/20 h-full overflow-auto rounded-l-2xl bg-[#222131] -ml-1 flex flex-col p-8 items-center ">
            <div className='w-full h-[60px] mb-2 bg-indigo-500/10 px-4 rounded-xl flex items-center gap-3'>
                <BsSearch className="text-white" />
                <input type="text" className='text-white w-full bg-transparent border-none outline-none' placeholder='Search here' />
            </div>

            <Dropdowns name="Current" list={currList} />
            <Dropdowns name="All Projects" list = {allList} />
            <Dropdowns name="Completed" list = {compList} />
        </div>
    )
}

export default Sidebar