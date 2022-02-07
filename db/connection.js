const mongoose = require('mongoose')

const mongoURI = 'mongodb://localhost:27017/posts'

mongoose.connect( mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(instance => {
    console.log(`Connected to the db: ${instance.connections[0].name}`);
})
.catch(err=> console.log(`Connection failed`, err))

module.exports = mongoose
