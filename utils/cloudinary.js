   require("dotenv").config();
   const express = require('express')
   const app = express()
   const multer = require("multer");
   const {CloudinaryStorage} = require("multer-storage-cloudinary");
   const cloudinary = require("cloudinary").v2;
   const router = express.Router()


   cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
   });

   // Uploading Image Configuration
   const storage =  new CloudinaryStorage({
      cloudinary: cloudinary,
      folder: "Project_3",
      allowedFormats: ["jpg", "png", "jpeg",],
      transformation: [
         { if: "w_gt_2000", width: 2000, crop: "scale" },
         { if: "h_gt_1900", height: 1900, crop: "scale" },
         { quality: "auto" },
         { format: 'jpg' }
      ]
   });
   const parser = multer({ storage: storage });

   app.post('/upload', parser.single("file"), async  (req, res) => {
      
      const imageUUID = req.file.public_id;
      
      //Code to store imageUUID in your database
   // Return the UUID to the front end like this if necessary
      res.json(imageUUID); // Return the UUID to the front end like this if necessary
   });

   
   

   module.exports = cloudinary ;
   module.exports= router 



