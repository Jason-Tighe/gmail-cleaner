import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0)

  const [status, setStatus] = useState<string | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/status`)
      .then(res => res.json())
      .then(data => setStatus(data.message))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(err => setStatus('Error connecting to backend'));
  }, [backendUrl]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
      <h1>Gmail Cleaner</h1>
      <p>Backend Status: {status ?? 'Loading...'}</p>
    </div>
    </>
  )
}

