import Logo from '../../assets/logo/logoBranca.svg';
import LogoSimplificada from '../../assets/logo/logoSimplificada.svg';
import { Separator } from '../ui/separator';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Users, Home, SmilePlus, ShoppingBasket, ShoppingCart, Truck, ArrowLeftRight, LogOut } from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
    SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";

const getMenuItems = (isAdmin: boolean) => [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    ...(isAdmin ? [{
        title: "Usuários",
        url: "/users",
        icon: Users,
    }] : []),
    {
        title: "Clientes",
        url: "/clients",
        icon: SmilePlus,
    },
    {
        title: "Fornecedores",
        url: "/suppliers",
        icon: Truck,
    },
    {
        title: "Produtos",
        url: "/products",
        icon: ShoppingBasket,
    },
    {
        title: "Pedidos",
        url: "/orders",
        icon: ShoppingCart,
    },
    {
        title: "Transações",
        url: "/transactions",
        icon: ArrowLeftRight,
    },
];

export function AppSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState("Home");
    const isAdmin = localStorage.getItem('isAdmin') === '1';
    const items = getMenuItems(isAdmin);

    useEffect(() => {
        const currentItem = items.find(item => item.url === location.pathname);
        if (currentItem) {
            setCurrentPage(currentItem.title);
        }
    }, [location, items]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    }

    const handleNavigation = (url: string, title: string) => {
        navigate(url);
        setCurrentPage(title);
    }

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" className='bg-white'>
                <SidebarHeader className="h-[140px] bg-blue flex items-center justify-center transition-all duration-500 ease-in-out group-data-[collapsible=icon]:h-[47px] overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out group-data-[collapsible=icon]:w-[80px] group-data-[collapsible=icon]:h-[80px]">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:scale-75 absolute"
                        />
                        <img
                            src={LogoSimplificada}
                            alt="Logo Simplificada"
                            className="max-w-8 object-contain transition-all duration-500 ease-in-out opacity-0 scale-150 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:scale-100 absolute"
                        />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-7">
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <button
                                                className="text-xl flex items-center"
                                                onClick={() => handleNavigation(item.url, item.title)} >
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
                    <button
                        onClick={handleLogout}
                        className="flex justify-center items-center text-xl text-red-800 cursor-pointer">
                        <LogOut className="flex-shrink-0 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">Sair</span>
                    </button>
                </SidebarFooter>
            </Sidebar>
            <main className='w-full'>
                <SidebarInset className='bg-whiteF'>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <button onClick={() => navigate('/home')}>
                                            Khiv
                                        </button>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <Outlet />
                </SidebarInset>
            </main>
        </SidebarProvider>
    );
}