import { Link, NavLink, Navigate, Route, Router, Routes, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { useContext, useEffect, useState } from "react";
import {AiOutlinePlus} from 'react-icons/ai'
import {RxDashboard} from 'react-icons/rx';
import {CgProfile} from 'react-icons/cg';
import {FiEdit} from 'react-icons/fi';
import {HiOutlineLogout} from 'react-icons/hi';
import {FaBook} from 'react-icons/fa';
import logo from '../../../Assets/images/logo.png'
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";
import { fetchUserDetails } from "../../Api/authApi";
import { getToken } from "../../Utils/generalUtils";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreator } from "../../Redux/actions/actionsCreator";


const mapStateToProps = ({auth})=>({auth})
function Sidebar() {
  const [navWidth, setNavWidth] = useState("0");
  const [dashboardMargin, setDashboardMargin] = useState("0");
  const [login,setLogin]=useState(false)
  // const {login,setLogin}=useContext(AuthContext);
  const location=useLocation();
  const data=location.state;
  const navigate=useNavigate();
  const token = getToken()
  const dispatch = useDispatch()
  const {auth} = useSelector(mapStateToProps)
  useEffect(()=>{ 
    const payload = {
      "access_token": token
    }
    fetchUserDetails(payload).then((res)=>{
      dispatch(actionsCreator.SET_USER_DETAILS(res.data.user_details))
      dispatch(actionsCreator.SET_LOGIN({isLoggedin: true}))
    }).catch((err)=>{
      console.log(err.message);
    })

  },[])
  console.log(auth.userDetails,"user");


  
  function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("sidebar-active");
   
  }
  const logout = ()=>{
    localStorage.removeItem('auth_token')
    navigate('/')
    window.location.reload()
    toast.success("logged out successfully");
    dispatch(actionsCreator.SET_USER_DETAILS())
    dispatch(actionsCreator.SET_LOGIN({isLoggedin: false}))
  }

  if(auth.userDetails?.accountType === "Student" ){

  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date(); Tawk_API.embedded='tawk_6545e247f2439e1631eb9fc6';
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6545e247f2439e1631eb9fc6/1hecfsfcm';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);})()
  }
  

  return (
   
    <div>
    <div className="sidebar"> 
        <header><Link to="/"> <img src={logo} className="sidebar-header"/> </Link></header>
        <ul>
            
            {
              auth.userDetails?.accountType === "Student" &&
              <>
             <NavLink to="enrolled-courses"> <li className="options-parent"><div className="options"><div><MdFormatListBulletedAdd /> </div><div>Enrolled Courses</div></div></li></NavLink>
             {/* <NavLink to="all-courses"><li className="options-parent"><div className="options"><div><FaBookOpen /></div> <div>All Courses</div></div></li></NavLink> */}
           
             <NavLink to="profile" ><li className="options-parent"><div className="options"><div><FaUserCircle /> </div><div>User Profile</div></div></li></NavLink>
             <li className="options-parent"><div className="options" id="logout" onClick={logout}><div><AiOutlineLogout /></div> <div>Log Out</div></div></li>
             <div id='tawk_6545e247f2439e1631eb9fc6'></div>
              </>
           
          }

            {
               auth.userDetails?.accountType === "Instructor" &&
               <>
              
              <NavLink to="create-course" className="sidebar-links"><li className="options-parent"><div className="options"><div><MdFormatListBulletedAdd /> </div><div>Add Courses</div></div></li></NavLink>
            <NavLink to="courses" className="sidebar-links"><li className="options-parent"><div className="options"><div><FaBookOpen /></div> <div>Your Courses</div></div></li></NavLink>
           
            <NavLink to="profile" className="sidebar-links" ><li className="options-parent"><div className="options"><div><FaUserCircle /> </div><div>User Profile</div></div></li></NavLink>
            <Link className="sidebar-links"><li className="options-parent"><div className="options" id="logout" onClick={logout}><div><AiOutlineLogout /></div> <div>Log Out</div></div></li></Link>
            </>
            }
           
        </ul>
    </div>
    
    
    
       
    </div>
  );
}

export default Sidebar;