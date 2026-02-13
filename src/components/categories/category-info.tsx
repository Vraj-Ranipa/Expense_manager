"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Calendar, Clock, CheckCircle2, FileText, Layers, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface CategoryInfoProps {
    category: any;
    expenses?: any[];
    incomes?: any[];
}

export function CategoryInfo({ category, expenses = [], incomes = [] }: CategoryInfoProps) {
    const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.Amount), 0);
    const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.Amount), 0);

    const isExpense = category.IsExpense && !category.IsIncome;
    const isIncome = category.IsIncome && !category.IsExpense;
    const isMixed = !isExpense && !isIncome;

    return (
        <Card className="relative overflow-hidden shadow-sm bg-gradient-to-br from-background via-background to-primary/10 border-muted/60 hover:border-primary/20 transition-colors w-full">
            {/* Header */}
            <div className="px-6 pt-6 pb-2">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <div className="h-5 w-5 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center">
                        <Info className="h-3 w-3" />
                    </div>
                    About this Category
                </h3>
            </div>

            <CardContent className="p-6 space-y-6">

                {/* 1. Financial Banner Banner */}
                <div className="w-full">
                    {isExpense && (
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-rose-50 via-white to-rose-50 border border-rose-100 shadow-sm p-5 flex items-center justify-between group">
                            <div className="relative z-10">
                                <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">Total Expense</p>
                                <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                                    {formatCurrency(totalExpense)}
                                </div>
                                <p className="text-xs text-rose-400 font-medium mt-1">{expenses.length} Transactions</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-200 group-hover:scale-110 transition-transform">
                                <TrendingDown className="h-5 w-5" />
                            </div>
                            {/* Decorative gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                        </div>
                    )}

                    {isIncome && (
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-100 shadow-sm p-5 flex items-center justify-between group">
                            <div className="relative z-10">
                                <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Total Income</p>
                                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {formatCurrency(totalIncome)}
                                </div>
                                <p className="text-xs text-emerald-400 font-medium mt-1">{incomes.length} Transactions</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            {/* Decorative gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                        </div>
                    )}

                    {isMixed && (
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-indigo-100 shadow-sm p-5 flex items-center justify-between group">
                            <div className="relative z-10">
                                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Net Flow</p>
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {formatCurrency(totalIncome - totalExpense)}
                                </div>
                                <p className="text-xs text-indigo-400 font-medium mt-1">{incomes.length} In • {expenses.length} Out</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                                <Wallet className="h-5 w-5" />
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. Description Field */}
                <div className="bg-muted/10 rounded-lg border border-border/60 p-4 h-full">
                    <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <FileText className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Description</span>
                    </div>
                    <p className="text-sm font-medium text-foreground/90">
                        {category.Description || "No description provided."}
                    </p>
                </div>

                {/* 3. Info Grid (Created, Modified, Status, Type) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Created */}
                    <div className="bg-muted/30 p-3 rounded-lg border border-border/40">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide font-bold mb-1">
                            <Calendar className="h-3 w-3" /> Created
                        </span>
                        <p className="font-semibold text-xs text-foreground">
                            {category.Created ? format(new Date(category.Created), "MMM d, yyyy") : "N/A"}
                        </p>
                    </div>

                    {/* Modified */}
                    <div className="bg-muted/30 p-3 rounded-lg border border-border/40">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide font-bold mb-1">
                            <Clock className="h-3 w-3" /> Modified
                        </span>
                        <p className="font-semibold text-xs text-foreground">
                            {category.Modified ? format(new Date(category.Modified), "MMM d, yyyy") : "N/A"}
                        </p>
                    </div>

                    {/* Status */}
                    <div className="bg-muted/30 p-3 rounded-lg border border-border/40">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide font-bold mb-1">
                            <CheckCircle2 className="h-3 w-3" /> Status
                        </span>
                        <Badge variant="secondary" className={`h-5 px-2 text-[10px] border-transparent font-medium ${category.IsActive ? "bg-emerald-200 text-emerald-800" : "bg-muted text-muted-foreground"}`}>
                            {category.IsActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>

                    {/* Type */}
                    <div className="bg-muted/30 p-3 rounded-lg border border-border/40">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide font-bold mb-1">
                            <Layers className="h-3 w-3" /> Type
                        </span>
                        <p className="font-semibold text-xs text-foreground">
                            {isMixed ? "Mixed" : isExpense ? "Expense" : "Income"}
                        </p>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
