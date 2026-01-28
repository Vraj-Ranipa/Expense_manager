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
import { createIncome, updateIncome } from "@/actions/incomes"

interface IncomeFormProps {
    categories: any[]
    projects: any[]
    peoples: any[]
    initialData?: any
}

export function IncomeForm({ categories = [], projects = [], peoples = [], initialData }: IncomeFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState<Date>(initialData?.IncomeDate ? new Date(initialData.IncomeDate) : new Date())

    async function onSubmit(formData: FormData) {
        setIsLoading(true)
        formData.append("date", date.toISOString());

        if (initialData) {
            await updateIncome(initialData.IncomeID, formData);
        } else {
            await createIncome(formData);
        }
        setIsLoading(false)
    }

    return (
        <Card className="border-none bg-white/5 backdrop-blur-md shadow-2xl shadow-black/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">{initialData ? "Edit Income" : "New Income"}</CardTitle>
                <CardDescription>{initialData ? "Modify the details of this income transaction." : "Record a new income transaction."}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <form action={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Amount */}
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    defaultValue={initialData?.Amount || ""}
                                    className="pl-7 bg-black/20 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all font-mono text-lg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="space-y-2 flex flex-col">
                            <Label>Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal bg-black/20 border-white/10 hover:bg-white/5 hover:text-emerald-500 transition-colors",
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
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label htmlFor="detail">Title</Label>
                            <Input
                                id="detail"
                                name="detail"
                                placeholder="e.g. Salary, Freelance Work"
                                defaultValue={initialData?.IncomeDetail || ""}
                                className="bg-black/20 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="categoryId">Category</Label>
                            <Select name="categoryId" required defaultValue={initialData?.CategoryID ? String(initialData.CategoryID) : undefined}>
                                <SelectTrigger className="bg-black/20 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20">
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
                        <div className="space-y-2">
                            <Label htmlFor="projectId">Project (Optional)</Label>
                            <Select name="projectId" defaultValue={initialData?.ProjectID ? String(initialData.ProjectID) : "none"}>
                                <SelectTrigger className="bg-black/20 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20">
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
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Add any extra notes here..."
                                defaultValue={initialData?.Description || ""}
                                className="resize-none bg-black/20 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 min-h-[100px]"
                            />
                        </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all text-white">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    {initialData ? "Update Income" : "Save Income"}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
