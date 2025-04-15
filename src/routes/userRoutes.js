const express = require("express");
const verifyToken = require("../middleware/authMiddleware.js")
const allowRoles = require("../middleware/checkRole.js")
const {admin,manager,user} = require("../controllers/userController.js")
const router = express.Router();

//manager
router.get("/manager",verifyToken,allowRoles("admin","manager"),manager)

//admin && manager
router.get("/admin",verifyToken,allowRoles("admin"),admin)


//all
router.get("/user",verifyToken,allowRoles("admin","manager","user"),user)

module.exports = router