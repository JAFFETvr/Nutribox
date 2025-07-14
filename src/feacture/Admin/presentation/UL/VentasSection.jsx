import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useVentasViewModel } from '../ViewModel/VentasViewModel';
import { FaChartBar, FaPiggyBank, FaCoins } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Ventas = () => {
  const { isLoading, error, coinCounts, totalIncome } = useVentasViewModel();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (!isLoading && !error && coinCounts) {
      const sortedLabels = Object.keys(coinCounts).sort((a, b) => a - b);
      setChartData({
        labels: sortedLabels.map(label => `$${label} MXN`),
        datasets: [
          {
            label: 'Cantidad de Ingresos',
            data: sortedLabels.map(label => coinCounts[label]),
            backgroundColor: '#6EE7B7', // Verde suave
            borderColor: '#6EE7B7',
            borderWidth: 2,
            borderRadius: 6,
            hoverBackgroundColor: '#34D399', // Verde intenso
            hoverBorderColor: '#34D399',
          },
        ],
      });
    }
  }, [isLoading, error, coinCounts]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: '#D1FAE5',
        titleColor: '#065F46',
        bodyColor: '#065F46',
        borderColor: '#10B981',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 5,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#065F46',
          font: { family: "'Inter', sans-serif", size: 12 },
        },
        grid: { color: '#E5E7EB' },
      },
      x: {
        ticks: {
          color: '#065F46',
          font: { family: "'Inter', sans-serif", size: 12 },
        },
        grid: { display: false },
      },
    },
  };

  if (isLoading) {
    return <div className="p-6 text-[#2E6C43]">Cargando datos de ventas...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error al cargar los datos.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans text-[#2E6C43]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FaChartBar className="text-3xl text-[#2E6C43]" />
          <h1 className="text-3xl font-bold">Ingresos por Moneda</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <FaCoins className="text-lg text-[#2E6C43]" />
              <h2 className="text-xl font-semibold">Frecuencia de Monedas</h2>
            </div>
            <div className="h-96 relative">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <FaPiggyBank className="text-5xl text-green-500" />
            </div>
            <h2 className="text-lg font-semibold mb-1">Ingreso Total</h2>
            <div className="text-5xl font-bold text-green-600">
              {totalIncome.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN',
              })}
            </div>
            <p className="mt-2 text-sm text-[#2E6C43]/80">
              Suma de todas las monedas registradas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
