"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUrl = process.env.DATABASE_URL;
console.log('--- Environment Check ---');
console.log('DATABASE_URL loaded:', dbUrl ? 'YES' : 'NO');
// Tentando passar datasources. Se o Prisma 7 mudou isso, o @ts-nocheck vai deixar passar e veremos o erro de runtime se houver.
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: dbUrl,
        },
    },
});
async function main() {
    console.log('\nTesting database connection...');
    try {
        const userCount = await prisma.user.count();
        console.log(`✅ Success! Database Connected. Users in DB: ${userCount}`);
    }
    catch (error) {
        console.error('❌ Connection failed:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
