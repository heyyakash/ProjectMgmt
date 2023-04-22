import React from 'react'
import { RiTeamFill } from 'react-icons/ri'
import { IoPeopleCircle, IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineHome } from 'react-icons/ai'
import { HiOutlineBellAlert } from 'react-icons/hi2'
import { BsChatLeft, BsCalendar3Event } from 'react-icons/bs'


type props = {
    image: string
}


const Navbar = ({ image }: props) => {
    return (

        <div className='w-[90px] h-full bg-indigo-500/10 justify-between flex items-center py-4 pr-1 flex-col'>
            <IoPeopleCircle className="text-pink-600 text-[3rem] mt-5" />
            <div className='w-full text-white flex flex-col text-[1.5rem] gap-[3rem] items-center'>
                <AiOutlineHome />
                <HiOutlineBellAlert />
                <BsChatLeft />
                <BsCalendar3Event />
                <IoSettingsOutline />
            </div>
            <img className='h-12 w-12 cursor-pointer rounded-full object-cover' src={image} alt="profile" />

        </div>
    )
}

export default Navbar