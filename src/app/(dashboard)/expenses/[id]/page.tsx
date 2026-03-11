import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ExpenseDetailView } from "@/components/expenses/expense-detail-view";

export default async function ExpenseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const expenseId = parseInt(id);

    if (isNaN(expenseId)) {
        return notFound();
    }

    const expense = await prisma.expenses.findUnique({
        where: {
            ExpenseID: expenseId,
        },
        include: {
            categories: true,
            sub_categories: true,
            peoples: true,
            projects: true,
        },
    });

    if (!expense) {
        return notFound();
    }

    const serializedExpense = {
        ...expense,
        Amount: expense.Amount.toNumber(),
        categories: expense.categories ? {
            ...expense.categories,
            Sequence: expense.categories.Sequence ? expense.categories.Sequence.toNumber() : null
        } : null,
        sub_categories: expense.sub_categories ? {
            ...expense.sub_categories,
            Sequence: expense.sub_categories.Sequence ? expense.sub_categories.Sequence.toNumber() : null
        } : null
    };

    return <ExpenseDetailView expense={serializedExpense} />;
}
