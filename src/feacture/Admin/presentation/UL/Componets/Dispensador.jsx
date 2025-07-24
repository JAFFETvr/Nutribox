import React from 'react';
import { FiDroplet, FiShoppingBag, FiTrash2 } from "react-icons/fi";

const Wave = ({ colorClassName }) => (
  <div className="absolute top-0 left-0 w-full h-5 -translate-y-1/2 overflow-hidden">
    <div className="w-[400%] h-full animate-wave">
      <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path className={colorClassName} d="M0,10 C12.5,20 25,0 37.5,10 C50,20 62.5,10 75,10 C87.5,20 100,10 100,10 L100,20 L0,20 Z" />
      </svg>
    </div>
  </div>
);

const StackedItemsView = ({ nivel }) => {
  // CAMBIO: Se ajustó el total de items a 5 para los dispensadores de sólidos (fruta).
  const totalItems = 5;
  const filledItems = Math.round((nivel / 100) * totalItems);

  return (
    <div className="w-full h-full flex flex-col-reverse justify-start p-3 gap-y-1.5">
      {[...Array(totalItems)].map((_, index) => (
        <div
          key={index}
          className={`w-full flex-grow rounded-md transition-all duration-300 ease-in-out
            ${index < filledItems 
              ? 'bg-amber-400 shadow-md opacity-90'
              : 'bg-amber-100 opacity-40'
            }`}
        />
      ))}
    </div>
  );
};

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
  return formatter.format(Math.round(days) * -1, 'day');
};

export const Dispensador = ({ contenedor, productName, onDelete }) => {
  const nivelLlenado = contenedor.getNivelDeLlenado();
  const esJugo = contenedor.tipo === 'jugo';

  const icon = esJugo ? <FiDroplet className="text-cyan-500 text-xl" /> : <FiShoppingBag className="text-amber-500 text-xl" />;
  const fillColor = esJugo ? 'fill-cyan-400' : 'fill-amber-400';
  const percentageColor = esJugo ? 'text-cyan-500' : 'text-white';
  const displayName = productName || `Dispensador #${contenedor.id}`;

  return (
    <div className="relative bg-white rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.06)] w-full flex flex-col font-sans border border-slate-100 transition-all duration-300 hover:shadow-lg">
      
      <button 
        onClick={onDelete}
        aria-label="Eliminar dispensador"
        className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-500 rounded-full hover:bg-red-200 hover:text-red-700 transition-colors z-10"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>

      <div className="p-4 text-center">
        <h3 className="text-base font-semibold text-slate-800 flex justify-center items-center gap-2 capitalize">
          {icon}
          {displayName}
        </h3>
        <p className="text-xs text-slate-400 capitalize tracking-wide">{contenedor.tipo}</p>
      </div>

      <div className="flex-grow flex flex-col items-center px-6 pb-4">
        <div className="w-1/2 h-1 bg-slate-300 rounded-t-sm mb-2" />
        <div className="relative w-full h-60 rounded-xl overflow-hidden border bg-slate-50 shadow-inner">
          {esJugo ? (
            <div
              className={`absolute bottom-0 left-0 w-full bg-cyan-100 transition-all duration-1000`}
              style={{ height: `${nivelLlenado}%` }}
            >
              {nivelLlenado > 5 && <Wave colorClassName={fillColor} />}
            </div>
          ) : (
            <StackedItemsView nivel={nivelLlenado} />
          )}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <span className={`text-3xl font-bold ${percentageColor} drop-shadow-md`}>
              {Math.round(nivelLlenado)}%
            </span>
          </div>
        </div>
        <div className="w-8 h-1 bg-slate-300 mt-2" />
      </div>

      <div className="p-4 text-center border-t border-slate-100">
        <p className="text-sm font-medium text-slate-700">
          {contenedor.cantidadActual} / {contenedor.capacidadMaxima} uds.
        </p>
        <div className="text-[11px] text-slate-400 flex justify-center items-center gap-2 mt-1">
          <span>Temp: {contenedor.temperatura}°C</span>
          <span className="text-slate-300">|</span>
          <span>Recarga: {formatRelativeTime(contenedor.ultimaRecarga)}</span>
        </div>
      </div>
    </div>
  );
};