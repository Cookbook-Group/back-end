const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require('bcrypt')
const passportLocal = require("passport-local").Strategy;

//GET all users to test sign up and log in
router.get('/',(req,res) => {
    User.find({}, (err, posts) => {
        if (err) {
          res.status(400).json({ err: err.message });
        }
        res.status(200).json(posts);
      });
})

//SIGN UP
router.post('/signup', async (req,res) =>{
  try{
    if(req.body.password === req.body.verifyPassword) {
    const userExists = await User.findOne({username: req.body.username})
      if (userExists) {
        res.send("User Already Exists");  
        } else {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      verifyPassword: hashedPassword
    })
    const user = await newUser.save()
    res.status(200).json(user)
      } 
  } else {
    res.send('Password must match')
  }
}catch(err){
    res.status(500).json(err)
  }
})


//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

//GET A USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

//EDIT USER INFO
router.put('/:id', (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updateUser) => {
    if(err){
      res.status(400).json(err)
    }
    res.status(200).json(updateUser)
  })
})


// FOLLOW 
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { followings: req.params.id } })
        res.status(200).json('You are now followed this user' )
      } else {
        res.status(403).json('You allready follow this user')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
})

//UNFOLLOW
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you did not follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } 
})

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});



  



module.exports = router;