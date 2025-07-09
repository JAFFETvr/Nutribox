import React from 'react';
import { useContenedoresViewModel } from '../ViewModel/AdminViewModel';
import TemperaturaChart from './Componets/TemperaturaChart';
import TemperaturaCard from './Componets/TemperaturaCard';

const AdminSection = () => {
  const { data } = useContenedoresViewModel();

  return (
    <div className="p-6 space-y-10">
      {/* Gráfica de temperatura */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Temperatura (Gráfica)</h2>
        <TemperaturaChart data={data} />
      </div>

      {/* Cards con temperatura destacada */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Temperatura por Contenedor (Resumen)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((contenedor, index) => (
            <TemperaturaCard key={index} contenedor={contenedor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
