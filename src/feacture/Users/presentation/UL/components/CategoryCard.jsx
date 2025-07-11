import React from 'react';

export const CategoryCard = ({ category, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(category)}
      className="bg-white rounded-2xl p-4 text-center cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="rounded-xl ring-2 ring-[#C6EBC5] ring-inset p-2">
        <div className="w-[250px] h-[250px] flex justify-center items-center">
          <img 
            src={category.imageUrl} 
            alt={category.name} 
            className="max-w-full max-h-full object-contain" 
          />
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold text-[#F4A300]">
        {category.name}
      </p>
    </div>
  );
};
