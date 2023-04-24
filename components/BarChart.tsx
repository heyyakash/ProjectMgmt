import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
        },
    },
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};



type props = {
    users: string[]
    positives: number[]
    neutrals: number[]
    negatives: number[]
}

export function BarChart({ users, positives, neutrals, negatives }: props) {
    const labels = users

    const data = {
        labels,
        datasets: [
            {
                label: 'Negative',
                data: negatives,
                backgroundColor: 'rgb(255, 99, 132)',
                stack: 'Stack 0',
            },
            {
                label: 'Positive',
                data: positives,
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'Stack 0',
            },
            {
                label: 'Neutrals',
                data: neutrals,
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'Stack 0',
            },
        ],
    };
    return <Bar options={options} data={data} />;
}
