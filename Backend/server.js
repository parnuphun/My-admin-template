const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const route = require('./route/route');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true})); // req.body

// static folder
app.use(express.static(path.join(__dirname, "/public"))); 

app.use(route);

app.get('/' ,(req,res)=>{
    res.send('welcome to namphon school api !!');
})

app.listen(port , ()=>{
    console.log(`Server is runnig at port${port}`);
})
