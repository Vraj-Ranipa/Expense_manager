"use client"

import * as React from "react"
import {
    Briefcase,
    ChevronRight,
    ChevronsUpDown,
    CreditCard,
    LayoutDashboard,
    LogOut,
    PieChart,
    PlusCircle,
    Settings,
    Tags,
    TrendingDown,
    TrendingUp,
    Users,
    Wallet,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavItem {
    title: string
    url: string
    icon?: React.ElementType
    items?: {
        title: string
        url: string
        icon?: React.ElementType
    }[]
}

// Menu Items Configuration
const navItems: { group: string; items: NavItem[] }[] = [
    {
        group: "Overview",
        items: [
            { title: "Dashboard", url: "/", icon: LayoutDashboard },
            { title: "Analytics & Reports", url: "/reports", icon: PieChart },
        ],
    },
    {
        group: "Finance",
        items: [
            {
                title: "Incomes",
                url: "/incomes",
                icon: TrendingUp,
                items: [
                    { title: "All Incomes", url: "/incomes" },
                    { title: "Add Income", url: "/incomes/new", icon: PlusCircle },
                ],
            },
            {
                title: "Expenses",
                url: "/expenses",
                icon: TrendingDown,
                items: [
                    { title: "All Expenses", url: "/expenses" },
                    { title: "Add Expense", url: "/expenses/new", icon: PlusCircle },
                ],
            },
        ],
    },
    {
        group: "Management",
        items: [
            { title: "Projects", url: "/admin/projects", icon: Briefcase },
            { title: "People", url: "/admin/people", icon: Users },
            { title: "Categories", url: "/admin/categories", icon: Tags },
        ],
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon" variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                                    <Wallet className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-bold tracking-wide">Expense Manager</span>
                                    <span className="truncate text-xs text-muted-foreground">Premium Edition</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="gap-4 px-2">
                {navItems.map((group) => (
                    <SidebarGroup key={group.group}>
                        <SidebarGroupLabel className="text-primary/80 font-bold uppercase tracking-wider text-[10px] mb-2 px-4">{group.group}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => {
                                const isActive = item.url === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.url)

                                // Render Collapsible for items with sub-items
                                if (item.items && item.items.length > 0) {
                                    if (state === "collapsed") {
                                        return (
                                            <SidebarMenuItem key={item.title}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <SidebarMenuButton
                                                            tooltip={item.title}
                                                            isActive={isActive}
                                                            className="hover:bg-primary/20 hover:text-primary data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/25 data-[active=true]:to-transparent data-[active=true]:text-primary data-[active=true]:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out rounded-lg mb-1"
                                                        >
                                                            {item.icon && <item.icon className={isActive ? "text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" : "text-muted-foreground/70"} />}
                                                            <span>{item.title}</span>
                                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                        </SidebarMenuButton>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent side="right" align="start" sideOffset={4} className="bg-popover/80 backdrop-blur-xl border-white/10">
                                                        <DropdownMenuLabel className="text-primary">{item.title}</DropdownMenuLabel>
                                                        <DropdownMenuSeparator className="bg-white/10" />
                                                        {item.items.map((subItem) => (
                                                            <DropdownMenuItem key={subItem.title} asChild className="focus:bg-primary/20 focus:text-primary">
                                                                <Link href={subItem.url} className="w-full cursor-pointer">
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </SidebarMenuItem>
                                        )
                                    }

                                    return (
                                        <Collapsible
                                            key={item.title}
                                            asChild
                                            defaultOpen={isActive}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        tooltip={item.title}
                                                        isActive={isActive}
                                                        className="hover:bg-primary/20 hover:text-primary data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/25 data-[active=true]:to-transparent data-[active=true]:text-primary data-[active=true]:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out rounded-lg mb-1"
                                                    >
                                                        {item.icon && <item.icon className={isActive ? "text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" : "text-muted-foreground/70"} />}
                                                        <span className="font-medium">{item.title}</span>
                                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-muted-foreground/50" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items.map((subItem) => {
                                                            const isSubActive = pathname === subItem.url
                                                            return (
                                                                <SidebarMenuSubItem key={subItem.title}>
                                                                    <SidebarMenuSubButton
                                                                        asChild
                                                                        isActive={isSubActive}
                                                                        className="hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary transition-all duration-200 ease-in-out"
                                                                    >
                                                                        <Link href={subItem.url}>
                                                                            <span>{subItem.title}</span>
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            )
                                                        })}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    )
                                }

                                // Render simple link
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                            isActive={isActive}
                                            className="hover:bg-primary/20 hover:text-primary data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/25 data-[active=true]:to-transparent data-[active=true]:text-primary data-[active=true]:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 ease-out rounded-lg mb-1"
                                        >
                                            <Link href={item.url}>
                                                {item.icon && <item.icon className={isActive ? "text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" : "text-muted-foreground/70"} />}
                                                <span className="font-medium">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <div className="p-2">
                    <div className="group rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 backdrop-blur-md transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex items-center gap-3 relative z-10">
                            <Avatar className="h-9 w-9 rounded-lg border border-primary/20 shadow-[0_0_10px_rgba(168,85,247,0.2)] group-hover:border-primary/50 transition-colors">
                                <AvatarImage src="/avatars/shadcn.jpg" alt="@shadcn" />
                                <AvatarFallback className="rounded-lg bg-primary/20 text-primary">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">User Name</span>
                                <span className="truncate text-xs text-muted-foreground">Pro Plan</span>
                            </div>
                            <Settings className="ml-auto size-4 text-muted-foreground group-hover:text-primary transition-colors hover:rotate-90 duration-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
