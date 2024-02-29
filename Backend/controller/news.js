const db = require('../config/database');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
const { dbQuery } = require('../services/query');
require('dotenv').config();


// get all news category 
module.exports.getAllNewsCategory = async(req,res) =>{
    try{
        const result = await dbQuery(`SELECT * FROM news_category`)
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เพิ่มหมวดหมู่สำเร็จ',
            news_category_data:result
        })
       
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET NEWS CATEGORY ',err,500)
    }

}

// add news category 
module.exports.addNewsCategory = async(req,res) => {
    try {
        const credential_admin_fullname = req.body.credential_admin_fullname
        const news_category_name = req.body.news_category_name

        const qr_check_username = `SELECT * FROM news_category WHERE news_category_name = ?`
        const qr_add = `INSERT INTO news_category(news_category_name) VALUES(?)`

        const result_check_username = await dbQuery(qr_check_username,[news_category_name])
        if(result_check_username.length >= 1)return res.status(200).json({
            status_code:409,
            status:true,
            msg:'มีชื่อหมวดหมู่นี้แล้ว'
        })

        await dbQuery(qr_add,[news_category_name])
        await timeStamp(
            credential_admin_fullname,
            'add',
            'news',
            `${credential_admin_fullname} เพิ่มหมวดหมู่ข่าวสารใหม่ ' ${news_category_name} '`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เพิ่มหมวดหมู่สำเร็จ'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','ADD NEWS CATEGORY ',err,500)
    }

}

// rename news category 
module.exports.updateNewsCategory = async(req,res) => {

    try {
        const credential_admin_fullname = req.body.credential_admin_fullname
        const news_category_name_old = req.body.news_category_name_old
        const news_category_name = req.body.news_category_name
        const news_category_id = req.body.news_category_id

        const qr_check_username = `SELECT * FROM news_category WHERE news_category_name = ?`
        const qr_rename = `UPDATE news_category
        SET news_category_name = ? 
        WHERE news_category_id = ?`

        const result_check_username = await dbQuery(qr_check_username,[news_category_name])
        if(result_check_username.length >= 1)return res.status(200).json({
            status_code:409,
            status:true,
            msg:'มีชื่อหมวดหมู่นี้แล้ว'
        })

        await dbQuery(qr_rename,[news_category_name , news_category_id])
        await timeStamp(
            credential_admin_fullname,
            'update',
            'news',
            `${credential_admin_fullname} เปลี่ยนชื่อหมวดหมู่ข่าวสาร ' ${news_category_name_old} ' เป็น ' ${news_category_name} '`
        )
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'บันทึกข้อมูลเสร็จสิ้น'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','RENAME NEWS CATEGORY ',err,500)
    }
    
}

// delete news category 
module.exports.deleteNewsCategory = async(req,res) => {
    try {
        const credential_admin_fullname = req.body.credential_admin_fullname
        const news_category_name = req.body.news_category_name
        const news_category_id = req.body.news_category_id

        const qr_delete = `DELETE FROM news_category WHERE news_category_id = ?`
        await dbQuery(qr_delete,news_category_id)

        await timeStamp(
            credential_admin_fullname,
            'delete',
            'news',
            `${credential_admin_fullname} ลบหมวดหมู่ ' ${news_category_name} '`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ลบข้อมูลเสร็จสิ้น'
        })

    } catch (err) {
        // check category used aready
        if(err.code === 'ER_ROW_IS_REFERENCED_2'){
            return res.status(200).json({
                status_code:500,
                status:true,
                msg:'ไม่สามารถลบหมวดหมู่นี้ได้ เนื่องจากมีโพสต์ที่อยู่ในหมวดหมู่นี้อยู่'
            })
        }else {
            return return_err(res,'TRY CATCH BLOCK','DELETE NEWS CATEGORY ',err,500)
        }
    }
}

// add news
module.exports.addNews = async(req,res) => {

    try {
        let news_cover_image = (req.body.news_cover_image === 'no_image_upload') ? req.body.news_cover_image : req.file.filename
       
        const credential_admin_fullname = req.body.credential_admin_fullname
        const news_category = req.body.news_category
        const news_contents = req.body.news_contents
        const news_topic = req.body.news_topic
        const curren_date = new Date()

        const qr_add = ` 
            INSERT INTO news(
                news_topic,
                news_contents,
                news_cover_image,
                news_category,
                news_date,
                news_author)
            VALUES(?,?,?,?,?,?)`
        const qr_params = 
            [news_topic,
            news_contents,
            news_cover_image,
            news_category,
            curren_date,
            credential_admin_fullname]

        await dbQuery(qr_add,qr_params)
        await timeStamp(
            credential_admin_fullname,
            'add',
            'news',
            `${credential_admin_fullname} โพสต์ข่าวสารใหม่ ' ${news_topic} ' `
        )
        
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เพิ่มข่าวสารเรียบร้อย'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','ADD NEWS CATEGORY ',err,500)
    }
}

// update news 
module.exports.updateNews = async(req,res) =>{ 
    try {
        let news_cover_image = (req.body.news_cover_image === 'no_image_upload') ? req.body.news_cover_image_old : req.file.filename
        
        const news_cover_image_old = req.body.news_cover_image_old
        const news_id = req.body.news_id
        const news_topic = req.body.news_topic
        const news_topic_old = req.body.news_topic_old
        const news_contents = req.body.news_contents
        const news_category = req.body.news_category 
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_update = `
            UPDATE news 
            SET 
                news_topic = ? ,
                news_contents = ? ,
                news_cover_image = ? ,
                news_category  = ? 
            WHERE news_id = ? `
        const qr_update_params = [
            news_topic,
            news_contents,
            news_cover_image,
            news_category,
            news_id
        ]

        await dbQuery(qr_update,qr_update_params)
        if(news_cover_image_old === 'no_image_upload' && news_cover_image !== 'no_image_upload'){
            await delete_image(news_cover_image_old,'news_cover_image')
        }
        
        let msg_timeStamp = `${credential_admin_fullname} แก้ไข ${news_topic}` 
        if(news_topic !== news_topic_old)msg_timeStamp = msg_timeStamp + ` และได้เปลี่ยนชื่อจาก ' ${news_topic_old} ' เป็น ' ${news_topic} '`
        await timeStamp(
            credential_admin_fullname,
            'update',
            'news',
            msg_timeStamp
        )

        res.status(200).json({
            status:true,
            status_code:200,
            msg:'บันทึกข้อมูลเสร็จสิ้น'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE NEWS CATEGORY ',err,500)
    }
}

// delete news
module.exports.deleteNews = async(req,res) => {

    try{
        const credential_admin_fullname = req.body.credential_admin_fullname
        const news_id = req.body.news_id
        const news_topic = req.body.news_topic
        const news_cover_image = req.body.news_cover_image

        const qr_delete = `DELETE FROM news WHERE news_id = ?`
        await dbQuery(qr_delete,news_id)
        if(news_cover_image !== 'no_image_upload')await delete_image(news_cover_image,'news_cover_image')
        
        await timeStamp(
            credential_admin_fullname,
            'delete',
            'news',
            `${credential_admin_fullname} ลบข่าวสาร ' ${news_topic} '`
        )

        res.status(200).json({
            status:true,
            status_code:200,
            msg:'ลบโพสต์เสร็จสิ้น'
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','DELETE NEWS ',err,500)
    }
}

// get all news length 
module.exports.getAllNewsLength = async (req,res) => {
    try {
        const result_length = await dbQuery(`SELECT COUNT(*) AS length FROM news`)
        const length = result_length[0].length
        res.status(200).json({
            status_code:200,
            status:true,
            news_data_length:length,
            msg:'เพิ่มข่าวสารเรียบร้อย'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET NEWS LENGTH ',err,500)
    }
     
}

// get all news list 
module.exports.getAllNewsList = async (req,res) => {
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_get_data = `SELECT * FROM news ORDER BY news_id DESC LIMIT ? OFFSET ?`
        let result_data = await dbQuery(qr_get_data,[limit,start_item])
        result_data = await setCategoryName(result_data)
        res.status(200).json({
            status_code:200,
            status:true,
            news_data:result_data,
            msg:'ดึงข้อมูลสำเร็จ',
            base_image: process.env.NEWS_COVER_IMAGE
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET NEWS ',err,500)
    }
 
}

// use by functuin -> get all , search all 
async function setCategoryName(user_data){
    const category_name = await dbQuery(`SELECT * FROM news_category`)

    for (let i = 0; i < user_data.length; i++) {
        user_data[i].news_date = await date_convert(user_data[i].news_date)
        for (let j = 0; j < category_name.length; j++) {   
            if(user_data[i].news_category == category_name[j].news_category_id){
                user_data[i].news_category_name = category_name[j].news_category_name
                break ;
            }
        }
    }
    return user_data
}

// search news 
module.exports.searchNews = async (req,res) => {
    try {
        const search_keyword = req.body.search_keyword
        const category_id = req.body.category_id
        const limit = req.body.limit
        const start_item = req.body.start_item

        let qr_search = `SELECT * FROM news WHERE news_topic LIKE ?` 
        let query_and_condition = ` AND news_category = ${category_id}`
        let qr_limit = ` LIMIT ${limit} OFFSET ${start_item}`
        let qr_length = `SELECT COUNT(*) AS length FROM news WHERE news_topic LIKE ?`

        // search category
        if(category_id != 0) qr_search += query_and_condition 

        const result_length = await dbQuery(qr_length,['%'+search_keyword+'%'])
        const length = result_length[0].length

        let result_search = await dbQuery(qr_search+qr_limit , ['%'+search_keyword+'%'])
        
        result_search = await setCategoryName(result_search)
        res.status(200).json({
            status_code:200,
            status:true,
            news_data:result_search,
            news_data_length:length,
            msg:'เพิ่มข่าวสารเรียบร้อย'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','SEARCH NEWS ',err,500)
    }
}