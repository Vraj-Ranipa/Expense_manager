"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createIncome(formData: FormData) {
    const amount = parseFloat(formData.get("amount") as string);
    const date = new Date(formData.get("date") as string);
    const detail = formData.get("detail") as string;
    const categoryId = parseInt(formData.get("categoryId") as string);
    const projectId = formData.get("projectId") && formData.get("projectId") !== "none" ? parseInt(formData.get("projectId") as string) : null;
    const description = formData.get("description") as string;

    // TODO: Get actual logged in user ID
    const userId = 1;

    await prisma.incomes.create({
        data: {
            Amount: amount,
            IncomeDate: date,
            IncomeDetail: detail,
            CategoryID: categoryId,
            ProjectID: projectId,
            Description: description,
            UserID: userId,
            Modified: new Date(),
            Created: new Date(),
        }
    });

    revalidatePath("/incomes");
    redirect("/incomes");
}

export async function updateIncome(id: number, formData: FormData) {
    const amount = parseFloat(formData.get("amount") as string);
    const date = new Date(formData.get("date") as string);
    const detail = formData.get("detail") as string;
    const categoryId = parseInt(formData.get("categoryId") as string);
    const projectId = formData.get("projectId") && formData.get("projectId") !== "none" ? parseInt(formData.get("projectId") as string) : null;
    const description = formData.get("description") as string;

    await prisma.incomes.update({
        where: { IncomeID: id },
        data: {
            Amount: amount,
            IncomeDate: date,
            IncomeDetail: detail,
            CategoryID: categoryId,
            ProjectID: projectId,
            Description: description,
            Modified: new Date(),
        }
    });

    revalidatePath("/incomes");
    revalidatePath(`/incomes/${id}`);
    redirect(`/incomes/${id}`);
}

export async function deleteIncome(id: number) {
    await prisma.incomes.delete({
        where: { IncomeID: id }
    });

    revalidatePath("/incomes");
    return { success: true };
}
