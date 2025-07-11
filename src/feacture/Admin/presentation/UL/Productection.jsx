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
    addProduct,
    deleteProduct,
    updateProduct
  } = useInventoryViewModel();

  return (
    <div className="w-full min-h-screen font-sans p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-8">
        <FiFilter className="text-3xl text-gray-800 cursor-pointer" />
        <h1 className="text-4xl font-bold text-[#2E6C43] flex-grow text-center">
          Inventario
        </h1>
        <button onClick={() => openModal()} aria-label="Añadir producto">
          <FiPlus className="text-3xl text-gray-800 cursor-pointer" />
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
            image={'/naranja.png'} 
            onDelete={deleteProduct}
            onEdit={() => openModal(product)} 
          />
        ))}
        
        {!isLoading && !error && products.length === 0 && (
            <p className="text-lg text-gray-600">No hay productos en el inventario. ¡Añade uno!</p>
        )}
      </main>
      
      <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddProduct={addProduct}
        productToEdit={productToEdit}
        onUpdateProduct={updateProduct}
      />
    </div>
  );
};

export default InventoryPage;