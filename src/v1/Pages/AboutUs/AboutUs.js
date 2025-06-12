import { useEffect, useState } from "react"
import { AboutusBanner } from "../../Components/AboutusBanner/AboutusBanner";
import image1 from '../../../Assets/images/about-us-banner-image-1.png';
import image2 from '../../../Assets/images/about-us-banner-image-2.png';
import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar";
import { Footer } from "../../Components/Footer/Footer";
const mapStatetoProps = ({auth}) => ({auth})

export const AboutUs = ()=>{
    const [aboutUsData, setAboutUsData] = useState([]);
    const {auth} = useSelector(mapStatetoProps);

    console.log(auth, "redux auth ");
    useEffect(()=>{
        setAboutUsData([
            {
                imageUrl: image1,
                description:`Neophyte, a cutting-edge e-learning platform developed by the ingenious minds at NIT Jalandhar, stands as a beacon of innovation in the realm of education. With a steadfast commitment to enhancing the learning experience, Neophyte serves as a dynamic bridge between teachers and students, offering a plethora of meticulously curated courses to cater to diverse interests and academic pursuits

                At Neophyte, we recognize that learning is not confined to the four walls of a classroom. With the ever-evolving landscape of education, our platform empowers learners to transcend traditional boundaries and embark on a journey of knowledge acquisition at their own pace and convenience.`,
                
                heading: "Welcome to Neophyte: Your Gateway to Learning Excellence"
            },
            {
                imageUrl: image2,
                description: "What sets Neophyte apart is its unwavering dedication to fostering meaningful interactions between educators and learners. Through engaging lectures, interactive assignments, and collaborative discussions, our platform cultivates a vibrant community of knowledge seekers united by a shared passion for learning.",
                heading: "Neophyte2Adept  providing the best opportunities to the students around the glob."
            },
        ])
    },[])
    return (
        <div className="aboutus-wrapper">
            <Navbar/>
            <AboutusBanner heading={aboutUsData[0]?.heading} description={aboutUsData[0]?.description} imageUrl={aboutUsData[0]?.imageUrl} side="left"/>
            <AboutusBanner heading={aboutUsData[1]?.heading} description={aboutUsData[1]?.description} imageUrl={aboutUsData[1]?.imageUrl} side="right"/>
            <Footer/>
        </div>
    )
}