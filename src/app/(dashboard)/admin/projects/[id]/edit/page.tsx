
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/projects/project-form";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
        return notFound();
    }

    const project = await prisma.projects.findUnique({
        where: { ProjectID: projectId },
    });

    if (!project) {
        return notFound();
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto w-full pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Edit Project</h1>
                <p className="text-muted-foreground">Modify the details of your project.</p>
            </div>

            <ProjectForm initialData={project} />
        </div>
    );
}
