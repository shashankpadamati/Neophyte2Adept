import React, { useEffect } from 'react';
import './UserProfile.scss'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../Api/authApi';
import { actionsCreator } from '../../Redux/actions/actionsCreator';
import { useNavigate } from 'react-router';

const mapStateToProps = ({auth})=>({auth})
const UserProfile = () => {
    const {auth} = useSelector(mapStateToProps)
    const isLoggedIn = localStorage.getItem('auth_token')
    console.log(isLoggedIn,"is logged in");
    const navigate = useNavigate();
    useEffect(()=>{
        
    if(auth?.userDetails?.accountType==="Admin"){
        navigate("/dashboard/admin/dashboard")
    }
        
    },[])

    return (
        <div id="promain">
            <div className="profilecontainer">
                <section className="proleft">
                    <div className="prodetails">
                       {
                       auth?.userDetails?.additionalDetails?.dateOfBirth && 
                       <div className="DOB">
                            <h3>DOB</h3>
                            <h4 id="Dob">{auth?.userDetails?.dateOfBirth}</h4>
                        </div>}
                        <div className="PROFESSION">
                            <h3>Profession</h3>
                            <h4 id="Profession">{auth.userDetails?.accountType}</h4>
                        </div>
                        <div className="ContactNumber">
                            <h3>ContactNumber</h3>
                            <h4 id="Contactnumber">{auth?.userDetails?.additionalDetails?.contactNumber}</h4>
                        </div>
                        <div className="MailId">
                            <h3>Mail id</h3>
                            
                            <h4 id="mailid">{auth?.userDetails?.email}</h4>
                        </div>
                        <div className="Aboutme">
                            <h3>About Me</h3>
                            <p id="aboutme">{auth?.userDetails?.additionalDetails?.bio}</p>
                        </div>
                    </div>

                    <div className="editbutton">
                        <button id="editprofile">editprofile</button>
                    </div>
                </section>
                <section className="proright">
                    <div className="propho">
                        <img id="stupic" src={auth?.userDetails?.profilePicture} alt="" />
                    </div>
                    <div className="prode1">
                        <h1>{auth?.userDetails?.firstName} {auth?.userDetails?.lastName}</h1>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UserProfile;
