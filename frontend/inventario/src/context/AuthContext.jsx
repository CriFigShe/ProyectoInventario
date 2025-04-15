import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    userId: localStorage.getItem("userId") || "",
    token: localStorage.getItem("token") || "",
  });

  useEffect(() => {
    const userStoraged = localStorage.getItem("userId");
    const tokenStoraged = localStorage.getItem("token");

    if (userStoraged && tokenStoraged) {
      setCurrentUser({ userId: userStoraged, token: tokenStoraged });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
