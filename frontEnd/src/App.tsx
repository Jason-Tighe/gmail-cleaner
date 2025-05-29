import YearDetail from './pages/YearDetail.tsx'
import DateRangeDetail from './pages/DateRange.tsx'
import { Route, Routes } from 'react-router-dom'
import InboxLayout from './layouts/IndexLayout.tsx'
import GeneralEmail from './pages/GeneralEmail.tsx'
import InboxDashboard from './pages/InboxDashboard.tsx'
import Login from './pages/Login.tsx'
import ProtectedRoute from './pages/ProtectedRoute.tsx'
import Sender from './pages/Sender.tsx'
import YearPage from './pages/YearPage.tsx'
import InboxNav from './components/InboxNav.tsx'

export default function App() {
  return (
    <div className="min-h-screen to-slate-700 from-slate-900 bg-gradient-to-l flex flex-col">
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/inbox" 
            element={
              <ProtectedRoute>
                <InboxNav />
                <InboxLayout /> 
              </ProtectedRoute>
            }
          >
            <Route index element={<InboxDashboard />} />
            <Route path="by-date" element={<YearPage />} />
              <Route path="by-date/:year" element={<YearDetail />} />        
              <Route path="date-range" element={<DateRangeDetail />} />      
            <Route path="by-sender" element={<Sender />} />
            <Route path="search" element={<GeneralEmail />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}