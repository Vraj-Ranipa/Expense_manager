import { prisma } from "@/lib/prisma";
import { ExpenseStats } from "@/components/expenses/expense-stats";
import { AddExpenseButton } from "@/components/expenses/add-expense-button";
import { ExpensesClient } from "@/components/expenses/expenses-client";

export default async function ExpensesPage() {
    const data = await prisma.expenses.findMany({
        orderBy: {
            ExpenseDate: 'desc'
        },
        include: {
            categories: true,
            sub_categories: true,
            peoples: true,
            projects: true,
        }
    });

    const categories = await prisma.categories.findMany({
        where: { IsExpense: true, IsActive: true }
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

    const formattedData = data.map((expense) => ({
        ...expense,
        Amount: expense.Amount.toNumber(),
        categories: expense.categories && {
            ...expense.categories,
            Sequence: expense.categories.Sequence?.toNumber() ?? null
        },
        sub_categories: expense.sub_categories && {
            ...expense.sub_categories,
            Sequence: expense.sub_categories.Sequence?.toNumber() ?? null
        },
    }));

    const totalExpense = formattedData.reduce((sum, item) => sum + item.Amount, 0);
    const expenseCount = formattedData.length;
    const averageExpense = expenseCount > 0 ? totalExpense / expenseCount : 0;
    const highestExpense = formattedData.reduce((max, item) => Math.max(max, item.Amount), 0);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
                    <p className="text-muted-foreground">
                        Manage and track your expense records and transactions.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <AddExpenseButton categories={formattedCategories} projects={projects} />
                </div>
            </div>

            <ExpenseStats
                totalExpense={totalExpense}
                expenseCount={expenseCount}
                averageExpense={averageExpense}
                highestExpense={highestExpense}
            />

            <ExpensesClient
                data={formattedData}
                categories={formattedCategories}
                projects={projects}
                peoples={peoples}
            />
        </div>
    );
}
