const users = require('../Model/userModel')
const bCrypt = require('bcrypt')     // thirdparty lib installed to hashing pswd
const jwt=require('jsonwebtoken')   // for use of token


// register
exports.registerController = async(req,res)=>{
    console.log("inside register function");

    const{name,email,password}=req.body  //destructuring req body fron frontend when user entered

    try {
        const existingUser = await users.findOne({ email }) //by using findone(email),check whether existing user with same email id
       
        if (existingUser) {
            res.status(406).json("user already exist")


        } else {

            const encryptedPassword = await bCrypt.hash(password,10) //here after install bcrypt lib, then use for hash pwds to security
            
            const newUser = new users({  //creating an object newUSER TO STORE users(from model)data ...with encrypted pswd
                name,email,password:encryptedPassword,profilepic: ""

            })

            await newUser.save()    // saved the client testimonial data from frontend user
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(err)
    }
}


// login
exports.loginController=async(req,res)=>{
    console.log("inside login function");
    const{email,password}=req.body     //login pg only have emaail and password
    // a chance of run time  error ,so we use try and catch mtd
    try{
        const existingUser=await users.findOne({email})  
        if (existingUser){ //enter this if after email valids otherwise invalid email
            let isMatch=await bCrypt.compare(password,existingUser.password)  //isMatch is a variable ,after compare password from user and already registered encrypted password...and stores encrypted password in isMatch
            
            if(existingUser.password==password||isMatch){  //this if mainly for admin not hashing password. this if when passwords in existingUser will be true in these cases 1.is admin password which is not encrypted  2.user encrypted password which is now stored in isMatch....otherwise invalid password
                const token=jwt.sign({userId:existingUser._id},process.env.jwt_secret) //above if conditon is true then enters ,then gives user_id and token  for login features
                res.status(200).json({existingUser,token})  
            }else{
                res.status(404).json("invalid password")
            }

        }else{
            res.status(404).json("invalid email")
        }
    }catch(err){
        res.status(401).json(err)
    }
}


//getAllusers list in admin side their name and email

exports.getAllUsers=async(req,res)=>{
    console.log("inside getAllUsers function");

    try {
        //find existingusers from user(database collection name),while finding take allusers name along with admin
        const existingUsers=await users.find().skip(1) //but we not need admin details bec admin is main to view and manage this website,so we use .Skip() here to remove that specific detail,admin id created at first so remove ...skip(1)
        res.status(200).json(existingUsers)
        
    } catch (err) {
        res.status(401).json(err)
        
    }
    
}