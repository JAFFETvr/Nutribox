import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDashboardViewModel } from '../ViewModel/viewModel';
import Sidebar from './Sidebar';

// Se elimina el componente 'YourLogo' ya que no se usará.

const DashboardLayout = () => {
    const { 
        navItems, 
        logoutItem, 
        handleLogout, 
    } = useDashboardViewModel();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleNavClick = (path) => {
        navigate(path);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // --- INICIO DEL CAMBIO SOLICITADO ---
    // Creamos el elemento de bienvenida directamente aquí.
    const WelcomeMessage = (
        <div className="px-4 text-center font-semibold">
            <h3 className="text-xl">Welcome</h3>
            <p className="truncate text-lg text-white/80">Jaffet</p>
        </div>
    );
    // --- FIN DEL CAMBIO SOLICITADO ---


    return (
        <div className="flex bg-gray-100 h-screen overflow-hidden">
            <Sidebar 
                isOpen={isSidebarOpen}
                logo={WelcomeMessage} // <-- Aquí pasamos el nuevo mensaje de bienvenida.
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