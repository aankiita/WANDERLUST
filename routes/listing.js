const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const { isLoggedIn, saveRedirectUrl ,isOwner} = require("../middleware.js"); 

const listingController=require("../Controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

router.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const listings = await Listing.find({
    country: { $regex: `^${query}$`, $options: "i" } });
    res.render("listings/index.ejs", { allListings: listings, query });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while searching listings");
  }
});


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.CreateNewListing));  


router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm));
router.route("/:id")
.get(wrapAsync(listingController.renderShowForm))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync(listingController.updateEditForm))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteForm));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;

