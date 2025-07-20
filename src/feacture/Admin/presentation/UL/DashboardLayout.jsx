// src/views/Dashboard/components/DashboardLayout.js

import { useState, useEffect } from 'react'; // <--- Importar useEffect
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDashboardViewModel } from '../ViewModel/viewModel';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
    const { 
        navItems, 
        logoutItem, 
        handleLogout, 
    } = useDashboardViewModel();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // --- INICIO DEL CAMBIO ---
    const [userName, setUserName] = useState('Usuario'); // Estado para el nombre del usuario

    // useEffect se ejecuta cuando el componente se monta
    useEffect(() => {
        // Obtenemos el string del usuario desde localStorage
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            // Lo convertimos de nuevo a un objeto
            const userData = JSON.parse(userDataString);
            // Actualizamos el estado con el nombre del usuario (asumiendo que tiene la propiedad 'name')
            // Ponemos un valor por defecto por si el nombre no existe
            setUserName(userData.name || 'Usuario'); 
        }
    }, []); // El array vacío asegura que esto solo se ejecute una vez

    const handleNavClick = (path) => {
        navigate(path);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Creamos el elemento de bienvenida usando el estado dinámico
    const WelcomeMessage = (
        <div className="px-4 text-center font-semibold">
            <h3 className="text-xl">Welcome</h3>
            {/* Usamos el estado 'userName' en lugar de un nombre fijo */}
            <p className="truncate text-lg text-white/80">{userName}</p>
        </div>
    );
    // --- FIN DEL CAMBIO ---

    return (
        <div className="flex bg-gray-100 h-screen overflow-hidden">
            <Sidebar 
                isOpen={isSidebarOpen}
                logo={WelcomeMessage} // Pasamos el mensaje de bienvenida dinámico
                navItems={navItems} 
                logoutItem={logoutItem}
                onLogout={handleLogout}
                onNavClick={handleNavClick}
                currentPath={pathname}
                onToggle={toggleSidebar}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;