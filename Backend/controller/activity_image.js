const db = require('../config/database');
const date_convert = require('../services/date_convert');
const delete_image = require('../services/delete_file');
const { dbQuery } = require('../services/query');
const return_err = require('../services/return_err')
const timeStamp = require('../services/timeStamp');

require('dotenv').config();

// length
module.exports.getActivityLength = async (req,res) => {
    try {
        const qr_data_length = `SELECT COUNT(*) AS length FROM activity_image`
        const result_length = await dbQuery(qr_data_length)
        const length = result_length[0].length

        res.status(200).json({
            status_code:200,
            status : true, 
            data_length : length
        })

    } catch (err) {
        return_err(res,' TRY CATCH BLOCK','GET ACTIVITY LENGTH',err,500)
    }
}

// get activity image 
module.exports.getActivityImage = async (req,res) => {
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_get_data = `SELECT * FROM activity_image ORDER BY activity_image_id DESC LIMIT ? OFFSET ?`
        const result_data = await dbQuery(qr_get_data,[limit,start_item])

        // format data
        if(result_data.length > 0){
            for(let i = 0 ; i < result_data.length ; i++){
                result_data[i].activity_image_date = await date_convert(result_data[i].activity_image_date)
            }
        }

        return res.status(200).json({
            status:true,
            statusCode:200,
            fileUrl:process.env.ACTIVITY_IMAGE,
            activityImageData:result_data,
        })

    } catch (err) {
        return_err(res,' TRY CATCH BLOCK','GET ACTIVITY',err,500)
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
            activity_image_author,
            activity_image_date)
        VALUES (?,?,?,?,?)`,
        [activity_image_cover,
        activity_image_name,
        activity_image_link,
        credential_admin_fullname,
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
    try {
        let activity_image_cover = (req.body.activity_image_cover === 'no_image_upload')?req.body.activity_image_old_image_cover : req.file.filename
        const activity_image_old_image_cover = req.body.activity_image_old_image_cover
        const activity_image_old_name = req.body.activity_image_old_name
        const activity_image_name = req.body.activity_image_name
        const activity_image_link = req.body.activity_image_link
        const activity_image_id = req.body.activity_image_id 
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_update = `
            UPDATE activity_image 
            SET activity_image_cover = ?,
                activity_image_name = ?,
                activity_image_link = ? 
            WHERE activity_image_id = ?`
        const qr_update_params = [activity_image_cover,
            activity_image_name,
            activity_image_link,
            activity_image_id]

        await dbQuery(qr_update,qr_update_params)

        // delete old image
        if(req.body.activity_image_cover !== 'no_image_upload') await delete_image(activity_image_old_image_cover, 'activity_image')
        
        let timeStamp_msg = `${credential_admin_fullname} แก้ไขข้อมูลภาพกิจกรรม ' ${activity_image_old_name} ' `
        if(activity_image_old_name !== activity_image_name) timeStamp_msg += ` และได้มีการเปลี่ยนชื่อเป็น ' ${activity_image_name} '`
        await timeStamp(
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

    } catch (err) {
        return_err(res,' TRY CATCH BLOCK','UPDATE ACTIVITY',err,500)
    }
}

// delete activity image
module.exports.deleteActivityImage = async (req,res) => {

    try {
        const activity_image_id = req.body.activity_image_id
        const activity_image_name = req.body.activity_image_name
        const activity_image_cover_delete = req.body.activity_image_cover_delete
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_delete =`DELETE FROM activity_image WHERE activity_image_id = ?`
        await dbQuery(qr_delete,[activity_image_id])
        await delete_image(activity_image_cover_delete,'activity_image')
        await timeStamp(
            credential_admin_fullname,
            'delete',
            'activity_image',
            `${credential_admin_fullname} ลบรูปภาพกิจกรรม ' ${activity_image_name} '`
        )
        
        res.status(200).json({
            status:true,
            status_code:200,
            msg:'ลบภาพกิจกรรมสำเร็จ'
        })

    } catch (err) {
        return_err(res,'TRY CATCH BLOCK','DELETE ACTIVITY',err,500)
    }
}

// seach 
module.exports.searchActivityImage = async (req,res) => {
    try {
        const search_keyword = req.body.search_keyword
        const limit = req.body.limit
        const start_item = req.body.start_item
        
        const qr_search_length = `SELECT COUNT(*) AS length FROM activity_image WHERE activity_image_name LIKE ?`
        const qr_search = `
            SELECT * FROM activity_image 
            WHERE activity_image_name LIKE ? 
            ORDER BY activity_image_id DESC 
            LIMIT ? OFFSET ?`
        
        const result_search_length = await dbQuery(qr_search_length,['%'+search_keyword+'%'])
        const data_length =  result_search_length[0].length
        const result_search = await dbQuery(qr_search,['%'+search_keyword+'%' , limit , start_item])

        // format date
        if(result_search.length > 0){
            for(let i = 0 ; i < result_search.length ; i++){
                result_search[i].activity_image_date = await date_convert(result_search[i].activity_image_date)
            }
        }

        res.status(200).json({
            status_code : 200 ,
            status: true,
            data_length:data_length ,
            data_list :result_search 
        })

    } catch (err) {
        return_err(res,'TRY CATCH BLOCK','SEARCH ACTIVITY',err,500)
    }

     
}