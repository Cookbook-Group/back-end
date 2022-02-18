const express = require('express')
const User = require('../models/user')
const router = express.Router()
const passport = require("passport")

const isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("You must login first!");
  }
};

const CLIENT_URL = process.env.FRONTEND_URL

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));
  
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${CLIENT_URL}login/success`,
    failureRedirect: `${CLIENT_URL}login/failed`,
  }),
  (req, res) => {
    console.log("User: ", req.user);
    res.send("Thank you for signing in!");
  }
);


router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        cookies: req.cookies,
      });
    }
  });
  
  router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });
  
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
  });
  
  router.get("/user", isUserAuthenticated, (req, res) => {
    res.json(req.user);
  });

     
module.exports = router