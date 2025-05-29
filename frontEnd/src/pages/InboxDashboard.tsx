import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

export default function InboxDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
    
    // I think this page should present the user with several options:
    // 1. Search for emails generic search
    // 2. Filter by Date (ideally yearly groups)
    // 3. Filter by Sender (we'll need to ask for this from the user)

    const actionButtons = [
      {
        icon: '📅',
        title: 'By Date',
        description: 'Clean old emails',
        colorClass: 'bg-blue-50 hover:bg-blue-100',
        action: () => navigate('/inbox/by-date')
      },
      {
        icon: '📧',
        title: 'By Sender',
        description: 'Block newsletters',
        colorClass: 'bg-green-50 hover:bg-green-100',
        action: () => navigate('/inbox/by-sender')
      },
      {
        icon: '🔍',
        title: 'Custom Search',
        description: 'Advanced filters',
        colorClass: 'bg-purple-50 hover:bg-purple-100',
        action: () => navigate('/inbox/search')
      },
      {
        icon: '👋',
        title: 'Log Out',
        description: 'Sign out safely',
        colorClass: 'bg-red-50 hover:bg-red-100',
        action: () => { logout(); navigate('/');}
      }
    ]

    return (
      <div className="flex flex-col h-full py-24 items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Inbox Cleanup</h1>
          <p className="text-lg text-gray-600 mt-2">Take control of your emails effortlessly</p>
        </div>
        
        <div className="flex items-center justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        {actionButtons.map((button, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center p-8 ${button.colorClass} rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl h-full`}
            onClick={button.action}
          >
            <span className="text-5xl mb-4">{button.icon}</span>
            <span className="text-xl font-semibold text-gray-800">{button.title}</span>
            <span className="text-sm text-gray-500 mt-2">{button.description}</span>
          </button>
        ))}
          </div>
        </div>
      </div>
    );
}