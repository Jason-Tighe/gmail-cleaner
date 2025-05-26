import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Inbox from './pages/inbox.tsx'


export default function App() {
  return (
    <>
      <div>
        <header className="app min-h-screen">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/inbox" element={<Inbox/>} />
          </Routes>
        </header>  
      </div>
    </>
  )
}

