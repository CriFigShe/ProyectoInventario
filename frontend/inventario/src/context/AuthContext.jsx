import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("token");
    return {
      token,
      isAuthenticated: false,
    };
  });

  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    setAuthState({
      token,
      isAuthenticated: !!token,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
