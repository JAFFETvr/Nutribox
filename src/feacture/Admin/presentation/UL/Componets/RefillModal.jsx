import React, { useState, useEffect } from 'react';
import { FiX, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';

export const RefillModal = ({ isOpen, onClose, contenedores, onRefill, productMap }) => {
  const [selectedContainerId, setSelectedContainerId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isOpen && contenedores.length > 0) {
      if (!selectedContainerId) {
        setSelectedContainerId(contenedores[0].id);
      }
    }
  }, [isOpen, contenedores, selectedContainerId]);

  useEffect(() => {
    if (selectedContainerId) {
      const container = contenedores.find(c => c.id === parseInt(selectedContainerId));
      setSelectedContainer(container);
      if (container) {
        setQuantity(container.cantidadActual);
        // Limpiar error al cambiar de contenedor
        setValidationError('');
      }
    }
  }, [selectedContainerId, contenedores]);

  // Manejador del envío del formulario
  const handleRefill = (e) => {
    e.preventDefault();
    if (validationError) return;
    if (selectedContainer) {
      onRefill(selectedContainer, parseInt(quantity, 10));
    }
  };

  // ==================== CAMBIO CLAVE AQUÍ ====================
  // Nueva función para manejar el cambio en la cantidad con limitación
  const handleQuantityChange = (e) => {
    const newValue = e.target.value;
    // Si el campo está vacío, permitimos establecerlo a un string vacío
    // para que el usuario pueda borrar el número completamente.
    if (newValue === '') {
      setQuantity('');
      setValidationError('La cantidad es requerida.');
      return;
    }

    const newQuantity = parseInt(newValue, 10);
    const isFruta = selectedContainer?.tipo === 'fruta';

    // Limitación estricta para 'fruta'
    if (isFruta && newQuantity > 10) {
      // No actualizamos el estado, manteniendo el valor anterior o 10.
      setQuantity(10); // Opcional: auto-corregir a 10
      setValidationError('La cantidad máxima para fruta es 10.');
    } else {
      setQuantity(newQuantity);
      setValidationError('');
    }
  };
  // ========================================================

  if (!isOpen) return null;

  const isJugo = selectedContainer?.tipo === 'jugo';
  const isFruta = selectedContainer?.tipo === 'fruta';
  
  // El botón debe estar deshabilitado si hay un error O si la cantidad es inválida (vacía)
  const isSubmitDisabled = !!validationError || quantity === '';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Rellenar Dispensador</h2>
          <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <FiX size={20} />
          </button>
        </div>
        <form onSubmit={handleRefill}>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="container-select" className="block text-sm font-semibold text-slate-700 mb-2">Dispensador</label>
              <select
                id="container-select"
                value={selectedContainerId}
                onChange={(e) => setSelectedContainerId(e.target.value)}
                className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E6C43] focus:border-[#2E6C43] transition-all"
              >
                {contenedores.map(c => (
                  <option key={c.id} value={c.id} className="font-medium">
                    {productMap[c.idProducto] || `Dispensador #${c.id}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold text-slate-700 mb-2">Establecer Cantidad</label>
              <input
                type="number"
                id="quantity"
                value={isJugo ? (selectedContainer?.capacidadMaxima || '') : quantity}
                // ==================== USAMOS LA NUEVA FUNCIÓN ====================
                onChange={handleQuantityChange}
                disabled={isJugo}
                className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E6C43] focus:border-[#2E6C43] transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
              />
              {isJugo && <p className="text-xs text-sky-600 mt-2">Los dispensadores de jugo se rellenan a su capacidad máxima.</p>}
              {validationError && (
                <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
                  <FiAlertCircle />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 p-5 bg-slate-50 rounded-b-xl border-t border-slate-200">
            <button type="button" onClick={onClose} className="py-2.5 px-5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="py-2.5 px-5 bg-[#2E6C43] text-white font-semibold rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-sm hover:shadow-md transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              <FiRefreshCw size={16} />
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};