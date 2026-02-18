const express = require("express")

const router = express.Router()

const userController = require("../controllers/user.controller")

router.post("/sign-up", userController.registerUser)
router.post("/login", userController.loginUser)


module.exports = router
