
import './PopularCourses.scss'
import { useEffect, useState } from 'react'
import { CategoryCard } from '../Courses/CategoryCard'
import CourseCard from '../CourseCard'
import { fetchHomeCourses } from '../../Api/courseApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

export const PopularCourses = ({category})=>{
    const navigate = useNavigate();
    const NavigationHandler = (category)=>{
        const category_name = category?.name.replace(" ", "_")
        navigate(`/courses/${category_name}`, {state: category?.course})
    }
    
    return (
        <div>
        <div className='featured-courses-wrapper'>
            
            <div className='featured-courses-headings'>
                
                <div className='featured-courses-subheading'>{category?.name}</div>
                <div className='featured-courses-supporting-text'>{category?.description}</div>

            
            </div>
            <div className='view-all-button-wrapper'>
                <button className='view-all-button' onClick={()=>NavigationHandler(category)}>view all</button>
            </div>
            </div>
            <div className='course-cards'>
                {
                    category?.course?.length!==0 && category?.course.slice(0,4).map((course, index)=>{
                        return (<CourseCard course={course}/>)
                    })
                }
                </div>

        </div>
    )
}