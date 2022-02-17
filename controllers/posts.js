const express = require("express");
const { findById } = require("../models/posts");
const router = express.Router();
const Posts = require("../models/posts");
const Users = require("../models/user");

//Index Route
router.get("/", (req, res) => {
  Posts.find({}, (err, posts) => {
    if (err) {
      res.status(400).json({ err: err.message });
    }
    res.status(200).json(posts);
  });
});
//Create/Post Route
router.post("/", (req, res) => {
  Posts.create(req.body, (err, p) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.status(200).json(p);
  });
});

//Show Route
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id, (error, posts) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }

    res.status(200).json(posts);
  });
});

//Delete Route
router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    console.log(post);
    if (post) {
      Posts.find({}, (err, allPosts) => {
        res.status(200).json(allPosts)
    })
   } else {
      res.status(403).json("You can only delete your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Route
router.put("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("You can only update your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// like/dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    console.log(post);
    if (post.userId !== req.body.userId) {
      // let savedPost = await post.updateOne({ $push: { likes: req.body.userId }},{new: true},(err, doc)=> {
      //
      // })
      post.likes[0] += 1;
      //number of likes vs. array of user id's
      // post.likes.push(req.body.userId)
      let update = await post.save();
      res.status(200).json(update);
    } else {
      res.status(200).json("You cannot like your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline post
router.get("/timeline/:userId", async (req, res) => {
  let postArray = [];
  try {
    const currentUser = await Users.findById(req.body.userId);
    const userPosts = await Posts.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        Posts.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all user posts
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id );
    const posts = await Posts.find({user:req.params.id});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
