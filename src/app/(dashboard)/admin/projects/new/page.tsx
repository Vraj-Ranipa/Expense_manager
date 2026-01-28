import React from "react";
import { ProjectForm } from "@/components/projects/project-form";

export default function NewProjectPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center justify-between space-y-2 mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">Add New Project</h2>
                    <p className="text-muted-foreground">
                        Create a new project to manage expenses and incomes.
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <ProjectForm />
            </div>
        </div>
    );
}
