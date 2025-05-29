import { createContext, useContext, useState, type ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  accessToken: string;
};

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {}
})


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  }


  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)


