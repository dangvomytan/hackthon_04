const express = require('express');
const route = express.Router();

const path = require("path");
const fs = require("fs");

route.use(express.urlencoded());

const dataPath = path.join(__dirname, "..", "database", "data.json");

route.get('/',(req,res)=>{
     fs.readFile(dataPath, (error, data) => {
          if (error) {
            res.status(500).send("Error: error read database");
          }
          const convertData = JSON.parse(data);
          res.status(200).json(convertData);
        });
})



module.exports=route;