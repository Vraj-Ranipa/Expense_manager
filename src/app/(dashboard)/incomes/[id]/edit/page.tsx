
import { prisma } from "@/lib/prisma";
import { IncomeForm } from "@/components/incomes/income-form";
import { notFound } from "next/navigation";

export default async function EditIncomePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const incomeId = parseInt(id);

    if (isNaN(incomeId)) {
        return notFound();
    }

    const income = await prisma.incomes.findUnique({
        where: { IncomeID: incomeId },
    });

    if (!income) {
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
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Edit Income</h1>
                <p className="text-muted-foreground">Modify the details of your income transaction.</p>
            </div>

            <IncomeForm
                categories={categories}
                projects={projects}
                peoples={peoples}
                initialData={{
                    ...income,
                    Amount: income.Amount.toNumber()
                }}
            />
        </div>
    );
}
