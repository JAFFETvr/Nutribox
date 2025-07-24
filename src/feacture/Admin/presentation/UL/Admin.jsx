import React, { useMemo } from 'react';
import { useContenedoresViewModel } from '../ViewModel/AdminViewModel';
import TemperaturaChart from './Componets/TemperaturaChart';
import UltrasonicoChart from './Componets/TemperaturaCard';

const AdminSection = () => {
  const { data, ultrasonicoData } = useContenedoresViewModel();

  const datosEnriquecidosConZona = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map((contenedor, index) => {
      const zona = index % 2 === 0 ? "Zona Fría" : "Zona Caliente";
      return { ...contenedor, zona };
    });
  }, [data]);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-8 md:space-y-12">
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#2E6C43]">
          Temperatura y Análisis Bayesiano
        </h2>
        <TemperaturaChart 
          data={datosEnriquecidosConZona}
          umbralTemperatura={30}
          zonaEvidencia="Zona Caliente"
        />
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#2E6C43]">
          Monitor de Actividad: Dispensador de Bebidas
        </h2>
        <UltrasonicoChart data={ultrasonicoData} />
      </section>
    </div>
  );
};

export default AdminSection;
