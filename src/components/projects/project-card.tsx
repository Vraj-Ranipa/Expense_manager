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
        StartDate: Date | null
        EndDate: Date | null
        IsActive: boolean
        Created: Date
    }
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-black/80 p-1 transition-all duration-500 hover:border-sky-500/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] hover:-translate-y-1">
            {/* Glass Inner Container */}
            <div className="relative h-full flex flex-col justify-between rounded-2xl bg-white/5 p-6 backdrop-blur-sm overflow-hidden">

                {/* Large Watermark Icon */}
                <div className="absolute -bottom-6 -right-6 text-white/[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-sky-500/[0.05]">
                    <Briefcase className="h-48 w-48" strokeWidth={1} />
                </div>

                {/* Header Section */}
                <div className="relative z-10 flex items-start justify-between">
                    <div className="space-y-1">
                        <Badge
                            variant="secondary"
                            className={`mb-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${project.IsActive
                                    ? "bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:border-sky-500/50"
                                    : "bg-white/5 text-muted-foreground border border-white/10"
                                }`}
                        >
                            {project.IsActive ? "● Active Project" : "● Completed"}
                        </Badge>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 shadow-inner group-hover:from-sky-500/20 group-hover:to-transparent transition-colors duration-500">
                                <Briefcase className="h-6 w-6 text-white group-hover:text-sky-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold leading-tight text-white group-hover:text-primary transition-colors">
                                    {project.ProjectName}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Client Project
                                </p>
                            </div>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl">
                            <DropdownMenuItem className="focus:bg-sky-500/20 focus:text-sky-400 cursor-pointer">Edit Project</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-rose-500/20 focus:text-rose-400 cursor-pointer text-rose-500">Delete Project</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Description - Optional */}
                <div className="relative z-10 mt-6 min-h-[3rem]">
                    <p className="text-sm text-muted-foreground/80 line-clamp-2">
                        {project.Description || "No description provided for this project."}
                    </p>
                </div>

                {/* Footer / Dates Grid */}
                <div className="relative z-10 mt-6 grid grid-cols-2 gap-4 rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                            <Calendar className="h-3 w-3" />
                            Start Date
                        </div>
                        <p className="text-sm font-semibold text-white">
                            {project.StartDate ? format(new Date(project.StartDate), "MMM d, yyyy") : "TBD"}
                        </p>
                    </div>
                    <div className="space-y-1 border-l border-white/5 pl-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                            <Clock className="h-3 w-3" />
                            End Date
                        </div>
                        <p className="text-sm font-semibold text-white">
                            {project.EndDate ? format(new Date(project.EndDate), "MMM d, yyyy") : "Ongoing"}
                        </p>
                    </div>
                </div>

                {/* Hover Action */}
                <div className="absolute top-0 right-0 p-6 opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-20 pointer-events-none">
                    <ArrowUpRight className="h-6 w-6 text-sky-400" />
                </div>
            </div>
        </div>
    )
}
