import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
    console.log('Checking database connection...');
    try {
        const email = 'admin@example.com';
        const user = await prisma.users.findUnique({
            where: { EmailAddress: email },
        });

        if (user) {
            console.log('✅ User found:');
            console.log('   ID:', user.UserID);
            console.log('   Email:', user.EmailAddress);
            console.log('   Role:', user.Role);
            console.log('   Password Hash Length:', user.Password.length);
            console.log('   Password Hash Prefix:', user.Password.substring(0, 10));
        } else {
            console.log('❌ User NOT found in database.');
            // List all users to see if anyone exists
            const count = await prisma.users.count();
            console.log(`   Total users in DB: ${count}`);
        }
    } catch (error) {
        console.error('❌ Database error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
