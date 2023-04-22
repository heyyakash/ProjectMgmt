import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Link from 'next/link'

type ComponentType = {
  Component:NextComponentType<NextPageContext, any, any> & {Layout?:JSX.Element}
  pageProps:any
}

export default function App({ Component, pageProps }: ComponentType  ) {
  const supabaseClient = createBrowserSupabaseClient()
  console.log(pageProps)

  if (Component.Layout){
    return (
      <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
       <Component {...pageProps} />
    </SessionContextProvider>
    )
  }

  return (

    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className='w-full h-[100vh] flex '>
        <Navbar image={pageProps.metadata[0].image} />
        <Sidebar />
        <section className='w-[calc(100%-390px+.25rem)] pt-5 flex flex-col  text-white'>
          <div className='flex w-full p-5 px-8 gap-2 items-end'>
            <h1 className='text-[1.6rem] font-bold'>{pageProps.metadata[0].company} /</h1> <p className='text-white/50 mb-1    '>{pageProps.metadata[0].team}</p>
            
            <Link href = "/adduser" className='bg-pink-500 p-2 rounded-xl ml-auto cursor-pointer text-white trans hover:text-pink-500 hover:bg-white font-semibold '>Add Task</Link>
            <div className='ml-2 flex'>
              {pageProps.members.length!==0?
                pageProps.members.map((x:any)=>{
                  return <img src={x.image} key = {x.email} className='h-10 w-10 rounded-full object-cover' alt="profilePicture" /> 
                }):(<></>)  
              }
              
              <Link href={"/adduser"} className='ml-2 bg-sec rounded-full h-10 w-10 text-bold text-4xl hover:bg-white trans hover:text-purple-500 grid place-items-center'>
                +
              </Link>
            </div>
          </div>
          <Component {...pageProps} />
        </section>
      </div>
    </SessionContextProvider>
  )
}
