import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

const navItems = [
  { path: '/inbox', label: 'Dashboard', icon: '🏠' },
  { path: '/inbox/search', label: 'Search', icon: '🔍' },
  { path: '/inbox/by-date', label: 'By Date', icon: '📅' },
  { path: '/inbox/by-sender', label: 'By Sender', icon: '👤' },
  { path: '/inbox/by-label', label: 'By Label', icon: '🏷️' },
  { path: '/logout', label: 'Logout', icon: '🚪' },
];

export default function InboxNav() {
  const { logout } = useAuth();

  const handleLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    logout();
  };

  return (
    <nav className="bg-transparent h-full w-64 border-r border-gray-700">
      <ul className="flex flex-col space-y-2 p-4">
        {navItems.map((item) => (
          <li key={item.path}>
            {item.path === '/logout' ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 transition-colors text-white hover:bg-white hover:bg-opacity-10"
              >
                {item.icon} {item.label}
              </button>
            ) : (
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `block w-full px-4 py-2 transition-colors ${
                    isActive
                      ? 'bg-white bg-opacity-10 text-white'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}