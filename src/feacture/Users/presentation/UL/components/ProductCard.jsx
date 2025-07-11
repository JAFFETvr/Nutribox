import React, { useState } from 'react';
import Swal from 'sweetalert2';

const categoryImageMap = {
  'Snacks': '/snacks.png'
};

const ProductCard = ({ product, categoria = 'Jugos' }) => {
  const [showInfo, setShowInfo] = useState(false);
  const imageSrc = categoryImageMap[categoria] || '/naranja.png';

  const handleComprar = () => {
    const baseButtonStyles = 'text-white font-semibold py-2 px-6 m-2 transition duration-200 transform hover:scale-105 focus:outline-none';

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
    }).then((result) => {
      const confirmPopupStyles = {
        popup: 'bg-white rounded-xl border-2 border-[#5c3a0b]',
        title: 'text-[#2E5A3F] font-bold text-2xl',
        confirmButton: `${baseButtonStyles} rounded-lg bg-[#5c3a0b] hover:bg-[#472c08]`,
      };

      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Añadido!',
          text: `Has añadido un ${product.nombre} de 300ml.`,
          icon: 'success',
          customClass: confirmPopupStyles,
          buttonsStyling: false,
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: '¡Añadido!',
          text: `Has añadido un ${product.nombre} de 600ml.`,
          icon: 'success',
          customClass: confirmPopupStyles,
          buttonsStyling: false,
        });
      }
    });
  };

  return (
    <div className="w-[260px] h-auto min-h-[430px] bg-white border border-[#5c3a0b] rounded-lg shadow-lg p-4 flex flex-col justify-between items-center">
      <div>
        <img src={imageSrc} alt={product.nombre} className="w-full h-32 object-contain mb-2" />
        <h3 className="text-lg font-bold text-[#2E5A3F] text-center">{product.nombre}</h3>
        <div className="flex justify-between gap-4 mt-3">
          <div className="flex flex-col items-center">
            <span className="bg-[#f3c98b] px-4 py-1 rounded text-sm font-semibold">300ml</span>
            <span className="mt-1 text-black font-bold">$5.00</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="bg-[#f3c98b] px-4 py-1 rounded text-sm font-semibold">600ml</span>
            <span className="mt-1 text-black font-bold">$10.00</span>
          </div>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="mt-3 bg-orange-400 text-white font-bold px-6 py-1.5 rounded-full hover:bg-orange-500 transition w-full"
        >
          {showInfo ? 'Ocultar Info' : 'Información'}
        </button>
        {showInfo && (
          <p className="text-sm text-center text-gray-700 mt-2">{product.descripcion}</p>
        )}
      </div>
      <button
        onClick={handleComprar}
        className="mt-4 bg-[#5c3a0b] text-white font-semibold px-6 py-2 w-full rounded hover:bg-[#472c08] transition"
      >
        Comprar
      </button>
    </div>
  );
};

export default ProductCard;