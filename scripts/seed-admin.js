const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@example.com';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

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

    console.log({ user });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
