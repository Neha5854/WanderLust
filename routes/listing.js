const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingController.index))// index route:
.post(
  isLoggedIn,
  validatelisting, 
  upload.single('listing[image]'),
  wrapAsync(listingController.createListing));
 //Create Route
 
//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);



  router.route("/:id")
  .get(
   wrapAsync(listingController.showListing))
   .put(isLoggedIn, 
  isOwner,upload.single('listing[image]'),validatelisting,
  wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,isOwner, 
  wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  listingController.rendereditForm );
  



 module.exports=router;