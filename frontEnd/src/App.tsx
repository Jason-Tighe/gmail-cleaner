import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Inbox from './pages/Inbox.tsx'
import ProtectedRoute from './pages/ProtectedRoute.tsx'


export default function App() {
  return (
    <div className="min-h-screen to-slate-700 from-slate-900 bg-gradient-to-l flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/inbox" 
          element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

