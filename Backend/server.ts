import express from 'express'

const routes = require('./routes/all.router')
const app = express()
const port:number = 4020 ;

app.use(routes)


app.listen(port || 4000 , ()=>{
    console.log('Server start at port ',port, ' ...');
})
