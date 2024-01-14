const db = require('../config/database');
const date_convert = require('../services/date_convert');
const delete_image = require('../services/delete_file')
const return_err = require('../services/return_err')
const timeStamp = require('../services/timeStamp');

require('dotenv').config();

// length
module.exports.getActivityLength = async (req,res) => {
    try{
        db.query('SELECT COUNT(*) AS length FROM activity_image ' , async (err,result)=>{
            if(err) return_err(res,'QUERY BLOCK','GET ACTIVITY LENGTH',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
            res.status(200).json({
                status_code:200,
                status : true, 
                data_length : result[0].length
            })
        })
    }catch(err){
        return_err(res,' TRY CATCH BLOCK','GET ACTIVITY LENGTH',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
    }
}

// get activity image 
module.exports.getActivityImage = async (req,res) => {
    const limit = req.body.limit
    const start_item = req.body.start_item
    try{
        db.query(`SELECT * FROM activity_image ORDER BY activity_image_id DESC LIMIT ? OFFSET ?`,[limit,start_item], async (err,result)=>{
            if(err){
        return_err(res,'QUERY BLOCK','GET ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
            }

            if(result.length > 0){

                for(let i = 0 ; i < result.length ; i++){
                    result[i].activity_image_date = await date_convert(result[i].activity_image_date)
                }
            }

             return res.status(200).json({
                status:true,
                statusCode:200,
                fileUrl:process.env.ACTIVITY_IMAGE,
                activityImageData:result,
            })
        })
    }catch(err){
        return_err(res,' TRY CATCH BLOCK','GET ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
 
    }
}

// add new activity image
module.exports.addNewActivityImage = async (req,res) => {
    const activity_image_cover = req.file.filename
    const activity_image_name = req.body.activity_image_name
    const activity_image_link = req.body.activity_image_link
    const credential_admin_fullname = req.body.credential_admin_fullname
    const activity_image_date = new Date()
    try{
        db.query(`
        INSERT INTO activity_image(
            activity_image_cover,
            activity_image_name,
            activity_image_link,
            activity_image_date)
        VALUES (?,?,?,?)`,
        [activity_image_cover,
        activity_image_name,
        activity_image_link,
        activity_image_date],
        (err,result)=>{
            if(err){
                return_err(res,' QUERY BLOCK','ADD ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
            }
            timeStamp(
                credential_admin_fullname,
                'add',
                'activity_image',
                `${credential_admin_fullname} เพิ่มรูปภาพกิจกรรมใหม่ ' ${activity_image_name} '`
            )

            res.status(200).json({
                status:true,
                status_code:200,
                msg:'เพิ่มภาพกิจกรมมสำเร็จ'
            })
        })
    }catch(err){
        return_err(res,' TRY CATCH BLOCK','ADD ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
    }
}

// update
module.exports.updateActivity = async (req,res) => {
 
    let activity_image_cover 
    if(req.body.activity_image_cover === 'no_image_upload'){  
        activity_image_cover = req.body.activity_image_old_image_cover
    }else{
        activity_image_cover = req.file.filename  
    }
    const activity_image_old_image_cover = req.body.activity_image_old_image_cover
    const activity_image_old_name = req.body.activity_image_old_name
    const activity_image_name = req.body.activity_image_name
    const activity_image_link = req.body.activity_image_link
    const activity_image_id = req.body.activity_image_id 
    const credential_admin_fullname = req.body.credential_admin_fullname
    try {
        db.query(`
            UPDATE activity_image 
            SET activity_image_cover = ?,
                activity_image_name = ?,
                activity_image_link = ? 
            WHERE activity_image_id = ?`,
        [   activity_image_cover,
            activity_image_name,
            activity_image_link,
            activity_image_id
        ]
        , async (err,result)=>{
            if(err)return_err(res,' QUERY BLOCK','UPDATE ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')

            if(req.body.activity_image_cover !== 'no_image_upload'){
                delete_image(activity_image_old_image_cover, 'activity_image')
            }

            let timeStamp_msg = `${credential_admin_fullname} แก้ไขข้อมูลภาพกิจกรรม ' ${activity_image_old_name} ' `

            if(activity_image_old_name !== activity_image_name){
                timeStamp_msg = timeStamp_msg + ` และได้มีการเปลี่ยนชื่อเป็น ' ${activity_image_name} '`
            }
            timeStamp(
                credential_admin_fullname,
                'update',
                'activity_image',
                timeStamp_msg
            )
            res.status(200).json({
                status_code:200,
                status:true,
                msg:'บันทึกข้อมูลเรียบร้อย'
            })
        })


    } catch(err) {
        return_err(res,' TRY CATCH BLOCK','UPDATE ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
    }
}

// delete activity image
module.exports.deleteActivityImage = async (req,res) => {
    const activity_image_id = req.body.activity_image_id
    const activity_image_name = req.body.activity_image_name
    const activity_image_cover_delete = req.body.activity_image_cover_delete
    const credential_admin_fullname = req.body.credential_admin_fullname

    try{
        db.query('DELETE FROM activity_image WHERE activity_image_id = ? ',[activity_image_id], async(err,result)=>{
            if(err){
                return_err(res,' QUERY BLOCK','DELETE ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')

            }
            delete_image(activity_image_cover_delete,'activity_image')
            timeStamp(
                credential_admin_fullname,
                'delete',
                'activity_image',
                `${credential_admin_fullname} ลบรูปภาพกิจกรรม ' ${activity_image_name} '`
            )

            res.status(200).json({
                status:true,
                status_code:200,
                msg:'ไม่สามารถลบรูปภาพกิจกรรม'
            })
        })
    }catch(err){
        return_err(res,'TRY CATCH BLOCK','DELETE ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
    }
}

// seach 
module.exports.searchActivityImage = async (req,res) => {
    const search_keyword = req.body.search_keyword
    const limit = req.body.limit
    const start_item = req.body.start_item
    try{
        db.query(`SELECT COUNT(*) AS length FROM activity_image WHERE activity_image_name LIKE ?`, ['%'+search_keyword+'%'],async (err,result)=>{
            if(err) return_err(res,'QUERY BLOCK','DELETE ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
            let data_length = result[0].length 
            try{
                db.query(`
                SELECT * FROM activity_image 
                WHERE activity_image_name LIKE ? 
                ORDER BY activity_image_id DESC 
                LIMIT ? OFFSET ? `,['%'+search_keyword+'%',limit , start_item], async (err,result)=>{
                    if(err) return_err(res,'QUERY BLOCK 2','DELETE ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
                    
                    if(result.length > 0){
                        for(let i = 0 ; i < result.length ; i++){
                            result[i].activity_image_date = await date_convert(result[i].activity_image_date)
                        }
                    }
                    res.status(200).json({
                        status_code : 200 ,
                        status: true,
                        data_length:data_length ,
                        data_list :result 
                    })
                })
            }catch(err){
            return_err(res,'TRY CATCH BLOCK 2 ','DELETE ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
        }
        })
    }catch(err){
        return_err(res,'TRY CATCH BLOCK','DELETE ACTIVITY',err,500,'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้')
    }
}