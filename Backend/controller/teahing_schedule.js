const db = require('../config/database');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
const { dbQuery } = require('../services/query');
require('dotenv').config();

// get length 
module.exports.getTeachingSLength = async (req,res)=>{
    try {
        const qr_get_data = `SELECT COUNT(*) AS length FROM teaching_schedule`
        const result_length = await dbQuery(qr_get_data)
        const length = result_length[0].length
        res.status(200).json({
            status:true,
            status_code:200,
            data_length:length
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','DELETE NEWS CATEGORY ',err,500)
    }
}

// get teaching schedule list 
module.exports.getTeachingS = async (req,res) => {
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_get_class = `SELECT * FROM class`
        const qr_get_data = `SELECT * FROM teaching_schedule ORDER BY ts_name ASC LIMIT ? OFFSET ?`

        const result_class = await dbQuery(qr_get_class)
        const result = await dbQuery(qr_get_data,[limit,start_item])
       
        // add class name 
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result_class.length; j++) {
                if(result[i].class_id === result_class[j].class_id){
                    result[i].class_name = result_class[j].class_name
                    break;
                }
            }
        }
        // console.log(result);
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

// add teaching schedule 
module.exports.addTeachingS = async (req,res) => {
    try {
        const credential_admin_fullname = req.body.credential_admin_fullname
        const ts_name = req.body.ts_name
        const class_id = req.body.class_id
        const ts_image = req.file.filename
        const ts_semester = req.body.ts_semester
        const ts_teacher = req.body.ts_teacher

        const qr_add = `INSERT INTO teaching_schedule(ts_name,ts_img,ts_pin,ts_semester,ts_teacher,class_id) VALUES(?,?,1,?,?,?)`
         
        await dbQuery(qr_add,[ts_name,ts_image,ts_semester,ts_teacher,class_id])

        await timeStamp(
            credential_admin_fullname,
            'add',
            'teaching_schedule',
            `${credential_admin_fullname} เพิ่มตารางสอน ' ${ts_name} '`
        )
        
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เพิ่มตารางสอนเรียบร้อย'
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','ADD TEACHING SCHEDULE ',err,500)
    }
}

module.exports.updateTeachS = async (req,res) =>{
    try {
        const teaching_schedule_image = (req.body.teaching_schedule_image === 'no_image_upload')? req.body.ts_old_image : req.file.filename
        const credential_admin_fullname = req.body.credential_admin_fullname
        const ts_id = req.body.ts_id
        const ts_name = req.body.ts_name
        const ts_old_name = req.body.ts_old_name
        const ts_old_image = req.body.ts_old_image
        const ts_teacher = req.body.ts_teacher
        const ts_semester = req.body.ts_semester
        const class_id = req.body.class_id

        const qr_update = `
            update teaching_schedule 
            SET 
                ts_name = ? ,
                ts_img = ? ,
                ts_semester = ? ,
                ts_teacher = ? ,
                class_id = ?
            WHERE ts_id = ? 
             `

        const qr_params = [
            ts_name,
            teaching_schedule_image,
            ts_semester,
            ts_teacher,
            class_id,
            ts_id
        ]

        await dbQuery(qr_update,qr_params)
        if(teaching_schedule_image !== ts_old_image) await delete_image(ts_old_image,'teaching_schedule_image')

        let msgTimestamp = `${credential_admin_fullname} แก้ไขตารางสอน ${ts_name}`
        if(ts_name !== ts_old_name) msgTimestamp += `และได้เปลี่ยนชื่อตารางสอนจาก ${ts_old_name} เป็น ${ts_name}`
        await timeStamp(
            credential_admin_fullname,
            'update',
            'teaching_schedule',
            msgTimestamp
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'บันทึกข้อมูลเสร็จสิ้น'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE TEACHING SCHEDULE ',err,500)
    }
}

module.exports.deleteTeachignS = async (req,res) => {
    try {
        const credential_admin_fullname = req.body.credential_admin_fullname
        const ts_id = req.body.ts_id
        const ts_name = req.body.ts_name
        const ts_image = req.body.ts_image

        const qr_delete = `DELETE FROM teaching_schedule WHERE ts_id = ?`
        await dbQuery(qr_delete,[ts_id])

        await delete_image(ts_image,'teaching_schedule_image')
        await timeStamp(
            credential_admin_fullname,
            'delete',
            'teaching_schedule',
            `${credential_admin_fullname} ลบตารางสอน ' ${ts_name} '`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ลบตารางสอนสำเร็จ'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','DELETE NEWS CATEGORY ',err,500)
    }
}