"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CategorySchema, CategoryFormValues } from "@/lib/schemas"
import { createCategory, updateCategory } from "@/actions/categories"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface CategoryDialogProps {
    trigger?: React.ReactNode
    initialData?: any
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function CategoryDialog({ trigger, initialData, open: controlledOpen, onOpenChange: setControlledOpen }: CategoryDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const isEdit = !!initialData
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen
    const setOpen = setControlledOpen || setInternalOpen

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            CategoryName: initialData?.CategoryName || "",
            IsExpense: initialData?.IsExpense || false,
            IsIncome: initialData?.IsIncome || false,
            Description: initialData?.Description || "",
            IsActive: initialData?.IsActive !== undefined ? initialData.IsActive : true,
        },
    })

    async function onSubmit(data: CategoryFormValues) {
        startTransition(async () => {
            try {
                let result;
                if (isEdit) {
                    result = await updateCategory(initialData.CategoryID, data);
                } else {
                    result = await createCategory(data);
                }

                if (result.error) {
                    alert(result.error);
                } else {
                    setOpen(false);
                    form.reset();
                    router.refresh();
                }
            } catch (error) {
                console.error("Submission error", error);
                alert("An unexpected error occurred.");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Category" : "Add New Category"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update category details." : "Create a new category for expenses or incomes."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="CategoryName" className="text-sm font-medium text-foreground/70">Name</Label>
                        <Input id="CategoryName" {...form.register("CategoryName")} placeholder="e.g. Travel, Salary" className="h-11 transition-all focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                        {form.formState.errors.CategoryName && (
                            <p className="text-xs text-red-500">{form.formState.errors.CategoryName.message}</p>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <div className="flex items-center space-x-3 border-2 border-dashed border-border/60 hover:border-border hover:bg-accent/30 p-4 rounded-lg flex-1 transition-all cursor-pointer" onClick={() => form.setValue("IsExpense", !form.watch("IsExpense"))}>
                            <Checkbox
                                id="IsExpense"
                                checked={form.watch("IsExpense")}
                                onCheckedChange={(c) => form.setValue("IsExpense", !!c)}
                            />
                            <Label htmlFor="IsExpense" className="cursor-pointer font-medium">Expense</Label>
                        </div>
                        <div className="flex items-center space-x-3 border-2 border-dashed border-border/60 hover:border-border hover:bg-accent/30 p-4 rounded-lg flex-1 transition-all cursor-pointer" onClick={() => form.setValue("IsIncome", !form.watch("IsIncome"))}>
                            <Checkbox
                                id="IsIncome"
                                checked={form.watch("IsIncome")}
                                onCheckedChange={(c) => form.setValue("IsIncome", !!c)}
                            />
                            <Label htmlFor="IsIncome" className="cursor-pointer font-medium">Income</Label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="Description" className="text-sm font-medium text-foreground/70">Description</Label>
                        <Textarea id="Description" {...form.register("Description")} placeholder="Additional details..." className="resize-none min-h-[100px] transition-all focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>Active Status</Label>
                            <div className="text-[0.8rem] text-muted-foreground">
                                Enable this category?
                            </div>
                        </div>
                        <Switch
                            checked={form.watch("IsActive")}
                            onCheckedChange={(checked) => form.setValue("IsActive", checked)}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEdit ? "Update Category" : "Add Category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
