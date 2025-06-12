import { useEffect, useState } from "react"
import { getToken } from "../../../Utils/generalUtils"
import { fetchEnrolledCourses } from "../../../Api/courseApi"
import { toast } from "react-toastify"
import CourseCard from "../../CourseCard"

export const EnrolledCourses = ()=>{
    const [courses, setCourses] = useState([])
    useEffect(()=>{
        const payload = {
            "access_token": getToken()
        }
        fetchEnrolledCourses(payload).then((res)=>{
            setCourses(res.data.courses)
          
        }).catch((err)=>{
            toast.error("error while fetching courses")
        })

    },[])
    
    return (
        <div id="enrolledcourcesPage">
            <h2 className="enrolled-courses-heading">Enrolled Courses</h2>
            <div className="enrolled-courses-wrapper">
                {
                    courses?.map((course)=>{
                        
                        return(
                            <CourseCard course={course}/>
                        )
                    })
                }

            </div>
        </div>
    )
}