import { useNavigate } from 'react-router-dom';
import { Users, Home, SmilePlus, ShoppingBasket, ShoppingCart, Truck, ArrowLeftRight, LogOut } from "lucide-react";
import Logo from '../assets/logo/logoBranca.svg';
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Usuários",
        url: "/homes",
        icon: Users,
    },
    {
        title: "Clientes",
        url: "#",
        icon: SmilePlus,
    },
    {
        title: "Fornecedores",
        url: "#",
        icon: Truck,
    },
    {
        title: "Produtos",
        url: "#",
        icon: ShoppingBasket,
    },
    {
        title: "Pedidos",
        url: "#",
        icon: ShoppingCart,
    },
    {
        title: "Transações",
        url: "#",
        icon: ArrowLeftRight,
    },
];

export function AppSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    }

    return (
        <Sidebar>
            <div className="h-140 bg-blue flex justify-center items-center">
                <img src={Logo} alt="Logo" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-7">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <button
                                            className="text-xl text-blue flex items-center"
                                            onClick={() => navigate(item.url)} >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <a onClick={handleLogout} className="flex justify-center items-center text-xl text-red-800 cursor-pointer">
                    <LogOut />
                    <span>Sair</span>
                </a>
            </SidebarFooter>
        </Sidebar>
    );
}
