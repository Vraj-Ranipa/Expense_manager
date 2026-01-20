"use client"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Transaction } from "@/types/dashboard"
import { format } from "date-fns"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { StaggerContainer } from "@/components/ui/motion-ui"

// Mock Data matching Schema
const recentTransactions: Transaction[] = [
    {
        type: 'income',
        IncomeID: 1,
        IncomeDate: new Date().toISOString(),
        Amount: 5000,
        IncomeDetail: "Freelance Project Payment",
        category: { CategoryID: 1, CategoryName: "Freelance", IsIncome: true, IsExpense: false },
        project: { ProjectID: 101, ProjectName: "Website Redesign" }
    },
    {
        type: 'expense',
        ExpenseID: 1,
        ExpenseDate: new Date().toISOString(),
        Amount: 120,
        ExpenseDetail: "Office Supplies",
        category: { CategoryID: 2, CategoryName: "Office", IsIncome: false, IsExpense: true },
        project: { ProjectID: 101, ProjectName: "Website Redesign" }
    },
    {
        type: 'expense',
        ExpenseID: 2,
        ExpenseDate: new Date(Date.now() - 86400000).toISOString(),
        Amount: 15.50,
        ExpenseDetail: "Coffee Meeting",
        category: { CategoryID: 3, CategoryName: "Food", IsIncome: false, IsExpense: true }
    },
    {
        type: 'expense',
        ExpenseID: 3,
        ExpenseDate: new Date(Date.now() - 172800000).toISOString(),
        Amount: 2500,
        ExpenseDetail: "Monthly Rent",
        category: { CategoryID: 4, CategoryName: "Rent", IsIncome: false, IsExpense: true }
    },
    {
        type: 'income',
        IncomeID: 2,
        IncomeDate: new Date(Date.now() - 250000000).toISOString(),
        Amount: 200,
        IncomeDetail: "Refund",
        category: { CategoryID: 99, CategoryName: "Refund", IsIncome: true, IsExpense: false }
    },
]

export function RecentTransactions() {
    return (
        <Card className="col-span-3 border-none bg-transparent shadow-none h-full flex flex-col">
            <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Recent Activity</CardTitle>
                <CardDescription>
                    Latest financial transactions.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-2 flex-grow overflow-hidden">
                <StaggerContainer className="space-y-3">
                    {recentTransactions.map((tx, i) => {
                        const isExpense = tx.type === 'expense';
                        const amount = isExpense ? (tx as any).Amount : (tx as any).Amount;
                        const detail = (isExpense ? (tx as any).ExpenseDetail : (tx as any).IncomeDetail) || "Transaction";
                        const dateString = isExpense ? (tx as any).ExpenseDate : (tx as any).IncomeDate;
                        const date = dateString ? new Date(dateString) : new Date();
                        const categoryName = tx.category?.CategoryName || "Uncategorized";

                        return (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 data-[state=open]:bg-white/5 transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/5 gap-3"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <Avatar className="h-10 w-10 border border-white/10 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-500 bg-background/50 backdrop-blur-sm shrink-0">
                                        <AvatarFallback className={isExpense ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"}>
                                            {isExpense ? <ArrowDownRight className="h-5 w-5 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]" /> : <ArrowUpRight className="h-5 w-5 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1 min-w-0">
                                        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors truncate">{detail}</p>
                                        <div className="flex items-center">
                                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/5">
                                                {categoryName}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <div className={`font-bold text-sm ${isExpense ? "text-rose-400 drop-shadow-[0_0_3px_rgba(244,63,94,0.3)]" : "text-emerald-400 drop-shadow-[0_0_3px_rgba(52,211,153,0.3)]"}`}>
                                        {isExpense ? "-" : "+"}${Number(amount).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {format(date, "MMM d")}
                                    </span>
                                </div>
                            </motion.div>
                        )
                    })}
                </StaggerContainer>
            </CardContent>
        </Card>
    )
}
