import Swal from 'sweetalert2';

export const showCreateContainerModal = (product) => {
  return Swal.fire({
    title: 'Crear Nuevo Dispensador',
    html: `
      <div class="text-left mt-4">
        <p class="mb-4 text-slate-600">
          Configura el dispensador para el producto: <strong>${product.nombre}</strong>
        </p>

        <div class="mb-4">
          <label for="capacidad_maxima" class="block text-gray-700 font-semibold mb-2">Capacidad Máxima (uds)</label>
          <input 
            type="number" 
            id="capacidad_maxima" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Ej: 10"
            required>
        </div>

        <div class="mb-4">
          <label for="cantidad_actual" class="block text-gray-700 font-semibold mb-2">Cantidad Actual (uds)</label>
          <input 
            type="number" 
            id="cantidad_actual" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Ej: 10"
            required>
        </div>
      </div>
    `,
    confirmButtonText: 'Crear Dispensador',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    focusConfirm: false,
    
    // --- ESTILOS AÑADIDOS ---
    customClass: {
      popup: 'w-[90%] sm:w-[500px]',
      confirmButton: 'px-6 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 font-semibold',
      cancelButton: 'px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold'
    },
    buttonsStyling: false,
    
    preConfirm: () => {
      const capacidad_maxima = document.getElementById('capacidad_maxima').value;
      const cantidad_actual = document.getElementById('cantidad_actual').value;

      if (!capacidad_maxima || !cantidad_actual) {
        Swal.showValidationMessage('Ambos campos son requeridos.');
        return false;
      }
      if (parseInt(cantidad_actual) > parseInt(capacidad_maxima)) {
        Swal.showValidationMessage('La cantidad actual no puede ser mayor que la capacidad máxima.');
        return false;
      }

      return {
        id_maquina: 1,
        id_producto: product.id,
        tipo: product.tipo,
        capacidad_maxima: parseInt(capacidad_maxima),
        cantidad_actual: parseInt(cantidad_actual),
        temperatura: 0,
      };
    },
  });
};