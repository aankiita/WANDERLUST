const express=require("express");
const router=express.Router({mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,saveRedirectUrl,isOwner,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../Controller/review.js");

router.post("/",isLoggedIn,wrapAsync(reviewController.postReview));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;
