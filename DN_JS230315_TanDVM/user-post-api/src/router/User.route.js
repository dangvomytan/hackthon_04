const express = require('express');
const route = express.Router();

const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'database', 'users.json');

// GET ALL
route.get('/', (req, res) => {
   fs.readFile(dataPath, (error, data) => {
      const convertData = JSON.parse(data);
      if (error) {
         res.status(500).send('Error read File data');
      }
      res.status(200).json(convertData);
   });
});
// GET ON ID
route.get('/:id', (req, res) => {
   fs.readFile(dataPath, (error, data) => {
      const id = req.params.id;
      if (error) {
         res.status(500).send('Error read File data');
      }

      const convertData = JSON.parse(data);
      //
      const finalUser = convertData.find((user) => user.id == id);
      if (!finalUser) {
         res.status(404).json({ message: 'user not found !' });
      }
      res.status(200).json(finalUser);
   });
});
// ADD User
route.post('/', (req, res) => {
   // console.log("body",req.body);
   fs.readFile(dataPath, (error, data) => {
      if (error) {
         res.status(500).send('Error: server');
      }
      const convertData = JSON.parse(data);
      const finalData = convertData.find((data) => data.email == req.body.email);
      if (finalData) {
         res.status(400).json({ message: 'email da ton tai' });
      } else {
         const newUser = {
            id: req.body.id,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            website: req.body.website,
            company: req.body.company,
         };
         console.log('newUser', newUser);
         convertData.push(newUser);
      }
      fs.writeFile(dataPath, JSON.stringify(convertData), (error, data) => {
         if (error) {
            res.status(500).send('Error can not create user');
         }
         res.status(200).send('Create success new user');
      });
   });
});
// DELTE
route.delete('/:id', (req, res) => {
   fs.readFile(dataPath, (error, data) => {
      const id = req.params.id;
      if (error) {
         res.status(500).send('Error: server error');
      }
      const convertData = JSON.parse(data);
      const filterData = convertData.filter((user) => user.id != id);
      fs.writeFile(dataPath, JSON.stringify(filterData), (error, data) => {
         if (error) {
            res.status(400).send('Error can not delete user');
         }
         res.status(200).send('Delete successfully user');
      });
   });
});
//UPDATE
route.put("/:id",(req, res) => {
     fs.readFile(dataPath, (error, data) => {
       const id = req.params.id;
       console.log(id);
       if (error) {
         res.status(500).send("Error: error read database");
       }
       const convertData = JSON.parse(data);
       const findIndex = convertData.findIndex((item) => item.id == id);
       if (findIndex == -1) {
         res.status(404).json({ message: "Question not found" });
       } else {
         convertData[findIndex] = Object.assign({}, convertData[findIndex], {
           ...req.body,
         });
         fs.writeFile(dataPath, JSON.stringify(convertData), (error, data) => {
           if (error) {
             res.status(500).send("Error: error write database");
           }
           res.status(200).json({ message: "Update successfully" });
         });
       }
     });
   });
module.exports = route;