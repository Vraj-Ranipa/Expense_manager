"use client"

import { useState } from "react"
import { ExpenseDialog } from "./expense-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function AddExpenseButton({ categories, projects }: { categories: any[], projects: any[] }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <ExpenseDialog open={open} onOpenChange={setOpen} categories={categories} projects={projects} />
            <Button onClick={() => setOpen(true)} className="bg-rose-600 hover:bg-rose-700 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
            </Button>
        </>
    )
}
