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

// admin image
const storage_admin_image = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/admin_image'))
    },
    filename(req,file,next){
        next(null,`${Math.round(Math.random()*100000)}_${Date.now()}.png`)
    }
})

// activity image
const storage_activity_image = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/activity_image'))
    },
    filename(req,file,next){
        next(null,`activity_image_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`)
    }
})

// news cover image  *news_cover_image
const storage_news_cover_image = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/news_cover_image'))
    },
    filename(req,file,next){
        next(null,`news_cover_image_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`)
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

const upload_admin_image = multer({
    storage : storage_admin_image
}).single('admin_image')
 
const upload_activity_image = multer({
    storage : storage_activity_image
}).single('activity_image_cover')

const upload_news_cover_image = multer({
    storage : storage_news_cover_image
}).single('news_cover_image')

module.exports = { 
    upload_person_image ,
    upload_file,
    upload_admin_image,
    upload_activity_image,
    upload_news_cover_image
};

 