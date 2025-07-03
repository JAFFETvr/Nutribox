
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiUser,
    FiDollarSign,
    FiPackage,
    FiBarChart2,
    FiLogOut,
} from 'react-icons/fi';
// Importamos la CLASE, no como un tipo.
import { NavItem } from '../../domain/Entities/entitie';

export const useDashboardViewModel = () => {
    const navigate = useNavigate();

    const [activeView, setActiveView] = useState('Administrador');

    const navItems = [
        new NavItem('Administrador', FiUser),
        new NavItem('Ventas', FiDollarSign),
        new NavItem('Productos', FiPackage),
        new NavItem('Estadísticas', FiBarChart2),
    ];
    
    const logoutItem = new NavItem('Cerrar Sesión', FiLogOut);

    const handleLogout = () => {
        console.log('Cerrando sesión...');
        navigate('/login');
    };

    const handleAddItem = () => {
        console.log(`Botón "+" presionado en la sección: ${activeView}`);
    };

    return {
        navItems,
        logoutItem,
        activeView,
        setActiveView,
        handleLogout,
        handleAddItem,
    };
};