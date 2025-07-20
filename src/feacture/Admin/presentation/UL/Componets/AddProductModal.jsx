
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
            <label for="tipo" class="block text-gray-700 font-semibold mb-2">Tipo de Producto</label>
            <select
              id="tipo"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              required
            >
              <option value="" disabled ${!isEditMode || !productToEdit.tipo ? 'selected' : ''}>Selecciona un tipo</option>
              <option value="fruta" ${isEditMode && productToEdit.tipo === 'fruta' ? 'selected' : ''}>Fruta</option>
              <option value="jugo" ${isEditMode && productToEdit.tipo === 'jugo' ? 'selected' : ''}>Jugo</option>
            </select>
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

          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">
              ${isEditMode ? 'Cambiar Imagen (opcional)' : 'Imagen del Producto'}
            </label>
            ${isEditMode && productToEdit.url_imagen ? 
              `<div class="mb-2 text-center">
                <img src="${productToEdit.url_imagen}" alt="Imagen actual" class="w-24 h-24 object-cover inline-block rounded-lg border">
              </div>` 
              : ''
            }
            <label for="imagen" class="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-orange-400 focus:outline-none">
                <span class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span class="font-medium text-gray-600">
                        Haz clic para subir un archivo
                    </span>
                </span>
                <span id="file-name" class="text-sm text-gray-500 mt-1"></span>
            </label>
            <input type="file" id="imagen" name="imagen" accept="image/*" class="hidden">
          </div>
        </div>
      `,
      confirmButtonText: isEditMode ? 'Guardar Cambios' : 'Añadir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusConfirm: false,
      customClass: {
        popup: 'w-[90%] sm:w-[500px]',
        confirmButton: 'px-6 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 font-semibold',
        cancelButton: 'px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold'
      },
      buttonsStyling: false,
      didOpen: () => {
        const fileInput = document.getElementById('imagen');
        const fileNameSpan = document.getElementById('file-name');
        fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files.length > 0) {
            fileNameSpan.textContent = e.target.files[0].name;
          } else {
            fileNameSpan.textContent = '';
          }
        });
      },
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const descripcion = document.getElementById('descripcion').value;
        const imagenInput = document.getElementById('imagen');
        const imagen = imagenInput.files[0];
        const tipo = document.getElementById('tipo').value;

        if (!nombre || !precio || !tipo) {
          Swal.showValidationMessage(`Por favor, introduce nombre, precio y tipo.`);
          return false;
        }

        return {
          nombre,
          precio: parseFloat(precio),
          descripcion,
          imagen,
          tipo,
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