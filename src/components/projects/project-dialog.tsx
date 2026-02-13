"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProjectSchema, ProjectFormValues } from "@/lib/schemas"
import { createProject, updateProject } from "@/actions/projects"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

interface ProjectDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: any
}

export function ProjectDialog({ open, onOpenChange, initialData }: ProjectDialogProps) {
    const isEdit = !!initialData
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            name: initialData?.ProjectName || "",
            description: initialData?.Description || "",
            startDate: initialData?.ProjectStartDate ? new Date(initialData.ProjectStartDate) : undefined,
            endDate: initialData?.ProjectEndDate ? new Date(initialData.ProjectEndDate) : undefined,
            isActive: initialData?.IsActive ?? true,
        },
    })

    const onSubmit = async (data: ProjectFormValues) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("description", data.description || "")
            if (data.startDate) formData.append("startDate", data.startDate.toISOString())
            if (data.endDate) formData.append("endDate", data.endDate.toISOString())
            formData.append("isActive", String(data.isActive))

            if (isEdit) {
                await updateProject(initialData.ProjectID, formData)
            } else {
                await createProject(formData)
            }
            onOpenChange(false)
            form.reset()
            router.refresh()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Project" : "New Project"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update project details." : "Create a new project to track expenses and incomes."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            {...form.register("name")}
                            placeholder="e.g. Website Redesign"
                        />
                        {form.formState.errors.name && (
                            <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            {...form.register("description")}
                            placeholder="Brief description of the project..."
                            className="resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div className="space-y-2 flex flex-col">
                            <Label>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !form.watch("startDate") && "text-muted-foreground"
                                        )}
                                    >
                                        {form.watch("startDate") ? (
                                            format(form.watch("startDate")!, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={form.watch("startDate")}
                                        onSelect={(d) => form.setValue("startDate", d)}
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
                                            "w-full pl-3 text-left font-normal",
                                            !form.watch("endDate") && "text-muted-foreground"
                                        )}
                                    >
                                        {form.watch("endDate") ? (
                                            format(form.watch("endDate")!, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={form.watch("endDate")}
                                        onSelect={(d) => form.setValue("endDate", d)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Active Status - Only for Edit */}
                    {isEdit && (
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="isActive"
                                checked={form.watch("isActive")}
                                onCheckedChange={(checked) => form.setValue("isActive", checked as boolean)}
                            />
                            <Label htmlFor="isActive" className="cursor-pointer">
                                Active Project
                            </Label>
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEdit ? "Update Project" : "Create Project"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
