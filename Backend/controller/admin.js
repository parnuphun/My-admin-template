const db = require('../config/database');
const bcrypt = require('bcrypt');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
const {dbQuery} = require('../services/query')
require('dotenv').config();

// search admin 
module.exports.searchAdmin =async(req,res) => {

    try {
        const search_keyword = req.body.search_keyword
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_search = `
            SELECT * FROM user 
            WHERE 
                (user_username LIKE ?)OR
                (user_firstname LIKE ?)OR
                (user_lastname LIKE ?)OR
                (user_email LIKE ?)
            ORDER BY user_rule DESC , user_id DESC LIMIT ${limit} OFFSET ${start_item}`

        const search_params = ['%'+search_keyword+'%','%'+search_keyword+'%','%'+search_keyword+'%','%'+search_keyword+'%']
        
        const result_search = await dbQuery(qr_search,search_params)
        // format date
        for (let i = 0; i < result_search.length; i++) {
            result_search[i].user_latest_login_date = await date_convert(result_search[i].user_latest_login_date)
            result_search[i].user_join_date = await date_convert(result_search[i].user_join_date)
        }

        res.status(200).json({
            status_code:200,
            status:true,
            admins_data_length : result_search.length,
            admins_data: result_search,
            msg:'ดึงข้อมูลสำเร็จ'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','SEARCG ADMIN ',err,500)
    }

}

// get all admin length 
module.exports.getAllAdminLength = async(req,res) => {
    try{
        const qr_get_length = `SELECT COUNT(*) AS length FROM user`
        const result_get_length = await dbQuery(qr_get_length)
        const length = result_get_length[0].length
        res.json({
            status:true,
            msg:'ดึงข้อมูลสำเร็จ',
            length:length,
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','ADMIN DATA ',err,500)
    } 
}

// get all user
module.exports.getAllAdmin = async(req,res) => {
    try{
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_get_data = `SELECT * FROM user ORDER BY user_rule DESC , user_id DESC LIMIT ? OFFSET ?`

        const result_get_data = await dbQuery(qr_get_data,[limit,start_item])

        // format date
        for (let i = 0; i < result_get_data.length; i++) {
            result_get_data[i].user_latest_login_date = await date_convert(result_get_data[i].user_latest_login_date)
            result_get_data[i].user_join_date = await date_convert(result_get_data[i].user_join_date)
        }

        res.json({
            status:true,
            status_code:200,
            adminData:result_get_data,
            image_path:process.env.ADMIN_IMAGE
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','ADMIN DATA ',err,500)
    }
 
}

// add new admin
module.exports.addNewAdmin = async(req,res) =>{
    try {
        let admin_image = (req.body.admin_image === 'no_image_upload')?'no_image_upload':req.file.filename
        let admin_address = (req.body.admin_address === undefined || req.body.admin_address === 'undefined')? '' :req.body.admin_address
        
        const current_date = new Date()
        const admin_username = req.body.admin_username
        const admin_password = req.body.admin_password
        const admin_firstname = req.body.admin_firstname
        const admin_lastname = req.body.admin_lastname
        const admin_email = req.body.admin_email
        const admin_phone = req.body.admin_phone
        const admin_rule = req.body.admin_rule
        const credential_admin_fullname = req.body.credential_admin_fullname 
        let hashed_password = await bcrypt.hash(admin_password, 10);

        const qr_check_username = `SELECT * FROM user WHERE user_username = ?`
        const qr_add = `INSERT INTO user(
            user_username,
            user_password,
            user_image,
            user_firstname,
            user_lastname,
            user_email,
            user_phone,
            user_address,
            user_rule,
            user_delete,
            user_join_date,
            user_latest_login_date) 
            VALUES(?,?,?,?,?,?,?,?,?,0,?,?)`
        const add_params = [
            admin_username,
            hashed_password,
            admin_image,
            admin_firstname,
            admin_lastname,
            admin_email,
            admin_phone,
            admin_address,
            admin_rule,
            current_date,
            current_date
        ]

        
        const result_check_username = await dbQuery(qr_check_username,[admin_username])
        if(result_check_username.length >= 1 )return res.status(200).json({
            status_code : 409 ,
            status:false ,
            msg: 'มีชื่อผู้ใช้งานนี้ในระบบแล้วกรุณากรอกชื่อผู้ใช้งานใหม่'
        })


        await dbQuery(qr_add,add_params) 
        await timeStamp(
            credential_admin_fullname,
            'add',
            'admin',
            `${credential_admin_fullname} ได้เพิ่มบัญชีผู้ใช้งานระบบ ' ${admin_username} '`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เพิ่มผู้ใช้งานสำเร็จ'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE ADMIN ',err,500)
    }
    
}

// update admin 
module.exports.updateAdmin = async(req,res) =>{
    try {
        // กรณีไม่ได้อัพโหลดภาพเดิมมาให้ใช้ภาพเดิม
        let admin_image = (req.body.admin_image === 'no_image_upload')?req.body.admin_image_old:req.file.filename
        let admin_address = (req.body.admin_address === undefined || req.body.admin_address === 'undefined') ? '' :req.body.admin_address
        const admin_image_old = req.body.admin_image_old // เอามาลบกรณีที่มีการอัพภาพใหม่
        const admin_username = req.body.admin_username
        const admin_username_old = req.body.admin_username_old
        const admin_firstname = req.body.admin_firstname
        const admin_lastname = req.body.admin_lastname
        const admin_email = req.body.admin_email
        const admin_phone = req.body.admin_phone
        const admin_rule = req.body.admin_rule
        const credential_admin_fullname = req.body.credential_admin_fullname
        const admin_id = req.body.admin_id

        const qr_update = `
            UPDATE user 
            SET 
                user_username = ? ,
                user_image = ? ,
                user_firstname = ? ,
                user_lastname = ? ,
                user_email = ? ,
                user_phone = ? ,
                user_address = ? ,
                user_rule = ? 
            WHERE user_id = ?`
        await dbQuery(qr_update,
        [
            admin_username,
            admin_image,
            admin_firstname,
            admin_lastname,
            admin_email,
            admin_phone,
            admin_address,
            admin_rule,
            admin_id
        ])

        // delete img
        if(admin_image !== admin_image_old) await delete_image(admin_image_old,'admin_image')
        
        let timeStamp_msg = `${credential_admin_fullname} แกไขข้อมูลของ ' ${admin_username} ' `
        if(admin_username !== admin_username_old) timeStamp_msg += `  และได้มีการเปลี่ยนชื่อผู้ใช้งานจาก ' ${admin_username_old} ' เป็น ' ${admin_username} ' `
        await timeStamp(
            credential_admin_fullname,
            'update',
            'admin',
            timeStamp_msg
        )
        
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'บันทึกข้อมูลสำเร็จ',
            new_image : admin_image
        })
         

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE ADMIN ',err,500)
    }
}

// delete admin 
module.exports.deleteAdmin = async(req,res) =>{
    try{
        const user_id = req.body.user_id
        const user_fullname = req.body.user_fullname
        const image_name = req.body.image_name
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_delete = `DELETE FROM user WHERE user_id = ?`
        await dbQuery(qr_delete,[user_id])
        await delete_image(image_name , 'admin_image')

        await timeStamp(
            credential_admin_fullname,
            'delete',
            'admin',
            `${credential_admin_fullname} ลบผู้ใช้งาน ' ${user_fullname} '`
        )   

        res.status(200).json({
            status_code:200,
            status: true ,
            msg:'ลบผู้ใช้งานสำเร็จ'
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','DELETE ADMIN ',err,500)
    }

   
}

// reset password
module.exports.resetPassword = async(req,res) =>{
    try{
        const password = req.body.password
        const user_id = req.body.user_id
        const user_username = req.body.user_username
        const credential_admin_fullname = req.body.credential_admin_fullname 
        const credential_admin_id = req.body.credential_admin_id

        let hashed_password = await bcrypt.hash(password,10)
        const ql_reset_password = `UPDATE user SET user_password = ? WHERE user_id = ? `
        await dbQuery(ql_reset_password,[hashed_password,user_id])

        let msg_stamp = (credential_admin_id === user_id)?`${credential_admin_fullname} เปลี่ยนรหัสผ่าน`
        :`${credential_admin_fullname} เปลี่ยนรหัสผ่านผู้ใช้งาน ' ${user_username} '`

        await timeStamp(
            credential_admin_fullname,
            'update',
            'admin',
            msg_stamp
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เปลี่ยนรหัสผ่านเสร็จสิ้น'
        })


    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','RESET PASSWORD ',err,500)
    }
}

// get account detail
module.exports.getAccountDetail = async(req,res) => {
    try {
        const user_id = req.body.user_id
        const qr_get = `SELECT * FROM user WHERE user_id = ?`
        const result = await dbQuery(qr_get,[user_id])

        res.status(200).json({
            status_code:200,
            status:true,
            account_data: result
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET ACCOUNT DETAIL ',err,500)
    }
}

