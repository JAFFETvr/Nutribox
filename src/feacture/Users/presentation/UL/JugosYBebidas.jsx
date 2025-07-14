import React from 'react';
import { useProductsViewModel } from '../ViewModel/useProductsViewModel';
import ProductCard from './components/ProductCard';
import { useNavigate } from 'react-router-dom';

export const JugosYBebidas = () => {
  const { products, loading } = useProductsViewModel();
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFC26A] min-h-screen font-sans p-8 relative">
      {/* Encabezado con Volver y Saldo */}
      <div className="flex justify-between items-center mb-4 px-4">
        <button 
          onClick={() => navigate("/selection")}
          className="text-white text-lg font-semibold cursor-pointer hover:underline"
        >
          ← Volver
        </button>
        <div className="text-white text-lg font-semibold">
          Saldo: $ 00.00
        </div>
      </div>

      <h1 className="text-center text-4xl font-bold text-[#2E5A3F] mb-12">
        Jugos y Bebidas
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Cargando productos...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <img 
        src="/leeaf.png"
        alt="leaf" 
        className="absolute bottom-6 right-6 w-[50px]"
      />
    </div>
  );
};
