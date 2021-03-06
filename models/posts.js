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
    ingredients: [String],
    instructions: [String],
    likes: {
        type: Number,
        default: 0
    },
    tags: [{type: String}],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{ timestamps: true }
)

const Posts = mongoose.model('Posts', postsSchema)

module.exports = Posts