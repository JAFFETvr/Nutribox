import React from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductListItem = ({ name }) => (
  <li className="flex items-center text-slate-600 text-sm">
    <svg className="w-2 h-2 mr-3 flex-shrink-0 fill-current text-slate-400" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="4" />
    </svg>
    {name}
  </li>
);

export const DashboardProductos = ({ topSold, leastSold }) => {
  const chartData = {
    labels: topSold.map(p => p.nombre),
    datasets: [
      {
        label: 'Número de Ventas',
        data: topSold.map(p => p.count),
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#e2e8f0' },
        ticks: { color: '#64748b', precision: 0 },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' },
      },
    },
  };
  
  // Aquí se asume que 'leastSold' (que viene de las props) ya ha sido filtrado
  // en el ViewModel para contener solo los productos con una venta.
  const productsWithOneSale = leastSold.filter(p => p.count === 1).map(p => p.nombre);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      
      <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Rendimiento de Ventas</h2>
        {topSold && topSold.length > 0 ? (
          <div className="h-80 relative">
            <Bar data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p className="text-sm text-slate-500 mt-4 h-80 flex items-center justify-center">No hay datos de ventas para mostrar.</p>
        )}
      </div>

      <div className="lg:col-span-1 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Productos con una Sola Venta</h2>
        {productsWithOneSale.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {productsWithOneSale.map((nombre, index) => (
              <ProductListItem key={index} name={nombre} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500 mt-4">No hay productos con una única venta.</p>
        )}
      </div>

    </div>
  );
};