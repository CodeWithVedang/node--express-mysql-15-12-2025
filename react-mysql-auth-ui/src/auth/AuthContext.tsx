import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosClient";

interface AuthContextType {
  token: string | null;
  role: string | null;
  countdown: number;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [countdown, setCountdown] = useState(0);

  // AUTO TIMER
useEffect(() => {
  if (!token) return;

  setCountdown(60);

  const interval = setInterval(async () => {
    setCountdown((c) => c - 1);

    if (countdown <= 1) {
      try {
        // 🔥 triggers backend auto-expire (expired = 1)
        await api.get("/users?page=1");
      } catch {
        console.warn("Session expired on backend");
      }

      // NOW clear local session AFTER database updates
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken(null);
      setRole(null);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [token, countdown]);


  const login = async (username: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { username, password });

      if (!res.data.success) return false;

      setToken(res.data.token);
      setRole(res.data.user.role);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");  // 🔥 Save logout_time in DB
    } catch (err) {
      console.warn("Logout API failed", err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, countdown, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
