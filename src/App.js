import logo from './logo.svg';
import './App.css';
import Navbar from './v1/Components/Navbar';
import Banner from './v1/Components/Banner';
import Courses from './v1/Components/Courses';
import {PopularCourses} from './v1/Components/PopularCourses/PopularCourses';
import {Footer} from './v1/Components/Footer/Footer';
import { AboutUs } from './v1/Pages/AboutUs/AboutUs';
import { Router, Routes, Route } from 'react-router';
import Home from './v1/Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';


import configureStore from './v1/Redux/store';
import ContactUs from './v1/Components/ContactUs';
import CourseCard from './v1/Components/CourseCard';
import Sidebar from './v1/Components/Sidebar';
import { UserDashboard } from './v1/Pages/TeacherDashboard/TeacherDashboard.js';
import { Profile } from './v1/Components/Profile/Profile';
import { CreateCourse } from './v1/Components/Dashboard/CreateCourse/CreateCourse';
import { ContactUsPage } from './v1/Pages/ContactUsPAge/ContactUsPage';
import UserProfile from './v1/Components/UserProfile/UserProfile';
import { YourCourses } from './v1/Components/Dashboard/YourCourses/YourCourses.js';
import { useEffect } from 'react';
import logot from './Assets/images/logo.png'
import { EnrolledCourses } from './v1/Components/Dashboard/EnrolledCourses/EnrolledCourses.js';
import { AllCourses } from './v1/Components/AllCourses/AllCourses.js';
import {CoursePage} from './v1/Pages/CoursePage/CoursePage.js';
import { CourseContent } from './v1/Pages/CourseContent/CourseContent.js';
import { AdminDashboard, AdminDashboardComponent, AdminDashboardCourses, AdminDashboardStudents, AdminDashboardTutors, ChangePassword } from './v1/Pages/AdminDashboard/AdminDashboard.js';


export const { store } = configureStore();
function App() {
  useEffect(()=>{
    const fevicon = logo;
    document.getElementById('favicon').setAttribute('href', fevicon);
  },[])
  return (
    <Provider store={store}>
    <div className="App">
      
      <Routes>
     
        <Route path="/" element={<Home/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path='/contact-us' element={<ContactUsPage/>}/>
        <Route path='/course-card' element={<Sidebar/>}/>
        <Route path='/dashboard' element={<UserDashboard/>}>
          <Route path='profile' element={<UserProfile/>}/>
          <Route path='create-course' element={<CreateCourse/>}/>
          <Route path='courses' element={<YourCourses/>}/>
         <Route path='enrolled-courses' element={<EnrolledCourses/>}/>
        </Route>
        <Route path='/courses' element={<AllCourses/>}/>
        <Route path='/courses/:category_name' element={<AllCourses/>}/>
        <Route path='/course/:course_id' element={<><Navbar/><CoursePage/><Footer/></>}/>
        <Route path='/dashboard/course/:courseId' element={<CourseContent/>}/>
        <Route path='/dashboard/admin' element={<AdminDashboard/>}>
       
					<Route path="dashboard" element={<AdminDashboardComponent />} />
					<Route path="courses" element={<AdminDashboardCourses />} />
					<Route path="students" element={<AdminDashboardStudents />} />
					<Route path="tutors" element={<AdminDashboardTutors />} />
					<Route
						path="changePassword"
						element={<ChangePassword />}
					/>
					
          </Route>
      </Routes>
     
      <ToastContainer/>
     
    </div>
    </Provider>
  );
}

export default App;
