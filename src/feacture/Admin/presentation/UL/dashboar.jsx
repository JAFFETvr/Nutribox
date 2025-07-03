
import { FiPlus } from 'react-icons/fi';
import { useDashboardViewModel } from '../ViewModel/viewModel';

const AdminSection = () => <h1 className="text-3xl font-bold">Panel de Administrador</h1>;
const SalesSection = () => <h1 className="text-3xl font-bold">Sección de Ventas</h1>;
const ProductsSection = () => <h1 className="text-3xl font-bold">Sección de Productos</h1>;
const StatsSection = () => <h1 className="text-3xl font-bold">Sección de Estadísticas</h1>;

const Sidebar = ({ navItems, logoutItem, activeView, onNavClick, onLogout }) => (
    <aside className="flex flex-col justify-between w-64 h-screen bg-[#f9a84d] p-4 text-white">
        <div>
            <h1 className="text-2xl font-bold p-4">Mi Panel</h1>
            <nav className="mt-6">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => onNavClick(item.name)}
                                className={`flex items-center w-full text-left gap-4 px-4 py-3 my-1 rounded-lg transition-colors ${
                                    activeView === item.name
                                        ? 'bg-white/30 font-bold'
                                        : 'hover:bg-white/10'
                                }`}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
        <div>
            <button
                onClick={onLogout}
                className="flex items-center w-full gap-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
                <logoutItem.icon size={20} />
                <span>{logoutItem.name}</span>
            </button>
        </div>
    </aside>
);

const DashboardView = () => {
    const { 
        navItems, 
        logoutItem, 
        activeView, 
        setActiveView, 
        handleLogout, 
        handleAddItem 
    } = useDashboardViewModel();

    const renderContent = () => {
        switch (activeView) {
            case 'Ventas':
                return <SalesSection />;
            case 'Productos':
                return <ProductsSection />;
            case 'Estadísticas':
                return <StatsSection />;
            case 'Administrador':
            default:
                return <AdminSection />;
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar 
                navItems={navItems} 
                logoutItem={logoutItem}
                activeView={activeView}
                onNavClick={setActiveView}
                onLogout={handleLogout}
            />

            <main className="flex-1 p-8 relative">
                {renderContent()}

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

export default DashboardView;