import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POSTS

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ succes: true, data: posts });
  } catch (err) {
    res.status(500).json({ succes: false, data: err });
  }
});

// CREATE A POST
router.route("/").post(async (req, res) => {
  console.log("salut" + req.body);
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ succes: true, data: newPost });
  } catch (err) {
    res.status(500).json({ succes: false, message: err });
  }
});

export default router;