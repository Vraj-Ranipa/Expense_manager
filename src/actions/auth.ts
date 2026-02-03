'use server'

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/password';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});

export type AuthState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string;
};

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { email, password } = result.data;

    const user = await prisma.users.findUnique({
        where: { EmailAddress: email },
    });

    console.log('[LOGIN DEBUG] Attempting login for:', email);

    if (!user) {
        console.log('[LOGIN DEBUG] User not found in DB');
        return { message: 'Invalid email or password' };
    }

    console.log('[LOGIN DEBUG] User found in DB. ID:', user.UserID, 'Role:', user.Role);

    const isValid = await verifyPassword(password, user.Password);
    console.log('[LOGIN DEBUG] Password validation result:', isValid);

    if (!isValid) {
        console.log('[LOGIN DEBUG] Password mismatch');
        return { message: 'Invalid email or password' };
    }

    // Role is now part of the schema
    // @ts-ignore - Prisma types might not yet reflect schema change if generate failed
    await createSession(user.UserID, user.EmailAddress, user.Role);

    redirect('/');
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}
