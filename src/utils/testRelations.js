import dotenv from 'dotenv';
dotenv.config();

import prisma from '../config/database.js';

async function testRelations() {
  try {
    console.log('📡 Testing relations...\n');

    // ✅ Pehle purana test data delete karein
    console.log('🧹 Cleaning up old test data...');
    
    // Order matters (foreign keys)
    await prisma.message.deleteMany({ where: { sender: { email: 'test@example.com' } } });
    await prisma.conversationMember.deleteMany({ where: { user: { email: 'test@example.com' } } });
    await prisma.cartItem.deleteMany({ where: { user: { email: 'test@example.com' } } });
    await prisma.wishlist.deleteMany({ where: { user: { email: 'test@example.com' } } });
    await prisma.review.deleteMany({ where: { user: { email: 'test@example.com' } } });
    await prisma.orderItem.deleteMany({ where: { order: { user: { email: 'test@example.com' } } } });
    await prisma.order.deleteMany({ where: { user: { email: 'test@example.com' } } });
    await prisma.product.deleteMany({ where: { seller: { user: { email: 'test@example.com' } } } });
    await prisma.seller.deleteMany({ where: { user: { email: 'test@example.com' } } });
    await prisma.wallet.deleteMany({ where: { user: { email: 'test@example.com' } } });
    await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
    
    console.log('✅ Old test data cleaned\n');

    // ✅ Ab naya data create karein
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        referralCode: 'TEST123',
      },
    });
    console.log('✅ User created:', user.id, user.name);

    // ... baaki code same rahega ...

    // ✅ Create a wallet for the user
    const wallet = await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
      },
    });
    console.log('✅ Wallet created:', wallet.id);

    // ✅ Create a category
    const category = await prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
      },
    });
    console.log('✅ Category created:', category.id, category.name);

    // ✅ Create a seller for the user
    const seller = await prisma.seller.create({
      data: {
        storeName: 'Test Store',
        storeSlug: 'test-store',
        userId: user.id,
      },
    });
    console.log('✅ Seller created:', seller.id, seller.storeName);

    // ✅ Create a product
    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        slug: 'test-product',
        description: 'A test product',
        price: 1000,
        sellerId: seller.id,
        categoryId: category.id,
        userId: user.id,
        images: [],
        videos: [],
        tags: [],
      },
    });
    console.log('✅ Product created:', product.id, product.name);

    // ✅ Fetch user with all relations
    const userWithRelations = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        wallet: true,
        seller: {
          include: {
            products: true,
          },
        },
      },
    });

    console.log('\n📊 User with relations:');
    console.log('  - Name:', userWithRelations.name);
    console.log('  - Wallet balance:', userWithRelations.wallet?.balance);
    console.log('  - Seller:', userWithRelations.seller?.storeName);
    console.log('  - Products:', userWithRelations.seller?.products.length);

    console.log('\n🎉 All relations working correctly!');

    // ✅ Cleanup (delete test data)
    await prisma.product.delete({ where: { id: product.id } });
    await prisma.seller.delete({ where: { id: seller.id } });
    await prisma.category.delete({ where: { id: category.id } });
    await prisma.wallet.delete({ where: { id: wallet.id } });
    await prisma.user.delete({ where: { id: user.id } });
    console.log('\n🧹 Test data cleaned up');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testRelations();