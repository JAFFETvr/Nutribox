import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ProductCard = ({ product, onDispense }) => {
  const [showInfo, setShowInfo] = useState(false);
  const imageSrc = product.url_imagen || '/naranja.png';

  const handleBuyClick = () => {
    const baseButtonStyles = 'text-white font-semibold py-2 px-6 m-2 transition duration-200 transform hover:scale-105 focus:outline-none';

    if (product.tipo?.toLowerCase() === 'fruta') {
      Swal.fire({
        title: 'Confirmar compra',
        text: `¿Deseas añadir un(a) ${product.nombre} al carrito por $5.00?`,
        icon: 'question',
        iconColor: '#2E5A3F',
        showCancelButton: true,
        confirmButtonText: 'Sí, añadir',
        cancelButtonText: 'Cancelar',
        customClass: {
          popup: 'bg-white rounded-xl border-2 border-[#5c3a0b] shadow-lg',
          title: 'text-[#2E5A3F] font-bold text-2xl',
          confirmButton: `${baseButtonStyles} rounded-lg bg-orange-500 hover:bg-orange-600`,
          cancelButton: `${baseButtonStyles} rounded-lg bg-gray-400 hover:bg-gray-500`,
        },
        buttonsStyling: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const success = await onDispense(product.id, 1, 5.00);
          if (success) {
            Swal.fire({
              title: '¡Añadido!',
              text: `Has añadido ${product.nombre} al carrito.`,
              icon: 'success',
              customClass: {
                popup: 'bg-white rounded-xl border-2 border-[#5c3a0b]',
                title: 'text-[#2E5A3F] font-bold text-2xl',
                confirmButton: `${baseButtonStyles} rounded-lg bg-[#5c3a0b] hover:bg-[#472c08]`,
              },
              buttonsStyling: false,
            });
          }
        }
      });
    } else {
      Swal.fire({
        customClass: {
          popup: 'bg-white rounded-xl border-2 border-[#5c3a0b] shadow-lg',
          title: 'text-[#2E5A3F] font-bold text-2xl',
          htmlContainer: 'text-gray-700 text-base mt-0 mb-4',
          confirmButton: `${baseButtonStyles} rounded-full bg-orange-500 hover:bg-orange-600`,
          denyButton: `${baseButtonStyles} rounded-lg bg-[#5c3a0b] hover:bg-[#472c08]`,
          cancelButton: `${baseButtonStyles} rounded-lg bg-gray-400 hover:bg-gray-500`,
        },
        title: `¿Qué tamaño de ${product.nombre} deseas?`,
        icon: 'question',
        iconColor: '#2E5A3F',
        html: `<p>Elige una opción para añadir al carrito.</p>`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '300ml - $5.00',
        denyButtonText: '600ml - $10.00',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
      }).then(async (result) => {
        const confirmPopupStyles = {
          popup: 'bg-white rounded-xl border-2 border-[#5c3a0b]',
          title: 'text-[#2E5A3F] font-bold text-2xl',
          confirmButton: `${baseButtonStyles} rounded-lg bg-[#5c3a0b] hover:bg-[#472c08]`,
        };
        if (result.isConfirmed) {
          const success = await onDispense(product.id, 300, 5.00);
          if (success) {
            Swal.fire({ title: '¡Añadido!', text: `Has añadido un ${product.nombre} de 300ml.`, icon: 'success', customClass: confirmPopupStyles, buttonsStyling: false });
          }
        } else if (result.isDenied) {
          const success = await onDispense(product.id, 600, 10.00);
          if (success) {
            Swal.fire({ title: '¡Añadido!', text: `Has añadido un ${product.nombre} de 600ml.`, icon: 'success', customClass: confirmPopupStyles, buttonsStyling: false });
          }
        }
      });
    }
  };

  return (
    <div className="relative w-[260px] min-h-[380px] mt-12 group">
      <img src={imageSrc} alt={product.nombre} className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 object-contain z-10 transition-transform duration-300 ease-in-out group-hover:scale-110"/>
      <div className="w-full h-full bg-white border border-[#5c3a0b] rounded-lg shadow-lg flex flex-col justify-between items-center p-4">
        <div className="w-full text-center pt-16">
          {product.tipo && (<span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{product.tipo}</span>)}
          <h3 className="text-lg font-bold text-[#2E5A3F]">{product.nombre}</h3>
          
          {product.tipo?.toLowerCase() === 'fruta' ? (
            <div className="mt-3 text-center h-[60px] flex items-center justify-center">
              <span className="text-2xl font-bold text-black">$5.00</span>
            </div>
          ) : (
            <div className="flex justify-center gap-4 mt-3">
              <div className="flex flex-col items-center">
                <span className="bg-[#f3c98b] px-4 py-1 rounded text-sm font-semibold">300ml</span>
                <span className="mt-1 text-black font-bold">$5.00</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-[#f3c98b] px-4 py-1 rounded text-sm font-semibold">600ml</span>
                <span className="mt-1 text-black font-bold">$10.00</span>
              </div>
            </div>
          )}
          
          <button onClick={() => setShowInfo(!showInfo)} className="mt-4 bg-orange-500 text-white font-bold px-6 py-1.5 rounded-full hover:bg-orange-600 transition w-full">
            {showInfo ? 'Ocultar Info' : 'Información'}
          </button>
          {showInfo && <p className="text-sm text-gray-700 mt-2 px-2">{product.descripcion}</p>}
        </div>
        
        <button onClick={handleBuyClick} className="mt-4 bg-[#5c3a0b] text-white font-semibold px-6 py-2 w-full rounded hover:bg-[#472c08] transition">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;