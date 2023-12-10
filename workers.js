
const express = require('express');
const router = express.Router();
const Worker = require("../data/Workers.json");

const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;

router.get('/', (req, res) => {
  res.status(200).send(Worker);
});

router.get('/:workerId', (req, res) => {
    const id = req.params.workerId;
    const worker = Worker.find(work => work.Id === id);
    if (worker){
        res.send(worker);
      }
        else{
          res.status(404).send('Worker not found');
        }
})

router.get('/query', (req, res) => {
    const Job = req.query.Job;
    const Job_result = Worker.filter(work => work.Job === Job);
    if (Job_result){
        res.send(Job_result);
      }
        else{
          res.status(404).send('Worker not found');
        }
});

router.post('/', async(req, res) => {
  try {
     const data = req.body;
    Worker.push(data);
    await fsPromises.writeFile( "../data/Workers.json" ,JSON.stringify(Worker,null,2));
    res.send("File written successfully");

  } catch (err) {
    console.error(err);
  }
});

router.delete('/:deletId', async(req, res) => {
  try {
    const id = req.params.deletId;
    console.log(id);
    const itemIndex = Worker.findIndex(worker => worker.Id=== id);
    console.log(itemIndex);
    if (itemIndex === -1) {
      res.status(404);
      res.send(`worker not found : (  `);
    }
    else {
      Worker.splice(itemIndex,1);
     await fsPromises.writeFile("../data/Workers.json",JSON.stringify(Worker,null,2));
      res.send(`DELETE Request Called:${id}`);
    }
  }
  catch(err)
  {
   console.log(`catch erorr`);
}}
);

router.put('/:putId', async(req, res) => {
  try {
    const id = req.params.putId;
    const itemIndex = Worker.findIndex(worker => worker.Id === id);
    console.log(itemIndex);
    if (itemIndex === -1) {
      res.status(404);
      res.send(`worker not found : (  `);
    }
    else {
      Worker[itemIndex]={
        Id:id,
        Name:req.body.Name||Worker[itemIndex].Name,
        Phone:req.body.Phone||Worker[itemIndex].Phone,
        Email:req.body.Email||Worker[itemIndex].Email,
        Job:req.body.Name||Worker[itemIndex].Job,
        Platoon:req.body.Platoon||Worker[itemIndex].Platoon,
        DateBeginWork:req.body.DateBeginWork||Worker[itemIndex].DateBeginWork,

      }
      await fsPromises.writeFile("../data/Courses.json",JSON.stringify(Worker,null,2));
      res.send("the worker update!");
    }
}catch{
  console.log("put error");
}
});
module.exports = router;


