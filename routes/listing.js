const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({ storage });
const User = require('../models/user');

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
  
// Favorite
router.post('/:id/favorite', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);
  if (!user.favorites.includes(id)) {
    user.favorites.push(id);
    await user.save();
  }
  res.redirect('back');
});
// Unfavorite
router.post('/:id/unfavorite', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);
  user.favorites = user.favorites.filter(favId => !favId.equals(id));
  await user.save();
  res.redirect('back');
});


 module.exports=router;