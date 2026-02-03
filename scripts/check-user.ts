import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@example.com';
    const user = await prisma.users.findUnique({
        where: { EmailAddress: email },
    });

    if (user) {
        console.log('User found:');
        console.log('ID:', user.UserID);
        console.log('Email:', user.EmailAddress);
        console.log('Role:', user.Role);
        console.log('Password Length:', user.Password.length);
        console.log('Password starts with:', user.Password.substring(0, 10));
    } else {
        console.log('User NOT found in database.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
