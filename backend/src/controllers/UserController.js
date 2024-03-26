const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

module.exports.userRegistration = asyncHandler(async (req, res, next) => {
    const { name, email, password, password_confirmation } = req.body
    const user = await UserModel.findOne({ where: {email: email} })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    } else {
      if (name && email && password && password_confirmation) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const doc = new UserModel({
                name: name,
                email: email,
                password: hashPassword
            })
            await doc.save()
            const saved_user = await UserModel.findOne({ email: email })
            // Generate JWT Token
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
          } catch (error) {
            next(new ErrorResponse("Unable to Register", 400))
          }
        } else {
            next(new ErrorResponse("Password and Confirm Password doesn't match", 400))
        }
      } else {
        next(new ErrorResponse("All fields are required", 400))
      }
    }
})

module.exports.userLogin = asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await UserModel.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.send({ "status": "success", "message": "Login Success", "token": token })
          } else {
            next(new ErrorResponse("Email or Password is not Valid", 400))
          }
        } else {
            next(new ErrorResponse("You are not a Registered User", 400))
        }
      } else {
        next(new ErrorResponse("All Fields are Required", 400))
      }
    } catch (error) {
      next(new ErrorResponse("Unable to Login", 400))
    }
})

module.exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        next(new ErrorResponse("New Password and Confirm New Password doesn't match", 400))
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        // Find user
        const user = await UserModel.findByPk(req.user._id)
        // Update password
        user.set({ password: newHashPassword });
        await user.save();
        res.send({ "status": "success", "message": "Password changed succesfully" })
      }
    } else {
        next(new ErrorResponse("All Fields are Required", 400))
    }
})

module.exports.loggedUser = asyncHandler((req, res, next) => {
    res.send({ "user": req.user })
})
/*
module.exports.sendUserPasswordResetEmail = (req, res, next) => {
    const { email } = req.body
    if (email) {
      const user = await UserModel.findOne({ email: email })
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
        const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
        console.log(link)
        // // Send Email
        // let info = await transporter.sendMail({
        //   from: process.env.EMAIL_FROM,
        //   to: user.email,
        //   subject: "GeekShop - Password Reset Link",
        //   html: `<a href=${link}>Click Here</a> to Reset Your Password`
        // })
        res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
      } else {
        res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
    }
  }

module.exports.userPasswordReset = (req, res, next) => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    try {
      jwt.verify(token, new_secret)
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password Reset Successfully" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }
  }
*/