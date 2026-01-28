"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExpense(formData: FormData) {
    const amount = parseFloat(formData.get("amount") as string);
    const date = new Date(formData.get("date") as string);
    const detail = formData.get("detail") as string;
    const categoryId = parseInt(formData.get("categoryId") as string);
    const projectId = formData.get("projectId") && formData.get("projectId") !== "none" ? parseInt(formData.get("projectId") as string) : null;
    const description = formData.get("description") as string;

    // TODO: Get actual logged in user ID
    const userId = 1;

    await prisma.expenses.create({
        data: {
            Amount: amount,
            ExpenseDate: date,
            ExpenseDetail: detail,
            CategoryID: categoryId,
            ProjectID: projectId,
            Description: description,
            UserID: userId,
            Modified: new Date(),
            Created: new Date(),
        }
    });

    revalidatePath("/expenses");
    redirect("/expenses");
}

export async function updateExpense(id: number, formData: FormData) {
    const amount = parseFloat(formData.get("amount") as string);
    const date = new Date(formData.get("date") as string);
    const detail = formData.get("detail") as string;
    const categoryId = parseInt(formData.get("categoryId") as string);
    const projectId = formData.get("projectId") && formData.get("projectId") !== "none" ? parseInt(formData.get("projectId") as string) : null;
    const description = formData.get("description") as string;

    await prisma.expenses.update({
        where: { ExpenseID: id },
        data: {
            Amount: amount,
            ExpenseDate: date,
            ExpenseDetail: detail,
            CategoryID: categoryId,
            ProjectID: projectId,
            Description: description,
            Modified: new Date(),
        }
    });

    revalidatePath("/expenses");
    revalidatePath(`/expenses/${id}`);
    redirect(`/expenses/${id}`);
}

export async function deleteExpense(id: number) {
    await prisma.expenses.delete({
        where: { ExpenseID: id }
    });

    revalidatePath("/expenses");
    return { success: true };
}
