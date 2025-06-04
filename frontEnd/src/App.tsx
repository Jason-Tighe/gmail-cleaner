import DateRangeDetail from './pages/DateRange.tsx'
import { Route, Routes } from 'react-router-dom'
import InboxLayout from './layouts/IndexLayout.tsx'
import AdvancedEmail from './pages/AdvancedEmail.tsx'
import InboxDashboard from './pages/InboxDashboard.tsx'
import Login from './pages/Login.tsx'
import ProtectedRoute from './pages/ProtectedRoute.tsx'
import Sender from './pages/Sender.tsx'
import YearPage from './pages/YearPage.tsx'
import LabelPage from './pages/LabelPage.tsx'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-700 flex flex-col">
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/inbox" 
            element={
              <ProtectedRoute>
                <InboxLayout /> 
              </ProtectedRoute>
            }
          >
            <Route index element={<InboxDashboard />} />
            <Route path="by-date" element={<YearPage />} />
            <Route path="date-range" element={<DateRangeDetail />} />      
            <Route path="by-sender" element={<Sender />} />
            <Route path="by-label" element={<LabelPage />} />
            <Route path="search" element={<AdvancedEmail />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}