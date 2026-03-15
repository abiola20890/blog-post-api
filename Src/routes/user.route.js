const express = require("express")

const router = express.Router()

const {registerUser, loginUser} = require("../controllers/user.controller.js")
const {validateRegisterUser, validateLoginUser} = require("../Validation/user.validation.js")

router.post("/sign-up", validateRegisterUser,registerUser)
router.post("/login", validateLoginUser, loginUser)

router.get("/test", (req, res) => {
  res.json({ message: "User route working" });
});


module.exports = router
