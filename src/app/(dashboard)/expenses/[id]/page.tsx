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

    return <ExpenseDetailView expense={expense} />;
}
