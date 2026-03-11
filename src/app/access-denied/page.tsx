import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function AccessDeniedPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-destructive/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-destructive/5 rounded-full blur-[120px]" />
            </div>

            <div className="z-10 text-center max-w-md space-y-6">
                <div className="flex justify-center">
                    <div className="h-20 w-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                        <ShieldAlert className="h-10 w-10" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Access Denied</h1>
                    <p className="text-muted-foreground">
                        You don't have permission to view the requested page. This area is restricted to administrators.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                    <Button asChild className="font-medium px-8 w-full sm:w-auto">
                        <Link href="/">
                            Return to Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
