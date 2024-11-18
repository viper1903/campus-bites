const mongoose = require('mongoose');
const User = require('../models/User');
const Item = require('../models/Item');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/campus_bites', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Example operations
async function databaseExamples() {
  try {
    // Create a new user
    const newUser = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      rollNo: 'R12345',
      password: 'hashedPassword',
      userType: 'user'
    });
    await newUser.save();
    console.log('User created successfully');

    // Create a new item
    const newItem = new Item({
      title: 'Test Item',
      description: 100, // price
      image: 'path/to/image.jpg',
      category: 'Food'
    });
    await newItem.save();
    console.log('Item created successfully');

    // Query users
    const users = await User.find();
    console.log('Users:', users);

    // Query items
    const items = await Item.find();
    console.log('Items:', items);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

databaseExamples(); 