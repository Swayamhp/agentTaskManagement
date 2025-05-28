import express from 'express';
// Import controller functions to handle user-related logic
import { registerUser, loginUser, getAllUsers, assignTasks, getSingleUser } from '../controller/user.controller.js';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Login user and return token
router.post('/login', loginUser);

// @route   GET /api/users/agents
// @desc    Get all non-admin users (agents)
router.get('/agents', getAllUsers);

// @route   GET /api/users/agents/:id
// @desc    Get a single user by ID
router.get('/agents/:id', getSingleUser);

// @route   POST /api/users/assign-task/:id
// @desc    Assign tasks to a specific user
router.post('/assign-task/:id', assignTasks);

// Export the router to use in the main server file
export default router;
