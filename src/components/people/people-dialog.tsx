"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PeopleSchema, PeopleFormValues } from "@/lib/schemas"
import { createPeople, updatePeople } from "@/actions/people"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface PeopleDialogProps {
    trigger?: React.ReactNode
    initialData?: any // Should ideally match the People type from Prisma
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function PeopleDialog({ trigger, initialData, open: controlledOpen, onOpenChange: setControlledOpen }: PeopleDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const isEdit = !!initialData
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen
    const setOpen = setControlledOpen || setInternalOpen

    const form = useForm<PeopleFormValues>({
        resolver: zodResolver(PeopleSchema),
        defaultValues: {
            PeopleName: initialData?.PeopleName || "",
            MobileNo: initialData?.MobileNo || "",
            Email: initialData?.Email || "",
            Description: initialData?.Description || "",
            IsActive: initialData?.IsActive !== undefined ? initialData.IsActive : true,
        },
    })

    async function onSubmit(data: PeopleFormValues) {
        startTransition(async () => {
            try {
                let result;
                if (isEdit) {
                    result = await updatePeople(initialData.PeopleID, data);
                } else {
                    result = await createPeople(data);
                }

                if (result.error) {
                    alert(result.error);
                } else {
                    setOpen(false);
                    form.reset();
                    router.refresh(); // Ensure client-side cache updates
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
                    <DialogTitle>{isEdit ? "Edit Person" : "Add New Person"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update person details here." : "Fill in the details to add a new person."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="PeopleName" className="text-sm font-medium text-foreground/70">Name</Label>
                        <Input id="PeopleName" {...form.register("PeopleName")} placeholder="e.g. John Doe" className="h-11 transition-all focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                        {form.formState.errors.PeopleName && (
                            <p className="text-xs text-red-500">{form.formState.errors.PeopleName.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="MobileNo" className="text-sm font-medium text-foreground/70">Mobile</Label>
                            <Input id="MobileNo" {...form.register("MobileNo")} placeholder="e.g. 1234567890" className="h-11 transition-all focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                            {form.formState.errors.MobileNo && (
                                <p className="text-xs text-red-500">{form.formState.errors.MobileNo.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Email" className="text-sm font-medium text-foreground/70">Email</Label>
                            <Input id="Email" {...form.register("Email")} placeholder="e.g. john@example.com" className="h-11 transition-all focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" />
                            {form.formState.errors.Email && (
                                <p className="text-xs text-red-500">{form.formState.errors.Email.message}</p>
                            )}
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
                                Is this person active?
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
                            {isEdit ? "Update Person" : "Add Person"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
