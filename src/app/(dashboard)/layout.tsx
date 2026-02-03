import React from "react";
import { Navbar } from "@/components/shared/navbar";
import { getSession } from "@/lib/session";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    return (
        <div className="relative min-h-screen flex flex-col transition-all duration-300">
            <Navbar user={session} />
            <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
                {children}
            </main>
        </div>
    );
}
