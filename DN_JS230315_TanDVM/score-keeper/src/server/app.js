const express = require('express');
const app = express();
const port = 3000;

const playgameRoute = require('../router/playgame.route')

const path = require('path');
const fs = require('fs');
//Path
const playgamePath = path.join(__dirname, "..","..","public","playgame.html");
const createUserPath = path.join(__dirname, "..","..","public","createUser.html");
//Middleware
app.use(express.static(path.join(__dirname,"..","..","public")))


app.get("/",(req,res)=>{
     res.status(200).sendFile(playgamePath);
})
app.get("/create",(req,res)=>{
     res.status(200).sendFile(createUserPath);
})
app.use('/playgame',playgameRoute)

app.listen(port,()=>{
     console.log(`Server express http://localhost:${port}`);
})