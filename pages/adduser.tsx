import AddUser from '@/components/AddUser'
import Dashboard from '@/components/Dashboard'
import getInitialProps from '@/helper/getInitalProps'
import { supabase } from '@/helper/supabaseClient'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

const App = (props: any) => {
    return (
        <AddUser {...props} />
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

    const res = await getInitialProps(ctx)
    return res
  
   
}


export default App