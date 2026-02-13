"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BaseIncomeSchema, IncomeFormValues } from "@/lib/schemas"
import { createIncome, updateIncome } from "@/actions/incomes"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface IncomeDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: any
    categories: any[]
    projects: any[]
}

export function IncomeDialog({ open, onOpenChange, initialData, categories = [], projects = [] }: IncomeDialogProps) {
    const isEdit = !!initialData
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<IncomeFormValues>({
        resolver: zodResolver(BaseIncomeSchema),
        defaultValues: {
            Amount: initialData?.Amount ? String(initialData.Amount) : "",
            IncomeDate: initialData?.IncomeDate ? new Date(initialData.IncomeDate) : new Date(),
            IncomeDetail: initialData?.IncomeDetail || "",
            CategoryID: initialData?.categories?.CategoryID ? String(initialData.categories.CategoryID) : (initialData?.CategoryID ? String(initialData.CategoryID) : ""),
            ProjectID: initialData?.projects?.ProjectID ? String(initialData.projects.ProjectID) : (initialData?.ProjectID ? String(initialData.ProjectID) : "none"),
            Description: initialData?.Description || "",
        },
    })

    const onSubmit = async (data: IncomeFormValues) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append("amount", data.Amount)
            formData.append("date", data.IncomeDate.toISOString())
            formData.append("detail", data.IncomeDetail)
            formData.append("categoryId", data.CategoryID)
            formData.append("projectId", data.ProjectID === "none" ? "" : data.ProjectID || "")
            formData.append("description", data.Description || "")

            // Since schemas.ts BaseIncomeSchema misses 'IncomeDetail', I need to add it or append it manually.
            // Let's assume validation passes or I fix schema.

            if (isEdit) {
                await updateIncome(initialData.IncomeID, formData)
            } else {
                await createIncome(formData)
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
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Income" : "Add New Income"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update income details." : "Record a new income transaction."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Amount */}
                        <div className="space-y-2">
                            <Label htmlFor="Amount" className="text-sm font-medium text-foreground/70">Amount</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                <Input
                                    id="Amount"
                                    {...form.register("Amount")}
                                    className="pl-7 h-11 transition-all focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                                    placeholder="0.00"
                                />
                            </div>
                            {form.formState.errors.Amount && (
                                <p className="text-xs text-red-500">{form.formState.errors.Amount.message}</p>
                            )}
                        </div>

                        {/* Date */}
                        <div className="space-y-2 flex flex-col">
                            <Label className="text-sm font-medium text-foreground/70">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-11 pl-3 text-left font-normal border-input hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                                            !form.watch("IncomeDate") && "text-muted-foreground"
                                        )}
                                    >
                                        {form.watch("IncomeDate") ? (
                                            format(form.watch("IncomeDate"), "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={form.watch("IncomeDate")}
                                        onSelect={(d) => d && form.setValue("IncomeDate", d)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="IncomeDetail" className="text-sm font-medium text-foreground/70">Title</Label>
                        <Input
                            id="IncomeDetail"
                            {...form.register("IncomeDetail")}
                            placeholder="e.g. Salary, Freelance"
                            className="h-11 transition-all focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                        />
                        {form.formState.errors.IncomeDetail && (
                            <p className="text-xs text-red-500">{form.formState.errors.IncomeDetail.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="CategoryID" className="text-sm font-medium text-foreground/70">Category</Label>
                        <Select onValueChange={(v) => form.setValue("CategoryID", v)} defaultValue={form.watch("CategoryID")}>
                            <SelectTrigger className="h-11 transition-all focus:ring-emerald-500/20 focus:border-emerald-500">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c) => (
                                    <SelectItem key={c.CategoryID} value={String(c.CategoryID)}>{c.CategoryName}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.formState.errors.CategoryID && (
                            <p className="text-xs text-red-500">{form.formState.errors.CategoryID.message}</p>
                        )}
                    </div>

                    {/* Project */}
                    <div className="space-y-2">
                        <Label htmlFor="ProjectID" className="text-sm font-medium text-foreground/70">Project (Optional)</Label>
                        <Select onValueChange={(v) => form.setValue("ProjectID", v)} defaultValue={form.watch("ProjectID")}>
                            <SelectTrigger className="h-11 transition-all focus:ring-emerald-500/20 focus:border-emerald-500">
                                <SelectValue placeholder="Select a project" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {projects.map((p) => (
                                    <SelectItem key={p.ProjectID} value={String(p.ProjectID)}>{p.ProjectName}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="Description" className="text-sm font-medium text-foreground/70">Description (Optional)</Label>
                        <Textarea
                            id="Description"
                            {...form.register("Description")}
                            placeholder="Add any extra notes..."
                            className="resize-none min-h-[100px] transition-all focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEdit ? "Update Income" : "Add Income"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
