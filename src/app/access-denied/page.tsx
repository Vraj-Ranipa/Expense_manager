import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function AccessDenied() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-center p-4">
            <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                <ShieldAlert className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Access Denied</h1>
            <p className="text-muted-foreground max-w-[500px] mb-8">
                You do not have permission to view this page. This area is restricted to specific user roles.
            </p>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/">Return to Dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/login">Switch Account</Link>
                </Button>
            </div>
        </div>
    );
}
