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
    // 1. Importamos y usamos 'useLocation' para saber la URL actual
    const navigate = useNavigate();
    const location = useLocation(); // Hook que nos da información de la ruta actual

   

    const navItems = [
        new NavItem('Administrador', FiUser, '/dashboard'),
        new NavItem('Ventas', FiDollarSign, '/dashboard/sales'),
        new NavItem('Productos', FiPackage, '/dashboard/products'),
        new NavItem('Estadísticas', FiBarChart2, '/dashboard/stats'),
    ];
    
    // El logoutItem no necesita ruta, así que funciona como antes
    const logoutItem = new NavItem('Cerrar Sesión', FiLogOut);

    const handleLogout = () => {
        console.log('Cerrando sesión...');
        
    };

    // 4. MANTENEMOS y MEJORAMOS la lógica de handleAddItem
    const handleAddItem = () => {
        let currentSection = 'Desconocida';

        // Usamos location.pathname para determinar la sección actual
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
        // Aquí puedes abrir un modal o navegar a una ruta como '/dashboard/products/new'
    };

    return {
        navItems,
        logoutItem,
        handleLogout,
        handleAddItem,
    };
};