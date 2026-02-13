"use client"

import { useState } from "react"
import { IncomeDialog } from "./income-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function AddIncomeButton({ categories, projects }: { categories: any[], projects: any[] }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <IncomeDialog open={open} onOpenChange={setOpen} categories={categories} projects={projects} />
            <Button onClick={() => setOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Income
            </Button>
        </>
    )
}
