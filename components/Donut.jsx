import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Donut({ data, options }) {
  return (
    <div className="h-[400px] w-[400px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}
