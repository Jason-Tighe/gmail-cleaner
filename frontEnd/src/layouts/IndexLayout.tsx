import { Outlet } from 'react-router-dom';
import InboxNav from '../components/InboxNav';

export default function InboxLayout() {
  return (
    <div className="flex mt-12 min-h-[90vh]">
      <aside className="w-64 p-6">
      <InboxNav />
      </aside>
      <div className="flex-1 max-w-5xl bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8">
      <Outlet />
      </div>
    </div>
  );
}