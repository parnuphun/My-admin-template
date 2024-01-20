const db = require('../config/database');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
const { dbQuery } = require('../services/query');
require('dotenv').config();

// get length
module.exports.getSyllabusLength = async(req,res) =>{
    try {
        const qr_get_length = `SELECT COUNT(*) AS length FROM syllabus`
        const result_length = await dbQuery(qr_get_length)
        const length = result_length[0].length

        res.status(200).json({
            status_code:200,
            status:true,
            data_length:length
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET SYLLABUS LENGTH ',err,500)
        
    }
}

// get data list 
module.exports.getSyllabusList = async(req,res)=>{
    try{
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_get_data = `SELECT * FROM syllabus ORDER BY syllabus_id DESC LIMIT ? OFFSET ?`
        const qr_get_class = `SELECT * FROM class`

        const result_class = await dbQuery(qr_get_class)
        const result = await dbQuery(qr_get_data,[limit,start_item])

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
        return return_err(res,'TRY CATCH BLOCK','GET SYLLABUS LIST ',err,500)
        
    }
}

// delete syllabus
module.exports.deleteSyllabus = async(req,res) => {
    try {
        const syllabus_id = req.body.syllabus_id
        const syllabus_name = req.body.syllabus_name
        const syllabus_image = req.body.syllabus_image
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_delete = `DELETE FROM syllabus WHERE syllabus_id = ? `
        await dbQuery(qr_delete,[syllabus_id])
        await delete_image(syllabus_image,'syllabus_image')
        await timeStamp(
            credential_admin_fullname,
            'delete',
            'syllabus_image',
            `${credential_admin_fullname} ลบหลักสูตร ${syllabus_name}`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ลบหลักสูตรเสร็จสิ้น'
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','DELETE SYLLABUS  ',err,500)

    }
}

// add syllabus
module.exports.addSyllabus = async(req,res) =>{
    try{
        const credential_admin_fullname = req.body.credential_admin_fullname
        const syllabus_name = req.body.syllabus_name
        const class_id = req.body.class_id
        const syllabus_image = req.file.filename

        const qr_add = `INSERT INTO syllabus(syllabus_name,syllabus_image,class_id) VALUES(?,?,?)`
        await dbQuery(qr_add,[syllabus_name,syllabus_image,class_id])
        await timeStamp(
            credential_admin_fullname,
            'add',
            'syllabus',
            `${credential_admin_fullname} เพิ่มหลักสูตร ${syllabus_name}`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เพิ่มหลักสูตรเสร็จสิ้น'
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','ADD SYLLABUS  ',err,500)
    }
}

// update syllabus
module.exports.updateSyllabus = async(req,res) => {
    try {
        const syllabus_image = (req.body.syllabus_image === 'no_image_upload')? req.body.syllabus_old_image : req.file.filename
        const syllabus_old_image = req.body.syllabus_old_image
        const credential_admin_fullname = req.body.credential_admin_fullname
        const syllabus_id = req.body.syllabus_id
        const syllabus_name = req.body.syllabus_name
        const syllabus_old_name = req.body.syllabus_old_name
        const class_id = req.body.class_id

        const qr_update = `
            UPDATE syllabus
            SET
                syllabus_name = ? ,
                syllabus_image = ? ,
                class_id = ?
            WHERE syllabus_id = ?
        `

        const qr_params = [
            syllabus_name,
            syllabus_image,
            class_id,
            syllabus_id
        ] 

        await dbQuery(qr_update,qr_params)

        if(syllabus_image !== syllabus_old_image)await delete_image(syllabus_old_name,'syllabus_image')

        let msgTimeStamp = `${credential_admin_fullname} แก้ไขหลักสูตร ${syllabus_name}`
        if(syllabus_name !== syllabus_old_name) msgTimeStamp += ` และได้เปลี่ยนชื่อจาก ${syllabus_old_name} เป็น ${syllabus_name}`

        await timeStamp(
            credential_admin_fullname,
            'update',
            'syllabus',
            msgTimeStamp
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'บันทึกข้อมูลเสร็จสิ้น'
        })


    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE SYLLABUS  ',err,500)
    }
}