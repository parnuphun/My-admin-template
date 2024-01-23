const { dbQuery } = require('../services/query');
const date_convert = require('../services/date_convert')
const return_err = require('../services/return_err')
const fs = require('fs') 
const path = require('path');
// get data to main page 
module.exports.mainPage =  async(req,res) => {
    try {
        const qr_school_banner = `SELECT banner_img , banner_slogan , anno_limit FROM school_setting WHERE id = 1`
        const qr_anno_image = `SELECT * FROM announment WHERE anno_pin = 1 ORDER BY anno_date DESC LIMIT ?`
        const qr_news = `SELECT * FROM news ORDER BY news_date DESC LIMIT 4`
        const qr_activity_image = `SELECT * FROM activity_image ORDER BY activity_image_date DESC LIMIT 8`
    
        const result_banner = await dbQuery(qr_school_banner)
        const limit = result_banner[0].anno_limit

        
        const result_anno_image = await dbQuery(qr_anno_image,[limit])
        const result_news = await dbQuery(qr_news)
        const result_activity_img = await dbQuery(qr_activity_image)
       
        // format date
        if(result_news.length >= 1){
            for (let i = 0; i < result_news.length; i++) {
                result_news[i].news_date = await date_convert(result_news[i].news_date,false,true)
            }
        }

        res.status(200).json({
            status: true,
            status_code: 200 ,
            base_image_path : {
                base_banner_img : process.env.BANNER_PATH,
                base_anno_img : process.env.ANNO_IMAGE,
                base_activity_img : process.env.ACTIVITY_IMAGE ,
                base_news_img : process.env.NEWS_COVER_IMAGE
            },
            main_data : {
                banner : result_banner ,
                anno : result_anno_image ,
                news : result_news,
                activity_img : result_activity_img
            }
        })

    } catch (err) {
        return_err(res,'TRY CATCH','GET DATA CLIENT MAIN ',err,500)
    }
}

// get activity image length
module.exports.getActivityImageLengthClient = async(req,res) =>{ 
    try {
        const qr_length = `SELECT COUNT(*) AS length FROM activity_image `
        const result_length = await dbQuery(qr_length)
        const length = result_length[0].length

        res.status(200).json({
            status: true,
            status_code: 200 ,
            data_length:length
        })
    } catch (err) {
        return_err(res,'TRY CATCH','GET ACTIVITY IMAGE LENGTH FOR CLIENT',err,500)
    }
}

// get activity image list
module.exports.getActivityImageListClient = async(req,res) =>{
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_activity_image = `SELECT * FROM activity_image ORDER BY activity_image_date DESC LIMIT ? OFFSET ?`
        const result = await dbQuery(qr_activity_image,[limit,start_item])

        res.status(200).json({
            status: true,
            status_code: 200 ,
            base_image_path: process.env.ACTIVITY_IMAGE,
            data_list:result
        })


    } catch (err) {
        return_err(res,'TRY CATCH','GET ACTIVITY IMAGE FOR CLIENT',err,500)
    }
}

// get news length
module.exports.getNewsLengthClient = async (req,res) => {
    try {
        const qr_length = `SELECT COUNT(*) AS length FROM news `
        const result_length = await dbQuery(qr_length)
        const length = result_length[0].length

        res.status(200).json({
            status: true,
            status_code: 200 ,
            data_length:length
        })
    } catch (err) {
        return_err(res,'TRY CATCH','GET NEWS LENGTH FOR CLIENT',err,500)
    }
}

// get news list 
module.exports.getNewsListClient = async(req,res) =>{
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_news = `SELECT * FROM news ORDER BY news_date DESC LIMIT ? OFFSET ?`
        const result_news = await dbQuery(qr_news,[limit,start_item])

        // format date
        if(result_news.length >= 1){
            for (let i = 0; i < result_news.length; i++) {
                result_news[i].news_date = await date_convert(result_news[i].news_date,false,true)
            }
        }

        res.status(200).json({
            status: true,
            status_code: 200 ,
            base_image_path: process.env.NEWS_COVER_IMAGE,
            news_data_list:result_news
        })


    } catch (err) {
        return_err(res,'TRY CATCH','GET NEWS LIST FOR CLIENT',err,500)
    }
}

// get news contents 
module.exports.getNewsContent = async(req,res) => {
    try {
        const id = req.body.news_id
        const qr_get_content = `SELECT * FROM news WHERE news_id = ?`
        const qr_get_category_name = `SELECT * FROM news_category WHERE news_category_id = ?`
        const result_data = await dbQuery(qr_get_content,[id])
        const result_category_name = await dbQuery(qr_get_category_name,[result_data[0].news_category])
        result_data[0].news_date = await date_convert(result_data[0].news_date,false,true)
        result_data[0].news_category_name = result_category_name[0].news_category_name

        res.status(200).json({
            status_code : 200 ,
            status:true ,
            contents: result_data[0]
        })
    } catch (err) {
        return_err(res,'TRY CATCH','GET DATA CLIENT MAIN ',err,500)
    }
}

// get file 
module.exports.getAllfilsClient = async(req,res) => {
    try {
        const qr_file_category = `SELECT * FROM file_category`
        const qr_files = `SELECT * FROM file WHERE file_pin = 1 AND file_category_id = ? ORDER BY file_date DESC`
        

        const result_file_category = await dbQuery(qr_file_category)
        let data = []

        for (let i = 0; i < result_file_category.length; i++) {
            const result_file = await dbQuery(qr_files,[result_file_category[i].file_category_id])

            let dataDetail = {}
            dataDetail.category_id = result_file_category[i].file_category_id
            dataDetail.category_name = result_file_category[i].file_category_name
            dataDetail.files_list = result_file
            for (let j = 0; j < result_file.length; j++) { 
                result_file[j].file_date = await date_convert(result_file[j].file_date,false,true)
            }
            data.push(dataDetail)
        }
        res.status(200).json({
            status_code:200,
            status:true,
            data_list:data
        })
        
    } catch (err) {
        return_err(res,'TRY CATCH','GET FILE CLIENT ',err,500)
    }
}

// preview file Clienent
module.exports.previewFileClient = async(req,res) => {
    try {        
        const file_name_upload = req.body.file_name_upload
        const filePath = path.join(__dirname, `../public/file/${file_name_upload}`)
        // console.log('file existsSync => ',fs.existsSync(filePath));
        if(fs.existsSync(filePath)){
            res.json({
                status: true,
                status_code: 200 ,
                file_url:process.env.FILE_PATH+file_name_upload
            })
        }else{
            res.send({
                status: false,
                status_code: 200 ,
                msg:'ไม่มีไฟล์นี้ในระบบ'
            })
        }
    } catch (err) {
        return_err(res,'TRY CATCH','PREVIEW FILE ',err,500)
    }
}

// get person table tree preview for client 
module.exports.getPersonTreeclient = async (req ,res) => {
    try {
        let position_detail  
        let data = []
        let dataTable = []
        const category_id = req.body.category_id
        const qr_position_list = `SELECT * FROM person_directory_position WHERE pd_category_id = ?`
        const qr_persons = `SELECT * FROM person_directory_persons WHERE pd_position_id = ? `
        
        const result_position = await dbQuery(qr_position_list,[category_id])
        const position_length = result_position.length
        position_detail = result_position

        if(position_length === 0)return res.status(200).json({
            status_code : 200,
            status : true ,
            personsData : data,
            personsDataTable : dataTable,
            personsBaseImageURL: process.env.PERSONS_DIARECTORY_IMAGE,
            msg:'ไม่มีข้อมูล' 
        })
        // format data
        for(let i = 0 ; i < position_length ; i++){
            data[i] = {};
            data[i].position_id = position_detail[i].pd_position_id
            data[i].position_name = position_detail[i].pd_position_name

            // const result = await getPersons(position_detail[i].pd_position_id);
            const result = await dbQuery(qr_persons,[position_detail[i].pd_position_id])

            // add persons to prosition 
            data[i].persons = result;
            for (let j = 0; j < result.length; j++) {
                dataTable.push(result[j]);
            };

            if(i >= (position_length-1)){
                res.status(200).json({
                    status_code : 200,
                    status : true ,
                    person_data : data,
                    person_data_table : dataTable,
                    base_image_path: process.env.PERSONS_DIARECTORY_IMAGE
                })
            }
            
        }
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET PERSON TABLE TREE ',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
    }
}

// get all category client
module.exports.getPersonCateListClient = async (req,res) =>{
    try {
        const result = await dbQuery(`SELECT * FROM person_directory_category`)
        res.json({
            status:true,
            status_code:200,
            position_category:result
        })
    } catch (err) {
        return_err(res,'TRY CATCH BLOCK','GET PERSON CATEGORY',err,500)
    }
}

// get teaching schedule list 
module.exports.getTeachingSClient = async (req,res) => {
    try {
        const qr_get_class = `SELECT * FROM class`
        const qr_get_data = `SELECT * FROM teaching_schedule ORDER BY ts_name ASC `

        const result_class = await dbQuery(qr_get_class)
        const result = await dbQuery(qr_get_data,)
       
        // add class name 
        if(result_class.length >= 1){
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result_class.length; j++) {
                    if(result[i].class_id === result_class[j].class_id){
                        result[i].class_name = result_class[j].class_name
                        break;
                    }
                }
            }
        }
        res.status(200).json({
            status:true,
            status_code:200,
            data_list:result,
            base_image_path:process.env.TEACHING_SCHEDULE
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','DELETE NEWS CATEGORY ',err,500)
    }
}

// get student schedule list 
module.exports.getStudentSClient = async (req,res) => {
    try {
        const class_id = req.body.class_id
        const qr_get_class = `SELECT * FROM class`
        const qr_get_data = `SELECT * FROM student_schedule WHERE class_id = ? ORDER BY ss_name ASC`

        const result_class = await dbQuery(qr_get_class)
        const result = await dbQuery(qr_get_data,[class_id])
       
        // add class name 
        if(result_class.length >= 1){
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result_class.length; j++) {
                    if(result[i].class_id === result_class[j].class_id){
                        result[i].class_name = result_class[j].class_name
                        break;
                    }
                }
            }
        }
        
        // console.log(result);
        res.status(200).json({
            status:true,
            status_code:200,
            data_list:result,
            base_image_path:process.env.STUDENT_ScHEDULE
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET STUDENT SCHEDULE LiST ',err,500)
    }
}

// get class client 
module.exports.getClassClient = async(req,res) =>{
    try {
        const qr_get_data = `SELECT * FROM class`
        const result = await dbQuery(qr_get_data)

        res.status(200).json({
            status_code:200,
            status:true,
            class_data:result
        })
    } catch (err) {
        if(err) return return_err(res,'TRY CATCH BLOCK','UPDATE BANNER ',err,500)
    }
}

// get syllabus client
module.exports.getSyllabusClient = async(req,res)=>{
    try{
        const qr_get_data = `SELECT * FROM syllabus ORDER BY syllabus_name ASC`
        const qr_get_class = `SELECT * FROM class`

        const result_class = await dbQuery(qr_get_class)
        const result = await dbQuery(qr_get_data)

        // add class name 
        if(result_class.length >= 1){
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result_class.length; j++) {
                    if(result[i].class_id === result_class[j].class_id){
                        result[i].class_name = result_class[j].class_name
                        break;
                    }
                }
            }
        }

        res.status(200).json({
            status_code:200,
            status:true,
            data_list:result,
            base_image_path:process.env.SYLLABUS_IMAGE
        })

    }catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET SYLLABUS LIST CLIENT ',err,500)
        
    }
}

