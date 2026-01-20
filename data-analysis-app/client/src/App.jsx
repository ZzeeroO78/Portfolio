import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DataManagement from "./pages/DataManagement";
import UserManagement from "./pages/UserManagement";
import ActivityLogs from "./pages/ActivityLogs";
import AdminAccess from "./pages/AdminAccess";
import Profile from "./pages/Profile";

// Components
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter>
              <Toaster
                position="top-right"
                toastOptions={{
                  className: "dark:bg-gray-800 dark:text-white",
                }}
              />
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Secret Admin Route - /sudo */}
                <Route path="/sudo" element={<AdminAccess />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/data"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <DataManagement />
                      </Layout>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/users"
                  element={
                    <PrivateRoute roles={["admin"]}>
                      <Layout>
                        <UserManagement />
                      </Layout>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/logs"
                  element={
                    <PrivateRoute roles={["admin"]}>
                      <Layout>
                        <ActivityLogs />
                      </Layout>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <Profile />
                      </Layout>
                    </PrivateRoute>
                  }
                />

                {/* Redirect */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
