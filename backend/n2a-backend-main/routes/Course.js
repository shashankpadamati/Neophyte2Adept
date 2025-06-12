
const express = require("express")
const router = express.Router()


const courseController = require("../controllers/Course")


const categoryController = require("../controllers/Category")


const sectionController = require("../controllers/Section")


const subsectionController = require("../controllers/subSection")


const ratingController = require("../controllers/ratingAndReview")

// const {
//   updateCourseProgress
// } = require("../controllers/courseProgress");


const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

router.post("/createCourse", auth, courseController.createCourse)
router.post("/addSection", auth, isInstructor, sectionController.createSection)
router.post("/updateSection", auth, isInstructor, sectionController.updateSection)
router.post("/deleteSection", auth, isInstructor, sectionController.deleteSection)

// router.post("/updateSubSection", auth, isInstructor, subsectionController.)
router.post("/deleteSubSection", auth, isInstructor, subsectionController.deleteSubSection)
router.post("/addSubSection", auth, isInstructor, subsectionController.createSubSection)

// router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", courseController.getCourseDetails)
router.get("/getAllCourses", courseController.getAllCourses)
// router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// router.post("/editCourse", auth, isInstructor, courseController.editCourse)
router.post("/getEnrolledCourses", auth, isStudent, courseController.getEnrolledCourses)
router.get('/homePage/courses',courseController.getHomePageCourses)
router.get('/homePage/categories',courseController.getHomeCategories)
router.post("/getInstructorCourses", auth, isInstructor, courseController.getAllInstructorCourses)
router.post("/enrollCourse",auth,  courseController.enrollCourse)
// router.delete("/deleteCourse", deleteCourse)
// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
router.post("/course_content", auth,  courseController.fetchCourseContent);

router.post("/createCategory", auth, isAdmin, categoryController.createCategory)
router.get("/showAllCategories", categoryController.showAllCategories)
router.post("/getCategoryPageDetails", categoryController.categoryPageDetails)

router.post("/createRating", auth, isStudent, ratingController.createRating)
router.get("/getAverageRating", ratingController.getAverageRating)
router.get("/getReviews", ratingController.getAllRatings)


module.exports = router