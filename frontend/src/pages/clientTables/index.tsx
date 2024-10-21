"use client"

import * as React from "react"
import { Check, ChevronsUpDown, GalleryVerticalEnd, Search } from "lucide-react"
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

const data = {
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

export const ClientTable = () => {
    const [selectedVersion, setSelectedVersion] = React.useState(data.versions[0])

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
                                        {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"> */}
                                        <img className="w-16 sm:w-16 md:w-16 " src={Logo} alt="Logo Khiv" />
                                        {/* </div> */}
                                        <div className="flex flex-col gap-0.5 leading-none">
                                            <span className="font-semibold"></span>
                                            <span className="">v{selectedVersion}</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width]"
                                    align="start"
                                >
                                    {data.versions.map((version) => (
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
                    {data.navMain.map((item) => (
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
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Home
                                </BreadcrumbLink>

                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Clientes</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    </div>
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}
