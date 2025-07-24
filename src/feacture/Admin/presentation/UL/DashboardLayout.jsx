import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDashboardViewModel } from '../ViewModel/viewModel';
import Sidebar from './Sidebar';
import { FiMenu } from 'react-icons/fi';

const DashboardLayout = () => {
    const { 
        navItems, 
        logoutItem, 
        handleLogout, 
    } = useDashboardViewModel();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userName, setUserName] = useState('Usuario');

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserName(userData.name || 'Usuario'); 
        }
    }, []);

    const handleNavClick = (path) => {
        navigate(path);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative flex bg-gray-100 h-screen overflow-hidden">
            {isSidebarOpen && (
                <div 
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    aria-hidden="true"
                ></div>
            )}
            
            <Sidebar 
                isOpen={isSidebarOpen}
                userName={userName}
                navItems={navItems} 
                logoutItem={logoutItem}
                onLogout={handleLogout}
                onNavClick={handleNavClick}
                currentPath={pathname}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="md:hidden flex items-center justify-between bg-white shadow-md p-4">
                    <button 
                        onClick={toggleSidebar} 
                        className="text-gray-600 focus:outline-none"
                        aria-label="Open sidebar"
                    >
                        <FiMenu size={24} />
                    </button>
                    <span className="font-semibold text-lg text-gray-800">Panel</span>
                </header>

                <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;