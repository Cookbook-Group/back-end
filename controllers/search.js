const express = require("express")
const router = require("express").Router()
const User = require("../models/user")
const Posts = require("../models/posts")

router.get('/', (req,res) =>{
    try{

    

    const { q } = req.query

    const keys =["username","email","title","calories","recipes","tags","user"]

    // const search = (data) => {
    //     return data.filter((item) =>
    //     keys.some((key) => item[key].toLowerCase().includes(q))
    //     )
    // }
    console.log(q)
  
    const users = User.find({$regex: q})

    res.status(200).json(users)
    }catch (err) {
        res.status(500).json(err)
    }


    // const users = User.find({$regex: q})
        // res.json(search(posts).slice(0, 10))
})

module.exports = router;