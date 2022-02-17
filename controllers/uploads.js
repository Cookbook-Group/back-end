const express = require("express");
const { cloudinary } = require("../utils/cloudinary");
const router = require("express").Router();

router.get("/api/images", async (req, res) => {
    const {resources} = await cloudinary.search.expression("folder: ml_default")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
    const publicIds = resources.map( file => file.public_Id)
    res.send(publicIds);
})

router.post("/api/uploads",  async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.uploads(fileStr, {
      upload_preset: "ml_default",
    });
    console.log(uploadedResponse);
    res.json({msg: "YAAAAAAAY IT WORKED!"})
  } catch (error) {
    console.error(error);
    res.status(500).json({err: "SOMETHING WENT WRONG!"})
  }
});

module.exports = router;
