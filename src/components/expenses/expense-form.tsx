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

interface ExpenseFormProps {
    categories: any[]
    projects: any[]
    peoples: any[]
}

export function ExpenseForm({ categories = [], projects = [], peoples = [] }: ExpenseFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        amount: "",
        date: new Date(),
        detail: "",
        categoryId: "",
        projectId: "",
        description: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setFormData(prev => ({ ...prev, date }))
        }
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call or form submission logic
        console.log("Submitting:", formData)
        // TODO: Implement actual server action or API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
    }

    return (
        <Card className="border-none bg-white/5 backdrop-blur-md shadow-2xl shadow-black/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">New Expense</CardTitle>
                <CardDescription>Enter the details of your new expense transaction.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Amount */}
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                <Input
                                    id="amount"
                                    name="amount"
                                    placeholder="0.00"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    className="pl-7 bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all font-mono text-lg"
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
                                            "w-full pl-3 text-left font-normal bg-black/20 border-white/10 hover:bg-white/5 hover:text-primary transition-colors",
                                            !formData.date && "text-muted-foreground"
                                        )}
                                    >
                                        {formData.date ? (
                                            format(formData.date, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.date}
                                        onSelect={handleDateChange}
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
                                placeholder="e.g. Grocery Shopping, Uber Ride"
                                value={formData.detail}
                                onChange={handleInputChange}
                                className="bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select onValueChange={(val) => handleSelectChange("categoryId", val)} value={formData.categoryId}>
                                <SelectTrigger className="bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.length > 0 ? categories.map((c: any) => (
                                        <SelectItem key={c.CategoryID} value={String(c.CategoryID)}>{c.CategoryName}</SelectItem>
                                    )) : (
                                        <SelectItem value="mock">Uncategorized (No Data)</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Project */}
                        <div className="space-y-2">
                            <Label>Project (Optional)</Label>
                            <Select onValueChange={(val) => handleSelectChange("projectId", val)} value={formData.projectId}>
                                <SelectTrigger className="bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20">
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
                                className="resize-none bg-black/20 border-white/10 focus:border-primary/50 focus:ring-primary/20 min-h-[100px]"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Expense
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
