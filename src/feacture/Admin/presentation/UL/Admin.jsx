import React, { useMemo } from 'react'; 
import { useContenedoresViewModel } from '../ViewModel/AdminViewModel';
import TemperaturaChart from './Componets/TemperaturaChart';
import UltrasonicoChart from './Componets/TemperaturaCard';

const AdminSection = () => {
  const { data, ultrasonicoData } = useContenedoresViewModel();

 
  const datosEnriquecidosConZona = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    return data.map(contenedor => {

   
      const zonaAsignada = contenedor.id_contenedor <= 5 ? "Zona Fría" : "Zona Caliente";

      return {
        ...contenedor,
        zona: zonaAsignada,
      };
    });
  }, [data]); 

  return (
    <div className="p-6 space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#2E6C43]">Temperatura y Análisis Bayesiano</h2>
        
        <TemperaturaChart 
          data={datosEnriquecidosConZona}
          umbralTemperatura={28}
          zonaEvidencia="Zona Caliente"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#2E6C43]">Detección por Sensor Ultrasónico</h2>
        <UltrasonicoChart data={ultrasonicoData} />
      </div>
    </div>
  );
};

export default AdminSection;