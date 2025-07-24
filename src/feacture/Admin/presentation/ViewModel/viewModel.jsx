import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    FiShield,
    FiDollarSign,
    FiPackage,
    FiHardDrive, 
    FiLogOut,
} from 'react-icons/fi';
import { NavItem } from '../../domain/Entities/entitie';

export const useDashboardViewModel = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        new NavItem('Administrador', FiShield, '/dashboard'),
        new NavItem('Ventas', FiDollarSign, '/dashboard/sales'),
        new NavItem('Productos', FiPackage, '/dashboard/products'),
        new NavItem('Dispensadores', FiHardDrive, '/dashboard/stats'), 
    ];

    const logoutItem = new NavItem('Cerrar Sesión', FiLogOut);

    const handleLogout = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Tu sesión actual se cerrará.",
            icon: 'warning',
            iconColor: '#d33',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'bg-white rounded-xl shadow-lg',
                title: 'text-gray-800 font-bold text-2xl',
                confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors',
                cancelButton: 'bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user');
                console.log('Cerrando sesión...');
                navigate('/login');
            }
        });
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
            case '/dashboard/dispensers': 
                currentSection = 'Dispensadores'; 
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