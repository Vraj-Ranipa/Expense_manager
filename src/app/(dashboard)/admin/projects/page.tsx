import { prisma } from "@/lib/prisma";
import { ProjectGrid } from "@/components/projects/project-grid";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function ProjectsPage() {
    const data = await prisma.projects.findMany({
        orderBy: {
            Created: "desc",
        },
    });

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                        All Projects
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20">
                            <Sparkles className="h-3 w-3 text-sky-400" />
                        </div>
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your active and completed works.
                    </p>
                </div>
                <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:scale-105"
                >
                    <Link href="#">
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Link>
                </Button>
            </div>

            {/* Main Grid */}
            <ProjectGrid data={data} />
        </div>
    );
}
