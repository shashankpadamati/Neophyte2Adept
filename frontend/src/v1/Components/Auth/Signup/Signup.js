import './Signup.scss'
import signupFormImage from '../../../../Assets/images/Group.png'
import { useState } from 'react'
import { register, sendOTP } from '../../../Api/authApi'
import { toast } from 'react-toastify'
import { Otp } from '../Otp/Otp'
import Loading from '../../Loading';
import { useDispatch, useSelector } from 'react-redux';
import { actionsCreator } from '../../../Redux/actions/actionsCreator'
const mapStatetoProps = ({auth})=>({auth})

export const Signup = ({setShowSignup, setShowLogin})=>{
    const [formData, setFormData] = useState({});
    const [otp, setOtp] = useState(null);
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const {auth} = useSelector(mapStatetoProps);
    const dispatch = useDispatch();

    const changeHandler = (e)=>{
        const key = e.target.name
        const value = e.target.value
        setFormData((prev)=>({...prev,[key]: value }))
    }
    console.log(formData,"formdata");
    const submitHandler = async ()=>{
        setLoading(true);
        if(formData["password"]!==formData["confirm_password"]){
            toast.error("password and confirm password are not matching");
            setLoading(false)
            return 
        }
        try{
        const response = await sendOTP(formData);
        toast.success("otp sent successfully");
        setShowOtp(true)
        }catch(err){
            console.log(err.message);
            toast.error(err.response.data.message)
        }
        setLoading(false)
    }
    const registerHandler = async ()=>{
        try{
            setLoading(true)
        if(otp.length !== 6){
            toast.error("enter valid otp")
            return
        }
        formData["otp"] = otp
        const response = await register(formData);
        console.log(response.data,"signup response");
        toast.success("user registered successfully");
        setShowOtp(false);
        setShowSignup(false);
        setLoading(false);
        setShowLogin(true)
    }catch(err){
        toast.error(err.response.data.message)
    }
    }

    return (
        !showOtp? (
            loading ? 
            (<Loading/>):
        <div>
            <div className="signup-wrapper">
                <div className="singup-image">
                <img src={signupFormImage}/>
                </div>
                <div className="signup-form">
                    <div className='signup-form-heading'>
                        Sign Up
                    </div>
                    <div className='singup-form-name'>
                    <div className='first-name'>
                        <input type='text' name="firstName" onChange={changeHandler} className='name' placeholder='Enter First Name'/>
                    </div>
                    <div className='last-name'>
                        <input type='text' name="lastName" onChange={changeHandler} className='name' placeholder='Enter Last Name'/>
                    </div>
                    </div>
                    <div className='email'>
                    <input type='email' name="email" onChange={changeHandler} className='singup-input' placeholder='Enter Email'/>
                    </div>
                    <div className='phone-number'>
                    <input type='number' name="contactNumber" onChange={changeHandler}  className='singup-input' placeholder='Enter Contact number'/>
                    </div>
                    <div className='password'>
                    <input type='password' name="password" onChange={changeHandler} className='singup-input' placeholder='Enter Password'/>

                    </div>
                    <div className='confirm-password'>
                    <input type='password' name="confirm_password" onChange={changeHandler} className='singup-input' placeholder='Confirm password'/>
                    </div>
                    <div className='buttons'>
                        <div className='go-back'>
                            <button className='go-back-button' onClick={()=>{setShowSignup(false)}}>Go Back</button>
                        </div>
                        <div className='signup'>
                            <button className='singup-submit-button' onClick={submitHandler}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
        :(
            <div>
            <Otp otp={otp} setOtp={setOtp} showOtp={showOtp} setShowOtp={setShowOtp}
            setShowSignup={setShowSignup}
            registerHandler={registerHandler}/>
            </div>
        )
    )
}