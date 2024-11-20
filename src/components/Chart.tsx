import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { DistrictCapacity } from '../types';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const generateRGBAColor = (alpha: number) => {
  const generateNumber = () => Math.floor(Math.random() * 256);
  const colors = Array.from({ length: 3 }, () => generateNumber());
  const [R, G, B] = colors;
  return `rgba(${R}, ${G}, ${B}, ${alpha})`;
};

const Chart = ({ districtData }: { districtData: DistrictCapacity[] }) => {
  const [colors] = useState(() =>
    Array.from({ length: districtData.length }, () => generateRGBAColor(0.5))
  );
  const data = {
    labels: districtData?.map(item => item.district),
    datasets: [
      {
        label: 'Capacity',
        data: districtData?.map(item => item.capacity),
        backgroundColor: colors,
        borderColor: ['rgba(0, 0, 0, 0.1'],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: ${tooltipItem.raw} мест`;
          }
        }
      }
    }
  };

  return <Pie data={data} options={options} />;
};

export default Chart;
