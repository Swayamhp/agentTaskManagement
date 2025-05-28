import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * @desc    Register new user
 * @route   POST /api/admin/register
 * @access  Public
 */
export const registerAdmin = async (req, res) => {
  const { name, email, password} = req.body;
  console.log(name, email, password);

  try {
    // check if user already exists in DB by email
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // hash password using bcrypt for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user document
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin:true
    });

    // generate JWT token for auth (optional here)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // send back new user info and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};