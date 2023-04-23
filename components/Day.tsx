import React from 'react';
import moment from 'moment';

const Day = ({ day, month,setDate ,setMode }:any) => {
    const logDate = () => {
        if (day.isAfter(moment(), 'day') || day.isSame(moment(),'day')) {
            setDate(day.format("YYYY-MM-DD"))
            setMode("form")
        }
    }
    return (
        <div onClick={logDate} className={` grid place-items-center ${day.isBefore(moment().startOf('month'), month) || day.isAfter(moment().endOf('month'), month) || day.isBefore(moment(), day) ? "bg-sec" : ""} ${day.isBefore(moment(), day) ? "" : "cursor-pointer hover:bg-primary hover:text-white"} ${day.isSame(moment(),'day') ? "border-4 border-pink-500 border-dashed border-offset-2 hover:bg-primary hover:text-white cursor-pointer" : ""}`}>
            {day.format("D").toString()}
        </div>
        // <div className='grid place-items-center h-[100px] bg-sec rounded-xl'>{

        //     day.format("D").toString()
        // }
        // </div>
    )
}

export default Day