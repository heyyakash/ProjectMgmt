import React from 'react'
import { RiTeamFill } from 'react-icons/ri'
import { IoPeopleCircle, IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineHome } from 'react-icons/ai'
import { HiOutlineBellAlert } from 'react-icons/hi2'
import { BsChatLeft, BsCalendar3Event } from 'react-icons/bs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiBarChartAlt2, BiLogIn } from 'react-icons/bi'

type props = {
    image: string
}


const Navbar = ({ image }: props) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const signOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }
    return (

        <div className='w-full md:w-[90px] md:h-full bg-indigo-500/10 justify-between flex items-center py-4 pr-1 px-2 md:px-0 md:flex-col'>
            <Link href="/dashboard"><IoPeopleCircle className="text-pink-600 text-[3rem]" /></Link>
            <div className='w-full text-white flex md:flex-col text-[1.35rem] gap-2 justify-center   md:gap-5  items-center'>
                <Link href={"/dashboard"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><AiOutlineHome /></Link>
                <Link href={"/analysis"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><BiBarChartAlt2 /></Link>
                <Link href={"/chats"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><BsChatLeft /></Link>
                <Link href={"/calendar"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><BsCalendar3Event /></Link>
                <Link href={"/settings"} className={`hover:bg-white hover:text-black p-2 rounded-xl trans`}><IoSettingsOutline /></Link>
            </div>
            <div className='relative group gap-1 p-1 rounded-3xl items-center justify-center'>
                <img className='h-12 w-12 hidden md:block relative cursor-pointer rounded-full object-cover z-10' src={image} alt="profile" />
                <div onClick={() => signOut()} className='rounded-full h-12 bg-red-500 w-12 grid md:absolute trans top-1 group-hover:-top-12 z-0 place-items-center cursor-pointer'>
                    <BiLogIn className='text-2xl' />
                </div>

            </div>

        </div>
    )
}

export default Navbar