const express = require('express');
const Course = require('./courses.js');
const Worker = require('./workers.js');
const port = 3000;
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/Courses',Course);
app.use('/Workers',Worker);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('router error');
//   });
  
  // app.delete("*", (req, res) => {  
  //   res.status(404).send("PAGE NOT FOUND");
  // }); 
  // app.get("*", (req, res) => {  
  //   res.status(404).send("PAGE NOT FOUND");
  // }); 


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
