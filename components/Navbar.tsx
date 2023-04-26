import React from 'react'
import { RiTeamFill } from 'react-icons/ri'
import { IoPeopleCircle, IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineHome } from 'react-icons/ai'
import { HiOutlineBellAlert } from 'react-icons/hi2'
import { BsChatLeft, BsCalendar3Event } from 'react-icons/bs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useRouter } from 'next/router'


type props = {
    image: string
}


const Navbar = ({ image }: props) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const signOut = async() => {
        await supabase.auth.signOut()
        router.push('/login')
    }
    return (

        <div className='w-[90px] h-full bg-indigo-500/10 justify-between flex items-center py-4 pr-1 flex-col'>
            <Link href = "/dashboard"><IoPeopleCircle className="text-pink-600 text-[3rem] mt-5" /></Link>
            <div className='w-full text-white flex flex-col text-[1.5rem] gap-[2rem] items-center'>
                <Link href = {"/dashboard"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><AiOutlineHome /></Link>
                <Link href = {"/analysis"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><HiOutlineBellAlert /></Link>
                <Link href = {"/chats"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><BsChatLeft /></Link>
                <Link href = {"/calendar"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><BsCalendar3Event /></Link>
                <Link href = {"/settings"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><IoSettingsOutline  /></Link>
            </div>
            <img className='h-12 w-12 cursor-pointer rounded-full object-cover' onClick={()=>signOut()} src={image} alt="profile" />

        </div>
    )
}

export default Navbar