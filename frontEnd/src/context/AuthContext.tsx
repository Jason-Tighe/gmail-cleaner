import { createContext, useContext, useState, type ReactNode } from 'react';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}
})


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

