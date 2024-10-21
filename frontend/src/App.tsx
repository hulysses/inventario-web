import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { useEffect, useState } from 'react';
import { Layout } from './Layout';

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
        <Route element={isLoggedIn ? <Layout /> : <Navigate to="/" />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}