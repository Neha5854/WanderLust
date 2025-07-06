const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const{validatereview,isLoggedIn,isreviewAuthor}=require("../middleware.js");
const controllerreview=require("../controllers/reviews.js");
const review=require("../models/review.js");

//review
//post route
router.post("/",isLoggedIn,validatereview,wrapAsync(controllerreview.createreview));
//delete review route
router.delete("/:reviewId",isLoggedIn,
  isreviewAuthor,
  wrapAsync(controllerreview.destroyReview));
module.exports=router;