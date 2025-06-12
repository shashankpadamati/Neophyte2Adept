import { useEffect, useState } from 'react'
import './AllCourses.scss'
import { fetchAllCourses } from '../../Api/courseApi'
import CourseCard from '../CourseCard'
import Navbar from '../Navbar'
import { Footer } from '../Footer/Footer'
import Loading from '../Loading'
import { useLocation } from 'react-router'

export const AllCourses = (props)=>{
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const category_courses = location.state;

    console.log(category_courses,"category_courses");
    useEffect(()=>{
        category_courses?setCourses(category_courses):
        fetchAllCourses().then((res)=>{
            setCourses(res.data.courses);
            setLoading(false)
        }).catch((err)=>{
            console.log(err.message);
        })

        setLoading(false)
    },[])
    console.log(courses,"Courses");
    return (
        <div>
            <Navbar/>
            <div className='allcourseshead'>
                <pre className='all-courses-heading'>Neophyte2Adept Courses <br></br>
                </pre>
                <p>Interactive LIVE & Self-Paced Courses</p>

            </div>

            <div className='all-category-courses-wrapper'>
            {
                loading?<Loading/>:courses?.map((course)=>(
                    <div className="all-courses-wrapper">
                        <CourseCard course={course}/>

                    </div>

                ))
            
            }
            </div>
            <Footer/>
         </div>
    )
}