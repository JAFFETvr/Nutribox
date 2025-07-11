import { FiMenu, FiChevronsLeft } from 'react-icons/fi';

const Sidebar = ({ isOpen, logo, navItems, logoutItem, onLogout, onNavClick, currentPath, onToggle }) => (
    <aside 
        className={`flex flex-col justify-between bg-[#f9a84d] text-white shrink-0 transition-all duration-300 ease-in-out
                    ${isOpen ? 'w-64' : 'w-20'}`}
    >
        <div>
           
            <div className="h-28 flex justify-center items-center relative">
                
               
                <div className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {logo}
                </div>

              
                <button 
                    onClick={onToggle} 
                    className="absolute top-6 right-4 p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none"
                    aria-label="Toggle Sidebar"
                >
                    {isOpen ? <FiChevronsLeft size={22} /> : <FiMenu size={22} />}
                </button>
            </div>
            
            <nav className="mt-4">
                <ul>
                    {navItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <li key={item.name} title={isOpen ? '' : item.name}>
                                <button
                                    onClick={() => onNavClick(item.path)}
                                    className={`flex items-center w-full text-left gap-4 px-4 py-3 my-1 transition-colors
                                        ${isOpen ? 'justify-start rounded-lg' : 'justify-center rounded-full mx-auto w-14 h-14'}
                                        ${isActive ? 'bg-white/30 font-bold' : 'hover:bg-white/10'}`}
                                >
                                    <item.icon size={22} />
                                    {isOpen && <span>{item.name}</span>}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
        
        <div className="p-4">
            <button
                onClick={onLogout}
                title={isOpen ? '' : logoutItem.name}
                className={`flex items-center w-full gap-4 px-4 py-3 transition-colors hover:bg-white/10
                            ${isOpen ? 'justify-start rounded-lg' : 'justify-center rounded-full mx-auto w-14 h-14'}`}
            >
                <logoutItem.icon size={22} />
                {isOpen && <span>{logoutItem.name}</span>}
            </button>
        </div>
    </aside>
);

export default Sidebar;