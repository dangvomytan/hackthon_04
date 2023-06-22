const express = require('express');
const route = express.Router();

const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'database', 'posts.json');

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
      const finalData = convertData.find((item) => item.id == id);
      if (!finalData) {
         res.status(404).json({ message: 'not found !' });
      }
      res.status(200).json(finalData);
   });
});
// ADD
route.post('/', (req, res) => {
   // console.log("body",req.body);
   fs.readFile(dataPath, (error, data) => {
      if (error) {
         res.status(500).send('Error: server');
      }
      const convertData = JSON.parse(data);
      const newUser = {
         id: req.body.id,
         userId: req.body.userId,
         title: req.body.title,
         body: req.body.body,
      };
      console.log('newUser', newUser);
      convertData.push(newUser);
      fs.writeFile(dataPath, JSON.stringify(convertData), (error, data) => {
         if (error) {
            res.status(500).send('Error can not create');
         }
         res.status(200).send('Create successfully');
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
      const filterData = convertData.filter((data) => data.id != id);
      fs.writeFile(dataPath, JSON.stringify(filterData), (error, data) => {
         if (error) {
            res.status(400).send('Error can not delete');
         }
         res.status(200).send('Delete successfully');
      });
   });
});
//UPDATE
route.put('/:id', (req, res) => {
   fs.readFile(dataPath, (error, data) => {
      const id = req.params.id;
      console.log(id);
      if (error) {
         res.status(500).send('Error: error read database');
      }
      const convertData = JSON.parse(data);
      const findIndex = convertData.findIndex((item) => item.id == id);
      if (findIndex == -1) {
         res.status(404).json({ message: 'Question not found' });
      } else {
         convertData[findIndex] = Object.assign({}, convertData[findIndex], {
            ...req.body,
         });
         fs.writeFile(dataPath, JSON.stringify(convertData), (error, data) => {
            if (error) {
               res.status(500).send('Error: error write database');
            }
            res.status(200).json({ message: 'Update successfully' });
         });
      }
   });
});
module.exports = route;
