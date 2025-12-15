import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import LoginLogs from "./pages/LoginLogs";
import SidebarLayout from "./layout/SidebarLayout";
import { useAuth } from "./auth/AuthContext";

export default function App() {
  const auth = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <SidebarLayout>
              <Users />
            </SidebarLayout>
          </ProtectedRoute>
        }
      />

      {auth.role === "admin" && (
        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <LoginLogs />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
      )}
    </Routes>
  );
}
