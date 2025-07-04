
const Sidebar = ({ navItems, logoutItem, onLogout, onNavClick, currentPath }) => (
    <aside className="flex flex-col justify-between w-64 h-screen bg-[#f9a84d] p-4 text-white shrink-0">
        <div>
            <h1 className="text-2xl font-bold p-4">Mi Panel</h1>
            <nav className="mt-6">
                <ul>
                    {navItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => onNavClick(item.path)}
                                    className={`flex items-center w-full text-left gap-4 px-4 py-3 my-1 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-white/30 font-bold'
                                            : 'hover:bg-white/10'    
                                    }`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.name}</span>
                                </button>
                            </li>
                        );
                    })}
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

export default Sidebar;