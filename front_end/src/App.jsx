import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Layout from "./components/pages/Layouts/Layout";
import Dashboard from "./components/Auth/Dashboard";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Profile from "./components/Profile/Profile";
import LocationList from "./components/pages/Master/Location/LocationList";
import LocationAdd from "./components/pages/Master/Location/LocationAdd";
import LocationEdit from "./components/pages/Master/Location/LocationEdit";
import LocationView from "./components/pages/Master/Location/LocationView";
import LocationImport from "./components/pages/Master/Location/LocationImport";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="colored"
          />

          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="sign_up"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />

              {/* master location */}
              <Route path="master">
                <Route path="location">
                  <Route path="list" element={<LocationList />} />
                  <Route path="add" element={<LocationAdd />} />
                  <Route path="edit/:id" element={<LocationEdit />} />
                  <Route path="view/:id" element={<LocationView />} />
                  <Route path="importLocation" element={<LocationImport />} />



                </Route>
              </Route>

            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
