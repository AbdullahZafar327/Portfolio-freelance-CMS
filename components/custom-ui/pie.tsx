import React from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
    const data = {
        labels: ['Coder', 'Designer'],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: ['#0695A3', '#F67070'],
            },
        ],
    };

    return (
        <div className="xl:h-100 xl:w-100 md:w-80 md:h-80 sm:h-40 sm:w-40 h-30 w-30">
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
