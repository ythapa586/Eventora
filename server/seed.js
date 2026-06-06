const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Event = require('./models/Event');
const Booking = require('./models/Booking');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected');

    // Clear old data
    await Booking.deleteMany();
    await Event.deleteMany();
    await User.deleteMany();

    console.log('🗑️ Old Data Removed');

    // Create Users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@eventora.com',
        password: hashedPassword,
        role: 'admin',
        isverified: true
      },
      {
        name: 'Demo User',
        email: 'user@eventora.com',
        password: hashedPassword,
        role: 'user',
        isverified: true
      },
      {
        name: 'Alice Smith',
        email: 'alice@eventora.com',
        password: hashedPassword,
        role: 'user',
        isverified: true
      },
      {
        name: 'Bob Johnson',
        email: 'bob@eventora.com',
        password: hashedPassword,
        role: 'user',
        isverified: true
      },
      {
        name: 'Charlie Dave',
        email: 'charlie@eventora.com',
        password: hashedPassword,
        role: 'user',
        isverified: true
      }
    ]);

    console.log(`👤 ${users.length} Users Created`);

    const adminUser = users.find(user => user.role === 'admin');

    // Create Events
    const events = await Event.insertMany([
      {
        title: 'Tech Fest 2026',
        description: 'Annual Technology Festival',
        date: new Date('2026-07-10'),
        location: 'Delhi',
        category: 'Technology',
        totalSeats: 100,
        availableSeats: 100,
        ticketPrice: 500,
        imageUrl: 'https://example.com/techfest.jpg',
        createdBy: adminUser._id
      },
      {
        title: 'Music Night',
        description: 'Live music concert',
        date: new Date('2026-08-15'),
        location: 'Mumbai',
        category: 'Music',
        totalSeats: 200,
        availableSeats: 200,
        ticketPrice: 800,
        imageUrl: 'https://example.com/music.jpg',
        createdBy: adminUser._id
      },
      {
        title: 'Startup Summit',
        description: 'Meet top entrepreneurs and investors',
        date: new Date('2026-09-20'),
        location: 'Bangalore',
        category: 'Business',
        totalSeats: 150,
        availableSeats: 150,
        ticketPrice: 1000,
        imageUrl: 'https://example.com/startup.jpg',
        createdBy: adminUser._id
      },
      {
        title: 'Gaming Championship',
        description: 'National level gaming tournament',
        date: new Date('2026-10-05'),
        location: 'Hyderabad',
        category: 'Gaming',
        totalSeats: 300,
        availableSeats: 300,
        ticketPrice: 700,
        imageUrl: 'https://example.com/gaming.jpg',
        createdBy: adminUser._id
      },
      {
        title: 'AI Workshop',
        description: 'Hands-on Artificial Intelligence workshop',
        date: new Date('2026-11-12'),
        location: 'Pune',
        category: 'Education',
        totalSeats: 80,
        availableSeats: 80,
        ticketPrice: 1200,
        imageUrl: 'https://example.com/ai.jpg',
        createdBy: adminUser._id
      }
    ]);

    console.log(`🎉 ${events.length} Events Created`);

    // Create Bookings
    const bookings = [];

    for (let i = 1; i < users.length; i++) {
      bookings.push({
        user: users[i]._id,
        eventId: events[i % events.length]._id,
        status: 'confirmed',
        paymentStatus: 'paid',
        amount: events[i % events.length].ticketPrice
      });

      events[i % events.length].availableSeats -= 1;
      await events[i % events.length].save();
    }

    await Booking.insertMany(bookings);

    console.log(`🎫 ${bookings.length} Bookings Created`);

    console.log('\n===================================');
    console.log('🚀 DATABASE SEEDED SUCCESSFULLY');
    console.log('===================================');
    console.log('Admin Login:');
    console.log('Email: admin@eventora.com');
    console.log('Password: password123');
    console.log('-----------------------------------');
    console.log('User Login:');
    console.log('Email: user@eventora.com');
    console.log('Password: password123');
    console.log('===================================\n');

    process.exit();
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
};

seedDatabase();