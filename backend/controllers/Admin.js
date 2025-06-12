const Course = require('../models/Course');
const Category = require('../models/Category')
const User = require('../models/User');
const { uploadFileToCloudinary } = require('../utils/imageUploader');
require('dotenv').config()

exports.dashboardApi = async(req, res)=>{
    try {
        let result = {}
        const courses = await Course.find({})
        .populate({
            path: 'studentsEnrolled'
        })
        .populate({
            path: 'instructor',
            select: 'firstName'
        })
        .exec();
        result["courses"] = courses;

        const instructors = await User.find({accountType: "Instructor"});
        result["instructors"] = instructors.length;

        const students = await User.find({accountType:"Student"});
        result["studens"] = students.length

        return res.status(200).json({
            data: result,
            success: true
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.studentsApi = async (req,res)=>{
    try {
        const students = await User.find({accountType:"Student"}).populate({
            path: "courses",
            select: "courseName"
        }).populate({
            path:"additionalDetails",
            select: "contactNumber"
        }).exec();

        return res.status(200).json({
            data: students,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.tutorsApi = async(req, res)=>{
    try {
        const tutors = await User.find({accountType:"Instructor"}).populate({
            path: "courses",
            select: "courseName"
        }).populate({
            path:"additionalDetails",
            select: "contactNumber"
        }).exec();
        return res.status(200).json({
            data: tutors,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
