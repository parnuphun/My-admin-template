const db = require('../config/database');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
require('dotenv').config();


// get all news category 
module.exports.getAllNewsCategory = async(req,res) =>{
    try{
        db.query(`SELECT * FROM news_category`,async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','GET ALL CATEGORY ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            
            res.status(200).json({
                status_code:200,
                status:true,
                msg:'เพิ่มหมวดหมู่สำเร็จ',
                news_category_data:result
            })
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET ALL CATEGORY ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }

}

// add news category 
module.exports.addNewsCategory = async(req,res) => {
    const credential_admin_fullname = req.body.credential_admin_fullname
    const news_category_name = req.body.news_category_name

    try{
        db.query('SELECT * FROM news_category WHERE news_category_name = ? ',[news_category_name],(err,result)=>{
            if(err)  return return_err(res,'QUERY BLOCK','ADD NEWS CATEGORY ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            if(result.length >= 1){
                return res.status(200).json({
                    status_code:409,
                    status:true,
                    msg:'มีชื่อหมวดหมู่นี้แล้ว'
                })
            }else{
                try{
                    db.query(`INSERT INTO news_category(news_category_name) VALUES(?)`,[news_category_name],async(err,result)=>{
                        if(err) return return_err(res,'QUERY BLOCK 2','ADD NEWS CATEGORY ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                        timeStamp(
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
                    })
                }catch(err){
                    return return_err(res,'TRY CATCH BLOCK 2','ADD NEWS CATEGORY ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                }
            }
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','ADD NEWS CATEGORY ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }

}

// rename news category 
module.exports.updateNewsCategory = async(req,res) => {
    const credential_admin_fullname = req.body.credential_admin_fullname
    const news_category_name_old = req.body.news_category_name_old
    const news_category_name = req.body.news_category_name
    const news_category_id = req.body.news_category_id

    try{
        db.query('SELECT * FROM news_category WHERE news_category_name = ? ',[news_category_name],(err,result)=>{
            if(err)  return return_err(res,'QUERY BLOCK','ADD NEWS CATEGORY ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            if(result.length >= 1){
                return res.status(200).json({
                    status_code:409,
                    status:true,
                    msg:'มีชื่อหมวดหมู่นี้แล้ว'
                })
            }else{
                try{
                    db.query(`
                        UPDATE news_category
                        SET news_category_name = ? 
                        WHERE news_category_id = ?
                    `,[news_category_name , news_category_id],async(err,result)=>{
                        if(err) return return_err(res,'QUERY BLOCK','UPDATE CATEGORY NAME ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                        timeStamp(
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
                    })
                }catch(err){
                    return return_err(res,'TRY CATCH BLOCK 2 ','UPDATE CATEGORY NAME ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                }
            }
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','UPDATE CATEGORY NAME ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }

}

// delete news category 
module.exports.deleteNewsCategory = async(req,res) => {
    const credential_admin_fullname = req.body.credential_admin_fullname
    const news_category_name = req.body.news_category_name
    const news_category_id = req.body.news_category_id

    try{
        db.query(` DELETE FROM news_category WHERE news_category_id = ?`,[news_category_id],async(err,result)=>{
            if(err) {
                if(err.code === 'ER_ROW_IS_REFERENCED_2'){
                    return res.status(200).json({
                        status_code:500,
                        status:true,
                        msg:'ไม่สามารถลบหมวดหมู่นี้ได้ เนื่องจากมีโพสต์ที่อยู่ในหมวดหมู่นี้อยู่'
                    })
                }
                return return_err(res,'QUERY BLOCK','DELETE NEWS CATEGORY ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            } 
            timeStamp(
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
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','DELETE NEWS CATEGORY ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }

}

// add news
module.exports.addNews = async(req,res) => {
    let news_cover_image
    if(req.body.news_cover_image === 'no_image_upload'){
         news_cover_image = req.body.news_cover_image
    }else{
        news_cover_image = req.file.filename
    }
    const credential_admin_fullname = req.body.credential_admin_fullname
    const news_category = req.body.news_category
    const news_contents = req.body.news_contents
    const news_topic = req.body.news_topic
    const curren_date = new Date()
    try{
        db.query(`
            INSERT INTO news(
                news_topic,
                news_contents,
                news_cover_image,
                news_category,
                news_date,
                news_author)
            VALUES(?,?,?,?,?,?)
        `,[
            news_topic,
            news_contents,
            news_cover_image,
            news_category,
            curren_date,
            credential_admin_fullname
        ], async(err,result)=>{
            if(err) return return_err(res,'TRY CATCH BLOCK','ADD NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            timeStamp(
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
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','ADD NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')

    }
}

// update news 
module.exports.updateNews = async(req,res) =>{ 
    let news_cover_image
    if(req.body.news_cover_image === 'no_image_upload'){
        news_cover_image = req.body.news_cover_image_old
    }else{
        news_cover_image = req.file.filename
    }
    const news_cover_image_old = req.body.news_cover_image_old
    const news_id = req.body.news_id
    const news_topic = req.body.news_topic
    const news_topic_old = req.body.news_topic_old
    const news_contents = req.body.news_contents
    const news_category = req.body.news_category 
    const credential_admin_fullname = req.body.credential_admin_fullname
    try{
        db.query(`
            UPDATE news 
            SET 
                news_topic = ? ,
                news_contents = ? ,
                news_cover_image = ? ,
                news_category  = ? 
            WHERE news_id = ? 
        `,[
            news_topic,
            news_contents,
            news_cover_image,
            news_category,
            news_id
        ], async(err,result)=>{ 
            if(err) return return_err(res,'QUERY BLOCK','UPDATE NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            if(news_cover_image_old === 'no_image_upload' && news_cover_image !== 'no_image_upload'){
                await delete_image(news_cover_image_old,'news_cover_image')
            }
            let msg_timeStamp = `${credential_admin_fullname} แก้ไข ${news_topic}` 
            if(news_topic !== news_topic_old){
                msg_timeStamp = msg_timeStamp + ` และได้เปลี่ยนชื่อจาก ' ${news_topic_old} ' เป็น ' ${news_topic} '`
            }
            timeStamp(
                credential_admin_fullname,
                'update',
                'news',
                msg_timeStamp
            )

            res.status(200).json({
                status:true,
                status_code:200,
                msg:'บัยทึกข้อมูลเสร็จสิ้น'
            })
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','UPDATE NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')

    }
}

// delete news
module.exports.deleteNews = async(req,res) => {
    const credential_admin_fullname = req.body.credential_admin_fullname
    const news_id = req.body.news_id
    const news_topic = req.body.news_topic
    const news_cover_image = req.body.news_cover_image

    try{
        db.query(`DELETE FROM news WHERE news_id = ? `,[news_id], async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','DELETE NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            if(news_cover_image !== 'no_image_upload'){
                await delete_image(news_cover_image,'news_cover_image')
            }

            timeStamp(
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
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','DELETE NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

// get all news length 
module.exports.getAllNewsLength = async (req,res) => {
    try{
        db.query(` SELECT COUNT(*) AS length FROM news `, async(err,result)=>{
            if(err) return return_err(res,'TRY CATCH BLOCK','GET NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            res.status(200).json({
                status_code:200,
                status:true,
                news_data_length:result[0].length,
                msg:'เพิ่มข่าวสารเรียบร้อย'
            })
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

// get all news list 
module.exports.getAllNewsList = async (req,res) => {
    const limit = req.body.limit
    const start_item = req.body.start_item
    try{
        db.query(` SELECT * FROM news ORDER BY news_id DESC `, async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','GET NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            let news_data = result
            try{
                db.query(`SELECT * FROM news_category`, async(err,result)=>{
                    if(err) return return_err(res,'QUERY BLOCK 2','GET NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                    // console.log(result);
                    news_data = await setCategoryName(news_data,result)
                    res.status(200).json({
                        status_code:200,
                        status:true,
                        news_data:news_data,
                        msg:'ดึงข้อมูลสำเร็จ',
                        base_image: process.env.NEWS_COVER_IMAGE
                    })
                })
            }catch(err){
                return return_err(res,'TRY CATCH BLOCK 2','GET NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            }
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET NEWS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }

    async function setCategoryName(user_data,category_data){
        for (let i = 0; i < user_data.length; i++) {
            // console.log(user_data[i].news_category);
            user_data[i].news_date = await date_convert(user_data[i].news_date)
            for (let j = 0; j < category_data.length; j++) {   
                if(user_data[i].news_category == category_data[j].news_category_id){
                    user_data[i].news_category_name = category_data[j].news_category_name
                    break ;
                }
            }
        }
        return user_data
       
    }
}