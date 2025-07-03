import { FiPlus } from 'react-icons/fi';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; 
import { useDashboardViewModel } from '../ViewModel/viewModel';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
    const { 
        navItems, 
        logoutItem, 
        handleLogout, 
        handleAddItem 
    } = useDashboardViewModel();

    const navigate = useNavigate();
    const { pathname } = useLocation(); 

    const handleNavClick = (path) => {
        navigate(path);
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
           
            <Sidebar 
                navItems={navItems} 
                logoutItem={logoutItem}
                onLogout={handleLogout}
                onNavClick={handleNavClick}
                currentPath={pathname}
            />

            <main className="flex-1 p-8 relative">
                <Outlet />

                <button
                    onClick={handleAddItem}
                    className="absolute bottom-8 right-8 bg-[#f9a84d] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-[#e89a42] transition-transform transform hover:scale-110"
                    aria-label="Añadir nuevo elemento"
                >
                    <FiPlus size={28} />
                </button>
            </main>
        </div>
    );
};

export default DashboardLayout;