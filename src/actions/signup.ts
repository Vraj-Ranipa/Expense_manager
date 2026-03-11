'use server'

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const signupSchema = z.object({
    username: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupState = {
    errors?: {
        username?: string[];
        email?: string[];
        phone?: string[];
        password?: string[];
    };
    message?: string;
};

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
    const result = signupSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { username, email, phone, password } = result.data;

    try {
        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { EmailAddress: email },
        });

        if (existingUser) {
            return { message: 'An account with this email already exists.' };
        }

        const hashedPassword = await hashPassword(password);

        // Create the user
        const user = await prisma.users.create({
            data: {
                UserName: username,
                EmailAddress: email,
                MobileNo: phone,
                Password: hashedPassword,
                Role: 'User', // Default role ensures regular users can't access admin
            },
        });

        // Log the user in immediately
        await createSession(user.UserID, user.EmailAddress, user.Role);

    } catch (error) {
        console.error('[SIGNUP ERROR]', error);
        return { message: 'An error occurred during registration. Please try again.' };
    }

    // Redirect to dashboard on success
    redirect('/');
}
