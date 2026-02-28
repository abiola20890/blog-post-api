const UserModel = require("../models/user.model")


const jwt = require("jsonwebtoken")

const { hashPassword, comparePassword } = require("../utils/bcrypt");



const registerUser = async (req, res,next) => {
    try {

  const {email, name, password} = req.body;
  const existingUser = await UserModel.findOne({email: email})
  if (existingUser) {
    return res.status(409).json({
      message: "User already exists"
    })
  }
  const hashedPassword = await hashPassword(password);
 
  const user = new UserModel({
    name: name,
    email: email,
    password: hashedPassword
  })
  await user.save()
  res.status(201).json({
    message: "User registered successfully",
    user: {
        _id: user._id,
        name: user.name,
        email: user.email
    }
});
    } catch (error) {
        console.error("Error registering user:", error);
        next(error)
    }

}

const loginUser = async (req, res, next) => {

    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email: email})
        if (!user) {
            return res.status(401).json({
                message: "User does not exist"
            })
        }
        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({userId: user._id, name: user.name}, //payload
            process.env.JWT_SECRET, //secret key
            {expiresIn: "7d"})//options
        const responseUser = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        return res.status(200).json({
            message: "Login successful",
            user: responseUser,
            token: token
        })
    } catch (error) {   
        console.error("Error logging in user:", error);
        next(error)
    }

}

module.exports = {
     registerUser,
     loginUser
}