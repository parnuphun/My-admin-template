const multer = require('multer')
const path = require('path')
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//storage
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// person directory 
const storage_person_image = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/persons_image'))
    },
    filename(req,file,next){
        next(null,`${Math.round(Math.random()*100000)}_${Date.now()}.png`)
    }
})
const storage_person_image_update = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/persons_image'))
    },
    filename(req,file,next){
        next(null,`${Math.round(Math.random()*100000)}_${Date.now()}.png`)
    }
})

// file 
const storage_file = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/file'))
    },
    filename(req,file,next){
        next(null,`${Math.round(Math.random()*100000)}_${Date.now()}_${file.originalname}`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// upload method
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const upload_file = multer({
    storage : storage_file
}).single('file_upload')

const upload_person_image = multer({
    storage : storage_person_image
}).single('person_image');  

 
module.exports = { 
    upload_person_image ,
    upload_file
 };

 