'use client';

import { useActionState } from 'react';
import { login, AuthState } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const initialState: AuthState = {
    message: '',
    errors: {},
};

export default function LoginPage() {
    const [state, action, pending] = useActionState(login, initialState);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-background p-4 relative overflow-hidden">

            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <Card className="w-full max-w-sm z-10 border-border shadow-2xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">EM</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your credentials to access the account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                className="bg-background"
                            />
                            {state?.errors?.email && (
                                <p className="text-xs text-destructive">{state.errors.email[0]}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="bg-background"
                            />
                            {state?.errors?.password && (
                                <p className="text-xs text-destructive">{state.errors.password[0]}</p>
                            )}
                        </div>

                        {state?.message && (
                            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm text-center">
                                {state.message}
                            </div>
                        )}

                        <Button type="submit" className="w-full font-bold" disabled={pending}>
                            {pending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-center text-xs text-muted-foreground">
                    <p>Don't have an account? Contact your administrator.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
