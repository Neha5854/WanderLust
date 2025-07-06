const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const User = require("../models/user");
const { isLoggedIn } = require("../middleware");

// Add to favorites
router.post("/listings/:id/favorite", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user.favorites.includes(id)) {
    user.favorites.push(id);
    await user.save();
  }

  req.flash("success", "Added to your favorites!");
  res.redirect(`/listings/${id}`);
});

// Remove from favorites
router.post("/listings/:id/unfavorite", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  user.favorites = user.favorites.filter(favId => favId.toString() !== id);
  await user.save();

  req.flash("success", "Removed from favorites!");
  res.redirect(`/listings/${id}`);
});

// View all favorites
router.get("/favorites", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");
  res.render("users/favorites", { favorites: user.favorites });
});

module.exports = router;
