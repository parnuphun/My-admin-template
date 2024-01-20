const db = require('../config/database');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
const { dbQuery } = require('../services/query');
require('dotenv').config();

// get length 
module.exports.getStudentSLength = async (req,res)=>{
    try {
        const qr_get_data = `SELECT COUNT(*) AS length FROM student_schedule`
        const result_length = await dbQuery(qr_get_data)
        const length = result_length[0].length
        res.status(200).json({
            status:true,
            status_code:200,
            data_length:length
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET STUDENT SCHEDULE LENGTH ',err,500)
    }
}

// get teaching schedule list 
module.exports.getStudentS = async (req,res) => {
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_get_class = `SELECT * FROM class`
        const qr_get_data = `SELECT * FROM student_schedule ORDER BY ss_name ASC LIMIT ? OFFSET ?`

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
            base_image_path:process.env.STUDENT_ScHEDULE
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET STUDENT SCHEDULE LiST ',err,500)
    }
}

// add teaching schedule 
module.exports.addStudentS = async (req,res) => {
    try {
        const credential_admin_fullname = req.body.credential_admin_fullname
        const ss_name = req.body.ss_name
        const class_id = req.body.class_id
        const ss_image = req.file.filename
        const ss_semester = req.body.ss_semester
        const ss_teacher = req.body.ss_teacher

        const qr_add = `INSERT INTO student_schedule(ss_name,ss_img,ss_pin,ss_semester,ss_teacher,class_id) VALUES(?,?,1,?,?,?)`
         
        await dbQuery(qr_add,[ss_name,ss_image,ss_semester,ss_teacher,class_id])

        await timeStamp(
            credential_admin_fullname,
            'add',
            'student_schedule',
            `${credential_admin_fullname} เพิ่มตารางเรียน ' ${ss_name} '`
        )
        
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เพิ่มตารางเรียนเรียบร้อย'
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','ADD STUDENT SCHEDULE ',err,500)
    }
}

module.exports.updateStudentS = async (req,res) =>{
    try {
        const teaching_schedule_image = (req.body.student_schedule_image === 'no_image_upload')? req.body.ss_old_image : req.file.filename
        const credential_admin_fullname = req.body.credential_admin_fullname
        const ss_id = req.body.ss_id
        const ss_name = req.body.ss_name
        const ss_old_name = req.body.ss_old_name
        const ss_old_image = req.body.ss_old_image
        const ss_teacher = req.body.ss_teacher
        const ss_semester = req.body.ss_semester
        const class_id = req.body.class_id

        const qr_update = `
            update student_schedule 
            SET 
                ss_name = ? ,
                ss_img = ? ,
                ss_semester = ? ,
                ss_teacher = ? ,
                class_id = ?
            WHERE ss_id = ? 
             `

        const qr_params = [
            ss_name,
            teaching_schedule_image,
            ss_semester,
            ss_teacher,
            class_id,
            ss_id
        ]

        await dbQuery(qr_update,qr_params)
        if(teaching_schedule_image !== ss_old_image) await delete_image(ss_old_image,'student_schedule')

        let msgTimestamp = `${credential_admin_fullname} แก้ไขตารางสอน ${ss_name}`
        if(ss_name !== ss_old_name) msgTimestamp += `และได้เปลี่ยนชื่อตารางสอนจาก ${ss_old_name} เป็น ${ss_name}`
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
        return return_err(res,'TRY CATCH BLOCK','UPDATE STUDENT SCHEDULE ',err,500)
    }
}

module.exports.deleteStudentS = async (req,res) => {
    try {
        console.table(req.body);
        const credential_admin_fullname = req.body.credential_admin_fullname
        const ss_id = req.body.ss_id
        const ss_name = req.body.ss_name
        const ss_image = req.body.ss_image

        const qr_delete = `DELETE FROM student_schedule WHERE ss_id = ?`
        await dbQuery(qr_delete,[ss_id])

        await delete_image(ss_image,'student_schedule')
        await timeStamp(
            credential_admin_fullname,
            'delete',
            'teaching_schedule',
            `${credential_admin_fullname} ลบตารางสอน ' ${ss_name} '`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ลบตารางเรียนสำเร็จ'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','DELETE STUDENT SCHEDULE ',err,500)
    }
}