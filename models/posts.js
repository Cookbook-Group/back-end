const mongoose = require('../db/connection')

const postsSchema = new mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, default: 'Best Holiday Ever!'},
    likes: {type: Number, default: 0},
    tags: [{type:String}]
})

const Posts = mongoose.model('Posts', postsSchema)

module.exports = Posts