"use client"
import React from "react";
import { Navbar } from "@/components/shared/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 pt-24 pb-8 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
