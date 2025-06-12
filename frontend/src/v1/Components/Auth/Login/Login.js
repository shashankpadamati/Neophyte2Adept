
import signupFormImage from '../../../../Assets/images/Group.png'
import { useState } from 'react'
import { login, register, sendOTP } from '../../../Api/authApi'
import { toast } from 'react-toastify'
import { Otp } from '../Otp/Otp'
import Loading from '../../Loading'
import './Login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actionsCreator } from '../../../Redux/actions/actionsCreator'
import { SET_USER_DETAILS, SET_LOGIN } from '../../../Redux/actions/actionTypes'
import Modal from '../../Modal'
import ForgotPassword from '../../ForgotPassword/ForgotPassword'


const mapStatetoProps = ({auth})=>({auth})


export const Login = ({setShowLogin})=>{
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const {auth} = useSelector(mapStatetoProps);
    const dispatch = useDispatch()
    const changeHandler = (e)=>{
        const key = e.target.name
        const value = e.target.value
        setFormData((prev)=>({...prev,[key]: value }))
    }
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    const submitHandler = async ()=>{
        setLoading(true);
        try{
        const response = await login(formData);
        if(response.data.success){
        localStorage.setItem('auth_token', response.data.token)
        console.log(response.data.data,"login response");
        dispatch(actionsCreator.SET_USER_DETAILS(response.data.data))
        dispatch(actionsCreator.SET_LOGIN({isLoggedin: true}))
        toast.success("logged in successfully");
        setLoading(false);
        setShowLogin(false)
        }
        }catch(err){
            console.log(err.message);
            toast.error(err.response.data.message)
        }
        setLoading(false);
    }
    const toggleForgotPassword = ()=>{
        
        setShowForgotPassword((prev)=>!prev)
      
    }
    return (
        
        loading? (<Loading/>):
        showForgotPassword? (<ForgotPassword toggleForgotPassword={toggleForgotPassword} setLoading={setLoading} />):
        <div>
            <div className="login-wrapper">
            <div className="signup-wrapper">
                <div className="singup-image">
                <img src={signupFormImage}/>
                </div>
                <div className="signup-form login-form">
                    <div className='login-form-heading'>
                        Login
                    </div>
                    <div className='email'>
                    <input type='email' name="email" onChange={changeHandler} className='singup-input' placeholder='Enter Email'/>
                    </div>
                    <div className='password'>
                    <input type='password' name="password" onChange={changeHandler} className='singup-input' placeholder='Enter Password'/>
                    </div>
                    <div className='forgot-password-option' onClick={toggleForgotPassword}>
                        forgot password ?

                    </div>
                    <div className='buttons'>
                        <div className='go-back'>
                            <button className='go-back-button' onClick={()=>{setShowLogin(false)}}>Go Back</button>
                        </div>
                        <div className='signup'>
                            <button className='singup-submit-button' onClick={submitHandler}>Login</button>
                        </div>
                    </div>
                </div>
            </div>

            </div>
     
        </div>
    )
}