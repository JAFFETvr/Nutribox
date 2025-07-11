import React from 'react';

// Componente para la onda. No necesita cambios.
const Wave = ({ colorClassName }) => (
  <div className="absolute top-0 left-0 w-full h-5 -translate-y-1/2 overflow-hidden">
    <div className="w-[400%] h-full animate-wave">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path
          className={colorClassName}
          d="M0,10 C12.5,20 25,0 37.5,10 C50,20 62.5,10 75,10 C87.5,20 100,10 100,10 L100,20 L0,20 Z"
        />
      </svg>
    </div>
  </div>
);

const formatRelativeTime = (date) => {
  if (typeof date === 'string') return date;

  const formatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
  const seconds = (new Date().getTime() - date.getTime()) / 1000;
  
  if (Math.abs(seconds) < 60) return "hace unos segundos";
  const minutes = seconds / 60;
  if (Math.abs(minutes) < 60) return formatter.format(Math.round(minutes), 'minute');
  const hours = minutes / 60;
  if (Math.abs(hours) < 24) return formatter.format(Math.round(hours), 'hour');
  const days = hours / 24;
  return formatter.format(Math.round(days) * -1, 'day'); // * -1 para que diga "hace"
};


export const Dispensador = ({ contenedor }) => {
  const nivelLlenado = contenedor.getNivelDeLlenado();

 
  const getPercentageColor = () => {
    if (nivelLlenado > 50 && nivelLlenado < 80) {
      return 'text-stale-500';
    }
    return 'text-red-500'; 
  };
  
  const liquidFillColor = 'fill-blue-500';
  const liquidBgColor = 'bg-blue-500';

  return (
    <div className="bg-white rounded-xl shadow-md w-72 flex flex-col font-sans transition-all duration-300 hover:shadow-lg">
      
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-slate-800">
          Dispensador #{contenedor.id}
        </h3>
        <p className="text-sm text-slate-500 capitalize">
          {contenedor.tipo}
        </p>
      </div>

      <div className="flex-grow flex flex-col items-center px-4 pb-4">
        <div className="w-1/2 h-2 bg-slate-800 rounded-t-sm mb-1"></div>

        <div className="relative w-full h-56 bg-slate-100 rounded-md overflow-hidden">
          <div
            className={`absolute bottom-0 left-0 w-full ${liquidBgColor} transition-all duration-1000 ease-in-out`}
            style={{ height: `${nivelLlenado}%` }}
          >
            {nivelLlenado > 5 && <Wave colorClassName={liquidFillColor} />}
          </div>

          <div className="absolute inset-0 flex justify-center items-center">
            <span className={`text-5xl font-bold ${getPercentageColor()}`}>
              {Math.round(nivelLlenado)}%
            </span>
          </div>
        </div>
        
        <div className="w-8 h-2 bg-slate-800 mt-1"></div>
      </div>
      
      <div className="p-4 text-center border-t border-slate-100">
        <p className="font-semibold text-lg text-slate-700">
          {contenedor.cantidadActual} / {contenedor.capacidadMaxima} uds.
        </p>
        <div className="text-xs text-slate-400 flex justify-center items-center gap-2 mt-2">
          <span>Temp: {contenedor.temperatura}°C</span>
          <span className="text-slate-300">|</span>
          <span>Recarga: {formatRelativeTime(contenedor.ultimaRecarga)}</span>
        </div>
      </div>
    </div>
  );
};