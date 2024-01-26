const db = require('../config/database');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
const { dbQuery } = require('../services/query');
require('dotenv').config();
// get data

module.exports.getSchoolDataSetting = async (req,res)=>{
    try {
        const qr_get_data = `SELECT * FROM school_setting WHERE id = 1`
        const qr_data = await dbQuery(qr_get_data)
        if(qr_data.length === 0 || qr_data[0].id !== 1) return res.status(200).json({
            status_code : 404 ,
            status:false,
            msg:'ไม่มีข้อมูลในระบบ กรุณาแจ้งนักพัฒนาระบบ'
        })
        
        qr_data[0].banner_img_origin_name = qr_data[0].banner_img
        qr_data[0].banner_img = process.env.BANNER_PATH + qr_data[0].banner_img
        res.status(200).json({
            status_code : 200 ,
            status:true,
            msg:'ดึงข้อมูลสำเร็จ',
            school_data:qr_data
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET SCHOOL DATA ',err,500)
    }
}


// change default pass
module.exports.changeDefaultPassword = async (req,res) =>{
    try {
        const password = req.body.default_admin_password
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_check_data = `SELECT * FROM school_setting WHERE id = 1`
        const qr_reset_pass = `UPDATE school_setting SET default_admin_password = ? WHERE id = 1`

        const result_data = await dbQuery(qr_check_data)
   
        if(result_data.length === 0 || result_data[0].id !== 1) return res.status(200).json({
            status_code : 404 ,
            status:false,
            msg:'ไม่มีข้อมูลในระบบ กรุณาแจ้งนักพัฒนาระบบ'
        })

        await dbQuery(qr_reset_pass,[password])
        
        await timeStamp(
            credential_admin_fullname,
            'update',
            'school_setting',
            `${credential_admin_fullname} ได้ทำการเปลี่ยนรหัสผ่านเริ่มต้นของผู้ดูแลระบบ`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เปลี่ยนรหัสผ่านเริ่มต้นสำเร็จ'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','CHANGE DEFAULT PASSWORD ',err,500)
    }
}

// for admin add begin data (only admin use this not now for client )
module.exports.addSchoolDefaultData = async(req,res) => {
    try{
        const pass = req.body.default_password
        const slogan = req.body.slogan

        const qr_update = `
            INSERT INTO school_setting(
                banner_img,
                banner_slogan,
                default_admin_password)
            VALUES(?,?,?)`

        await dbQuery(qr_update,['no_image_upload',slogan,pass]) 
        res.status(200).json({
            status_code :200,
            status:true,
            msg: 'เพิ่มข้อมูลสำเร็จ'
        })

    }catch(err){
        if(err) return return_err(res,'TRY CATCH BLOCK','ADD SCHOOOL BEGIN DATA ',err,500)
    }

}

module.exports.updateBanner = async (req,res) => {

    try {
        let image = (req.body.banner_image === 'no_image_upload') ?  req.body.banner_image_old : req.file.filename
         
        const banner_slogan = req.body.banner_slogan
        const old_img = req.body.banner_image_old
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_check_data = `SELECT * FROM school_setting WHERE id = 1`
        const qr_update = `
            UPDATE school_setting 
            SET
                banner_img = ? ,
                banner_slogan = ? 
            WHERE id = 1 `

        const result_data = await dbQuery(qr_check_data)
   
        if(result_data.length === 0 || result_data[0].id !== 1) return res.status(200).json({
            status_code : 404 ,
            status:false,
            msg:'ไม่มีข้อมูลในระบบ กรุณาแจ้งนักพัฒนาระบบ'
        })

        await dbQuery(qr_update,[image,banner_slogan])
        if(req.body.banner_image !== 'no_image_upload') delete_image(old_img, 'banner_image')
        
        await timeStamp(
            credential_admin_fullname,
            'update',
            'school_setting',
            `${credential_admin_fullname} อัพเดตข้อมูลแบนเนอร์`
        )
        
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'อัพโหลดสำเร็จ'
        })

    } catch (err) {
        if(err) return return_err(res,'TRY CATCH BLOCK','UPDATE BANNER ',err,500)
    }
} 


// get class
module.exports.getClass = async(req,res) => {
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

// add class
module.exports.addClass = async(req,res) => {
    try {
        const class_name = req.body.class_name
        const credential_admin_fullname = req.body.credential_admin_fullname
        
        const qr_check_name = `SELECT * FROM class WHERE class_name = ? `
        const qr_add = `INSERT INTO class(class_name) VALUES(?)`

        const result_check_name = await dbQuery(qr_check_name,[class_name])
        if(result_check_name.length >= 1) return res.status(200).json({
            status_code:409,
            status:false ,
            msg:'มีชื่อชั้นเรียนนี้อยู่แล้ว'
        })

        await dbQuery(qr_add,[class_name])
        await timeStamp(
            credential_admin_fullname,
            'add',
            'school_setting',
            `${credential_admin_fullname} ได้เพิ่มชั้นเรียน ' ${class_name} ' `

        )
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เพิ่มชั้นเรียนสำเร็จ'
        })
        
    } catch (err) {
        if(err) return return_err(res,'TRY CATCH BLOCK','UPDATE BANNER ',err,500)
    }
}


// delete class
module.exports.deleteClass = async (req,res) => {
    try {
        const class_id = req.body.class_id
        const class_name = req.body.class_name
        const credential_admin_fullname = req.body.credential_admin_fullname
        
        const qr_delete = `DELETE FROM class WHERE class_id = ? `

        await dbQuery(qr_delete,[class_id])

        await timeStamp(
            credential_admin_fullname,
            'delete',
            'school_setting',
            `${credential_admin_fullname} ลบชั้นเรียน ' ${class_name} '`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ลบชั้นเรียนสำเร็จ'
        })

    } catch (err) {
        // check category used aready
        if(err.code === 'ER_ROW_IS_REFERENCED_2'){
            return res.status(200).json({
                status_code:500,
                status:true,
                msg:'ไม่สามารถลบชั้นเรียนนี้ได้ เนื่องจากมีตารางเรียนหรือตารางสอนอยู่ในชั้นนี้อยู่'
            })
        }else {
            return return_err(res,'TRY CATCH BLOCK','DELETE NEWS CATEGORY ',err,500)
        }
    }
}

// update class
module.exports.updateClass = async(req,res)=>{
    try {
        const class_id = req.body.class_id
        const class_name = req.body.class_name
        const class_old_name = req.body.class_old_name
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_check_name = `SELECT * FROM class WHERE class_name = ? `
        const qr_update = `UPDATE class SET class_name = ? WHERE class_id = ?` 

        const result_check_name = await dbQuery(qr_check_name,[class_name])
        if(result_check_name.length >= 1) return res.status(200).json({
            status_code:409,
            status:false ,
            msg:'มีชื่อชั้นเรียนนี้อยู่แล้ว'
        })

        await dbQuery(qr_update,[class_name,class_id])
        await timeStamp(
            credential_admin_fullname,
            'update',
            'school_setting',
            `${credential_admin_fullname} เปลี่ยนชื่อชั้นเรียน ' ${class_old_name} ' เป็น ' ${class_name} '`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'บันทึกข้อมูลเสร็จสิ้น'
        })


    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','DELETE NEWS CATEGORY ',err,500)
        
    }
}
 