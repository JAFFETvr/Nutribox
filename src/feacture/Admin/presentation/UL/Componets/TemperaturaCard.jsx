import React from 'react';

const TemperaturaCard = ({ contenedor }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold mb-2">{contenedor.id_contenedor}</h3>
      <p className="text-gray-600">Temperatura actual:</p>
      <p className="text-4xl font-bold text-blue-600">{contenedor.temperatura}°C</p>
    </div>
  );
};

export default TemperaturaCard;
