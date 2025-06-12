const express = require('express');
const router = express.Router();

const Course = require('../models/Course');
const User = require('../models/User');

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
const adminController = require('../controllers/Admin')
router.post('/dashboard', adminController.dashboardApi)
router.get('/students', adminController.studentsApi)
router.get('/tutors', adminController.tutorsApi)
module.exports = router