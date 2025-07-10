import { useLocation, useNavigate } from 'react-router-dom';
import {
    FiUser,
    FiDollarSign,
    FiPackage,
    FiBarChart2,
    FiLogOut,
} from 'react-icons/fi';
import { NavItem } from '../../domain/Entities/entitie';

export const useDashboardViewModel = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        new NavItem('Administrador', FiUser, '/dashboard'),
        new NavItem('Ventas', FiDollarSign, '/dashboard/sales'),
        new NavItem('Productos', FiPackage, '/dashboard/products'),
        new NavItem('Estadísticas', FiBarChart2, '/dashboard/stats'),
    ];

    const logoutItem = new NavItem('Cerrar Sesión', FiLogOut);

    const handleLogout = () => {
        console.log('Cerrando sesión...');
        // Aquí podrías limpiar el almacenamiento local o token
        // localStorage.removeItem('token');
        navigate('/login');
    };

    const handleAddItem = () => {
        let currentSection = 'Desconocida';

        switch (location.pathname) {
            case '/dashboard':
                currentSection = 'Administrador';
                break;
            case '/dashboard/sales':
                currentSection = 'Ventas';
                break;
            case '/dashboard/products':
                currentSection = 'Productos';
                break;
            case '/dashboard/stats':
                currentSection = 'Estadísticas';
                break;
            default:
                console.log('Ruta no reconocida para el botón de añadir');
        }

        console.log(`Botón "+" presionado en la sección: ${currentSection}`);
        alert(`Se ha presionado el botón "Añadir" en la sección de ${currentSection}.`);
    };

    return {
        navItems,
        logoutItem,
        handleLogout,
        handleAddItem,
    };
};
