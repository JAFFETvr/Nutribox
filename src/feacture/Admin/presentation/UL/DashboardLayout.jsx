import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDashboardViewModel } from '../ViewModel/viewModel';
import Sidebar from './Sidebar';

const YourLogo = () => (
    <img 
        src="/logo.png" 
        alt="Logo de la Empresa" 
        className="h-24 w-auto"
    />
);

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

    return (
        <div className="flex bg-gray-100 h-screen overflow-hidden">
            <Sidebar 
                isOpen={isSidebarOpen}
                logo={<YourLogo />}
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