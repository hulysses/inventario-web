import { Outlet, useNavigate } from 'react-router-dom';
import { Users, Home, SmilePlus, ShoppingBasket, ShoppingCart, Truck, ArrowLeftRight, LogOut } from "lucide-react";
import Logo from '../assets/logo/logoBranca.svg';
import { Separator } from './ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
    SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarProvider, SidebarTrigger,
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
        <SidebarProvider>
            <Sidebar collapsible="icon" className='bg-white'>
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
            <main className='w-full'>
                <SidebarInset>
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
                                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                </SidebarInset>
                <Outlet />
            </main>
        </SidebarProvider>
    );
}
