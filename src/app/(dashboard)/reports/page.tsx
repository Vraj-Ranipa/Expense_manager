"use client";

import React from "react";
import { CategoryBreakdown } from "@/components/reports/category-breakdown";
import { MonthlyTrends } from "@/components/reports/monthly-trends";
import { TransactionsTable } from "@/components/reports/transactions-table";
import { Button } from "@/components/ui/button";
import { Download, Share, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

export default function ReportsPage() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-7xl mx-auto"
        >
            <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-sky-500/10 via-purple-500/5 to-transparent p-6 backdrop-blur-xl">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary animate-pulse">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white shadow-black drop-shadow-lg">
                            Reports & Analytics
                        </h2>
                    </div>
                    <p className="text-muted-foreground pl-10">
                        Detailed breakdown of your financial health.
                    </p>
                </div>
                <div className="flex items-center space-x-2 pl-10 md:pl-0">
                    <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-white">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                    </Button>
                </div>
            </motion.div>

            <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <MonthlyTrends />
            </motion.div>

            <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <CategoryBreakdown />
                <div className="col-span-4 md:col-span-4 lg:col-span-3 rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-xl flex items-center justify-center text-center">
                    <div className="space-y-3">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">AI Insights</h3>
                        <p className="text-sm text-muted-foreground">Coming soon! Get intelligent predictions on your future expenses.</p>
                        <Button variant="secondary" className="mt-2 text-xs h-8">Join Waitlist</Button>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={item} className="space-y-4">
                <TransactionsTable />
            </motion.div>
        </motion.div>
    );
}
