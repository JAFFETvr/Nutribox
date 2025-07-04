import React from 'react';
import { FiFilter, FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';

const productsData = [
  {
    id: 1,
    name: 'Jugo de Naranja',
    image: '/naranja.png',
    prices: [
      { size: '300ml', price: '5.00' },
      { size: '600ml', price: '10.00' },
    ],
  },
  {
    id: 2,
    name: 'Jugo de limon',
    image: '/limon.png',
    prices: [
      { size: '300ml', price: '5.00' },
      { size: '600ml', price: '10.00' },
    ],
  },
];

const ProductCard = ({ name, image, prices }) => {
  const isNaranja = name.includes('Naranja');

  const imageStyles = isNaranja
    ? 'w-28 -top-24' 
    : 'w-40 -top-10'; 

  return (
    <div className="relative flex flex-col items-center w-72 pt-24 pb-6 px-6 rounded-2xl shadow-lg bg-white hover:bg-orange-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={image}
        alt={name}
        className={`absolute z-10 drop-shadow-md h-auto ${imageStyles}`}
      />

      <h3 className="text-xl font-semibold text-gray-800 mb-6">{name}</h3>

      <div className="w-full flex justify-around mb-6">
        {prices.map((item) => (
          <div key={item.size} className="flex flex-col items-center gap-2">
            <span className="px-4 py-1 text-sm font-semibold rounded-lg bg-white text-gray-800 border border-gray-300">
              {item.size}
            </span>
            <span className="text-lg font-bold text-black">${item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-12 mt-auto">
        <FiTrash2 className="text-2xl text-gray-600 cursor-pointer transition-colors hover:text-black" />
        <FiEdit className="text-2xl text-gray-600 cursor-pointer transition-colors hover:text-black" />
      </div>
    </div>
  );
};

const ProductSention = () => {
  return (
    <div className="w-full h-full font-sans">
      <header className="flex justify-between items-center mb-8">
        <FiFilter className="text-3xl text-gray-800 cursor-pointer" />
        <h1 className="text-4xl font-bold text-black flex-grow text-center">
          Inventario
        </h1>
        <FiPlus className="text-3xl text-gray-800 cursor-pointer" />
      </header>

      <main className="flex flex-wrap justify-center items-start gap-8 pt-8">
        {productsData.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </main>
    </div>
  );
};

export default ProductSention;
