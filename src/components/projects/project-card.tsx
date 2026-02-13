import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export interface ProjectCardProps {
    project: {
        ProjectID: number;
        ProjectName: string;
        Description: string | null;
        ProjectStartDate: Date | null;
        ProjectEndDate: Date | null;
        IsActive: boolean | null;
        Created: Date;
    };
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group relative rounded-3xl border border-orange-100 bg-white p-1 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 h-full flex flex-col">
            <Link href={`/admin/projects/${project.ProjectID}`} className="absolute inset-0 z-20">
                <span className="sr-only">View Project</span>
            </Link>

            <div className="rounded-[20px] bg-gradient-to-br from-white to-orange-50/30 p-5 relative overflow-hidden h-full flex flex-col">
                <Briefcase className="absolute -right-6 -bottom-6 w-32 h-32 text-orange-100/50 -rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0" />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                <Briefcase className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-orange-700 transition-colors">
                                    {project.ProjectName}
                                </h3>
                                <Badge
                                    variant="outline"
                                    className={`mt-1 h-5 text-[10px] tracking-wider font-mono border-transparent ${project.IsActive
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {project.IsActive ? "ACTIVE" : "COMPLETED"}
                                </Badge>
                            </div>
                        </div>

                        <div className="opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight className="h-5 w-5 text-orange-500" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 min-h-[3rem] mb-6">
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {project.Description || "No description provided."}
                        </p>
                    </div>

                    {/* Footer: Dates */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-orange-100">
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                <Calendar className="h-3 w-3" /> Start
                            </div>
                            <p className="text-xs font-mono text-gray-700 font-medium">
                                {project.ProjectStartDate ? format(new Date(project.ProjectStartDate), "MMM d, yyyy") : "TBD"}
                            </p>
                        </div>
                        <div className="space-y-1 pl-4 border-l border-orange-100">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                <Clock className="h-3 w-3" /> End
                            </div>
                            <p className="text-xs font-mono text-gray-700 font-medium">
                                {project.ProjectEndDate ? format(new Date(project.ProjectEndDate), "MMM d, yyyy") : "Ongoing"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
