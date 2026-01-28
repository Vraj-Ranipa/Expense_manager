"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") ? new Date(formData.get("startDate") as string) : null;
    const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;

    // TODO: Get actual logged in user ID
    const userId = 1;

    await prisma.projects.create({
        data: {
            ProjectName: name,
            Description: description,
            ProjectStartDate: startDate,
            ProjectEndDate: endDate,
            UserID: userId,
            IsActive: true,
            Modified: new Date(),
            Created: new Date(),
        }
    });

    revalidatePath("/admin/projects");
    redirect("/admin/projects");
}

export async function updateProject(id: number, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") ? new Date(formData.get("startDate") as string) : null;
    const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;
    const isActive = formData.get("isActive") === "true";

    await prisma.projects.update({
        where: { ProjectID: id },
        data: {
            ProjectName: name,
            Description: description,
            ProjectStartDate: startDate,
            ProjectEndDate: endDate,
            IsActive: isActive,
            Modified: new Date(),
        }
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}`);
    redirect(`/admin/projects/${id}`);
}

export async function deleteProject(id: number) {
    await prisma.projects.delete({
        where: { ProjectID: id }
    });

    revalidatePath("/admin/projects");
    return { success: true };
}
