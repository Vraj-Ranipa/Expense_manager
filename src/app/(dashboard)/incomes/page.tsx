import { prisma } from "@/lib/prisma";
import { IncomeStats } from "@/components/incomes/income-stats";
import { AddIncomeButton } from "@/components/incomes/add-income-button";
import { IncomesClient } from "@/components/incomes/incomes-client";

export default async function IncomesPage() {
    const data = await prisma.incomes.findMany({
        orderBy: {
            IncomeDate: 'desc'
        },
        include: {
            categories: true,
            sub_categories: true,
            peoples: true,
            projects: true,
        }
    });

    const categories = await prisma.categories.findMany({
        where: { IsIncome: true, IsActive: true }
    });
    const formattedCategories = categories.map(cat => ({
        ...cat,
        Sequence: cat.Sequence?.toNumber() ?? 0
    }));

    const projects = await prisma.projects.findMany({
        where: { IsActive: true }
    });
    const peoples = await prisma.peoples.findMany({
        where: { IsActive: true }
    });

    const formattedData = data.map((income) => ({
        ...income,
        Amount: income.Amount.toNumber(),
        categories: income.categories && {
            ...income.categories,
            Sequence: income.categories.Sequence?.toNumber() ?? null
        },
        sub_categories: income.sub_categories && {
            ...income.sub_categories,
            Sequence: income.sub_categories.Sequence?.toNumber() ?? null
        },
    }));

    const totalIncome = formattedData.reduce((sum, item) => sum + item.Amount, 0);
    const incomeCount = formattedData.length;
    const averageIncome = incomeCount > 0 ? totalIncome / incomeCount : 0;
    const highestIncome = formattedData.reduce((max, item) => Math.max(max, item.Amount), 0);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Incomes</h2>
                    <p className="text-muted-foreground">
                        Manage and track your income sources and transactions.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <AddIncomeButton categories={formattedCategories} projects={projects} />
                </div>
            </div>

            <IncomeStats
                totalIncome={totalIncome}
                incomeCount={incomeCount}
                averageIncome={averageIncome}
                highestIncome={highestIncome}
            />

            <IncomesClient
                data={formattedData}
                categories={formattedCategories}
                projects={projects}
                peoples={peoples}
            />
        </div>
    );
}



