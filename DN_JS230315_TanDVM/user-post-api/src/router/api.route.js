const express = require('express');
const route = express.Router();

const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'database', 'posts.json');

route.get('/:id/posts', (req, res) => {
   fs.readFile(dataPath, (error, data) => {
      const id = req.params.id;
      console.log(id);
      if (error) {
         res.status(500).send('Error read File data');
      }

      const convertData = JSON.parse(data);
      const filterData = convertData.filter((data) => data.userId == id);
      console.log(filterData);
      if (!filterData) {
         res.status(404).json({ message: 'not found !' });
      }
      res.status(200).json(filterData);
   });
});
module.exports = route;
