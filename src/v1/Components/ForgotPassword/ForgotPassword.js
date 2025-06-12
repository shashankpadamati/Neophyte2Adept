// ForgotPassword.js

import React, { useState } from 'react';
import './ForgotPassword.scss'; // Import your CSS file
import { changePassword, sendForgotPasswordOtp } from '../../Api/authApi';
import { toast } from 'react-toastify';
import Loading from '../Loading';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState()
  const [showOtp, setShowOtp] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const otpChange = (e)=>{
    setOtp(e.target.value)

  }
  const passwordChange = (e)=>{
    setNewPassword(e.target.value)
  }
  const [loading, setLoading] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setLoading(true)
    if(!showOtp){
        const forgotPasswordpayload = {
            "email": email,
        }
        sendForgotPasswordOtp(forgotPasswordpayload).then((res)=>{
            setShowOtp(true)
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    else{
 
            const changePasswordpayload = {
                "email": email,
                "newPassword": newPassword,
                "otp": otp
            }
            changePassword(changePasswordpayload).then((res)=>{
                toast.success("successfully changed password")
                props.toggleForgotPassword()
            })
            .catch((err)=>{
                toast.error("error while changing password")
            })

        }
        props.setLoading(false)
        
    
  };

  return (

    <div className='forgot-password-wrapper'>
   
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        {
            showOtp && 
            <div className='forgot-password-otp-container'>
        <input
            type="number"
            value={otp}
            placeholder='Enter otp here'
            onChange={otpChange}
            
          />
           <input
            type="password"
            value={newPassword}
            onChange={passwordChange}
            placeholder='Enter New password here'
            
          />

        </div>
         }
        <button type="submit" onClick={handleSubmit}>{showOtp ? `change password` : `Send Otp`}</button>
      </form>
      <p className="back-to-login">
        <span>Back to </span>
        <span className='forgot-password-option' onClick={props.toggleForgotPassword}>Login</span>
      </p>
    </div>
    </div>
    
  );
}

export default ForgotPassword;