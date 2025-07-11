import React from 'react';
import { useProductsViewModel } from '../ViewModel/useProductsViewModel';
import { useNavigate } from 'react-router-dom';

export const Snacks = () => {
  const { products, loading } = useProductsViewModel();
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFC26A] min-h-screen font-sans p-8">

         <div className="absolute top-6 left-6 z-10">
        <button 
          onClick={() => navigate("/selection")}
          className="text-white text-lg font-semibold cursor-pointer hover:underline"
        >
          ← Volver
        </button>
      </div>
      <h1 className="text-center text-4xl font-bold text-[#2E5A3F] mb-12">
        Snakcs Saludables 
      </h1>



      <img 
        src="/leeaf.png"
        alt="leaf" 
        className="absolute bottom-6 right-6 w-[50px]"
      />
    </div>
  );
};
