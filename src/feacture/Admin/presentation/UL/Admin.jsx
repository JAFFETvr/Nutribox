import React, { useMemo } from 'react'; 
import { useContenedoresViewModel } from '../ViewModel/AdminViewModel';
import TemperaturaChart from './Componets/TemperaturaChart';
import UltrasonicoChart from './Componets/TemperaturaCard';

const AdminSection = () => {
  const { data, ultrasonicoData } = useContenedoresViewModel();

  // Esta lógica no necesita cambios, ya que es independiente de la UI.
  const datosEnriquecidosConZona = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    return data.map(contenedor => {
      // Asigna una zona basada en el ID del contenedor
      const zonaAsignada = contenedor.id_contenedor <= 5 ? "Zona Fría" : "Zona Caliente";
      return {
        ...contenedor,
        zona: zonaAsignada,
      };
    });
  }, [data]); 

  return (
    // Contenedor principal con padding y espaciado vertical responsivos
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-8 md:space-y-12">
      
      {/* Sección del Gráfico de Temperatura */}
      <section>
        {/* Título con tamaño de fuente responsivo */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#2E6C43]">
          Temperatura y Análisis Bayesiano
        </h2>
        
        <TemperaturaChart 
          data={datosEnriquecidosConZona}
          umbralTemperatura={30}
          zonaEvidencia="Zona Caliente"
        />
      </section>

      {/* Sección del Dashboard del Dispensador */}
      <section>
        {/* Título con tamaño de fuente responsivo */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#2E6C43]">
          Monitor de Actividad: Dispensador de Bebidas
        </h2>

        <UltrasonicoChart data={ultrasonicoData} />
      </section>

    </div>
  );
};

export default AdminSection;