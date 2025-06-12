import './CourseCard.scss'
import image from '../../../Assets/images/banner-front-image.png'
import { useNavigate } from 'react-router'

export const CourseCard = ({course})=>{
  const navigate = useNavigate();
  const navigationHandler = ()=>{
    navigate(`/course/${course._id}`)
  }
  console.log(course,"course");
    return (
            <div id="card">
      <img src={course?.thumbnail || image
      } alt="" id="cardimage" />
      <div id="cardcontent" onClick={navigationHandler}>
        {/* <div style={{ fontWeight: 'lighter' }}>Design</div> */}
        <div id="coursename">
          <div className='course-title' >{course?.courseName || "Course Name"}</div>
          <img src="spotifyBackground.jpg" alt="" />
        </div>
        <div className='course-description'>{course?.description.slice(0,50)+"..." || "Loremd dfs ere"}</div>
        <div id="coursesub">
          <div id="numrate">4.3 ★★★★☆ (16,325)</div>
          <div id="strrating"></div>
          <div id="subscriptions"></div>
        </div>
        <div id="Userdetails">
          <div id="u1">
            <img src={image} alt="" id="propho" />
            <div>
              <div id="username" className='author-price'>{course?.instructor?.firstName}</div>
              <div id="enrolledyear" className='author-price'>{course?.studentsEnrolled?.length} Enrolled</div>
            </div>
          </div>
          <div id="coursefee">₹{course?.price} </div>
        </div>
      </div>
    </div>
    )
}