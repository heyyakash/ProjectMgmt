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
    // console.log(props.members)

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
            <div className='md:h-[350px] flex w-full border-b border-sec md:flex-row flex-col'>
                <div className="py-6 px-8 h-[350px] md:h-[full] md:w-[50%] md:border-r border-sec grid place-items-center">
                    {data[0]===0 && data[1]==0 && data[2]==0?(<p className='text-md text-white font-semibold'>Not Enough Data</p>):(<PieChart sentiment={data} />) }
                </div>
                <div className='md:h-full h-[350px] border-t border-sec md:w-[50%] py-6 justify-center overflow-auto flex items-center px-8'>
                    <BarChart users={users} positives={positiveUsers} negatives={negativeUsers} neutrals={neutralUsers} />
                </div>
            </div>
            <div className='px-8 py-8 flex flex-col b gap-4 border-b overflow-auto h-full border-sec'>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption className="p-5 text-lg font-semibold text-left text-white bg-sec">
                            Analysis
                            <p className="mt-1 text-sm font-normal text-gray-400">
                                See detailed analysis of your team members and help your grow more productive and stress free.
                            </p>
                        </caption>

                        <thead className="text-xs uppercase bg-gray-900 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Member
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Skill
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Senitment
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Remark
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {props.members.map((x: User, i: number) => {
                                let healthy = positiveUsers[i] > negativeUsers[i] ? true : false
                                return (
                                    <tr key = {i} className="bg-sec border-b border-sec">
                                        <th 
                                            scope="row"
                                            className="px-6 py-4 font-medium  whitespace-nowraptext-white"
                                        >
                                            {x.fname + " " + x.lname} {x.role==="   admin"?" (admin) " :""}
                                        </th>
                                        <td className={`px-6 py-4 `}>{x.skills}</td>
                                        <td className={`px-6 py-4 ${healthy?"text-cyan-500":"text-pink-500"} font-lilbold`}>{healthy?"Postitive":"Negative"}</td>
                                        <td className={`px-6 py-4 ${healthy?"text-green-400":"text-yellow-500"} font-lilbold`}>{healthy ? "Seems Motivated" : "Could use a break"}</td>

                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>
                </div>

            </div>
        </div >
    )
}

export default Analysis