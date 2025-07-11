import React from 'react';
import { useContenedoresViewModel } from '../ViewModel/EstadicticaViewModel';
import { Dispensador } from './Componets/Dispensador';

const EstadisticaSection =  () => {
    const { contenedores, loading, error } = useContenedoresViewModel();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-slate-700">Cargando dispensadores...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-slate-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#2E6C43]">
        Estado de los Dispensadores
      </h1>
      
      <div className="flex flex-wrap justify-center gap-6">
        {contenedores.length > 0 ? (
          contenedores.map(contenedor => (
            <Dispensador key={contenedor.id} contenedor={contenedor} />
          ))
        ) : (
          <p className="text-slate-500 mt-10">No se encontraron contenedores para mostrar.</p>
        )}
      </div>
    </div>
  );
}

export default EstadisticaSection;


