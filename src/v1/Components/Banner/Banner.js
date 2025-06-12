import './Banner.scss'
import BannerFrontImage from '../../../Assets/images/banner-front-image.png';
import bannerImageBackground from '../../../Assets/images/banner-image-background.png'
import bannerNoofCourses from '../../../Assets/images/banner-no-of-courses.png'
import { useState } from 'react';
import { useNavigate } from 'react-router';
export const Banner = ()=>{
    const [no_of_courses, setNoofCourses] = useState(200);
    const navigate = useNavigate();
    return (
        <div>
            <div className='banner-wrapper'>
                <div className='banner-information'>
                    <div className='black-heading'>Up Your <span className='green-heading'>Skills</span></div>
                    <div className='black-heading'>To <span className='green-heading'>Advance</span> Your</div>
                    <div className='green-heading'>Career <span className='black-heading'>Path</span></div>
                    <div className='banner-description'>Enhance your coding skills with Weekend Code, the ultimate online platform for tech enthusiasts. Access top-notch resources and materials to fuel your journey to coding mastery!</div>
                    <div className='banner-get-started'>
                        <button className='signup-button' 
                        onClick={()=>{
                            navigate("/courses")
                        }}
                        >Get Started</button>
                    </div>

                </div>
                <div className='banner-images'>
                    <img src={BannerFrontImage} className='banner-front-image'/>
                    <img src={bannerImageBackground} className='banner-background-image'/>
                </div>
                <div className='banner-no-of-courses'>
                    <img src={bannerNoofCourses} className='banner-no-of-courses-icon'/>
                    <div className='banner-no-of-courses-description'>
                    <h4>{no_of_courses}</h4>
                    <div className='banner-no-of-courses-description-text'>Courses</div>
                    </div>
                </div>
            </div>

        </div>
    )
}