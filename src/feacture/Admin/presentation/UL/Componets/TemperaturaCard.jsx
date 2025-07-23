import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell, Legend
} from "recharts";
import { 
  MdHourglassEmpty, 
  MdLocalDrink, 
  MdTimer, 
  MdAnalytics, 
  MdSettingsInputAntenna,
  MdCheckCircleOutline 
} from "react-icons/md";

const UMBRAL_DETECCION_VASO_CM = 10;

const KpiCard = ({ title, value, icon, subtext }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
    <div className="bg-slate-100 p-3 rounded-full">
      {icon}
    </div>
    <div className="flex-1">
      {/* Título pequeño para el card */}
      <p className="text-sm text-slate-600 font-semibold">{title}</p>
      {/* Valor principal: grande pero no exagerado en móvil */}
      <p className="text-2xl font-bold text-slate-800 break-words">{value}</p>
      {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
    </div>
  </div>
);

const RegistroSensorChart = ({ data, umbral }) => (
  <div className="w-full h-[300px] mt-4">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis type="number" domain={[0, 'dataMax + 10']} tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
        <YAxis dataKey="timestamp" type="category" width={80} tick={{ fontSize: 10, fill: '#64748b' }} interval={0} stroke="#cbd5e1" axisLine={false} tickLine={false} />
        <Tooltip formatter={(value) => `${value.toFixed(1)} cm`} cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
        <Bar dataKey="distancia">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.distancia < umbral ? "#3b82f6" : "#94a3b8"} />
          ))}
          <LabelList dataKey="distancia" position="right" formatter={(value) => value.toFixed(0)} style={{ fontSize: '10px', fill: '#334155' }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const UltrasonicoChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <MdHourglassEmpty className="text-5xl mb-4 text-slate-400" />
        <h2 className="text-xl font-semibold text-slate-700">Esperando datos del sensor...</h2>
        <p className="text-sm">El panel se activará al recibir la primera señal.</p>
      </div>
    );
  }

  const historicoData = data.slice(-100);
  const logData = data.slice(-20);

  const ultimaLectura = historicoData[historicoData.length - 1];
  const hayVaso = ultimaLectura.distancia < UMBRAL_DETECCION_VASO_CM;
  const estadoActual = hayVaso
    ? { text: "Vaso Detectado", icon: <MdLocalDrink className="w-6 h-6 text-blue-500" /> }
    : { text: "Disponible", icon: <MdCheckCircleOutline className="w-6 h-6 text-emerald-500" /> };

  let serviciosContados = 0;
  for (let i = 1; i < historicoData.length; i++) {
    const previaDisponible = historicoData[i - 1].distancia >= UMBRAL_DETECCION_VASO_CM;
    const actualOcupado = historicoData[i].distancia < UMBRAL_DETECCION_VASO_CM;
    if (previaDisponible && actualOcupado) {
      serviciosContados++;
    }
  }
  
  const ultimoServicio = [...historicoData].reverse().find(d => d.distancia < UMBRAL_DETECCION_VASO_CM);

  const deteccionesPorHora = historicoData.reduce((acc, curr) => {
    if (curr.distancia < UMBRAL_DETECCION_VASO_CM) {
      try {
        const hora = new Date(`1970-01-01T${curr.timestamp}`).getHours();
        const clave = `${String(hora).padStart(2, '0')}:00`;
        acc[clave] = (acc[clave] || 0) + 1;
      } catch (e) { /* Ignorar timestamps inválidos */ }
    }
    return acc;
  }, {});

  const dataGraficoDemanda = Object.keys(deteccionesPorHora)
    .map(hora => ({ hora: hora, servicios: deteccionesPorHora[hora] }))
    .sort((a,b) => a.hora.localeCompare(b.hora));

  return (
    // Se elimina el min-h-screen y el padding para que se ajuste al contenedor padre (`AdminSection`)
    <div className="w-full font-sans">
      {/* El título se elimina de aquí porque ya está en AdminSection.js */}
      {/* <h1 className="text-2xl font-bold text-slate-800 mb-6">Dispensador Inteligente</h1> */}
      
      {/* === LA CORRECCIÓN CLAVE ESTÁ AQUÍ === */}
      {/* Por defecto es 1 columna, en `sm` (móvil horizontal) son 2, en `lg` (desktop) son 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Estado Operativo" value={estadoActual.text} icon={estadoActual.icon} />
        <KpiCard title="Total de Servicios" value={serviciosContados} icon={<MdLocalDrink className="w-6 h-6 text-violet-500"/>} />
        <KpiCard 
          title="Último Servicio" 
          value={ultimoServicio ? ultimoServicio.timestamp : "N/A"}
          icon={<MdTimer className="w-6 h-6 text-orange-500"/>} 
        />
        <KpiCard 
          title="Señal del Sensor" 
          value={`${ultimaLectura.distancia.toFixed(1)} cm`}
          subtext={`Última lectura: ${ultimaLectura.timestamp}`}
          icon={<MdSettingsInputAntenna className="w-6 h-6 text-teal-500"/>} 
        />
      </div>

      {/* Los gráficos de abajo no se muestran en tu captura, pero los mantengo responsivos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg border border-slate-200 shadow-sm">
           <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2"><MdAnalytics /> Demanda por Franja Horaria</h2>
           <p className="text-sm text-slate-500 mb-4">Análisis de detecciones de vasos para identificar picos de uso.</p>
           <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataGraficoDemanda} margin={{ top: 20, right: 20, left: 10, bottom: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                      <XAxis dataKey="hora" tick={{ fontSize: 10 }} stroke="#cbd5e1" interval={0} angle={-45} textAnchor="end" />
                      <YAxis allowDecimals={false} label={{ value: 'Nº de Servicios', angle: -90, position: 'insideLeft', fill: '#64748b' }} tick={{ fontSize: 12 }} stroke="#cbd5e1" />
                      <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.1)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}/>
                      <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px', color: '#334155' }} />
                      <Bar dataKey="servicios" fill="#3b82f6" name="Servicios" radius={[4, 4, 0, 0]} />
                  </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-slate-200 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2"><MdSettingsInputAntenna /> Registro de Detección</h2>
          <p className="text-sm text-slate-500">Historial de las últimas {logData.length} lecturas.</p>
          <RegistroSensorChart data={logData} umbral={UMBRAL_DETECCION_VASO_CM} />
        </div>
      </div>
    </div>
  );
};

export default UltrasonicoChart;