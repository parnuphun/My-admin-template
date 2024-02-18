const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const route = require('./route/route');
const route_client = require('./route/route.client')
const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended:true})); // req.body
app.use(express.json());

// api
app.use(route);
app.use(route_client)

// static folder
app.use(express.static(path.join(__dirname, "/public"))); 

// Set the path to the frontend dist folder
const distPath = path.resolve('dist');
app.use(express.static(distPath));

// app.get('/' ,(req,res)=>{
//     res.send('welcome to namphong school api !!');
// })

app.get('*', (req,res) => {
    res.sendFile(path.join(distPath,'index.html'));
});

app.listen(port , ()=>{
    console.log(`Server is runnig at port ${port}`);
})
