const db = require('../config/database');
const bcrypt = require('bcrypt');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
require('dotenv').config();

// seach admin 
module.exports.searchAdmin =async(req,res) => {
    const search_keyword = req.body.search_keyword
    const limit = req.body.limit
    const start_item = req.body.start_item

    try{
        db.query(`
        SELECT * FROM user 
        WHERE 
            (user_username LIKE ?)OR
            (user_firstname LIKE ?)OR
            (user_lastname LIKE ?)OR
            (user_email LIKE ?)
        ORDER BY user_rule DESC , user_id DESC LIMIT ${limit} OFFSET ${start_item}`,
        ['%'+search_keyword+'%','%'+search_keyword+'%','%'+search_keyword+'%','%'+search_keyword+'%'],async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','SEARCH ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้') 
            for (let i = 0; i < result.length; i++) {
                result[i].user_latest_login_date = await date_convert(result[i].user_latest_login_date)
                result[i].user_join_date = await date_convert(result[i].user_join_date)
            }
            res.status(200).json({
                status_code:200,
                status:true,
                admins_data_length : result.length,
                admins_data: result,
                msg:'ดึงข้อมูลสำเร็จ'
            })
        })
        
    }catch(err){
        return return_err(res,'TRY CATCG BLOCK','SEARCH ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้') 
    }
}

// get all admin length 
module.exports.getAllAdminLength = async(req,res) => {
    try{
        db.query('SELECT COUNT(*) AS length FROM user', async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','ADMIN DATA LENGTH ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
            res.json({
                status:true,
                msg:'ดึงข้อมูลสำเร็จ',
                length:result[0].length,
            })
        })

    }catch(err){
        return return_err(res,'TRY CATCG BLOCK','ADMIN DATA ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
    }
}

// get all user
module.exports.getAllAdmin = async(req,res) => {
    const limit = req.body.limit
    const start_item = req.body.start_item
    try{
        db.query('SELECT * FROM user ORDER BY user_rule DESC , user_id DESC LIMIT ? OFFSET ?',[limit,start_item], async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','ADMIN DATA LENGTH ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
            for (let i = 0; i < result.length; i++) {
                result[i].user_latest_login_date = await date_convert(result[i].user_latest_login_date)
                result[i].user_join_date = await date_convert(result[i].user_join_date)
            }
            res.json({
                status:true,
                status_code:200,
                msg:'ดึงข้อมูลสำเร็จ',
                adminData:result,
                image_path:process.env.ADMIN_IMAGE
            })
        })

    }catch(err){
        return return_err(res,'TRY CATCG BLOCK','ADMIN DATA ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
    }
}

// add new admin
module.exports.addNewAdmin = async(req,res) =>{
    let admin_image = req.body.admin_image
    if(req.body.admin_image === 'no_image_upload' ){
        admin_image = 'no_image_upload'
    }else{
        admin_image = req.file.filename
    }
    const admin_username = req.body.admin_username
    const admin_password = req.body.admin_password
    const admin_firstname = req.body.admin_firstname
    const admin_lastname = req.body.admin_lastname
    const admin_email = req.body.admin_email
    const admin_phone = req.body.admin_phone
    let admin_address = req.body.admin_address
    const admin_rule = req.body.admin_rule
    const credential_admin_fullname = req.body.credential_admin_fullname 
    const current_date = new Date()
    if(admin_address === undefined || admin_address === 'undefined') admin_address = ''
    try{
        db.query(`SELECT * FROM user WHERE user_username = ?`,[admin_username],async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','ADD NEW ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
            if(result.length >= 1){
                return res.status(200).json({
                    status_code : 409 ,
                    status:false ,
                    msg: 'มีชื่อผู้ใช้งานนี้ในระบบแล้วกรุณากรอกชื่อผู้ใช้งานใหม่'
                })
            }

            try{
                let hashed_password = await bcrypt.hash(admin_password, 10);
                db.query(`
                INSERT INTO user(
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
                VALUES(?,?,?,?,?,?,?,?,?,0,?,?)
                    `,[
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
                    ] , async (err,result)=>{
                        if(err) return return_err(res,'QUERY BLOCK','ADD NEW ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
                        timeStamp(
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
                    })
            }catch(err){
                return return_err(res,'TRY CATCH BLOCK 2','ADD NEW ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
            }
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','ADD NEW ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
    }
    
}

// update admin 
module.exports.updateAdmin = async(req,res) =>{
    console.log(req.body);
    let admin_image = req.body.admin_image
    if(req.body.admin_image === 'no_image_upload' ){ // กรณีไม่ได้อัพโหลดภาพเดิมมาให้ใช้ภาพเดิม
        admin_image = req.body.admin_image_old
    }else{
        admin_image = req.file.filename
    }
    const admin_image_old = req.body.admin_image_old // เอามาลบกรณีที่มีการอัพภาพใหม่
    const admin_username = req.body.admin_username
    const admin_username_old = req.body.admin_username_old
    const admin_firstname = req.body.admin_firstname
    const admin_lastname = req.body.admin_lastname
    const admin_email = req.body.admin_email
    const admin_phone = req.body.admin_phone
    let admin_address = req.body.admin_address
    const admin_rule = req.body.admin_rule
    const credential_admin_fullname = req.body.credential_admin_fullname
    const admin_id = req.body.admin_id
    
    if(admin_address === undefined || admin_address === 'undefined') admin_address = ''

    try{
        db.query(`
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
            WHERE user_id = ?
        `,[
            admin_username,
            admin_image,
            admin_firstname,
            admin_lastname,
            admin_email,
            admin_phone,
            admin_address,
            admin_rule,
            admin_id
        ],async (err,result) => {
            if(err) return return_err(res,'QUERY BLOCK','UPDATE ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
            if(admin_image !== admin_image_old){ // delete old image 
                await delete_image(admin_image_old,'admin_image')
            }

            let timeStamp_msg = `${credential_admin_fullname} แกไขข้อมูลของ ' ${admin_username} ' `
            if(admin_username !== admin_username_old){
                timeStamp_msg = timeStamp_msg + `  และได้มีการเปลี่ยนชื่อผู้ใช้งานจาก ' ${admin_username_old} ' เป็น ' ${admin_username} ' `
            }

            timeStamp(
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

        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','UPDATE ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถเพิ่มผู้ใช้งานได้')
 
    }
    // let user_id = req.body.userid
    // let new_username = req.body.username
    // let old_username = req.body.oldUsername
    // let firstname = req.body.firstname
    // let lastname = req.body.lastname
    // let email = req.body.email
    // let address = req.body.address
    // let phone = req.body.phone
    
    // let image 
    // let oldImage = req.body.oldimage
    // if(address === undefined || address === 'undefined' || address === null || address === 'null') address = ''

    // if(req.body.admin_image === 'no_image_upload' ){
    //     image = oldImage
    // }else{
    //     image = req.file.filename
    // }
    
    // try{
    //     db.query('SELECT * FROM user WHERE user_username = ? ', [new_username],(err,result)=>{
    //         if(old_username!=new_username){
    //             if(result.length >= 1){
    //                 return res.json({
    //                     msg:'ชื่อผู้ใช้ซ้ำกรุณากรอกใหม่',
    //                     status: false
    //                 })
    //             }
    //         }
    //         try{
    //             db.query(`
    //                 UPDATE user 
    //                 SET user_username = ?, 
    //                     user_image = ?,
    //                     user_firstname = ?, 
    //                     user_lastname = ?,
    //                     user_email = ?,
    //                     user_phone = ?,
    //                     user_address = ? 
    //                 WHERE user_id = ?
    //             `,[
    //                 new_username,
    //                 image,
    //                 firstname,
    //                 lastname,
    //                 email,
    //                 phone,
    //                 address,
    //                 user_id
    //             ],async (err,result)=>{
    //                 if(oldImage != image){
    //                      await delete_image(oldImage,'admin_image')
    //                 }
    //                 console.log('UPDATE ADMIN SUCCESSS!')
    //                 res.json({
    //                     msg:'บันทึกข้อมูลเรียบร้อยแล้ว',
    //                     status:true,
    //                     new_image_name:image
    //                 })
    //             })
    //         }catch{
    //             console.log('ERR UPDATE ADMIN ,PLS CHECK USERNAME !!');
    //             console.log('ERR 2 : ',err);
    //             reject( {
    //                 status: false ,
    //                 msg: 'มีปัญหาในการตรวจสอบ username '
    //             })
    //         }
    //     })
    // }catch(err){
    //     console.log('ERR UPDATE ADMIN ,PLS CHECK USERNAME !!');
    //     console.log('ERR 1 : ',err);
    //     reject( {
    //         status: false ,
    //         msg: 'มีปัญหาในการตรวจสอบ username '
    //     })
    // }
}

// delete admin 
module.exports.deleteAdmin = async(req,res) =>{
    const user_id = req.body.user_id
    const user_fullname = req.body.user_fullname
    const image_name = req.body.image_name
    const credential_admin_fullname = req.body.credential_admin_fullname

    try{
        db.query('DELETE FROM user WHERE user_id = ? ',[user_id],async (err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','DELETE ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            await delete_image(image_name , 'admin_image')

            timeStamp(
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
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','DELETE ADMIN ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

// reset password
module.exports.resetPassword = async(req,res) =>{
    const password = req.body.password
    const user_id = req.body.user_id
    const user_username = req.body.user_username
    const credential_admin_fullname = req.body.credential_admin_fullname 
    const credential_admin_id = req.body.credential_admin_id
    
    try{
        let hashed_password = await bcrypt.hash(password,10)
        db.query(`UPDATE user SET user_password = ? WHERE user_id = ? `,[hashed_password,user_id] , async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','RESET PASSWORD ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            let msg_stamp 
            if(credential_admin_id === user_id){
                msg_stamp = `${credential_admin_fullname} เปลี่ยนรหัสผ่าน`
            }else{
                msg_stamp = `${credential_admin_fullname} เปลี่ยนรหัสผ่านผู้ใช้งาน ' ${user_username} '`
            }
            timeStamp(
                credential_admin_fullname,
                'update',
                'admin',
                msg_stamp
            )

            res.status(200).json({
                status_code:200,
                status:true,
                msg:'เปลี่ยนรหัสผ่านเรียบร้อย'
            })


        })
    }catch{
        return return_err(res,'TRY CATCH BLOCK','RESET PASSWORD ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

