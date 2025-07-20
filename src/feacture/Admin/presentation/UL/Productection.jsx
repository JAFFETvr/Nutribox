// src/presentation/pages/InventoryPage.jsx

import React from 'react';
import { FiFilter, FiPlus } from 'react-icons/fi';
import { useInventoryViewModel } from '../ViewModel/ProductViewModel';
import ProductCard from './Componets/CardProduct';
import AddProductModal from './Componets/AddProductModal';

const InventoryPage = () => {
  const { 
    products, 
    isLoading, 
    error, 
    isModalOpen,
    productToEdit,
    openModal, 
    closeModal, 
    addProduct, // Se mantiene por si lo necesitas en otro lugar
    deleteProduct,
    updateProduct,
    addProductAndCreateContainer // <-- ¡Importante! Obtenemos la nueva función del ViewModel
  } = useInventoryViewModel();

  return (
    <div className="w-full min-h-screen font-sans p-4 sm:p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2E6C43] flex-grow text-center">
          Inventario
        </h1>
        <button 
          onClick={() => openModal()} 
          aria-label="Añadir producto"
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <FiPlus className="text-3xl text-gray-800" />
        </button>
      </header>

      <main className="flex flex-wrap justify-center items-start gap-x-8 gap-y-28 pt-16">
        {isLoading && <p className="text-lg text-gray-600">Cargando productos...</p>}
        {error && <p className="text-lg text-red-500 font-semibold">{error}</p>}
        
        {!isLoading && !error && (products || []).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            nombre={product.nombre}
            precio={product.precio}
            url_imagen={product.url_imagen} 
            onDelete={() => deleteProduct(product.id)}
            onEdit={() => openModal(product)} 
          />
        ))}
        
        {!isLoading && !error && products.length === 0 && (
            <p className="text-lg text-gray-600">No hay productos en el inventario. ¡Añade uno!</p>
        )}
      </main>
      
      {/* --- ¡LA ÚNICA LÍNEA QUE CAMBIA ES ESTA! --- */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddProduct={addProductAndCreateContainer} // Cambiamos 'addProduct' por la nueva función
        productToEdit={productToEdit}
        onUpdateProduct={updateProduct}
      />
    </div>
  );
};

export default InventoryPage;