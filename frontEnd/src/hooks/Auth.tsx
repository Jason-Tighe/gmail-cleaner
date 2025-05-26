import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.tsx'

export function useAuth() {
  return useContext(AuthContext)
}