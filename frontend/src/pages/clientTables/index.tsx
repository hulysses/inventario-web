import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import Logo from '../../assets/logo/logo.svg';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Label } from "@/components/ui/label"

import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

const payments: Payment[] = [
    {
        id: 72852,
        nome: "Roberto",
        createdAt: new Date('2024-10-21'),
        email: "robertonandes@example.com",
        senha: '298383hwdjwd'
    },
    {
        id: 7285241,
        nome: "Eduarda",
        createdAt: new Date('2024-10-21'),
        email: "eduardaguido@example.com",
        senha: 'kdjwiodj201983'
    },
]

const dataSidebar = {
    versions: ["1.0.1"],
    navMain: [
        {
            title: "Atalhos",
            url: "#",
            items: [
                {
                    title: "Home",
                    url: "/",
                },
                {
                    title: "Clientes",
                    url: "/clientTable",
                    isActive: true
                },
            ],
        },
    ],
}

function getData() {
    // Fetch data from your API here.
    return payments;
    // ...
}

export const ClientTable = () => {
    const data = getData();

    const [selectedVersion, setSelectedVersion] = React.useState(dataSidebar.versions[0])

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <img className="w-16 sm:w-16 md:w-16" src={Logo} alt="Logo Khiv" />
                                        <div className="flex flex-col gap-0.5 leading-none">
                                        </div>
                                        <ChevronsUpDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width]"
                                    align="start"
                                >
                                    {dataSidebar.versions.map((version) => (
                                        <DropdownMenuItem
                                            key={version}
                                            onSelect={() => setSelectedVersion(version)}
                                        >
                                            v{version}{" "}
                                            {version === selectedVersion && (
                                                <Check className="ml-auto" />
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <form>
                        <SidebarGroup className="py-0">
                            <SidebarGroupContent className="relative">
                                <Label htmlFor="search" className="sr-only">
                                    Search
                                </Label>
                                <SidebarInput
                                    id="search"
                                    placeholder="Procure..."
                                    className="pl-8"
                                />
                                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </form>
                </SidebarHeader>
                <SidebarContent>
                    {/* We create a SidebarGroup for each parent. */}
                    {dataSidebar.navMain.map((item) => (
                        <SidebarGroup key={item.title}>
                            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {item.items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={item.isActive}>
                                                <a href={item.url}>{item.title}</a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <header className="flex h-16 shrink-0 justify-between items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink className="text-left" href="#">
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-left">Clientes</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <p className="text-right">Eduarda Guino</p>
                    {/* <img src={ }></img> */}
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <h1 className="font-bold text-2xl">Gerenciamento de Clientes</h1>
                    <h3 className="font-light text-gray-500">Gerencie seus usuários, podendo alterar, excluir ou criar novos</h3>

                    <div className="flex items-center space-x-4">
                        <h1 className="font-bold text-2xl mt-20 -ml-0 flex mx-auto">Usuários <p className="ml-5 text-gray-400">44</p></h1>
                        <input type="text" placeholder="Procurar" className="border rounded px-2 py-1 mt-20 ml-16" />
                        <input type="text" placeholder="Filtrar" className="border rounded px-2 py-1 mt-20 ml-16" />
                        <Button type="button" className="border rounded px-2 py-1 mt-20 ml-16">Adicionar usuário</Button>
                    </div>

                    {/* <div className="grid grid-cols-4 mt-1 align-middle items-center bg-gray-100 p-2"></div> */}

                    <DataTable columns={columns} data={data} />
                </div>
            </SidebarInset >
        </SidebarProvider >
    )
}
