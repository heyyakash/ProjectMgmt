import React from 'react'

type props = {
    sentiment: number[]
}

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart({ sentiment }: props) {
    
    const data = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
            {
                label: 'Sentiment',
                data: sentiment,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(255, 99, 132, 0.3)',
                    

                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    
                ],
                borderWidth: 1,
            },
        ],
    };
    return <Pie data={data} />;
}