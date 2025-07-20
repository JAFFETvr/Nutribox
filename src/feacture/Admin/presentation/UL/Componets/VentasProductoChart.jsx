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


export const DashboardProductos = ({ datosVentas, productosNoVendidos }) => {

  const chartData = {
    labels: datosVentas.map(p => p.nombre),
    datasets: [
      {
        label: 'Unidades Vendidas',
        data: datosVentas.map(p => p.cantidad),
        backgroundColor: '#3b82f6', // Un azul profesional y consistente
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6, // Barras un poco más delgadas
        categoryPercentage: 0.7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b', // slate-800
        titleColor: '#f8fafc',    // slate-50
        bodyColor: '#cbd5e1',     // slate-300
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        // Eliminamos el 'max' fijo para que el gráfico se adapte a los datos
        grid: {
          color: '#e2e8f0', // slate-200
        },
        ticks: {
          color: '#64748b', // slate-500
          stepSize: 5, // Chart.js lo usará como sugerencia
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b', // slate-500
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      
      {/* Columna para la Gráfica */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Rendimiento de Ventas</h2>
        <div className="h-80 relative">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Columna para la Lista de Productos sin Venta */}
      <div className="lg:col-span-1 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Productos sin Venta</h2>
        {productosNoVendidos.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {productosNoVendidos.map((nombre, index) => (
              <ProductListItem key={index} name={nombre} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500 mt-4">¡Todos los productos se han vendido!</p>
        )}
      </div>

    </div>
  );
};