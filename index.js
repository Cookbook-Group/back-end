const express= require ('express');
const app= express();
const PORT= 4000;
const cors = require('cors')
const postsController = require('./controllers/posts')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/posts',postsController)




app.listen(PORT,() => {
    console.log('Posting recipes!')
    
})