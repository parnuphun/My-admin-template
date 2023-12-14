const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const route = require('./route/route');
const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended:true})); // req.body
app.use(express.json());
app.use(route);

// static folder
app.use(express.static(path.join(__dirname, "/public"))); 


app.get('/' ,(req,res)=>{
    res.send('welcome to namphon school api !!');
})


app.listen(port , ()=>{
    console.log(`Server is runnig at port ${port}`);
})
