"use client"
import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const paths = pathname === "/" ? [] : pathname.split("/").filter((path) => path);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-4 z-20 mx-4 mt-4 flex h-14 shrink-0 items-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 backdrop-blur-md transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-lg shadow-black/20">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4 bg-white/10" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {paths.map((path, index) => {
                                const href = `/${paths.slice(0, index + 1).join("/")}`;
                                const isLast = index === paths.length - 1;
                                const title = path.charAt(0).toUpperCase() + path.slice(1);

                                return (
                                    <React.Fragment key={path}>
                                        <BreadcrumbSeparator className="hidden md:block text-muted-foreground/50" />
                                        <BreadcrumbItem>
                                            {isLast ? (
                                                <BreadcrumbPage className="font-semibold text-foreground glow-text">{title}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink href={href} className="text-muted-foreground hover:text-primary transition-colors">
                                                    {title}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                    </React.Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="ml-auto">
                        <ModeToggle />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
