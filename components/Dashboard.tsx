import React from 'react'
import Navbar from './Navbar'

const Dashboard = ({ user }: any) => {
    // console.log(user)
    return (
       <div className='w-full h-[100vh]'>
        <Navbar />
       </div>
    )
}

export default Dashboard