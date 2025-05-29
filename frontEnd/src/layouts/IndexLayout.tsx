import { Outlet } from 'react-router-dom';

export default function InboxLayout() {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="w-full max-w-5xl bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8">
          <Outlet />
        </div>
      </div>
    );
  }