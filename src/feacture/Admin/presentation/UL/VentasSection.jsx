// ./Ventas.jsx

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
// ... (resto de imports)
import { useVentasViewModel } from '../ViewModel/VentasViewModel';
import { FaPiggyBank, FaCoins, FaMoneyBillWave } from 'react-icons/fa';
import { DashboardProductos } from './Componets/VentasProductoChart';

// ... (El componente KpiCard y el registro de ChartJS se mantienen igual)
const KpiCard = ({ title, value, icon, subtext }) => (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-start space-x-4">
      <div className="bg-slate-100 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-600">{title}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
      </div>
    </div>
  );

export const Ventas = () => {
  const { isLoading, error, coinCounts, totalIncome } = useVentasViewModel();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [totalTransactions, setTotalTransactions] = useState(0);

  // Datos de ejemplo
  const datosVentasProductos = [
    { nombre: 'Agua Natural', cantidad: 12 }, { nombre: 'Jugo Naranja', cantidad: 10 },
    { nombre: 'Barra de Granola', cantidad: 7 }, { nombre: 'Jugo Verde', cantidad: 6 },
    { nombre: 'Frutas Secas', cantidad: 3 },
  ];
  const productosNoVendidos = ['Galletas sin azúcar', 'Té verde'];

  // ... (useEffect y chartOptions se mantienen igual, con los estilos profesionales)
  useEffect(() => {
    if (!isLoading && !error && coinCounts) {
      const sortedLabels = Object.keys(coinCounts).sort((a, b) => parseFloat(a) - parseFloat(b));
      setChartData({
        labels: sortedLabels.map(label => `$${label}`),
        datasets: [{
          label: 'Cantidad de Monedas',
          data: sortedLabels.map(label => coinCounts[label]),
          backgroundColor: '#3b82f6',
          borderRadius: 5,
        }],
      });
      const transactions = Object.values(coinCounts).reduce((sum, count) => sum + count, 0);
      setTotalTransactions(transactions);
    }
  }, [isLoading, error, coinCounts]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#1e293b', padding: 10, cornerRadius: 4, displayColors: false, },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#e2e8f0' }, ticks: { color: '#64748b' } },
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
    },
  };

  // ... (isLoading y error se mantienen igual)
  if (isLoading) return <div className="p-8 text-slate-600 font-semibold">Cargando datos...</div>;
  if (error) return <div className="p-8 text-red-600 font-semibold">Error al cargar datos.</div>;


  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2E6C43]">Análisis de Ingresos</h1>
          <p className="text-slate-500 mt-1">Resumen del rendimiento financiero y de productos.</p>
        </div>

        {/* KPIs (esto ya es responsivo y se mantiene igual) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <KpiCard 
                title="Ingreso Total"
                value={totalIncome.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                icon={<FaPiggyBank className="w-6 h-6 text-emerald-500" />}
                subtext="Suma de todas las monedas registradas."
            />
            <KpiCard 
                title="Total de Transacciones"
                value={totalTransactions.toLocaleString('es-MX')}
                icon={<FaCoins className="w-6 h-6 text-amber-500" />}
                subtext="Número total de monedas insertadas."
            />
        </div>

        {/* --- CONTENEDOR PRINCIPAL DE GRÁFICOS (AQUÍ ESTÁ LA CORRECCIÓN) --- */}
        {/* En pantallas grandes (lg), 2 columnas. En pequeñas, 1 columna (se apilan). */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Columna Izquierda: Gráfico de Monedas */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <FaMoneyBillWave className="text-lg text-slate-500" />
                    <h2 className="text-xl font-semibold text-slate-800">Frecuencia de Monedas</h2>
                </div>
                <div className="h-96 relative">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* Columna Derecha: Dashboard de Productos (que contiene sus propias 2 tarjetas) */}
            <div>
                <DashboardProductos 
                    datosVentas={datosVentasProductos} 
                    productosNoVendidos={productosNoVendidos} 
                />
            </div>
        </div>

      </div>
    </div>
  );
};