"use client"

import { useState } from "react"
import { CalendarIcon, Loader2, Save } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createProject, updateProject } from "@/actions/projects"

interface ProjectFormProps {
    initialData?: any
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState<Date | undefined>(initialData?.ProjectStartDate ? new Date(initialData.ProjectStartDate) : undefined)
    const [endDate, setEndDate] = useState<Date | undefined>(initialData?.ProjectEndDate ? new Date(initialData.ProjectEndDate) : undefined)

    async function onSubmit(formData: FormData) {
        setIsLoading(true)
        if (startDate) formData.append("startDate", startDate.toISOString());
        if (endDate) formData.append("endDate", endDate.toISOString());

        if (initialData) {
            await updateProject(initialData.ProjectID, formData);
        } else {
            await createProject(formData);
        }
        setIsLoading(false)
    }

    return (
        <Card className="border-none bg-white/5 backdrop-blur-md shadow-2xl shadow-black/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{initialData ? "Edit Project" : "New Project"}</CardTitle>
                <CardDescription>{initialData ? "Modify the project details." : "Create a new project to track expenses and incomes."}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <form action={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Project Name */}
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g. Website Redesign"
                                defaultValue={initialData?.ProjectName || ""}
                                className="bg-black/20 border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                                required
                            />
                        </div>

                        {/* Start Date */}
                        <div className="space-y-2 flex flex-col">
                            <Label>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal bg-black/20 border-white/10 hover:bg-white/5 hover:text-indigo-500 transition-colors",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        {startDate ? (
                                            format(startDate, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* End Date */}
                        <div className="space-y-2 flex flex-col">
                            <Label>End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal bg-black/20 border-white/10 hover:bg-white/5 hover:text-indigo-500 transition-colors",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        {endDate ? (
                                            format(endDate, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Add any extra notes here..."
                                defaultValue={initialData?.Description || ""}
                                className="resize-none bg-black/20 border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20 min-h-[100px]"
                            />
                        </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all text-white">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    {initialData ? "Update Project" : "Create Project"}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
