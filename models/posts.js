const mongoose = require('../db/connection')

const postsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    calories: Number,
    recipes: [String],
    likes: {
        type: Array, 
        default: []
    },
    tags: [{type: String}]
},
{ timestamps: true }
)

const Posts = mongoose.model('Posts', postsSchema)

module.exports = Posts