
import { prisma } from "@/lib/prisma";
import { ExpenseForm } from "@/components/expenses/expense-form";
import { notFound } from "next/navigation";

export default async function EditExpensePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const expenseId = parseInt(id);

    if (isNaN(expenseId)) {
        return notFound();
    }

    const expense = await prisma.expenses.findUnique({
        where: { ExpenseID: expenseId },
    });

    if (!expense) {
        return notFound();
    }

    const categoriesData = await prisma.categories.findMany({
        orderBy: { CategoryName: "asc" }
    });

    const categories = categoriesData.map(c => ({
        ...c,
        Sequence: c.Sequence ? c.Sequence.toNumber() : 0,
    }));

    const projects = await prisma.projects.findMany({
        where: { IsActive: true },
        orderBy: { ProjectName: "asc" }
    });

    const peoples = await prisma.peoples.findMany({
        where: { IsActive: true },
        orderBy: { PeopleName: "asc" }
    });

    return (
        <div className="space-y-6 max-w-5xl mx-auto w-full pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Edit Expense</h1>
                <p className="text-muted-foreground">Modify the details of your expense.</p>
            </div>

            <ExpenseForm
                categories={categories}
                projects={projects}
                peoples={peoples}
                initialData={{
                    ...expense,
                    Amount: expense.Amount.toNumber()
                }}
            />
        </div>
    );
}
