import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * @desc    Register new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  const { name, email, password, mobNumber, countryCode } = req.body;
  console.log(name, email, password, mobNumber, countryCode);

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
      mobNumber,
      countryCode,
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

// ============================================================

/**
 * @desc    Login user
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // generate new JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // send user info and token back
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (err) {
    // if using centralized error handler, pass to next()
    next(err);
  }
};

// ============================================================

/**
 * @desc    Get all non-admin users
 * @route   GET /api/users
 * @access  Admin
 */
export const getAllUsers = async (req, res, next) => {
  try {
    // get all users where isAdmin is false
    const allUsersData = await User.find({ isAdmin: false });
    res.status(200).json(allUsersData);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// ============================================================

/**
 * @desc    Assign tasks to a user
 * @route   PUT /api/users/:id/tasks
 * @access  Admin
 */
export const assignTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasksArray = req.body; // expects array

    // validate input is array
    if (!Array.isArray(tasksArray)) {
      return res.status(400).json({ message: 'Tasks should be an array' });
    }

    // find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // push tasks into user tasks array
    user.tasks.push(...tasksArray);
    await user.save();

    res.status(200).json({ message: 'Tasks assigned', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================================

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/:id
 * @access  Admin/User (depends on auth)
 */
export const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // fetch user by ID
    const userData = await User.findById(id);

    if (userData) {
      // return only needed fields
      return res.status(200).json({
        name: userData.name,
        email: userData.email,
        mobNumber: userData.mobNumber,
        countryCode: userData.countryCode,
        tasks: userData.tasks,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next ? next(err) : res.status(500).json({ message: err.message });
  }
};

