const multer = require('multer')
const path = require('path')
const dayjs = require('dayjs')

const storage = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/persons_image'))
    },
    filename(req,file,next){
        next(null,`${Math.round(Math.random()*100000)}_${Date.now()}`)
    }
})
const upload = multer({
    storage : storage
})

module.exports = upload