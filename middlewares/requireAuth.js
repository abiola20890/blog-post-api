const jwt = require('jsonwebtoken')
const UserModel = require("../models/user.model")


const requireAuth = async(req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            Error: "Access denied. No token provided."
        })
    };
    const token = authHeader.replace('Bearer ', '')
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findById(payload.userId)
        if (!user) {
            return res.status(401).json({
                Error: "User not found."
            })
        }

        req.user = user // now every route knowns who is logged in
        next()
    } catch (error) {
        return res.status(401).json({
            Error: "Invalid or expired token."
        })
    };
}

module.exports = requireAuth