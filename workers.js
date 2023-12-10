
const express = require('express');
const router = express.Router();
const Worker = require("../data/Workers.json");

router.get('/Worker/:workerId', (req, res) => {
    const id = Number(req.params.workerId);
    const worker = Worker.find(work => work.Id === id);
    if (worker){
        res.send(worker);
      }
        else{
          res.status(404).send('Worker not found');
        }
    // res.send(`${JSON.stringify(worker)}`);
})

router.get('/Workers/query', (req, res) => {
    const Job = req.query.Job;
    const Job_result = Worker.filter(work => work.Job === Job);
    if (Job_result){
        res.send(Job_result);
      }
        else{
          res.status(404).send('Worker not found');
        }
    // res.send(`${JSON.stringify(Job_result)}`);
})

module.exports = router;
