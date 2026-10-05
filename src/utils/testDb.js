import dotenv from 'dotenv';
dotenv.config();

import prisma from '../config/database.js'

async function testDatabase() {
  try {
    console.log('📡 Connecting to database...');

    // ✅ Count users
    const userCount = await prisma.user.count();
    console.log(`✅ Total users: ${userCount}`);

    // ✅ Count categories
    const categoryCount = await prisma.category.count();
    console.log(`✅ Total categories: ${categoryCount}`);

    console.log('🎉 Database connection successful!');
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();