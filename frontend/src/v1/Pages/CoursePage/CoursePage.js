import React, { useEffect, useState } from 'react';
import './CoursePage.scss'; 
import { useNavigate, useParams } from 'react-router';
import { enrollCourse, fetchCourseDetails } from '../../Api/courseApi';
import { toast } from 'react-toastify';
import { getToken } from '../../Utils/generalUtils';
import { useSelector } from 'react-redux';


const mapStatetoProps = ({auth})=>({auth})
export const  CoursePage=()=> {
    const [courseData, setCourseData] = useState();
    const [buttonText, setButtonText] = useState("Buy Now");
    const {course_id} = useParams();
    const isLoggedIn = getToken();
    const navigate = useNavigate();
    const {auth} = useSelector(mapStatetoProps);
    
    
    
    useEffect(()=>{
        const payload =  {
            "courseId": course_id
        }
        fetchCourseDetails(payload).then((data)=>{
            setCourseData(data.data.data);
        }).catch((err)=>{
            toast.error("error while fetching course data");
            console.log(err.message);
        })
     
        if(auth.userDetails?.courses?.length!==0 && auth.userDetails?.courses?.includes(course_id)){
            setButtonText("Go to Course")
        }
    },[])
    const buyCourse =  ()=>{
        const payload = {
            "courseId": course_id,
            "access_token": getToken()
        }
        try {
            if(buttonText!=="Go to Course"){
             enrollCourse(payload).then((data)=>{
                toast.success("enrolled in course")
                setButtonText("Go to Course");
             }).catch((err)=>{
                if(!isLoggedIn){
                    navigate("/");
                    toast.info("login")
                }
             })
            }
            else{
              navigate(`/dashboard/course/${course_id}`)
            }
            
        } catch (error) {
            console.error(error.message);
        }
    }
  return (
    <div className='body-wrapper'>
         <div className="body">
      <header className="header">
      <img src={courseData?.thumbnail} className='course-thumbnail'>
      </img>
        <h1 className="heading">{courseData?.courseName}</h1>
      </header>
      
      <main className="main">
        <section className="section">
          <h2 className="sub-heading">About the course</h2>
          <p className="paragraph">
            {courseData?.description}
          </p>
        </section>
        <section className="section">
          <h2 className="sub-heading">What will you learn</h2>
          <p className="paragraph">
           {courseData?.whatYouWillLearn}
          </p>
        </section>
       
        
      </main>
      
        </div>
    <section className="section">
          <h2 className="sub-heading">Price</h2>
          <p className="paragraph">₹ {courseData?.price}</p>
          <button className="button" onClick={buyCourse}>{buttonText}</button>
        </section>
    </div>
   
  );
}


