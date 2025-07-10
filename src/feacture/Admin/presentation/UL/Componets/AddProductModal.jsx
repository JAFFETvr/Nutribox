import React, { useState, useEffect } from 'react';

const AddProductModal = ({ isOpen, onClose, onAddProduct, productToEdit, onUpdateProduct }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const isEditMode = !!productToEdit;

  useEffect(() => {
    if (isEditMode) {
      setNombre(productToEdit.nombre);
      setPrecio(productToEdit.precio);
      setDescripcion(productToEdit.description);
    } else {
      setNombre('');
      setPrecio('');
      setDescripcion('');
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      nombre,
      precio: parseFloat(precio),
      descripcion,
    };

    if (isEditMode) {
      onUpdateProduct(productToEdit.id, productData);
    } else {
      onAddProduct(productData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center font-sans">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="mb-4">
            <label htmlFor="precio" className="block text-gray-700 font-semibold mb-2">Precio</label>
            <input type="number" step="0.01" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="mb-6">
            <label htmlFor="descripcion" className="block text-gray-700 font-semibold mb-2">Descripción</label>
            <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" rows="3"></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold">Cancelar</button>
            <button type="submit" className="px-6 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 font-semibold">
              {isEditMode ? 'Guardar Cambios' : 'Añadir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;