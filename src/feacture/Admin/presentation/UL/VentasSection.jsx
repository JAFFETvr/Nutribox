import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { useVentasViewModel } from '../ViewModel/VentasViewModel';
import { FaPiggyBank, FaCoins, FaChartLine, FaDownload } from 'react-icons/fa';
import { DashboardProductos } from './Componets/VentasProductoChart';
import { exportSalesReport } from '../../../../utils/ExcelExporter';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const KpiCard = ({ title, value, icon, subtext }) => (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-slate-200 shadow-sm flex items-start space-x-4">
      <div className="bg-slate-100 p-3 sm:p-4 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-600">{title}</p>
        <p className="text-2xl sm:text-3xl font-bold text-slate-800">{value}</p>
        {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
      </div>
    </div>
);

export const Ventas = () => {
  const { isLoading, error, ventasPorDia, totalIncome, productSales } = useVentasViewModel();
  
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (!isLoading && !error && ventasPorDia) {
      setLineChartData({
        labels: ventasPorDia.map(d => d.fecha),
        datasets: [{
          label: 'Ingresos Diarios',
          data: ventasPorDia.map(d => d.ingresos),
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: '#3b82f6',
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#3b82f6',
          tension: 0.3
        }],
      });
    }
  }, [isLoading, error, ventasPorDia]);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { 
        backgroundColor: '#1e293b', 
        padding: 10, 
        cornerRadius: 4, 
        displayColors: false,
        callbacks: {
            label: function(context) {
                return `Ingresos: ${context.parsed.y.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`;
            }
        }
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: '#e2e8f0' }, 
        ticks: { 
            color: '#64748b',
            callback: function(value) { return '$' + value; }
        } 
      },
      x: { 
        grid: { display: false }, 
        ticks: { color: '#64748b' } 
      },
    },
  };

  const handleExport = () => {
    setIsExporting(true);
    try {
      exportSalesReport(ventasPorDia, productSales.topSold);
    } catch (exportError) {
      console.error("Error al exportar el reporte:", exportError);
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen bg-slate-50 text-slate-600 font-semibold">Cargando datos...</div>;
  if (error) return <div className="flex items-center justify-center h-screen bg-slate-50 text-red-600 font-semibold">Error al cargar datos.</div>;

  const totalTransactions = totalIncome > 0 ? Math.round(totalIncome / 5) : 0;

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2E6C43]">Análisis de Ingresos</h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">Resumen del rendimiento financiero y de productos.</p>
          </div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-wait"
          >
            <FaDownload />
            {isExporting ? 'Generando...' : 'Sacar Corte'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 sm:mb-8">
            <KpiCard 
                title="Ingreso Total"
                value={totalIncome.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                icon={<FaPiggyBank className="w-6 h-6 text-emerald-500" />}
                subtext="Suma de todas las ventas registradas."
            />
            <KpiCard 
                title="Total de Transacciones"
                value={totalTransactions.toLocaleString('es-MX')}
                icon={<FaCoins className="w-6 h-6 text-amber-500" />}
                subtext="Total de monedas de $5 insertadas."
            />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <FaChartLine className="text-xl text-slate-500" />
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Evolución de Ingresos</h2>
                </div>
                <div className="h-80 sm:h-96 relative">
                    <Line data={lineChartData} options={lineChartOptions} />
                </div>
            </div>
            
            <div className="lg:col-span-1">
                <DashboardProductos 
                    topSold={productSales.topSold} 
                    leastSold={productSales.leastSold} 
                />
            </div>
        </div>
      </div>
    </div>
  );
};