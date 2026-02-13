"use client"

import { useState } from "react"
import { ProjectDialog } from "./project-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function AddProjectButton() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <ProjectDialog open={open} onOpenChange={setOpen} />
            <Button onClick={() => setOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
            </Button>
        </>
    )
}
