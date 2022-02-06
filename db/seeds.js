const mongoose = require('./connection')
const Posts = require('../models/posts')
const postsSeeds = require('./seeds.json')



Posts.deleteMany({})
 .then(()=>{
     return Posts.insertMany(postsSeeds)
})
 .then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})