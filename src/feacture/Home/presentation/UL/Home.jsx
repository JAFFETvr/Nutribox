import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";
import { useUserViewModel } from "../ViewModel/ViewModel";
const Home = () => {
  const { user } = useUserViewModel();

  return (
    <div className="h-screen w-full bg-orange-300 relative overflow-hidden">
      <header className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2 text-white text-2xl font-bold">
          <MdLocalDrink size={28} />
          <span>NutriBox</span>
        </div>
        <div className="flex items-center gap-2 text-white font-medium">
          <span>{user.name}</span>
          <FaUserCircle size={28} />
        </div>
      </header>

      <main className="flex flex-col justify-center items-center h-[75%]">
        <div className="relative">
          <img
             src="/public/images.jpeg"
            alt="Jugos Nutribox"
            className="w-[320px] md:w-[420px] rounded-xl shadow-lg"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-white text-5xl font-extrabold drop-shadow-lg">
            Nutribox
          </h1>
        </div>
      </main>

      <div className="absolute bottom-6 right-6 flex items-center text-white text-lg font-semibold cursor-pointer hover:scale-105 transition-transform">
        Ingresar <FiArrowRight className="ml-2" size={22} />
      </div>
    </div>
  );
};

export default Home;
