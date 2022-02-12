const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI =  process.env.MONGOURI

mongoose.connect( mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(instance => {
    console.log(`Connected to the db: ${instance.connections[0].name}`);
})
.catch(err=> console.log(`Connection failed`, err))

module.exports = mongoose
