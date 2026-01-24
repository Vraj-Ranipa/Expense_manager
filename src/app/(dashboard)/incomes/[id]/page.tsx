import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { IncomeDetailView } from "@/components/incomes/income-detail-view";

export default async function IncomeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const incomeId = parseInt(id);

    if (isNaN(incomeId)) {
        return notFound();
    }

    const income = await prisma.incomes.findUnique({
        where: {
            IncomeID: incomeId,
        },
        include: {
            categories: true,
            sub_categories: true,
            peoples: true,
            projects: true,
        },
    });

    if (!income) {
        return notFound();
    }

    return <IncomeDetailView income={income} />;
}
