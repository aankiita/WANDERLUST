const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const User=require("../models/user.js");
const userController=require("../Controller/user.js");

const passport=require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");

router.route("/signup")
    .get(userController.signupGet)
    .post(wrapAsync(userController.signupPost));

router.route("/login")
.get(userController.loginGet)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),userController.loginPost);

router.get("/logout",userController.logout);
module.exports=router;

