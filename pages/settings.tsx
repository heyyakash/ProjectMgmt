import Settings from '@/components/Settings'
import getInitialProps from '@/helper/getInitalProps'
import React from 'react'

const App = (props:any) => {
    return (
        <Settings {...props} />
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