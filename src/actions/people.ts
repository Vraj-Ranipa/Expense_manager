'use server'

import { prisma } from "@/lib/prisma";
import { PeopleSchema } from "@/lib/schemas";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createPeople(formData: any) {
    const session = await getSession();
    if (!session || !session.userId) {
        return { error: "Unauthorized" };
    }

    const result = PeopleSchema.safeParse(formData);
    if (!result.success) {
        return { error: "Invalid data", details: result.error.flatten() };
    }

    const { PeopleName, MobileNo, Email, Description, IsActive } = result.data;

    try {
        await prisma.peoples.create({
            data: {
                PeopleName,
                MobileNo,
                Email,
                Description,
                IsActive,
                UserID: session.userId, // Link to creator
                Password: "defaultPassword", // Placeholder as per schema constraint
                PeopleCode: "P-" + Date.now().toString().slice(-6), // Simple code generation
            }
        });

        revalidatePath("/admin/people");
        return { success: true };
    } catch (error) {
        console.error("Create People Error:", error);
        return { error: "Failed to create person" };
    }
}

export async function updatePeople(id: number, formData: any) {
    const session = await getSession();
    if (!session || !session.userId) {
        return { error: "Unauthorized" };
    }

    const result = PeopleSchema.safeParse(formData);
    if (!result.success) {
        return { error: "Invalid data", details: result.error.flatten() };
    }

    const { PeopleName, MobileNo, Email, Description, IsActive } = result.data;

    try {
        await prisma.peoples.update({
            where: { PeopleID: id },
            data: {
                PeopleName,
                MobileNo,
                Email,
                Description,
                IsActive,
                Modified: new Date(),
            }
        });

        revalidatePath("/admin/people");
        return { success: true };
    } catch (error) {
        console.error("Update People Error:", error);
        return { error: "Failed to update person" };
    }
}

export async function deletePeople(id: number) {
    const session = await getSession();
    if (!session || !session.userId) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.peoples.delete({
            where: { PeopleID: id }
        });

        revalidatePath("/admin/people");
        return { success: true };
    } catch (error) {
        console.error("Delete People Error:", error);
        return { error: "Failed to delete person" };
    }
}
