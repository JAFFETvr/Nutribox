import React from 'react';
import { useCategorySelectionViewModel } from '../ViewModel/SelectionModel';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from './components/CategoryCard';

export const CategorySelectionScreen = () => {
  const { categories, loading } = useCategorySelectionViewModel();
  const navigate = useNavigate();

  // Modificado: ahora esta función hace la navegación según categoría seleccionada
  const handleSelectCategory = (category) => {
    if (category.name === 'Jugos') {
      navigate('/jugos-y-bebidas');
    } else if (category.name === 'Snacks') {
      navigate('/snacks');
    }
  };

  return (
    <div className="bg-[#FFC26A] min-h-screen font-sans relative">
      
      <div className="absolute top-6 left-6 z-10">
        <button 
          onClick={() => navigate("/")}
          className="text-white text-lg font-semibold cursor-pointer hover:underline"
        >
          ← Volver
        </button>
      </div>

      <div className="flex justify-center pt-24 px-4 sm:px-8">
        <div className="relative bg-[#FFF8EC] rounded-3xl py-16 px-6 sm:px-12 w-full max-w-4xl shadow-xl overflow-hidden">

          <h1 className="text-center text-3xl sm:text-4xl font-bold text-[#4C8B5A] mb-10">
            ¿Qué desea elegir hoy ?
          </h1>

          <main className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12">
            {loading ? (
              <p className="text-lg text-gray-500">Cargando categorías...</p>
            ) : (
              categories.map(category => (
                // Modificado: onSelect ahora llama a handleSelectCategory con la categoría
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  onSelect={() => handleSelectCategory(category)} 
                />
              ))
            )}
          </main>

          <img 
            src="/lemons.png"
            alt="lemons decoration" 
            className="absolute -bottom-6 -left-8 w-[155px] opacity-90 pointer-events-none" 
          />
          <img 
            src="/leeaf.png"
            alt="leaf decoration" 
            className="absolute bottom-6 right-10 w-[60px] pointer-events-none" 
          />
        </div>
      </div>
    </div>
  );
};
