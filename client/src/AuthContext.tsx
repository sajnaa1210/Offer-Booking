import { createContext, useContext, useEffect, useState } from 'react';
import api from './api';

interface AuthContextValue {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextValue>({ token: null, setToken: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('willovate_token'));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('willovate_token', token);
    } else {
      delete api.defaults.headers.common.Authorization;
      localStorage.removeItem('willovate_token');
    }
  }, [token]);

  function setToken(newToken: string | null) {
    setTokenState(newToken);
  }

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
