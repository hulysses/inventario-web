import { Home } from "./pages/home";
import { Users } from './pages/user';
import { Login } from "./pages/login";
import { useEffect, useState } from 'react';
import { Suppliers } from './pages/supplier';
import { ClientTable } from "@/pages/client";
import { AppSidebar } from './components/sidebar/menuSideBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route element={isLoggedIn ? <AppSidebar /> : <Navigate to="/" />}>
          <Route path="/home" element={<Home />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/clients" element={<ClientTable />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}