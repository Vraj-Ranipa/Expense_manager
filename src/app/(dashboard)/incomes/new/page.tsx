import React from "react";
import { prisma } from "@/lib/prisma";
import { IncomeForm } from "@/components/incomes/income-form";

export default async function NewIncomePage() {
    // Fetch data for the form
    const categoriesData = await prisma.categories.findMany({
        where: { IsIncome: true },
        orderBy: { CategoryName: 'asc' }
    });

    const categories = categoriesData.map(c => ({
        ...c,
        Sequence: c.Sequence ? c.Sequence.toNumber() : 0
    }));

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
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">Add New Income</h2>
                    <p className="text-muted-foreground">
                        Create a new income source or transaction.
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <IncomeForm
                    categories={categories}
                    projects={projects}
                    peoples={peoples}
                />
            </div>
        </div>
    );
}
