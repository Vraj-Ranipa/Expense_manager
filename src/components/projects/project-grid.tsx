"use client";

import { useState } from "react";
import { ProjectCard, ProjectCardProps } from "./project-card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ArrowUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface ProjectGridProps {
    data: ProjectCardProps["project"][];
}

type SortKey = "created" | "name" | "status";

export function ProjectGrid({ data }: ProjectGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("created");

    const filteredData = data
        .filter((project) => {
            const query = searchQuery.toLowerCase();
            const matchesName = project.ProjectName.toLowerCase().includes(query);
            const matchesDescription =
                project.Description?.toLowerCase().includes(query) || false;
            return matchesName || matchesDescription;
        })
        ?.sort((a, b) => {
            switch (sortKey) {
                case "name":
                    return a.ProjectName.localeCompare(b.ProjectName);
                case "status":
                    return a.IsActive === b.IsActive ? 0 : a.IsActive ? -1 : 1;
                case "created":
                default:
                    return 0;
            }
        });

    return (
        <div className="space-y-8">
            {/* Search Bar Container */}
            <div className="relative mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="relative flex items-center rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                    <Search className="ml-4 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search projects..."
                        className="border-none bg-transparent text-lg placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="flex items-center gap-2 pr-2">
                        <div className="h-8 w-[1px] bg-border mx-2" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-muted">
                                    <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Sort Projects</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={sortKey} onValueChange={(value) => setSortKey(value as SortKey)}>
                                    <DropdownMenuRadioItem value="created">Newest First</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="name">Name (A-Z)</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="status">Active First</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 mx-auto max-w-lg">
                    <div className="bg-white p-4 rounded-full mb-4 animate-pulse shadow-sm border border-gray-100">
                        <Search className="h-8 w-8 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No projects found</h3>
                    <p className="text-gray-500 mt-2">
                        We couldn't find any projects matching "{searchQuery}".
                    </p>
                    <Button
                        variant="link"
                        onClick={() => setSearchQuery("")}
                        className="mt-4 text-orange-500 hover:text-orange-600"
                    >
                        Clear filters
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((project) => (
                        <ProjectCard key={project.ProjectID} project={project} />
                    ))}
                </div>
            )}

            <div className="text-xs text-center text-muted-foreground/50 mt-12 uppercase tracking-widest">
                Showing {filteredData.length} of {data.length} projects
            </div>
        </div>
    );
}
