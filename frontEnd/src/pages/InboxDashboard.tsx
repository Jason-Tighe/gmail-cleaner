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
      <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Clean Up Your Inbox</h2>
        <p className="text-gray-500 mt-2">Choose how you'd like to organize your emails</p>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
          {actionButtons.map((button, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center p-6 ${button.colorClass} rounded-xl shadow-md transition-all duration-200 hover:shadow-lg h-full`}
              onClick={button.action}
            >
              <span className="text-4xl mb-3">{button.icon}</span>
              <span className="text-lg font-medium text-gray-700">{button.title}</span>
              <span className="text-sm text-gray-500 mt-1">{button.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
    );
}