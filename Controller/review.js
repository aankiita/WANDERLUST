const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.postReview=async(req,res,next)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","new review created");
    console.log("new review saved");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview=async(req,res,next)=>{  
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
};