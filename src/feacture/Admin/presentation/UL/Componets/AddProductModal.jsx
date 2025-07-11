import { useEffect } from 'react';
import Swal from 'sweetalert2';

const AddProductModal = ({ isOpen, onClose, onAddProduct, productToEdit, onUpdateProduct }) => {

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const isEditMode = !!productToEdit;

    Swal.fire({
      title: isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto',
      // ¡AQUÍ ESTÁ LA MAGIA!
      // Construimos un formulario completo con clases de Tailwind.
      html: `
        <div class="text-left mt-4">
          <div class="mb-4">
            <label for="nombre" class="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input 
              type="text" 
              id="nombre" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" 
              value="${isEditMode ? productToEdit.nombre : ''}" 
              required>
          </div>

          <div class="mb-4">
            <label for="precio" class="block text-gray-700 font-semibold mb-2">Precio</label>
            <input 
              type="number" 
              step="0.01" 
              id="precio" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" 
              value="${isEditMode ? productToEdit.precio : ''}" 
              required>
          </div>

          <div class="mb-6">
            <label for="descripcion" class="block text-gray-700 font-semibold mb-2">Descripción</label>
            <textarea 
              id="descripcion" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" 
              rows="3">${isEditMode ? productToEdit.descripcion : ''}</textarea>
          </div>
        </div>
      `,
      confirmButtonText: isEditMode ? 'Guardar Cambios' : 'Añadir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusConfirm: false,
      // Usamos los estilos de Tailwind para los botones
      customClass: {
        confirmButton: 'px-6 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 font-semibold',
        cancelButton: 'px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold'
      },
      buttonsStyling: false, // Importante para que las clases personalizadas funcionen

      // La validación y recolección de datos no cambia
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const descripcion = document.getElementById('descripcion').value;

        if (!nombre || !precio) {
          Swal.showValidationMessage(`Por favor, introduce el nombre y el precio`);
          return false;
        }

        return {
          nombre,
          precio: parseFloat(precio),
          descripcion,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const productData = result.value;

        if (isEditMode) {
          onUpdateProduct(productToEdit.id, productData);
        } else {
          onAddProduct(productData);
        }
        onClose();
        
      } else if (result.dismiss) {
        onClose();
      }
    });

  }, [isOpen, productToEdit, onAddProduct, onUpdateProduct, onClose]);

  return null;
};

export default AddProductModal;