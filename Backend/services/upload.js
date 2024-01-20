const multer = require('multer')
const path = require('path')
 
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
const upload_person_image = multer({
    storage : storage_person_image
}).single('person_image');  

// file 
const storage_file = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/file'))
    },
    filename(req,file,next){
        next(null,`${Math.round(Math.random()*100000)}_${Date.now()}`)
    }
})
const upload_file = multer({
    storage : storage_file
}).single('file_upload')


// admin image
const storage_admin_image = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/admin_image'))
    },
    filename(req,file,next){
        next(null,`${Math.round(Math.random()*100000)}_${Date.now()}.png`)
    }
})
const upload_admin_image = multer({
    storage : storage_admin_image
}).single('admin_image')

// activity image
const storage_activity_image = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/activity_image'))
    },
    filename(req,file,next){
        next(null,`activity_image_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`)
    }
})
const upload_activity_image = multer({
    storage : storage_activity_image
}).single('activity_image_cover')

// news cover image  *news_cover_image
const storage_news_cover_image = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/news_cover_image'))
    },
    filename(req,file,next){
        next(null,`news_cover_image_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`)
    }
})
const upload_news_cover_image = multer({
    storage : storage_news_cover_image
}).single('news_cover_image')

// banner school
const storage_banner = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/banner_image'))
    },
    filename(req,file,next){
        next(null,`banner_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`)
    }
})
const upload_baner_image = multer({
    storage : storage_banner
}).single('banner_image')

// announcement 
const storage_anno = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/anno_image'))
    },
    filename(req,file,next){
        next(null,`anno_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`)
    }
})
const upload_anno_image = multer({
    storage : storage_anno
}).single('anno_image')

// teaching schedule 
const storage_teaching_schedule = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/teaching_schedule_image'))
    },
    filename(req,file,next){
        next(null,`teaching_schedule_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`)
    }
})
const upload_teaching_schedule_image = multer({
    storage : storage_teaching_schedule
}).single('teaching_schedule_image')

// student schedule 
const storage_student_schedule = multer.diskStorage({
    destination(req,file,next){
        next(null,path.join(__dirname,'../public/student_schedule_image'))
    },
    filename(req,file,next){
        next(null,`student_schedule_${Math.round(Math.random()*100000)}_${Date.now()}.jpg`)
    }
})
const upload_student_schedule_image = multer({
    storage : storage_student_schedule
}).single('student_schedule_image')


  
module.exports = { 
    upload_person_image ,
    upload_file,
    upload_admin_image,
    upload_activity_image,
    upload_news_cover_image,
    upload_baner_image,
    upload_anno_image,
    upload_teaching_schedule_image,
    upload_student_schedule_image
};

 