import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  SmilePlus,
  ShoppingBasket,
  ShoppingCart,
  Truck,
  ArrowLeftRight,
} from "lucide-react";

// Função que retorna os itens do menu com base na permissão de administrador
const getMenuItems = (isAdmin: boolean) => [
  ...(isAdmin ? [{ title: "Home", url: "/home", icon: Home }] : []),
  ...(isAdmin ? [{ title: "Usuários", url: "/users", icon: Users }] : []),
  { title: "Clientes", url: "/clients", icon: SmilePlus },
  { title: "Fornecedores", url: "/suppliers", icon: Truck },
  { title: "Produtos", url: "/products", icon: ShoppingBasket },
  { title: "Pedidos", url: "/orders", icon: ShoppingCart },
  { title: "Transações", url: "/transactions", icon: ArrowLeftRight },
];

export const useSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("Home");
  const isAdmin = localStorage.getItem("isAdmin") === "1";
  const items = getMenuItems(isAdmin);

  useEffect(() => {
    const currentItem = items.find((item) => item.url === location.pathname);
    if (currentItem) setCurrentPage(currentItem.title);
  }, [location, items]);

  const handleNavigation = (url: string, title: string) => {
    navigate(url);
    setCurrentPage(title);
  };

  // Função para lidar com o logout removendo o token de autenticação do localStorage
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return { items, currentPage, handleNavigation, handleLogout };
};
