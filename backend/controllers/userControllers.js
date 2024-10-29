import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//route POST /api/users/register
const registerUser = asyncHandler(async( req, res) => {
  const { name, email, password, isAdmin } = req.body;
  
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  
  // getting back profile pic from cloudinary
  let pic; // if u do not pass pic then pic will be undefined and thus default pic will be shown
  if (req.file) {
      pic = req.file.path;
    }
    
    const user = await User.create({
      name,
      email,
      password,
      pic,
      isAdmin,
    });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
}); 


//route POST /api/users/login
const loginUser = asyncHandler(async( req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});

  if(!user) {
    res.status(401);
    console.log("please register first");
    throw new Error("please register first");
  }

  if (await user.matchPassword(password)) {
    generateToken(res, user._id);
    console.log("login successful");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(401);
    console.log("Invalid email or password");
    throw new Error("Invalid email or password");
  }
});


//route POST /api/users/logout
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'User logged out'});
});


//route POST /api/users/profile
const getUserProfile = asyncHandler(async(req,res)=>{
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        pic: req.user.pic,
        isAdmin: req.user.isAdmin
    }

    res.status(200).json(user);
});


//route PUT /api/users/profile
const updateProfile = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.user._id);
 
  // getting back profile pic from cloudinary
  let pic; // if u do not pass pic then pic will be undefined and thus default pic will be shown
  if (req.file) {
    console.log(req.file, "profile pic");
    pic = req.file.path;
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = pic || user.pic;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save(); //user is a monggose model so it is connectedt ot MongoDB collection and has access to its methods
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export { loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateProfile
 };