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
        users[i] = props.members[i].fname + ' ' + props.members[i].lname
    })


    return (
        <div className='flex h-full overflow-auto flex-col'>
            <div className='w-full py-6 px-8 border-b border-sec '>
                <h2 className='text-xl font-bold '>Team Sentiment Analysis</h2>
            </div>
            <div className='h-[350px] flex w-full border-b border-sec '>
                <div className="py-6 px-8 w-[50%] border-r border-sec grid place-items-center">
                    <PieChart sentiment={data} />
                </div>
                <div className='h-full w-[50%] py-6 justify-center overflow-auto flex items-center px-8'>
                    <BarChart users={users} positives={positiveUsers} negatives={negativeUsers} neutrals={neutralUsers} />
                </div>
            </div>
            <div className='px-8 py-8 flex flex-col b gap-4 border-b overflow-auto h-full border-sec'>
                <h2 className='text-xl font-bold  '>Analysis</h2>
                <div className='flex overflow-auto flex-col gap-6 mt-8'>
                    {props.members.map((x: User, i: number) => {
                        let healthy = positiveUsers[i] > negativeUsers[i] ? true : false
                        return (
                            <div className='flex w-full gap-3 justify-between items-center' key={x.email}>
                                <div className='flex items-center gap-3'>
                                    <img src={x.image} className='h-12 w-12 object-cover rounded-full' alt="profile picture" />
                                    <h2 className='text-lg font-lilbold'>{x.fname + " " + x.lname}</h2>
                                </div>

                                <div className={` p-2 ${healthy ? "bg-cyan-500/30 text-cyan-500" : "bg-red-500/30 text-red-500"} rounded-xl py-1 text-sm font-semibold`}>
                                    {healthy ? "Positive" : "Negaitive"}
                                </div>
                                <p className={`${healthy?"text-green-500":"text-yellow-500"} font-lilbold hidden md:block`}>{healthy ? "Seems Motivated" : "Could use a break"}</p>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default Analysis