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

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          logout();    // 🔥 Now calls backend properly
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

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
