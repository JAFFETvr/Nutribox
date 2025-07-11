
import React from 'react';
import ProductCard from './ProductCard';
import Swal from 'sweetalert2';

// 1. Datos de ejemplo para los productos
const productos = [
  {
    id: 1,
    nombre: 'Jugo de Naranja Natural',
    descripcion: 'Exprimido de naranjas frescas, lleno de vitamina C.'
  },
  {
    id: 2,
    nombre: 'Jugo Verde Detox',
    descripcion: 'Una mezcla de espinaca, pepino, manzana verde y jengibre.'
  },
  {
    id: 3,
    nombre: 'Limonada con Menta',
    descripcion: 'Refrescante limonada casera con un toque de menta fresca.'
  }
];

const ProductList = () => {
  // 2. Función que maneja la lógica de la compra
  const handleComprar = (product) => {
    Swal.fire({
      title: `¿Qué tamaño de ${product.nombre} deseas?`,
      icon: 'question',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: '300ml - $5.00',
      denyButtonText: '600ml - $10.00',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33'
    }).then((result) => {
      /* Leer el resultado de la elección del usuario */
      if (result.isConfirmed) {
        // Si el usuario eligió "300ml"
        Swal.fire('¡Añadido!', `Has añadido un ${product.nombre} de 300ml al carrito.`, 'success');
      } else if (result.isDenied) {
        // Si el usuario eligió "600ml"
        Swal.fire('¡Añadido!', `Has añadido un ${product.nombre} de 600ml al carrito.`, 'success');
      }
      // Si el usuario presiona "Cancelar", la ventana simplemente se cierra.
    });
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#5c3a0b]">Nuestros Jugos</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {/* 3. Mapeamos los productos y renderizamos un ProductCard para cada uno */}
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            product={producto}
            // Pasamos la función handleComprar como prop
            onComprar={handleComprar}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;