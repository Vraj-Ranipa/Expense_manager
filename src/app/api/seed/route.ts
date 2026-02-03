import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';

export async function GET() {
    try {
        const email = 'admin@example.com';
        const password = 'admin123';
        const hashedPassword = await hashPassword(password);

        const user = await prisma.users.upsert({
            where: { EmailAddress: email },
            update: {
                Password: hashedPassword,
                Role: 'Admin',
            },
            create: {
                EmailAddress: email,
                UserName: 'Admin User',
                Password: hashedPassword,
                Role: 'Admin',
                MobileNo: '1234567890',
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
