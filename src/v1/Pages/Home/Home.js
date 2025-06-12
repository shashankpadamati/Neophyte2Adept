import { useEffect } from "react"
import Banner from "../../Components/Banner"
import Courses from "../../Components/Courses"
import { Footer } from "../../Components/Footer/Footer"
import Navbar from "../../Components/Navbar"
import { useState } from "react"
import { toast } from "react-toastify"
import PopularCategory from "../../Components/PopularCategory/PopularCategory"
import { fetchHomeCategories } from "../../Api/courseApi"
export const Home = ()=>{
    const [homeCategories, setHomeCategories] = useState([]);
    useEffect(()=>{
        fetchHomeCategories().then((data)=>{
            console.log(data.data);
            setHomeCategories(data.data.categories)
        }).catch((err)=>{
            toast.error("error while fetching categories");
            console.log(err.message);
        })
    },[])
    
    return(
        <div>
            <Navbar/>
            <Banner/>
            <Courses/>
            <div className='featured-courses-heading'>Explore Programs</div>
            <PopularCategory homeCategories={homeCategories}/>
            <Footer/>
        </div>
    )
}