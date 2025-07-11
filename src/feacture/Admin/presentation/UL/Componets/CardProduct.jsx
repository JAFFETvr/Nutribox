import React from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const ProductCard = ({ id, nombre, image, precio, onDelete, onEdit }) => {

  const imageStyles = 'w-28 -top-24';

  const handleDelete = () => {
    console.log(`%c[ProductCard] 1. Click en eliminar. ID: ${id}`, 'color: red; font-weight: bold;');
    
    const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`);
    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-72 pt-24 pb-6 px-6 rounded-2xl shadow-lg bg-white hover:bg-orange-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img src={image} alt={nombre} className={`absolute z-10 drop-shadow-md h-auto ${imageStyles}`} />
      <h3 className="text-xl font-semibold text-gray-800 mb-6 min-h-[56px] text-center">{nombre}</h3>
      <div className="w-full flex justify-around mb-6">
        <div className="flex flex-col items-center gap-2">
          <span className="px-4 py-1 text-sm font-semibold rounded-lg bg-white text-gray-800 border border-gray-300">Unidad</span>
          <span className="text-lg font-bold text-black">${(Number(precio) || 0).toFixed(2)}</span>
        </div>
      </div>
      <div className="flex gap-12 mt-auto">
        <FiTrash2 onClick={handleDelete} className="text-2xl text-gray-600 cursor-pointer transition-colors hover:text-black" />
        <FiEdit onClick={onEdit} className="text-2xl text-gray-600 cursor-pointer transition-colors hover:text-black" />
      </div>
    </div>
  );
};

export default ProductCard;