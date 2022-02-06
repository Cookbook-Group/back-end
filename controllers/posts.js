const express = require("express");
const router = express.Router();
const Posts = require("../models/posts");

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
  Posts.create(req.body, (err, createdPosts) => {
    if (err) {
      res.status(400).json({ err: err.message });
    }
    res.status(200).json(createdPosts);
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
router.delete("/:id", (req, res) => {
  Posts.findByIdAndDelete(req.params.id, (error, posts) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }

    Posts.find({}, (err, allPosts) => {
      res.status(200).json(allPosts);
    });
  });
});

//Update Route
router.put("/:id", (req, res) => {
  Holiday.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedHoliday) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }

      Holiday.find({}, (err, allHolidays) => {
        res.status(200).json(allHolidays);
      });
    }
  );
});

module.exports = router;
