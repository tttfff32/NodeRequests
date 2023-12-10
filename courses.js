
const express = require('express');
const router = express.Router();
const Courses = require("../data/Courses.json");


router.get('/Courses', (req, res) => {
    res.status(200).send(Courses);
});

router.get('/Courses/:coursesId', (req, res) => {
    const id = Number(req.params.coursesId);
    const Cours = Courses.find(cours => cours.Id === id);
    if(Cours){
        res.status(200).send(Cours);
      } 
      else{
        res.status(404).send('Course not found');
      }
    // res.send(`${JSON.stringify(Cours)}`);
});

module.exports =router;