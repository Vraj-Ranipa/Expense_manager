
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Clock, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Logo } from "@/components/shared/logo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectDetailHeaderProps {
    project: {
        ProjectID: number;
        ProjectName: string;
        ProjectLogo: string | null;
        Created: Date | string;
        IsActive: boolean | null;
        Description: string | null;
    }
}

export function ProjectDetailHeader({ project }: ProjectDetailHeaderProps) {
    return (
        <div className="flex-none px-4 py-3 md:px-6 border-b border-border/60 bg-background/90 backdrop-blur-xl z-50 shadow-sm sticky top-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-muted/80 transition-colors h-8 w-8">
                        <Link href="/admin/projects">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div className="flex items-center gap-3">
                        <Logo
                            path={project.ProjectLogo}
                            alt={project.ProjectName}
                            fallbackClassName="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold"
                            fallbackIcon={null}
                        />
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                    {project.ProjectName}
                                </h1>
                                <Badge variant="secondary" className="font-mono text-xs px-2 h-6 border-transparent bg-muted text-muted-foreground">
                                    #{project.ProjectID}
                                </Badge>
                                {project.IsActive ? (
                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-2 h-6">Active</Badge>
                                ) : (
                                    <Badge variant="secondary" className="px-2 h-6">Inactive</Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Created {format(new Date(project.Created), "MMMM do, yyyy")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-auto sm:ml-0">
                    <Button variant="outline" size="sm" asChild className="h-8 text-xs hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all px-3 hidden sm:flex cursor-pointer">
                        <Link href={`/admin/projects/${project.ProjectID}/edit`}>
                            <Edit className="h-3.5 w-3.5 mr-1.5" />
                            Edit Project
                        </Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:hidden">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/projects/${project.ProjectID}/edit`} className="flex w-full cursor-pointer">
                                    <Edit className="mr-2 h-4 w-4" /> Edit Project
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={async () => {
                                    if (confirm("Are you sure you want to delete this project?")) {
                                        const { deleteProject } = await import("@/actions/projects");
                                        await deleteProject(project.ProjectID);
                                    }
                                }}
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 text-xs shadow-sm hover:shadow-md transition-all px-3 hidden sm:flex bg-red-600 hover:bg-red-700"
                        onClick={async () => {
                            if (confirm("Are you sure you want to delete this project?")) {
                                const { deleteProject } = await import("@/actions/projects");
                                await deleteProject(project.ProjectID);
                            }
                        }}
                    >
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
