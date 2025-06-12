import { useEffect, useState } from 'react'
import './YourCourses.scss'

import { getToken } from '../../../Utils/generalUtils';
import { fetchInstructorCourses } from '../../../Api/courseApi';
import { toast } from 'react-toastify';
import { InstructorCourseCard } from '../InstructorCourseCard/InstructorCourseCard';
import Loading from '../../Loading';
export const YourCourses = ()=>{
    const [courses, setCourses] = useState([]);
    const token = getToken()

    useEffect(()=>{
        const payload = {
            "access_token": token
        }
        fetchInstructorCourses(payload).then((res)=>{
            setCourses(res.data.courses)
        }).catch((err)=>{
            toast.error("error while fetching courses")
        })
    },[])
    return (
        <div className="your-courses-wrapper">
            <div className='your-courses-heading'><h1>Your Courses</h1></div>


            {
                courses?courses?.map((course)=>(
                    <InstructorCourseCard Course={course}/>
                )):<Loading/>
            }

        </div>
    )
}