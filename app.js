const express = require('express');
const app = express();
const port = 3000;

const Course = require('./courses.js');
const Worker = require('./workers.js');

app.use(Course);
app.use(Worker);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('router error');
  });
  
  app.get("*", (req, res) => {  
    res.status(404).send("PAGE NOT FOUND");
  }); 
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
