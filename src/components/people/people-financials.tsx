"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface PeopleFinancialsProps {
    expenses: any[];
    incomes: any[];
}

export function PeopleFinancials({ expenses, incomes }: PeopleFinancialsProps) {
    const totalPaid = expenses.reduce((acc, curr) => acc + Number(curr.Amount), 0);
    const totalReceived = incomes.reduce((acc, curr) => acc + Number(curr.Amount), 0);
    // Net Balance for a person: (Received - Paid) usually implies how much they 'have' relative to you, 
    // BUT effectively 'Net Balance' usually means (Total In - Total Out) in a wallet context.
    // In "People" context: 
    // If I paid them 1000 and received 500, I am -500 net with them? 
    // Or is it a simple summary of transactions?
    // Let's stick to simple Net Balance = Income - Expense (Received - Paid)
    const netBalance = totalReceived - totalPaid;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-[#FFEBEE] to-[#FFEBEE] dark:from-rose-950/30 dark:to-background border-none shadow-sm h-32 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/40 dark:bg-transparent" />
                <CardContent className="p-0 flex flex-col items-center justify-center text-center relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-sm font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider">Total Paid To</span>
                    </div>
                    <div className="text-3xl font-bold text-rose-400 mb-1">
                        {formatCurrency(totalPaid)}
                    </div>
                    <p className="text-xs text-muted-foreground/80 font-medium">
                        In {expenses.length} transactions
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#E0F2F1] to-[#E8F5E9] dark:from-emerald-950/30 dark:to-background border-none shadow-sm h-32 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/40 dark:bg-transparent" />
                <CardContent className="p-0 flex flex-col items-center justify-center text-center relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Total Received</span>
                    </div>
                    <div className="text-3xl font-bold text-emerald-500 mb-1">
                        {formatCurrency(totalReceived)}
                    </div>
                    <p className="text-xs text-muted-foreground/80 font-medium">
                        In {incomes.length} transactions
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#E3F2FD] to-[#E3F2FD] dark:from-indigo-950/30 dark:to-background border-none shadow-sm h-32 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/40 dark:bg-transparent" />
                <CardContent className="p-0 flex flex-col items-center justify-center text-center relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Net Balance</span>
                    </div>
                    <div className={`text-3xl font-bold mb-1 ${netBalance >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                        {netBalance > 0 ? "+" : ""}{formatCurrency(netBalance)}
                    </div>
                    <p className="text-xs text-muted-foreground/80 font-medium">
                        Current Standing
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
