import CalenderContainer from '@/components/Calendar'
import getInitialProps from '@/helper/getInitalProps'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

const App = (props:any) => {
  return (
    <CalenderContainer {...props} />
  )
}

App.getLayout = ({ children }:any) => {
    return (
        <>
            {children}
        </>
    )
}


export const getServerSideProps = async (ctx: any) => {

    const res = getInitialProps(ctx)
    return res
   
}


export default App