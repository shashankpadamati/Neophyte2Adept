// main.jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes, Link, NavLink, useNavigate } from 'react-router-dom'
import './AdminDashboard.scss'
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Outlet } from 'react-router-dom'
import { fetchDashboardContent, fetchDashboardStudentsContent, fetchDashboardTutorsContent } from '../../Api/adminApi'
import { toast } from 'react-toastify';
import logo from '../../../Assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { actionsCreator } from '../../Redux/actions/actionsCreator';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        localStorage.removeItem('auth_token')
    navigate('/')
    window.location.reload()
    toast.success("logged out successfully");
    dispatch(actionsCreator.SET_USER_DETAILS())
    dispatch(actionsCreator.SET_LOGIN({isLoggedin: false}))
    }
	return (
		<div className="admin_dashboard-sidebar">
            <header><Link to="/"> <img src={logo} className="admin-dashboard-sidebar-header-logo"/> </Link></header>
			<ul>
            
				<li>
					<NavLink to="dashboard">Dashboard</NavLink>
				</li>
				<li>
					<NavLink to="courses">Courses</NavLink>
				</li>
				<li>
					<NavLink to="students">Students</NavLink>
				</li>
				<li>
					<NavLink to="tutors">Tutors</NavLink>
				</li>
				
				<li>
					<NavLink to="logout" onClick={logoutHandler}>Logout</NavLink>
				</li>
			</ul>
		</div>
	)
}

export const AdminDashboardComponent = () => {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState(0);
    const [instructors, setInstructors] = useState(0);
    useEffect(()=>{
        fetchDashboardContent().then((data)=>{
            setCourses(data.data.data.courses);
            setStudents(data.data.data.students);
            setInstructors(data.data.data.instructors)
        }).catch((err)=>{
            console.error(err.message);
        })
    },[])
	console.log(courses,"courses");
    

	const totalStudents = students?students:0
	const totalCourses = courses.length
	const totalTutors = instructors

	return (
		<div className="admin_dashboard-dashboard">
			<div className="admin_dashboard-sidebar-stats">
				<div className="admin_dashboard-stat-box">
					<div className="admin_dashboard-stat-value">{totalStudents}</div>
					<div className="admin_dashboard-stat-label">Total Students</div>
				</div>
				<div className="admin_dashboard-stat-box">
					<div className="admin_dashboard-stat-value">{totalCourses}</div>
					<div className="admin_dashboard-stat-label">Total Courses</div>
				</div>
				<div className="admin_dashboard-stat-box">
					<div className="admin_dashboard-stat-value">{totalTutors}</div>
					<div className="admin_dashboard-stat-label">Total Tutors</div>
				</div>
			</div>
			<div className="admin_dashboard-data-table">
				<h2>Students</h2>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Course</th>
							<th>Course ID</th>
							
						</tr>
					</thead>
					<tbody>
						{courses?.map((course) => (
							<tr key={course.id}>
								{
                                    course?.studentsEnrolled.length!==0 && course?.studentsEnrolled?.map((c)=>(
                                        <>
                                        <td>{c.firstName}</td>
                                        <td>{c.email}</td>
                                        <td>{course?.courseName}</td>
                                        <td>{course._id}</td>
                                        
                                        </>
                                    ))
                                }
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const AdminDashboardCourses = () => {
	const [courses, setCourses] = useState([])

    useEffect(()=>{
        fetchDashboardContent().then((data)=>{
            setCourses(data.data.data.courses);
        })
    },[])
	const totalCourses = courses.length
	

    const totalStudentsEnrolled = courses.reduce((total, course) => total + course.studentsEnrolled.length, 0);
    const uniqueStudents = totalStudentsEnrolled;

	return (
		<div className="admin_dashboard-dashboard">
			<div className="admin_dashboard-sidebar-stats">
				<div className="admin_dashboard-stat-box">
					<div className="admin_dashboard-stat-value">{uniqueStudents}</div>
					<div className="admin_dashboard-stat-label">Total Students Enrolled</div>
				</div>
				<div className="admin_dashboard-stat-box">
					<div className="admin_dashboard-stat-value">{totalCourses}</div>
					<div className="admin_dashboard-stat-label">Total Courses</div>
				</div>
			</div>
			<div className="admin_dashboard-data-table">
				<h2>Courses</h2>
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Course ID</th>
							<th>Students Enrolled</th>
							<th>Tutor</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<tr key={course._id}>
								<td>{course.courseName}</td>
								<td>{course._id}</td>
								<td>{course.studentsEnrolled.length}</td>
								<td>{course.instructor.firstName}</td>
								<td>{course.price}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const AdminDashboardStudents = () => {
	const [students, setStudents] = useState([])
    useEffect(()=>{
        fetchDashboardStudentsContent().then((data)=>{
            setStudents(data.data.data);
        }).catch((err)=>{
            console.error(err.message);
        })
    },[])

	const totalStudents = students.length
	const totalCoursesEnrolled = students.reduce(
		(acc, student) => acc + student.courses.length,
		0
	)

	return (
		<div className="admin_dashboard-dashboard">
			<div className="admin_dashboard-sidebar-stats">
				<div className="admin_dashboard-stat-box">
					<div className="admin_dashboard-stat-value">{totalStudents}</div>
					<div className="admin_dashboard-stat-label">Total Students</div>
				</div>
				<div className="admin_dashboard-stat-box">
					<div className="admin_dashboard-stat-value">{totalCoursesEnrolled}</div>
					<div className="admin_dashboard-stat-label">Total Courses Enrolled</div>
				</div>
			</div>
			<div className="admin_dashboard-data-table">
				<h2>Students</h2>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
                            <th>Contact Number</th>
							<th>Courses Enrolled</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student) => (
							<tr key={student._id}>
								<td>{student.firstName}</td>
								<td>{student.email}</td>
								<td>{student.additionalDetails?student.additionalDetails.contactNumber:"N/A"}</td>
								<td>{student.courses.length}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const AdminDashboardTutors = () => {
	const [tutors, setTutors] = useState([])
    useEffect(()=>{
        fetchDashboardTutorsContent().then((data)=>{
            setTutors(data.data.data);
        }).catch((err)=>{
            console.error(err.message);
        })
    },[])

	const totalTutors = tutors.length
	const totalCoursesUploaded = tutors.reduce(
		(acc, tutor) => acc + [...new Set(tutor.courses)].length,
		0
	)

	return (
		<div className="admin_dashboard-dashboard">
			<div className="admin_dashboard-sidebar-stats">
				<div className="admin_dashboard-stat-box">
					<div className="admin_dashboard-stat-value">{totalTutors}</div>
					<div className="admin_dashboard-stat-label">Total Tutors</div>
				</div>
				<div className="admin_dashboard-stat-box">
					<div className="admin_dashboard-stat-value">{totalCoursesUploaded}</div>
					<div className="admin_dashboard-stat-label">Total Courses Uploaded</div>
				</div>
			</div>
			<div className="admin_dashboard-data-table">
				<h2>Tutors</h2>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone Number</th>
							<th>Courses Uploaded</th>
							
						</tr>
					</thead>
					<tbody>
						{tutors.length!=0 && tutors.map((tutor) => (
							<tr key={tutor.id}>
								<td>{tutor?.firstName}</td>
								<td>{tutor?.email}</td>
								<td>{tutor?.additionalDetails?tutor?.additionalDetails?.contactNumber:"N/A"}</td>
								<td>{[...new Set(tutor.courses)].length}</td>
								
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const ChangePassword = () => {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')

	const handleChangePassword = () => {
		if (newPassword !== confirmNewPassword) {
			alert('New password and confirm password do not match')
		} else {
			alert('Password changed successfully')
			setCurrentPassword('')
			setNewPassword('')
			setConfirmNewPassword('')
		}
	}

	return (
		<div className="admin_dashboard-dashboard">
    <div className="admin_dashboard-change-password-form">
        <h2>Change Password</h2>
        <div className="admin_dashboard-form-group">
            <label className="admin_dashboard-label" htmlFor="currentPassword">Current Password:</label>
            <input
                className="admin_dashboard-input"
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
        </div>
        <div className="admin_dashboard-form-group">
            <label className="admin_dashboard-label" htmlFor="newPassword">New Password:</label>
            <input
                className="admin_dashboard-input"
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
        </div>
        <div className="admin_dashboard-form-group">
            <label className="admin_dashboard-label" htmlFor="confirmNewPassword">Confirm New Password:</label>
            <input
                className="admin_dashboard-input"
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
        </div>
        <button className="admin_dashboard-button" onClick={handleChangePassword}>Save</button>
    </div>
</div>

	)
}

export const AdminDashboard = () => {
	return (
		
			<div className="admin_dashboard-container">
				<Sidebar />
				<Outlet/>
			</div>
		
	)
}
