import GmailMessageCard from "../components/GmailMessageCard";

export default function Inbox() {
    
    // I think this page should present the user with several options:
    // 1. Search for emails generic search
    // 2. Filter by Date (ideally yearly groups)
    // 3. Filter by Sender (we'll need to ask for this from the user)

    return (
        <div className="flex items-center justify-center min-h-screen  bg-transparent p-4">
        <div className="w-full max-w-4xl h-[500px] bg-white bg-opacity-90 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Clean Up Your Inbox</h2>
            <p className="text-gray-500 mt-2">Choose how you'd like to organize your emails</p>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
              {/* Date Filter */}
              <button
                className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg h-full"
                onClick={() => console.log("Date Filter")}
              >
                <span className="text-4xl mb-3">📅</span>
                <span className="text-lg font-medium text-gray-700">By Date</span>
                <span className="text-sm text-gray-500 mt-1">Clean old emails</span>
              </button>
              
              {/* Sender Filter */}
              <button
                className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg h-full"
                onClick={() => console.log("Sender Filter")}
              >
                <span className="text-4xl mb-3">📧</span>
                <span className="text-lg font-medium text-gray-700">By Sender</span>
                <span className="text-sm text-gray-500 mt-1">Block newsletters</span>
              </button>
              
              {/* General Search */}
              <button
                className="flex flex-col items-center justify-center p-6 bg-purple-50 hover:bg-purple-100 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg h-full"
                onClick={() => console.log("General Search")}
              >
                <span className="text-4xl mb-3">🔍</span>
                <span className="text-lg font-medium text-gray-700">Custom Search</span>
                <span className="text-sm text-gray-500 mt-1">Advanced filters</span>
              </button>
              
              {/* Logout */}
              <button
                className="flex flex-col items-center justify-center p-6 bg-red-50 hover:bg-red-100 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg h-full"
                onClick={() => console.log("Logout")}
              >
                <span className="text-4xl mb-3">👋</span>
                <span className="text-lg font-medium text-gray-700">Log Out</span>
                <span className="text-sm text-gray-500 mt-1">Sign out safely</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}