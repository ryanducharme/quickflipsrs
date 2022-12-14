const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const exchangeController = require("../controllers/exchange")
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const passport = require("passport");
require('../config/googleAuthPassport')

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

//Google Auth
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/profile', failureRedirect: '/auth/failure'
}));

router.get('/auth/failure', (req, res) => {
  res.send('Something went wrong...')
})
//exchange routes
// router.post("/item", exchangeController.postItem);
// router.get("/item", exchangeController.getItems);
router.get("/item/:name", exchangeController.getItem);

router.get("/trade", ensureAuth, exchangeController.getTradeTracker);
router.get("/watchlist", ensureAuth, exchangeController.getWatchlist);
// router.post("/watchlist", ensureAuth, exchangeController.postWatchlist);
// router.get("/item", ensureGuest, exchangeController.getItem);


module.exports = router;
