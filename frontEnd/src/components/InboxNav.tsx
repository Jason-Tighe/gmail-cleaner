import { NavLink } from "react-router-dom";

const navItems = [
    { path: '/inbox', label: 'Dashboard', icon: '🏠' },
    { path: '/inbox/by-date', label: 'By Date', icon: '📅' },
    { path: '/inbox/by-sender', label: 'By Sender', icon: '👤' },
    { path: '/inbox/search', label: 'Search', icon: '🔍' },
  ];
  
  export default function InboxNav() {
    return (
      <nav className="flex overflow-x-auto py-2 space-x-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <span className="mr-2 text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    );
  }