const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { 
                userId: user._id, 
                isAdmin: user.isAdmin,
                email: user.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            token, 
            user: {
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Create admin controller
exports.createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if admin already existspass
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create new admin user
        const hashedPassword = await bcrypt.hash(password, 10);
        const adminUser = new User({
            email,
            password: hashedPassword,
            isAdmin: true,
            // Don't set rollNo for admin
        });

        await adminUser.save();
        res.status(201).json({ 
            message: 'Admin created successfully',
            admin: {
                email: adminUser.email,
                isAdmin: adminUser.isAdmin
            }
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ 
            message: 'Error creating admin',
            error: error.message 
        });
    }
};

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, rollNo, phoneNo, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      rollNo,
      phoneNo,
      password: hashedPassword,
      isAdmin: false
    });

    await user.save();

    // Generate token for immediate login
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user: ' + error.message });
  }
}; 