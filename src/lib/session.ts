import { cookies } from 'next/headers';
import { signToken, verifyToken } from '@/lib/auth';

const COOKIE_NAME = 'session';

export async function createSession(userId: number, email: string, role: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const token = await signToken({ userId, email, role });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    try {
        const payload = await verifyToken(token);
        if (!payload) return null;

        // Check expiry if needed (JWT usually handles it, but good to be explicit if using db sessions)
        const expiresAt = new Date(payload.expiresAt);
        if (new Date() > expiresAt) {
            await deleteSession();
            return null;
        }

        return payload;
    } catch {
        return null;
    }
}
