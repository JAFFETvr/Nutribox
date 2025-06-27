import React from "react";
import { FiArrowRight, FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom'; // <-- IMPORTANTE: Añade esta línea

const Home = () => {
  return (
    // CONTENEDOR PRINCIPAL
    <div className="relative h-screen w-full bg-[#f9a84d] overflow-hidden font-sans">

      {/* FORMAS DECORATIVAS */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#fbad61] rounded-full opacity-80" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#fbad61] rounded-full opacity-80" />

      {/* HEADER (z-30 para estar por encima de todo) */}
      <header className="relative z-30 flex justify-between items-center px-8 py-5">
        {/* Logo a la izquierda (puedes quitarlo si no lo necesitas) */}
        <img src="/logo.png" alt="Nutribox Logo" className="w-12 h-12" />

        {/* Botón de Login a la derecha, ahora es un enlace */}
        <Link to="/login">
          <div className="flex items-center gap-3 bg-[#fbad61] px-4 py-1.5 rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform">
            <span className="text-white font-semibold text-lg">Login</span>
            <div className="bg-[#e9d5ff] p-1.5 rounded-full">
              <FiUser size={20} className="text-[#a855f7]" />
            </div>
          </div>
        </Link>
        
      </header>

      {/* CONTENIDO PRINCIPAL - AHORA CONTIENE DOS CAPAS INDEPENDIENTES */}
      <main className="absolute inset-0 z-0">

        {/* CAPA 1: LA IMAGEN DE LAS BEBIDAS */}
        {/* Posicionada grande y a la izquierda. */}
        {/* 'z-10' la coloca en una capa inferior. */}
        <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src="/baner.png"
            alt="Jugos Nutribox"
            className="w-[700px] md:w-[850px]"
          />
        </div>

        {/* CAPA 2: EL TÍTULO "NUTRIBOX" */}
        {/* Este div ocupa toda la pantalla y usa flexbox para centrar el texto. */}
        {/* 'z-20' la coloca por encima de la imagen. */}
        <div className="absolute inset-0 flex justify-center items-center z-20 pointer-events-none">
          {/* pointer-events-none evita que el texto bloquee clics en elementos futuros debajo de él */}
          <h1
            className="text-white text-9xl font-extrabold"
            style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.6)' }}
          >
            Nutribox
          </h1>
        </div>

      </main>

      {/* ENLACE "INGRESAR" (z-30 para estar por encima de todo) */}
      {/* También lo convertimos en un Link para que sea consistente */}
      <Link to="/login" className="absolute bottom-8 right-8 z-30 flex items-center text-white text-xl font-semibold cursor-pointer hover:underline">
        Ingresar <FiArrowRight className="ml-2" />
      </Link>
    </div>
  );
};

export default Home;