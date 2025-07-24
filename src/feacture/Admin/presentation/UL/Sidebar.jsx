import { FiUser } from 'react-icons/fi';

const Sidebar = ({ isOpen, userName, navItems, logoutItem, onLogout, onNavClick, currentPath }) => (
    <aside 
        className={`flex flex-col justify-between bg-[#f9a84d] text-white shrink-0 w-64 transition-transform duration-300 ease-in-out
                    fixed inset-y-0 left-0 z-30 transform md:relative md:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
        <div>
            <div className="h-40 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <img 
                        src="/masculino (3).png"
                        alt="User Avatar" 
                        className="h-20 w-20 rounded-full object-cover border-2 border-white/30 shadow-md"
                    />
                    <h3 className="font-semibold text-base text-center w-full truncate">{userName}</h3>
                </div>
            </div>
            
            <nav className="px-2">
                <ul>
                    {navItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => onNavClick(item.path)}
                                    className={`flex items-center w-full text-left gap-4 p-3 my-1 transition-all duration-200 rounded-lg justify-start
                                        ${isActive ? 'bg-white/30 font-bold' : 'hover:bg-white/10'}`}
                                >
                                    <item.icon size={22} />
                                    <span>{item.name}</span>
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
                className="flex items-center w-full gap-4 p-3 transition-colors hover:bg-white/10 rounded-lg justify-start"
            >
                <logoutItem.icon size={22} />
                <span>{logoutItem.name}</span>
            </button>
        </div>
    </aside>
);

export default Sidebar;