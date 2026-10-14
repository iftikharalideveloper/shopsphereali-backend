import dotenv from 'dotenv';
dotenv.config();

import prisma from '../config/database.js';

async function viewData() {
  try {
    console.log('📊 Database Data\n');

    // ✅ Users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        referralCode: true,
        walletBalance: true,
        createdAt: true,
      },
    });
    console.log('👤 Users:');
    console.table(users);

    // ✅ Sellers
    const sellers = await prisma.seller.findMany({
      select: {
        id: true,
        storeName: true,
        storeSlug: true,
        status: true,
        commission: true,
        balance: true,
        userId: true,
      },
    });
    console.log('\n🏪 Sellers:');
    console.table(sellers);

    // ✅ Categories
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    console.log('\n📂 Categories:');
    console.table(categories);

    // ✅ Products
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        stock: true,
        sellerId: true,
        categoryId: true,
        userId: true,
      },
    });
    console.log('\n📦 Products:');
    console.table(products);

    // ✅ Wallets
    const wallets = await prisma.wallet.findMany({
      select: {
        id: true,
        userId: true,
        balance: true,
      },
    });
    console.log('\n💰 Wallets:');
    console.table(wallets);

    // ✅ Orders
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        orderNumber: true,
        status: true,
        totalAmount: true,
        paymentStatus: true,
        userId: true,
      },
    });
    console.log('\n🛒 Orders:');
    console.table(orders);

    console.log('\n🎉 Data view complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

viewData();