const mongoose = require('./connection')
const Posts = require('../models/posts')

Posts.deleteMany({})
.then(()=>{
    return Posts.insertMany([
        {
            

        }
    ])
})