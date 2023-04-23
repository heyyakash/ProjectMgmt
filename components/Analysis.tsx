import React from 'react'
import { PieChart } from './PieChart'

const Analysis = (props: any) => {

    const sentiments= props.sentiment.map((x:any)=>x.sentiment)
    let data =[0,0,0]
    sentiments.map((x:string)=>{
        if(x==="positive") data[0]+=1
        if(x==="neutral") data[1]+=1
        if(x==="negative") data[2]+=1

    })
    
    return (
        <div className='flex flex-col'>
            <div className='w-full py-6 px-8 border-b border-sec '>
                <h2 className='text-xl font-bold '>Team Analysis</h2>
            </div>
            <div className='h-[350px] flex w-full border-b border-sec '>
                <div className="py-6 px-8 w-[400px] border-r border-sec grid place-items-center">
                    <PieChart sentiment={data}/>
                </div>
            </div>
        </div>
    )
}

export default Analysis