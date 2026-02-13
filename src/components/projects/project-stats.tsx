import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder, PlayCircle, CheckCircle2, BarChart3 } from "lucide-react"

interface ProjectStatsProps {
    totalProjects: number
    activeProjects: number
    inactiveProjects: number
    completionRate: number
}

export function ProjectStats({
    totalProjects,
    activeProjects,
    inactiveProjects,
    completionRate,
}: ProjectStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
                        <Folder className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {totalProjects}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Total number of projects
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-900/20">
                        <PlayCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeProjects}</div>
                    <p className="text-xs text-muted-foreground">
                        Currently ongoing projects
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inactive Projects</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center dark:bg-slate-900/20">
                        <CheckCircle2 className="h-4 w-4 text-slate-600 dark:text-slate-500" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{inactiveProjects}</div>
                    <p className="text-xs text-muted-foreground">
                        Completed or paused projects
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-900/20">
                        <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-500" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completionRate}%</div>
                    <p className="text-xs text-muted-foreground">
                        Percentage of inactive projects
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
