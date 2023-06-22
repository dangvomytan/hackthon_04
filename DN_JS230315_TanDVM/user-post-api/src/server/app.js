const express = require('express');
const app = express();
const port = 8080;

const userRouter = require('../router/User.route')
const postRouter = require('../router/Post.route')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
     res.status(200).send("Home")
})
app.use('/user',userRouter);
app.use('/post',postRouter);

app.listen(port,()=>{
     console.log(`Sever express http://localhost:${port}`);
})
