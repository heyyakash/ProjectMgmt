import Dashboard from '@/components/Dashboard'
import getInitialProps from '@/helper/getInitalProps'
import { atom, useAtom } from 'jotai'
import React from 'react'
import { useQuery } from 'react-query'

export const role = atom("")

const App = (props: any) => {
    const [r,setR] = useAtom(role)
    setR(props.metadata.role)
    // const { data: role, isError } = useQuery('role', () => props.metadata.role)
    return (
        <Dashboard {...props} />
    )
}

App.getLayout = ({ children }: any) => {
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