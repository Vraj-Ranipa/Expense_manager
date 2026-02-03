import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase, MoreHorizontal, Clock, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface ProjectCardProps {
    project: {
        ProjectID: number
        ProjectName: string
        Description: string | null
        ProjectStartDate: Date | null
        ProjectEndDate: Date | null
        IsActive: boolean | null
        Created: Date
    }
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-0 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1">
            <div className="relative h-full flex flex-col justify-between p-6 overflow-hidden">

                {/* Header Section */}
                <div className="relative z-10 flex items-start justify-between">
                    <div className="space-y-1">
                        <Badge
                            variant="secondary"
                            className={`mb-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${project.IsActive
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-muted text-muted-foreground border border-border"
                                }`}
                        >
                            {project.IsActive ? "Active Project" : "Completed"}
                        </Badge>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-colors duration-500">
                                <Briefcase className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                                    {project.ProjectName}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Client Project
                                </p>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Description - Optional */}
                <div className="relative z-10 mt-6 min-h-[3rem]">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.Description || "No description provided for this project."}
                    </p>
                </div>

                {/* Footer / Dates Grid */}
                <div className="relative z-10 mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-muted/30 p-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
                            <Calendar className="h-3 w-3" />
                            Start Date
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                            {project.ProjectStartDate ? format(new Date(project.ProjectStartDate), "MMM d, yyyy") : "TBD"}
                        </p>
                    </div>
                    <div className="space-y-1 border-l border-border pl-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
                            <Clock className="h-3 w-3" />
                            End Date
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                            {project.ProjectEndDate ? format(new Date(project.ProjectEndDate), "MMM d, yyyy") : "Ongoing"}
                        </p>
                    </div>
                </div>

                {/* Hover Action */}
                <div className="absolute top-0 right-0 p-6 opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-20 pointer-events-none">
                    <ArrowUpRight className="h-6 w-6 text-primary" />
                </div>
            </div>
        </div>
    )
}
