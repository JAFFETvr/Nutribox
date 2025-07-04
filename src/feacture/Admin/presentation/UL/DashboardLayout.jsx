
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

    const handleNavClick = (path) => {
        navigate(path);
    };

    return (
        <div className="flex bg-gray-100 h-screen overflow-hidden">
            <Sidebar 
                navItems={navItems} 
                logoutItem={logoutItem}
                onLogout={handleLogout}
                onNavClick={handleNavClick}
                currentPath={pathname}
            />
            <main className="flex-1 p-8 relative overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

