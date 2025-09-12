import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import Signup from "./components/Auth/Signup";
import Layout from "./components/pages/Layouts/Layout";
import Dashboard from "./components/Auth/Dashboard";
import Login from "./components/Auth/Login";
export  const UserContent = createContext()
export default function App() {
  let user = {
    uName: "Manikandan"
  }
  return (
    <UserContent.Provider value={user}>

      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="sign_up" element={<Signup/>}/>

          <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContent.Provider>
  );
}
