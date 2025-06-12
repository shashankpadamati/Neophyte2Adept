const Course = require('../models/Course');
const Category = require('../models/Category')
const User = require('../models/User');
const { uploadFileToCloudinary } = require('../utils/imageUploader');
require('dotenv').config()


// create course
exports.createCourse = async (req, res)=>{
    try {
        console.log(req);
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;
        

        const thumbnail = req.files.thumbnail;
        

        if(!courseName || !courseDescription || !whatYouWillLearn || !price  || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            })
        }
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor details not found"
            })
        }
        
        // const categoryDetails = await Category.findOne({name: category});
        const categoryDetails = await Category.findById(category)
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.THUMBNAIL_FOLDER);
        console.log(userId,"userid");
        console.log(instructorDetails._id, "instructor id")
        // check instructordetails._id and userid are same, if same remove calling instructordetails
        const newCourse = await Course.create({
            courseName,
            description:courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: category,
            thumbnail: thumbnailImage.secure_url,
            status:"DRAFT"
        })

        // update course in instuctor's courses
        await User.findByIdAndUpdate({_id: instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id
                }
            },
            {new: true})

        // update category courses 

        await Category.findByIdAndUpdate({_id:category},{
            $push:{
                course: newCourse._id
            }
        },
        {new: true});


        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        })

        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })   
    }
}

exports.showAllCourses = async (req, res)=>{
    try {
        const allCourses = await Course.find({},{
            courseName:true,
            price: true,
            thumbnail: true,
            instructor: true,
            retingsAndReviews: true,
            studentsEnrolled: true
        }).populate("instructor").exec()

        // const allCourses = await Course.find({})
        return res.status(200).json({
            success: true,
            data: allCourses,
            message: "successfully fetched all courses"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })  
    }
}

exports.getCourseDetails = async (req, res)=>{
    try {
        const {courseId} = req.body;
        const courseDetails = await Course.findById(courseId).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        }).populate("category").populate("ratingsAndReviews").populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: "Could not find the course"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })  
    }
}


exports.getAllInstructorCourses = async (req, res)=>{
    try {
        const courses = await Course.find({instructor: req.user.id})
        if(courses){
            return res.status(200).json({
                "Success": true,
                "courses": courses
            })
        }
        return res.status(200).json({
            "success": true,
            "message": "Courses not found"
        })

        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getEnrolledCourses = async (req, res)=>{
    try {
       const user = await User.findById(req.user.id).populate({
        path: "courses",
        populate:{
            path: "instructor",
            select: "firstName"
        }
    }
       ).exec();

       if(user){
        return res.status(200).json({
            "courses": user.courses,
            "success": true
        })
       }
       return res.status(404).json({
        "success": false,
        "message": "user not found"
       })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllCourses = async (req, res)=>{
    try {
        const courses = await Course.find({})
        return res.status(200).json({
            "success": true,
            "courses": courses
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
        
    }

}

exports.getHomePageCourses = async(req, res)=>{
    try {
        let categories = await Category.find({showOnHome: true}).populate(
            {
                path: "course",
                select:"courseName description price ratingsAndReviews thumbnail"
            }
            
        ).exec();
        

        return res.status(200).json({
            "categories": categories,
            "success": true
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    
}

exports.getHomeCategories = async(req, res)=>{
    try {
        let categories = await Category.find({});

        return res.status(200).json({
            "categories": categories,
            "success": true
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.enrollCourse =async (req, res)=>{
    try {
       
        const {courseId} = req.body;
        console.log(courseId, req.user,"course id");
        
        
        const courses = await User.findByIdAndUpdate(req.user.id,
            {
                $push:{
                    courses: courseId
                }
            },
            {new: true})

           
            const course = await Course.findByIdAndUpdate(courseId, {
                $push:{
                    studentsEnrolled: req.user.id
                }
            },
            {new: true})
            return res.status(200).json({
                "success" : true,
            }
            )

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.fetchCourseContent = async (req, res)=>{
    try {
        const {courseId} = req.body;
        const user = await User.findById(req.user.id);

        if(user.courses.includes(courseId)){
            const course = await Course.findById(courseId).populate(
                {
                    path: "courseContent",
                    populate:{
                        path: "subSections"
                    }
                }
            ).exec()
    
            return res.status(200).json({
                "course": course,
                "success": true
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message: "Not authorized to access this course content"
            })
        }
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        }) 
    }
}