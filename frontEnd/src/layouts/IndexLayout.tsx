import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import InboxNav from '../components/InboxNav';

export default function InboxLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="flex flex-col md:flex-row mt-12 min-h-[90vh]">
      <aside className="hidden md:block w-64 p-6">
        <InboxNav />
      </aside>

      <div className="flex-1 max-w-5xl bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8">
        <Outlet />
      </div>

      <footer className="md:hidden bg-gray-800 text-white p-4 fixed bottom-0 left-0 w-full">
        <button
          onClick={toggleNav}
          className="bg-transparent-500 text-white py-2 px-4 rounded-lg w-full"
        >
          {isNavOpen ? <i className="fas fa-bars"/> : <i className="fas fa-bars"/>}
        </button>
        <div
          className={`transition-transform duration-300 ease-in-out ${
            isNavOpen ? 'translate-y-0' : 'translate-y-full'
          } bg-gray-700 text-white p-4 fixed bottom-0 left-0 w-full`}
        >
          <div className="relative">
            <button
              onClick={toggleNav}
              className="absolute top-2 right-2 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              <i className="fas fa-times"/>
            </button>
            <div className="items-center justify-center flex flex-col space-y-2">
            <InboxNav />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
