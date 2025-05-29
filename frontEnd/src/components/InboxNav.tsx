import { NavLink } from "react-router-dom";

const navItems = [
    { path: '/inbox', label: 'Dashboard', icon: '🏠' },
    { path: '/inbox/by-date', label: 'By Date', icon: '📅' },
    { path: '/inbox/by-sender', label: 'By Sender', icon: '👤' },
    { path: '/inbox/search', label: 'Search', icon: '🔍' },
  ];
  
  export default function InboxNav() {
    return (
    <nav className="bg-white">
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `block px-4 py-2 transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
    );
  }