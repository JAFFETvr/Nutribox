import React from "react";
import { FiArrowRight, FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#f9a84d] overflow-hidden font-sans">

      {/* Fondos decorativos */}
      <div className="absolute -top-40 -right-40 w-72 h-72 md:w-96 md:h-96 bg-[#fbad61] rounded-full opacity-80" />
      <div className="absolute -bottom-40 -left-40 w-72 h-72 md:w-96 md:h-96 bg-[#fbad61] rounded-full opacity-80" />

      {/* Encabezado */}
      <header className="relative z-30 flex justify-between items-center px-4 sm:px-8 py-5">
        <img src="/logo.png" alt="Nutribox Logo" className="w-10 h-10 sm:w-12 sm:h-12" />

        <Link to="/login">
          <div className="flex items-center gap-2 sm:gap-3 bg-[#FFB74E] px-3 sm:px-4 py-1.5 rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform">
            <span className="text-white font-semibold text-base sm:text-lg">Login</span>
            <div className="bg-[#e9d5ff] p-1 sm:p-1.5 rounded-full">
              <FiUser size={18} className="text-[#a855f7]" />
            </div>
          </div>
        </Link>
      </header>

      {/* Contenido principal */}
      <main className="absolute inset-0 z-0">

        {/* Imagen central: solo visible en pantallas medianas en adelante */}
        <div className="hidden sm:block absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src="/baner-Pica.png"
            alt="Jugos Nutribox"
            className="w-[600px] md:w-[700px] lg:w-[850px]"
          />
        </div>

        {/* Título centrado siempre visible */}
        <div className="absolute inset-0 flex justify-center items-center z-20 pointer-events-none px-4">
          <h1
            className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-center"
            style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.6)' }}
          >
            Nutribox
          </h1>
        </div>
      </main>

     
    </div>
  );
};

export default Home;
