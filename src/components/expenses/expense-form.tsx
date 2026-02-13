"use client"

import { useState } from "react"
import { CalendarIcon, Loader2, Save } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createExpense, updateExpense } from "@/actions/expenses"

interface ExpenseFormProps {
    categories: any[]
    projects: any[]
    peoples: any[]
    initialData?: any
}

export function ExpenseForm({ categories = [], projects = [], peoples = [], initialData }: ExpenseFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState<Date>(initialData?.ExpenseDate ? new Date(initialData.ExpenseDate) : new Date())

    async function onSubmit(formData: FormData) {
        setIsLoading(true)
        formData.append("date", date.toISOString());

        if (initialData) {
            await updateExpense(initialData.ExpenseID, formData);
        } else {
            await createExpense(formData);
        }
        setIsLoading(false)
    }

    return (
        <Card className="border shadow-sm bg-white">
            <CardHeader className="pb-6 border-b border-border/50">
                <CardTitle className="text-xl font-semibold text-foreground">{initialData ? "Edit Expense" : "New Expense"}</CardTitle>
                <CardDescription className="text-muted-foreground">{initialData ? "Make changes to the existing expense." : "Enter the details of your new expense transaction."}</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
                <form action={onSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Amount */}
                        <div className="space-y-2.5">
                            <Label htmlFor="amount" className="text-sm font-medium text-foreground/70">Amount</Label>
                            <div className="relative group">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    defaultValue={initialData?.Amount || ""}
                                    className="pl-7 h-11 text-lg font-medium transition-all focus-visible:ring-primary/20 focus-visible:border-primary"
                                    required
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="space-y-2.5 flex flex-col">
                            <Label className="text-sm font-medium text-foreground/70">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-11 pl-3 text-left font-normal border-input hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        {date ? (
                                            format(date, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(d) => d && setDate(d)}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Title/Detail */}
                        <div className="space-y-2.5 col-span-1 md:col-span-2">
                            <Label htmlFor="detail" className="text-sm font-medium text-foreground/70">Title</Label>
                            <Input
                                id="detail"
                                name="detail"
                                placeholder="e.g. Grocery Shopping, Uber Ride"
                                defaultValue={initialData?.ExpenseDetail || ""}
                                className="h-11 transition-all focus-visible:ring-primary/20 focus-visible:border-primary"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2.5">
                            <Label htmlFor="categoryId" className="text-sm font-medium text-foreground/70">Category</Label>
                            <Select name="categoryId" required defaultValue={initialData?.CategoryID ? String(initialData.CategoryID) : undefined}>
                                <SelectTrigger className="h-11 transition-all focus:ring-primary/20 focus:border-primary">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.length > 0 ? categories.map((c: any) => (
                                        <SelectItem key={c.CategoryID} value={String(c.CategoryID)}>{c.CategoryName}</SelectItem>
                                    )) : (
                                        <SelectItem value="mock" disabled>Uncategorized (No Data)</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Project */}
                        <div className="space-y-2.5">
                            <Label htmlFor="projectId" className="text-sm font-medium text-foreground/70">Project (Optional)</Label>
                            <Select name="projectId" defaultValue={initialData?.ProjectID ? String(initialData.ProjectID) : "none"}>
                                <SelectTrigger className="h-11 transition-all focus:ring-primary/20 focus:border-primary">
                                    <SelectValue placeholder="Select a project" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {projects.length > 0 ? projects.map((p: any) => (
                                        <SelectItem key={p.ProjectID} value={String(p.ProjectID)}>{p.ProjectName}</SelectItem>
                                    )) : null}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Description */}
                        <div className="space-y-2.5 col-span-1 md:col-span-2">
                            <Label htmlFor="description" className="text-sm font-medium text-foreground/70">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Add any extra notes here..."
                                defaultValue={initialData?.Description || ""}
                                className="resize-none min-h-[120px] transition-all focus-visible:ring-primary/20 focus-visible:border-primary p-4"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading} className="w-full md:w-auto h-11 px-8 bg-primary hover:bg-primary/90 text-white font-medium shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    {initialData ? "Update Expense" : "Save Expense"}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
