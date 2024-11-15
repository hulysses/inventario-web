import { Home } from "./pages/home";
import { Users } from "./pages/user";
import { Login } from "./pages/login";
import { useEffect, useState } from "react";
import { Suppliers } from "./pages/supplier";
import { Products } from "./pages/product";
import { ClientTable } from "@/pages/client";
import { AppSidebar } from "./components/sidebar/menuSideBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Orders } from "./pages/orders";

export function App() {
  // Estados que verifica se o usuário está logado e se é adiministrador, respectivamente
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean | null>(null);

  //Hook para verificar se o usuário está logado e se é administrador e alterar os estados
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");

    setIsLoggedIn(!!token);
    setIsUserAdmin(isAdmin);
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} isAdmin={setIsUserAdmin} />
          }
        />
        <Route element={isLoggedIn ? <AppSidebar /> : <Navigate to="/" />}>
          {isUserAdmin && <Route path="/home" element={<Home />} />}
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/clients" element={<ClientTable />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}
