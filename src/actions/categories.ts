'use server'

import { prisma } from "@/lib/prisma";
import { CategorySchema } from "@/lib/schemas";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: any) {
    const session = await getSession();
    if (!session || !session.userId) {
        return { error: "Unauthorized" };
    }

    const result = CategorySchema.safeParse(formData);
    if (!result.success) {
        return { error: "Invalid data", details: result.error.flatten() };
    }

    const { CategoryName, IsExpense, IsIncome, Description, IsActive } = result.data;

    try {
        await prisma.categories.create({
            data: {
                CategoryName,
                IsExpense,
                IsIncome,
                Description,
                IsActive,
                UserID: session.userId,
            }
        });

        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        console.error("Create Category Error:", error);
        return { error: "Failed to create category" };
    }
}

export async function updateCategory(id: number, formData: any) {
    const session = await getSession();
    if (!session || !session.userId) {
        return { error: "Unauthorized" };
    }

    const result = CategorySchema.safeParse(formData);
    if (!result.success) {
        return { error: "Invalid data", details: result.error.flatten() };
    }

    const { CategoryName, IsExpense, IsIncome, Description, IsActive } = result.data;

    try {
        await prisma.categories.update({
            where: { CategoryID: id },
            data: {
                CategoryName,
                IsExpense,
                IsIncome,
                Description,
                IsActive,
                Modified: new Date(),
            }
        });

        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        console.error("Update Category Error:", error);
        return { error: "Failed to update category" };
    }
}

export async function deleteCategory(id: number) {
    const session = await getSession();
    if (!session || !session.userId) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.categories.delete({
            where: { CategoryID: id }
        });

        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        console.error("Delete Category Error:", error);
        return { error: "Failed to delete category" };
    }
}
