import React from 'react';
import { useContenedoresViewModel } from '../ViewModel/AdminViewModel';
import TemperaturaChart from './Componets/TemperaturaChart';
import UltrasonicoChart from './Componets/TemperaturaCard';
const AdminSection = () => {
  const { data, ultrasonicoData } = useContenedoresViewModel();

  return (
    <div className="p-6 space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">Temperatura (Gráfica)</h2>
        <TemperaturaChart data={data} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Detección por Sensor Ultrasónico</h2>
        <UltrasonicoChart data={ultrasonicoData} />
      </div>
    </div>
  );
};

export default AdminSection;
