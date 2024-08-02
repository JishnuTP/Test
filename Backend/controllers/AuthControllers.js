const User = require("../model/UserModel");
const bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken")
const dotenv= require("dotenv")

dotenv.config();
let JWT_SECRET="thisismy-secret-code"


const register = async(req,res)=>{
    const {firstName,lastName,email,password,role}=req.body;
    console.log(req.body);
    try {
        const UserExist= await User.findOne({email});//checking user exist or not 

        if(UserExist){
            return res.status(400).json({message:"user already exists"});//
        }
        const salt = await bcrypt.genSalt(10) // generate  salt
        const hashedpassword = await bcrypt.hash(password,salt) // bcrypting password with salt
        
        const user= new User({
          firstName,
          lastName,
            email,
            password:hashedpassword, 
            role
        })
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login Controller
const login = async (req, res) => {
  console.log('Request body:', req.body);
  const { email, password } = req.body;
  
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    console.log('User found:', user);

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('Password matched');

    // Generate the JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token generated:', token);

    // Send the response with the token and user details
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







  
module.exports= {register,
    login,
    getUserDetails,
   
}