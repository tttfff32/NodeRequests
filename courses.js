
const express = require('express');
const router = express.Router();
const Courses = require("../data/Courses.json");

const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;

router.get('/', (req, res) => {
  res.status(200).send(Courses);
});

router.get('/:coursesId', (req, res) => {
  const id = req.params.coursesId;
  const Cours = Courses.find(cours => cours.Id === id);
  if (Cours) {
    res.status(200).send(Cours);
  }
  else {
    res.status(404).send('Course not found');
  }
});

router.post('/', async(req, res) => {
    try {
       const data = req.body;
      Courses.push(data);
      await fsPromises.writeFile( "../data/Courses.json" ,JSON.stringify(Courses,null,2));
      res.send("File written successfully");

    } catch (err) {
      console.error(err);
    }
 });


router.delete('/:deletId', async(req, res) => {
  try {
    const id = req.params.deletId;
    const itemIndex = Courses.findIndex(cours => cours.Id === id);
    console.log(itemIndex);
    if (itemIndex === undefined) {
      res.status(404);
      res.send(`cours not found : (  `);
    }
    else {
      Courses.splice(itemIndex,1);
     await fsPromises.writeFile("../data/Courses.json",JSON.stringify(Courses,null,2));
      res.send(`DELETE Request Called:${id}`);
    }
  }
  catch(err)
  {
   console.log(`catch erorr`);
  }

});

router.put('/:putId', async(req, res) => {
  try {
    const id = req.params.putId;
    const itemIndex = Courses.findIndex(cours => cours.Id === id);
    console.log(itemIndex);
    if (itemIndex === -1) {
      res.status(404);
      res.send(`cours not found : (  `);
    }
    else {
      Courses[itemIndex]={
        Id:id,
        Discription:req.body.Discription||Courses[itemIndex].Discription
      }
      await fsPromises.writeFile("../data/Courses.json",JSON.stringify(Courses,null,2));
      res.send("the course update!");
    }
}catch{
  console.log("put error");
}
});

router.get('/', (req, res) => {
  res.status(200).send("default");
});


module.exports = router;