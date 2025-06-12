import './Otp.scss'

export const Otp = ({setOtp, registerHandler, Otp})=>{
    return (
        <div>
            <div className="otp-wrapper">
                <div className='otp-heading'>
                    <h2>Verify Otp</h2>
                </div>
                <div>
                    <input type="number" name="signup-input" className="otp-input" onChange={(e)=>setOtp(e.target.value)}/>
                </div>
                <div className="register-button">
                    <button onClick={registerHandler} className="singup-submit-button">Verify OTP</button>
                </div>
            </div>
        </div>
    )
}