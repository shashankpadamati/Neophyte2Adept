import { Outlet, Route, Router } from 'react-router'
import Sidebar from '../../Components/Sidebar'
import './TeacherDashboard.scss'
import { Profile } from '../../Components/Profile/Profile'

export const UserDashboard = ()=>{
    return (
        <div>
            <div className="teacher-dashboard-wrapper">
            <Sidebar/>
            <Outlet/>
            </div>
        </div>
    )
}