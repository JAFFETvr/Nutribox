import React from 'react';
import { useContenedoresViewModel } from '../ViewModel/EstadicticaViewModel';
import { Dispensador } from './Componets/Dispensador';

const EstadisticaSection = () => {
  const { contenedores, products, loading, error, deleteContainer } = useContenedoresViewModel();

  const productMap = React.useMemo(() => 
    products.reduce((map, product) => {
      map[product.id] = product.nombre;
      return map;
    }, {}),
    [products]
  );

  const StatusMessage = ({ children }) => (
    <div className="col-span-full text-center py-20">
      <p className="text-lg text-slate-500">{children}</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen font-sans p-4 sm:p-6 lg:p-8 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2E6C43]">
            Estado de Dispensadores
          </h1>
          <p className="mt-1 text-base text-slate-500">
            Monitoriza los niveles y el estado de cada unidad en tiempo real.
          </p>
        </header>
        
        {loading ? (
          <StatusMessage>Cargando datos...</StatusMessage>
        ) : error ? (
          <StatusMessage>Error al cargar: {error}</StatusMessage>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                )
              })
            ) : (
              <StatusMessage>No se encontraron dispensadores.</StatusMessage>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EstadisticaSection;