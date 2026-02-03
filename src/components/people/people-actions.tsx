"use client"

import { useState, useTransition } from "react"
import { MoreHorizontal, Edit, Trash, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { PeopleDialog } from "./people-dialog"
import { deletePeople } from "@/actions/people"
import { useRouter } from "next/navigation"

export function PeopleActions({ person }: { person: any }) {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this person? This cannot be undone.")) {
            startTransition(async () => {
                try {
                    const res = await deletePeople(person.PeopleID)
                    if (res?.error) {
                        alert(res.error)
                    } else {
                        router.refresh()
                    }
                } catch (error) {
                    alert("Failed to delete person")
                }
            })
        }
    }

    return (
        <>
            <PeopleDialog open={open} onOpenChange={setOpen} initialData={person} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/people/${person.PeopleID}`}>
                            <FileText className="mr-2 h-4 w-4" />
                            Detail
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setOpen(true); }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} disabled={isPending} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
