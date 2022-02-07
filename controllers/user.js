const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

router.get('/register',(req,res) => {
    User.find({}, (err, posts) => {
        if (err) {
          res.status(400).json({ err: err.message });
        }
        res.status(200).json(posts);
      });
})

router.post("/register", async(req, res) => {
        try {
            const userExists = await User.findOne({username: req.body.username})
            if (userExists) {
              res.send("User Already Exists");  
            } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
      }  
        }  catch (err) {
            res.status(500).json(err)
          };
  });

  



module.exports = router;