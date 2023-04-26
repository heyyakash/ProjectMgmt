import React, { useState } from 'react'
import { PieChart } from './PieChart'
import { BarChart } from './BarChart'
import { User } from '@/types/user.types'
import { sentiment } from '@/types/sentiment.types'
import { useQuery } from 'react-query'
import { BsPeopleFill } from 'react-icons/bs'

const Analysis = (props: any) => {
    const sentiments = props.sentiment.map((x: sentiment) => x.sentiment)
    let data = [0, 0, 0]
    sentiments.map((x: string) => {
        if (x === "positive") data[0] += 1
        if (x === "neutral") data[1] += 1
        if (x === "negative") data[2] += 1

    })
    const healthy: boolean = data[0] > data[2] ? true : false

    const users: string[] = props.members.map((x: User) => x.email)
    const positiveUsers: number[] = Array(users.length).fill(0)
    const neutralUsers: number[] = Array(users.length).fill(0)
    const negativeUsers: number[] = Array(users.length).fill(0)
    props.sentiment.map((x: sentiment) => {
        if (x.sentiment === "positive") positiveUsers[users.indexOf(x.email)] += 1
        if (x.sentiment === "neutral") neutralUsers[users.indexOf(x.email)] += 1
        if (x.sentiment === "negative") negativeUsers[users.indexOf(x.email)] += 1
    })
    users.map((x, i) => {
        users[i] = x.split("@")[0]
    })

    // console.log(sentimentResult)
    // console.log(data)

    // if (loading) {

    //     return (
    //         <div className='h-full w-full flex text-white justify-center text-sm gap-4 items-center'>
    //             <BsPeopleFill className='animate-ping text-2xl' />
    //             <p>Analyzing Chats...</p>
    //         </div>
    //     )

    // }
    // if (isError) {

    //     return (
    //         <div className='h-full w-full flex text-white justify-center text-sm gap-4 items-center'>
    //             {/* <BsPeopleFill className='animate-ping text-2xl' /> */}
    //             <p>Error</p>
    //         </div>
    //     )

    // }
    return (
        <div className='flex flex-col'>
            <div className='w-full py-6 px-8 border-b border-sec '>
                <h2 className='text-xl font-bold '>Team Analysis</h2>
            </div>
            <div className='h-[350px] flex w-full border-b border-sec '>
                <div className="py-6 px-8 w-[400px] border-r border-sec grid place-items-center">
                    <PieChart sentiment={data} />
                </div>
                <div className='h-full min-w-[500px] flex items-center px-8'>
                    <BarChart users={users} positives={positiveUsers} negatives={negativeUsers} neutrals={neutralUsers} />
                </div>
            </div>
            <div className='px-8 py-8 flex flex-col gap-4 border-b border-sec'>
                <h2 className='text-xl font-bold '>Analysis</h2>
                <div className='flex flex-col gap-4 mt-4'>
                    {props.members.map((x: User, i: number) => {
                        return (
                            <div className='flex gap-3 w-[350px] items-center' key={x.email}>
                                <img src={x.image} className='h-12 w-12 object-cover rounded-full' alt="profile picture" />
                                <h2 className='text-lg text-semibold'>{x.fname + " " + x.lname}</h2>
                                <div className={`ml-auto p-2 ${positiveUsers[i] > negativeUsers[i] ? "bg-cyan-500/30 text-cyan-500" : "bg-red-500/30 text-red-500"} rounded-xl py-1 text-sm font-semibold`}>
                                    {positiveUsers[i] > negativeUsers[i] ? "Positive" : "Negaitive"}
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default Analysis