import React, { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi'; // Importar icono para el botón responsivo
import { useContenedoresViewModel } from '../ViewModel/EstadicticaViewModel';
import { Dispensador } from './Componets/Dispensador'; // Asumo que estás usando el nuevo Dispensador.js
import { RefillModal } from './Componets/RefillModal';

const StatusMessage = ({ children }) => (
  <div className="col-span-full text-center py-20">
    <p className="text-lg text-slate-500">{children}</p>
  </div>
);

const EstadisticaSection = () => {
  const { contenedores, products, loading, error, deleteContainer, refillContainer } = useContenedoresViewModel();
  const [isRefillModalOpen, setRefillModalOpen] = useState(false);

  const productMap = React.useMemo(() =>
    products.reduce((map, product) => {
      map[product.id] = product.nombre;
      return map;
    }, {}),
    [products]
  );

  const handleRefillSubmit = async (container, quantity) => {
    await refillContainer(container, quantity);
    setRefillModalOpen(false);
  };

  return (
    <>
      <div className="w-full min-h-screen font-sans p-4 sm:p-6 lg:p-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          
          {/* ========= ENCABEZADO RESPONSIVO MODIFICADO ========= */}
          <header className="mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2E6C43]">
                Estado de Dispensadores
              </h1>
              <p className="mt-1 text-base text-slate-500">
                Monitoriza los niveles y el estado de cada unidad en tiempo real.
              </p>
            </div>
            
            {/* Botón responsivo */}
            <button
              onClick={() => setRefillModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2E6C43] text-white font-bold py-3 px-5 rounded-lg shadow-md hover:bg-green-700 transition-colors"
            >
              <FiRefreshCw className="w-5 h-5" />
              {/* En pantallas pequeñas solo dice "Rellenar", en grandes "Rellenar Dispensador" */}
              <span className="sm:hidden">Rellenar</span>
              <span className="hidden sm:inline">Rellenar Dispensador</span>
            </button>
          </header>
          {/* ====================================================== */}

          {loading ? (
            <StatusMessage>Cargando datos...</StatusMessage>
          ) : error ? (
            <StatusMessage>Error al cargar: {error}</StatusMessage>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {contenedores.length > 0 ? (
                contenedores.map(contenedor => {
                  const productName = productMap[contenedor.idProducto] || `Dispensador #${contenedor.id}`;
                  return (
                    <Dispensador
                      key={contenedor.id}
                      contenedor={contenedor}
                      productName={productName}
                      onDelete={() => deleteContainer(contenedor.id)}
                    />
                  );
                })
              ) : (
                <StatusMessage>No se encontraron dispensadores.</StatusMessage>
              )}
            </div>
          )}
        </div>
      </div>

      <RefillModal
        isOpen={isRefillModalOpen}
        onClose={() => setRefillModalOpen(false)}
        contenedores={contenedores}
        onRefill={handleRefillSubmit}
        productMap={productMap}
      />
    </>
  );
};

export default EstadisticaSection;