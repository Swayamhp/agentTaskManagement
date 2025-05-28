import express from 'express';
// Import controller functions to handle user-related logic
import { registerAdmin } from '../controller/admin.controller.js';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/admin/register', registerAdmin);

export default router;