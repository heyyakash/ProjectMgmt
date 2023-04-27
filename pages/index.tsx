import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ReactElement } from 'react'
import { IoPeopleCircle } from 'react-icons/io5'
import Link from 'next/link'
import { BiChat, BiTask } from 'react-icons/bi'
import { HiSparkles } from 'react-icons/hi'
import { FaDumbbell } from 'react-icons/fa'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Progressify</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-full md:h-[100vh] relative'>
    
        <div className='w-full h-[70px] relative'>
          <nav className='w-full md:w-[1400px] mx-auto h-full flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <IoPeopleCircle className="text-pink-600 text-[3rem]" />
              <h2 className='text-2xl font-bold text-white '>Progressify</h2>
            </div>
            <Link href="/login" className='p-2 bg-pink-500 text-white font-lilbold rounded-xl trans hover:text-pink-500 hover:bg-white'>Login</Link>
          </nav>
        </div>


        <section className='max-w-[1400px] w-full mx-auto mt-[150px] grid md:grid-rows-1 md:grid-cols-2 relative'>
        {/* <div className='w-[400px] h-[400px] top-[10%] left-[10%] gradient-bg rounded-full absolute'></div>
        <div className='inset-0  backdrop-blur-[100px] absolute'></div> */}
          <div className='flex w-full flex-col gap-4 relative'>
            <h1 className='text-[3rem] font-extrabold leading-[4.7rem] bg-gradient-to-r  from-white via-pink-400 to-purple-400 bg-clip-text text-transparent'>Maximize your team's efficiency and productivity with <span className='gradient-bg text-transparent bg-clip-text background-animate'>Progressify.</span></h1>
            <div className='grid grid-cols-2 grid-rows-2 gap-4 mt-5'>
              <Features text={"Let AI do the heavy lifting"}><FaDumbbell /></Features>
              <Features text={"Automate task assignment"}><HiSparkles /></Features>
              <Features text={"Discuss tasks with teammates"}><BiChat /></Features>
              <Features text={"Get report on team sentiment"}><BiTask /></Features>
            </div>
          </div>
          <div className='w-full flex justify-center relative items-center'>
            <img src="/ss1.png" className='hero-image top-5 z- w-[300px] z-[100]' alt="" />
            <img src="/ss2.png" className='hero-image bottom-3 left-4 w-[300px] z-[80]' alt="" />
            <img src="/ss3.png" className='hero-image -bottom-7 right-5  w-[300px] z-[50]' alt="" />
          </div>
        </section>

      </main>
    </>
  )
}


export const Features = ({ children, text }: { children: any, text: string }) => {
  return (
    <div className='flex gap-3 items-center'>
      <div className='gradient-bg w-12 h-12 rounded-lg grid place-items-center text-white text-3xl'>
        {children}
      </div>
      <p className='text-white/70 font-lilbold text-md'>{text}</p>
    </div>
  )
}