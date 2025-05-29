import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.tsx'
import ProtectedRoute from './pages/ProtectedRoute.tsx'
import Sender from './pages/Sender.tsx'
import YearPage from './pages/YearPage.tsx'
import GeneralEmail from './pages/GeneralEmail.tsx'
import InboxDashboard from './pages/InboxDashboard.tsx'
import InboxLayout from './layouts/IndexLayout.tsx'

// so now that we can authenticate and pull email data
// We'll need to do several things:
// 1. Filter/Search for the emails
// 2. Add Deletion functionality
// 3. Figure out the best way to grab ALL the emails. Probably need to describe a certain number of emails per page and something that tracks id's and what they belong to, so i don't need to detail them before we delete them
// What happens if i have 100,000 emails, how do i pull them all, present them to the user and then delete them?
// Deletion is just an array of Ids
// Maybe we have some clear options, Like by year? by sender? and then just pagination?


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
                <InboxLayout /> 
              </ProtectedRoute>
            }
          >
            <Route index element={<InboxDashboard />} />
            <Route path="by-date" element={<YearPage />} />
            <Route path="by-sender" element={<Sender />} />
            <Route path="search" element={<GeneralEmail />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

