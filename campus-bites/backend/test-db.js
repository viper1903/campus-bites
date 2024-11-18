const mongoose = require('mongoose');

// Test database connection
mongoose.connect('mongodb+srv://souravrider10:5Y0blpdfr9ks8uyh@cluster0.nc1dh.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Successfully connected to MongoDB.');
  
  // Create test document
  const testCollection = mongoose.connection.collection('test');
  return testCollection.insertOne({ test: 'Hello MongoDB!' });
})
.then(() => {
  console.log('Test document inserted successfully.');
  process.exit(0);
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}); 