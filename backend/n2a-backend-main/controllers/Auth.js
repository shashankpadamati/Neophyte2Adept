const User = require('../models/User');
const OTP = require('../models/Otp');
const Profile = require('../models/Profile')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
// sendotp
exports.sendOTP = async (req,res)=>{
    try{
        const {email} = req.body;

    // if user already exists
    const checkUserPresent = await User.findOne({email: email});
    if(checkUserPresent){
        return res.status(401).json({success:false,
        message:" user already registered"})
    }
    let otp = otpGenerator.generate(6,{
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    })
    // check unique otp
    let result = await OTP.findOne({otp: otp});

    while(result){
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        });

        result = await OTP.findOne({otp: otp});
    }
    const otpPayload = {email,otp}
    const otpBody = await OTP.create(otpPayload)
    

    return res.status(200).json({
        success: true,
        message: "Otp sent Successfully"
    })

    }catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

}
exports.forgotPasswordOtp = async (req, res)=>{
    try{
        const {email} = req.body;

    // if user already exists
    const checkUserPresent = await User.findOne({email: email});
    if(!checkUserPresent){
        return res.status(404).json({success:false,
        message:" user not  registered"})
    }
    let otp = otpGenerator.generate(6,{
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    })
    // check unique otp
    let result = await OTP.findOne({otp: otp});

    while(result){
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        });

        result = await OTP.findOne({otp: otp});
    }
    const otpPayload = {email,otp}
    const otpBody = await OTP.create(otpPayload)
    

    return res.status(200).json({
        success: true,
        message: "Otp sent Successfully"
    })

    }catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
    
}



// changepassword
exports.changePassword = async (req, res)=>{
    try{
        const {email, oldPassword, newPassword, otp} = req.body;
        
        if(otp){
        const recentOtp = await OTP.find({email:email}).sort({createdAt:-1}).limit(1);
        const otps = await OTP.find({email: email});
        console.log(otps);
        if(recentOtp.length===0){
            return res.status(400).json({
                success: false,
                message: "Otp not found"
            })
        }
        
        else if(recentOtp[0].otp !== otp){
            return res.status(400).json({
                success: false,
                message: "Invalid otp entered"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOneAndUpdate({email:email}, {password: hashedPassword});
        return res.status(200).json({"success": true, "user": user})
        
        }
        else{

            if(oldPassword === newPassword){
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const user = await User.findOneAndUpdate({email:email}, {password: hashedPassword});
                return res.status(200).json({"success": true, "user": user})

            }
            else{
                return res.status(400).json({
                    "success": false, "message": "new password and old password should be same"
                })
            }

        }
        

    }catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// signup
exports.signup = async (req, res)=>{

    try{

        // fetch data
        const {
            firstName,
            lastName,
            email,
            password,
            contactNumber,
            otp
        } = req.body;
        // validate
        // check if user exists
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }
        if(email.split("@")[1] ==="nitj.ac.in"){
            accountType="Instructor"
        }
        else{
            accountType="Student"
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            accountType: accountType,
        })
        console.log("user", user)
        const recentOtp = await OTP.find({email: email}).sort({createdAt:-1}).limit(1);
        console.log(otp, typeof(otp));
        console.log(recentOtp[0].otp, typeof(recentOtp))
        if(recentOtp.length===0){
            return res.status(400).json({
                success: false,
                message: "Otp not found"
            })
        }
        
        else if(recentOtp[0].otp !== otp){
            return res.status(400).json({
                success: false,
                message: "Invalid otp entered"
            })
        }
        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            bio: null,
            contactNumber: contactNumber,
            profession: null
        })
        user.additionalDetails = profile._id;
        user.isVerified = true;
        user.profilePicture = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`;
        user.save()
        

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: user
        })

        
        
        // find most recent otp 
        // validate
        // hash password
        // entry create in db
        // return res

    }catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// login
exports.login = async (req, res)=>{
    try{

        const {email, password } = req.body;
        const user = await User.findOne({email: email}).populate('additionalDetails');
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        const verified = await bcrypt.compare(password, user.password);
        if(verified){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY,{
                expiresIn: "2d"
            });
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now()+ 2*24*60*60*1000),
                httpOnly: true
            }
            
            return res.cookie("access_token", token, options).status(200).json({
                success: true,
                token: token,
                data: user
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Entered Wrong Password "
            })
        }
        
    }catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

exports.fetchUSerDetails = async (req, res)=>{
    try {
        const {access_token} = req.body
        const decoded = await jwt.verify(access_token, process.env.SECRET_KEY);
        email = decoded.email
        console.log("hi");
        const user = await User.findOne({email: email}).populate('additionalDetails')
        console.log(user);

         return res.status(200).json({"user_details": user})

       
        
    } catch (error) {
        return res.status(400).json({
            "message": error.message, "success": false
        })
    }
}