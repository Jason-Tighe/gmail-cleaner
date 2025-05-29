import { Outlet } from 'react-router-dom';
import InboxNav from '../components/InboxNav';

export default function InboxLayout() {
  return (
    <div className="max-w-6xl mx-auto">
      <InboxNav />
      <div className="mt-6">
        <Outlet /> 
      </div>
    </div>
  );
}