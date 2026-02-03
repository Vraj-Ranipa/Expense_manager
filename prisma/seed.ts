import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/password';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@example.com';
    const password = 'admin123';
    const hashedPassword = await hashPassword(password);

    const user = await prisma.users.upsert({
        where: { EmailAddress: email },
        update: {
            Password: hashedPassword,
            // @ts-ignore
            Role: 'Admin',
        },
        create: {
            EmailAddress: email,
            UserName: 'Admin User',
            Password: hashedPassword,
            // @ts-ignore
            Role: 'Admin',
            MobileNo: '1234567890',
        },
    });

    console.log('Seeded User:', user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
