"use client";

import React, { useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useMotionValueEvent,
    AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PieChart,
    TrendingUp,
    TrendingDown,
    Briefcase,
    Users,
    Tags,
    PlusCircle,
    Wallet,
    Settings,
    Menu,
    X,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

// Reuse navItems from app-sidebar.tsx
interface NavItem {
    title: string;
    url: string;
    icon?: React.ElementType;
    items?: {
        title: string;
        url: string;
        icon?: React.ElementType;
    }[];
}

const navItems: { group: string; items: NavItem[] }[] = [
    {
        group: "Overview",
        items: [
            { title: "Dashboard", url: "/", icon: LayoutDashboard },
            { title: "Analytics", url: "/reports", icon: PieChart },
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
];

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll detection for hiding/showing navbar
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 20) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "-100%", opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
                scrolled
                    ? "glass m-4 rounded-2xl border-white/5 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-background/20"
                    : "bg-transparent border-transparent"
            )}
        >
            {/* Logo Area */}
            <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-sky-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] group-hover:scale-105">
                        <Wallet className="h-5 w-5" />
                        <div className="absolute inset-0 rounded-xl bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight text-foreground">
                            Expense<span className="text-primary">Manager</span>
                        </span>
                    </div>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
                {navItems.flatMap((group) =>
                    group.items.map((item) => {
                        const isActive =
                            item.url === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.url);

                        if (item.items) {
                            return (
                                <DropdownMenu key={item.title}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "relative h-9 gap-1.5 rounded-full px-4 text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary",
                                                isActive
                                                    ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {item.icon && <item.icon className="mr-1 h-4 w-4" />}
                                            {item.title}
                                            <ChevronDown className="ml-0.5 h-3 w-3 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="center"
                                        sideOffset={10}
                                        className="w-48 overflow-hidden rounded-xl border border-white/10 bg-black/80 p-1 backdrop-blur-xl animate-in fade-in-0 zoom-in-95"
                                    >
                                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2 py-1.5">
                                            {item.title}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        {item.items.map((subItem) => (
                                            <DropdownMenuItem key={subItem.title} asChild>
                                                <Link
                                                    href={subItem.url}
                                                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors focus:bg-primary/20 focus:text-primary cursor-pointer"
                                                >
                                                    {subItem.icon && (
                                                        <subItem.icon className="h-4 w-4" />
                                                    )}
                                                    {subItem.title}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            );
                        }

                        return (
                            <Link
                                key={item.title}
                                href={item.url}
                                className={cn(
                                    "relative flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5",
                                    isActive
                                        ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.icon && <item.icon className="mr-1 h-4 w-4" />}
                                {item.title}
                            </Link>
                        );
                    })
                )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <ModeToggle />

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-10 w-10 rounded-full p-0 hover:bg-transparent"
                        >
                            <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-[0_0_10px_rgba(56,189,248,0.2)] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                                <AvatarImage src="/avatars/shadcn.jpg" alt="@shadcn" />
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={10}
                        className="w-56 rounded-xl border border-white/10 bg-black/80 p-1 backdrop-blur-xl"
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1 p-2">
                                <p className="text-sm font-medium leading-none text-primary">
                                    User Name
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    user@example.com
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="cursor-pointer focus:bg-primary/20 focus:text-primary rounded-lg">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer focus:bg-destructive/20 focus:text-destructive rounded-lg text-destructive">
                            <span className="flex w-full items-center">Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu Trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] border-r border-white/10 bg-black/90 backdrop-blur-xl p-0">
                        <SheetHeader className="p-6 border-b border-white/10">
                            <SheetTitle className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                                    <Wallet className="h-5 w-5" />
                                </div>
                                <span className="font-bold">Expense Manager</span>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-1 p-4">
                            {navItems.map((group) => (
                                <div key={group.group} className="mb-4">
                                    <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">{group.group}</h4>
                                    <div className="flex flex-col gap-1">
                                        {group.items.map((item) => {
                                            const isActive = item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
                                            return (
                                                <div key={item.title}>
                                                    {item.items ? (
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center px-2 py-2 text-sm font-medium text-muted-foreground">
                                                                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                                                {item.title}
                                                            </div>
                                                            <div className="ml-4 flex flex-col border-l border-white/10 pl-2">
                                                                {item.items.map(subItem => (
                                                                    <Link
                                                                        key={subItem.title}
                                                                        href={subItem.url}
                                                                        className="flex items-center rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                                                    >
                                                                        {subItem.title}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            href={item.url}
                                                            className={cn(
                                                                "flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors",
                                                                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                                            )}
                                                        >
                                                            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                                            {item.title}
                                                        </Link>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </motion.header>
    );
}
