import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

import { GrPrevious, GrNext } from 'react-icons/gr';
import Day from './Day';
import Taskform from './Taskform';


const CalenderContainer = (props:any) => {
    const [value, setValue] = useState(moment());
    const [date, setDate] = useState<string | null>(null)
    const [calendar, setCalendar] = useState<any>([]);
    const [mode, setMode] = useState<'calendar' | 'form'>("calendar")
    const month = value.clone().format("MMMM").toString();
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    const [task, setTask] = useState<string>("")



    useEffect(() => {
        manageDate()
    }, [value]);

    const manageDate = () => {
        const a = [];
        const day = startDay.clone().subtract(1, "day");
        while (day.isBefore(endDay, "day")) {
            a.push(
                Array(7).fill(0).map(() => day.add(1, "day").clone())
            )
        };
        setCalendar(a);
    }

    if (mode === "calendar") {
        return (
            <>
                <div className='flex w-full h-full flex-col lg:mt-0  '>
                    {/* <Calendar onChange={setValue} value = {value}></Calendar> */}
                    <div className=' p-4 w-full flex flex-col h-full'>

                        <div className='w-full h-[30px] p-4 flex justify-between items-center '>
                            <span className='bg-white p-2 rounded-xl' onClick={() => setValue(value.clone().subtract(1, 'months'))}>
                                <GrPrevious />
                            </span>
                            <h2 className='text-xl font-semibold'>{month}</h2>
                            <span className='bg-white p-2 rounded-xl' onClick={() => setValue(value.clone().add(1, 'months'))}>
                                <GrNext />
                            </span>
                        </div>

                        <div className="grid grid-cols-7 w-full mt-10 grid-rows-1 ">
                            <div className="grid place-items-center text-white p-2 bg-sec ">Sun</div>
                            <div className="grid place-items-center text-white p-2 bg-sec ">Mon</div>
                            <div className="grid place-items-center text-white p-2 bg-sec ">Tue</div>
                            <div className="grid place-items-center text-white p-2 bg-sec ">Wed</div>
                            <div className="grid place-items-center text-white p-2 bg-sec ">Thu</div>
                            <div className="grid place-items-center text-white p-2 bg-sec ">Fri</div>
                            <div className="grid place-items-center text-white p-2 bg-sec ">Sat</div>

                        </div>

                        <div className='grid grid-cols-7 w-full h-full mt-2 grid-rows-6 gap-2'>

                            {calendar.map((week: any) => (
                                week.map((day: any) => (

                                    <Day setMode={setMode} setDate={setDate} key={day.format("L").toString()} day={day} month={month}></Day>
                                ))
                            ))}
                        </div>



                    </div>
                </div>
            </>

        )
    }
    return (
        <Taskform date = {date} setDate = {setDate} mode = {mode} setMode = {setMode} task = {task} setTask = {setTask} company = {props.metadata[0].company} team = {props.metadata[0].team} />
    )
}

export default CalenderContainer