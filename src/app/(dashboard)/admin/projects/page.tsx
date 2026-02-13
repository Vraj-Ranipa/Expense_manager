import { prisma } from "@/lib/prisma";
import { AddProjectButton } from "@/components/projects/add-project-button";
import { ProjectsClient } from "@/components/projects/projects-client";
import { ProjectStats } from "@/components/projects/project-stats";

export default async function ProjectsPage() {
    const data = await prisma.projects.findMany({
        orderBy: {
            ProjectID: 'desc'
        }
    });

    const totalProjects = data.length;
    const activeProjects = data.filter(p => p.IsActive).length;
    const inactiveProjects = totalProjects - activeProjects;
    const completionRate = totalProjects > 0 ? Math.round((inactiveProjects / totalProjects) * 100) : 0;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">
                        Manage and track your projects.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <AddProjectButton />
                </div>
            </div>

            <ProjectStats
                totalProjects={totalProjects}
                activeProjects={activeProjects}
                inactiveProjects={inactiveProjects}
                completionRate={completionRate}
            />

            <ProjectsClient data={data} />
        </div>
    );
}
