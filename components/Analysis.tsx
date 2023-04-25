import React from 'react'
import { PieChart } from './PieChart'
import { BarChart } from './BarChart'
import { User } from '@/types/user.types'
import { sentiment } from '@/types/sentiment.types'

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



    return (
        <div className='flex flex-col'>
            <div className='w-full py-6 px-8 border-b border-sec '>
                <h2 className='text-xl font-bold '>Team Analysis</h2>
            </div>
            <div className='h-[350px] flex w-full border-b border-sec '>
                <div className="py-6 px-8 w-[400px] border-r border-sec grid place-items-center">
                    <PieChart sentiment={data} />
                </div>
                <div className='py-6 h-full min-w-[500px] flex items-center px-8'>
                    <BarChart users={users} positives={positiveUsers} negatives={negativeUsers} neutrals={neutralUsers} />
                </div>
            </div>
            <div className='px-8 py-8 flex flex-col gap-4 border-b border-sec'>
                <h2 className='text-xl font-bold '>Analysis</h2>
                <h2 className={`text-2xl font-bold ${healthy ? "text-green-500/80" : "text-red-500"}`}>{
                    healthy ? "Team's health looks good!" : "Team's health does not look good!"
                }</h2>
            </div>
        </div >
    )
}

export default Analysis