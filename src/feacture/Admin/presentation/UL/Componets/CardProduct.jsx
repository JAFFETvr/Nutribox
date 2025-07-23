import React from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2'; 

const ProductCard = ({ id, nombre, url_imagen, precio, onDelete, onEdit }) => {

  const handleDelete = () => {
    // La lógica de handleDelete no cambia.
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¡No podrás revertir la eliminación de "${nombre}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold',
        cancelButton: 'px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        
        Swal.fire({
          title: '¡Eliminado!',
          text: `El producto "${nombre}" ha sido eliminado.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="relative flex flex-col items-center w-72 pt-16 pb-6 px-6 rounded-2xl shadow-lg bg-white hover:bg-orange-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {url_imagen && (
        <div className="absolute -top-16 w-32 h-32 flex items-center justify-center">
            <img 
              src={url_imagen} 
              alt={nombre} 
              className="w-full h-full object-contain drop-shadow-lg"
            />
        </div>
      )}

      {/* Título del producto (sin cambios) */}
      <h3 className="text-xl font-semibold text-gray-800 mb-6 min-h-[56px] text-center">{nombre}</h3>
      
      {/* ========= SECCIÓN DE PRECIO MODIFICADA ========= */}
      {/* Se eliminó el span "Unidad" y se simplificó la estructura. */}
      {/* El precio ahora es el único elemento, centrado y con mayor tamaño. */}
      <div className="w-full text-center mb-6">
        <p className="text-2xl font-bold text-gray-900">
          ${(Number(precio) || 0).toFixed(2)}
        </p>
      </div>
      {/* =============================================== */}
      
      {/* Iconos de acción (sin cambios, se empujan al final con mt-auto) */}
      <div className="flex gap-12 mt-auto">
        <FiTrash2 onClick={handleDelete} className="text-2xl text-gray-600 cursor-pointer transition-colors hover:text-black" />
        <FiEdit onClick={onEdit} className="text-2xl text-gray-600 cursor-pointer transition-colors hover:text-black" />
      </div>
    </div>
  );
};

export default ProductCard;