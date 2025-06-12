import { useEffect, useState } from 'react'
import './Courses.scss'
import { CategoryCard } from './CategoryCard'
import { fetchHomePageCategories } from '../../Api/courseApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
export const Courses = ()=>{
    const [courseCategories, setCourseCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetchHomePageCategories().then((data)=>{
            setCourseCategories(data.data.categories);
        }).catch((err)=>{
            toast.error("error while fetching home page categories")
        })
    },[])
    
    return (
        <div>
            <div className="courses-wrapper">
                <div className="home-course-catergories-text">
                <div className="courses-categories-heading">Our Categories</div>
                <div className="courses-categories-subheading">Fostering a playful & engaging learning environment</div>
                </div>
                <div className='category-cards'>

                
                {
                    courseCategories.length!==0 && courseCategories.slice(0,3).map((category, index)=>{
                        return (<CategoryCard category= {category} key={index}/>)
                    })
                }
                </div>

            </div>
        </div>
    )
}