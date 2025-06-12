import { useEffect } from "react";
import { fetchHomeCategories, fetchHomeCourses } from "../../Api/courseApi";
import { toast } from "react-toastify";
import { PopularCourses } from "../PopularCourses/PopularCourses";
import { useState } from "react";

const PopularCategory = ({homeCategories})=>{

    return (
        <>
        {
            homeCategories.length!=0 && homeCategories.map((category)=>{
                return(
                    <PopularCourses category={category}/>
                )
            })
        }
        </>
    )
}

export default PopularCategory;