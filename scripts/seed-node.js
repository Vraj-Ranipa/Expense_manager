const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Admin User...');
    try {
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

        console.log('✅ Admin User Seeded Successfully:');
        console.log('   ID:', user.UserID);
        console.log('   Email:', user.EmailAddress);
    } catch (error) {
        console.error('❌ Error seeding user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
