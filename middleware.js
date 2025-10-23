const Listing=require("./models/listing");
const Review=require("./models/review");

const isLoggedIn=((req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){   
        if (req.session && req.method === "GET") {   
            req.session.redirectUrl = req.originalUrl; 
        }
        req.flash("error","you must be logged in to create listings!");
        return res.redirect("/login");
    }
    next();
});

const saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl  && req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
};
const isOwner=async (req,res,next)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(req.user._id)){
        req.flash("error","You don't have permission");
        return res.redirect("/listings");
    }
    next();
}
const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }
    if (!req.user || !review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
module.exports = { isLoggedIn, saveRedirectUrl,isOwner,isReviewAuthor};