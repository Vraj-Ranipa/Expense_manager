
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface ProjectFinancialsProps {
    expenses: any[];
    incomes: any[];
}

export function ProjectFinancials({ expenses, incomes }: ProjectFinancialsProps) {
    const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.Amount), 0);
    const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.Amount), 0);
    const balance = totalIncome - totalExpense;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-[#E0F2F1] to-[#E8F5E9] dark:from-emerald-950/30 dark:to-background border-none shadow-sm h-32 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/40 dark:bg-transparent" />
                <CardContent className="p-0 flex flex-col items-center justify-center text-center relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Total Income</span>
                    </div>
                    <div className="text-3xl font-bold text-emerald-500 mb-1">
                        {formatCurrency(totalIncome)}
                    </div>
                    <p className="text-xs text-muted-foreground/80 font-medium">
                        From {incomes.length} transactions
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#FFEBEE] to-[#FFEBEE] dark:from-rose-950/30 dark:to-background border-none shadow-sm h-32 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/40 dark:bg-transparent" />
                <CardContent className="p-0 flex flex-col items-center justify-center text-center relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-sm font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider">Total Expenses</span>
                    </div>
                    <div className="text-3xl font-bold text-rose-400 mb-1">
                        {formatCurrency(totalExpense)}
                    </div>
                    <p className="text-xs text-muted-foreground/80 font-medium">
                        From {expenses.length} transactions
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#E3F2FD] to-[#E3F2FD] dark:from-blue-950/30 dark:to-background border-none shadow-sm h-32 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/40 dark:bg-transparent" />
                <CardContent className="p-0 flex flex-col items-center justify-center text-center relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider">Net Balance</span>
                    </div>
                    <div className={`text-3xl font-bold mb-1 ${balance >= 0 ? "text-blue-400" : "text-rose-500"}`}>
                        {formatCurrency(balance)}
                    </div>
                    <p className="text-xs text-muted-foreground/80 font-medium">
                        Available budget
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
