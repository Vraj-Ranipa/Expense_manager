import React from "react";
import { prisma } from "@/lib/prisma";
import { ExpenseForm } from "@/components/expenses/expense-form";

export default async function NewExpensePage() {
    // Fetch data for the form
    const categories = await prisma.categories.findMany({
        where: { IsExpense: true },
        orderBy: { CategoryName: 'asc' }
    });

    const projects = await prisma.projects.findMany({
        orderBy: { ProjectName: 'asc' }
    });

    const peoples = await prisma.peoples.findMany({
        orderBy: { PeopleName: 'asc' }
    });

    return (
        <div className="flex-1 space-y-4 p-8 pt-6 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center justify-between space-y-2 mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent drop-shadow-sm">Add New Expense</h2>
                    <p className="text-muted-foreground">
                        Create a new expense record.
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <ExpenseForm
                    categories={categories}
                    projects={projects}
                    peoples={peoples}
                />
            </div>
        </div>
    );
}
