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
        <Card className="border shadow-sm bg-white">
            <CardHeader className="pb-6 border-b border-border/50">
                <CardTitle className="text-xl font-semibold text-foreground">{initialData ? "Edit Project" : "New Project"}</CardTitle>
                <CardDescription className="text-muted-foreground">{initialData ? "Modify the project details." : "Create a new project to track expenses and incomes."}</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
                <form action={onSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Project Name */}
                        <div className="space-y-2.5 col-span-1 md:col-span-2">
                            <Label htmlFor="name" className="text-sm font-medium text-foreground/70">Project Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g. Website Redesign"
                                defaultValue={initialData?.ProjectName || ""}
                                className="h-11 transition-all focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
                                required
                            />
                        </div>

                        {/* Start Date */}
                        <div className="space-y-2.5 flex flex-col">
                            <Label className="text-sm font-medium text-foreground/70">Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-11 pl-3 text-left font-normal border-input hover:bg-accent/50 hover:text-accent-foreground transition-colors",
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
                        <div className="space-y-2.5 flex flex-col">
                            <Label className="text-sm font-medium text-foreground/70">End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-11 pl-3 text-left font-normal border-input hover:bg-accent/50 hover:text-accent-foreground transition-colors",
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
                        <div className="space-y-2.5 col-span-1 md:col-span-2">
                            <Label htmlFor="description" className="text-sm font-medium text-foreground/70">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Add any extra notes here..."
                                defaultValue={initialData?.Description || ""}
                                className="resize-none min-h-[120px] transition-all focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 p-4"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading} className="w-full md:w-auto h-11 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-indigo-500/50">
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
