const db = require('../config/database');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
require('dotenv').config();
// get data
module.exports.getSchoolDataSetting = async (req,res)=>{
    try{
        db.query(`SELECT * FROM school_setting WHERE id = 1`, async (err,result)=>{
            if(err) return return_err(res,'TRY CATCH BLOCK','GET SCHOOL DATA ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            if(result.length === 0){
                return res.status(200).json({
                    status_code : 404 ,
                    status:false,
                    msg:'ไม่มีข้อมูลในระบบ กรุณาแจ้งนักพัฒนาระบบ'
                })
            }else if(result[0].id !== 1){
                return res.status(200).json({
                    status_code : 404 ,
                    status:false,
                    msg:'ไม่มีข้อมูลในระบบ กรุณาแจ้งนักพัฒนาระบบ'
                })
            }
            result[0].banner_img_origin_name = result[0].banner_img
            result[0].banner_img = process.env.BANNER_PATH + result[0].banner_img
            res.status(200).json({
                status_code : 200 ,
                status:true,
                msg:'ดึงข้อมูลสำเร็จ',
                school_data:result
            })
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET SCHOOL DATA ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}


// change default pass
module.exports.changeDefaultPassword = async (req,res) =>{
    console.log(req.body);
    const pass = req.body.default_admin_password
    const credential_admin_fullname = req.body.credential_admin_fullname
    try {
        db.query(`SELECT COUNT(*) AS length FROM school_setting`,(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','CHANGE DEFAUlT PASS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            if(result[0].length === 0) {
                return res.status(200).json({
                    status_code : 404 ,
                    status:false,
                    msg:'ไม่มีข้อมูลในระบบ กรุณาแจ้งนักพัฒนาระบบ'
                })
            }else{
                try {
                    db.query(`UPDATE school_setting SET default_admin_password = ? WHERE id = 1`,[pass],async(err,result)=>{
                        if(err) return return_err(res,'QUERY BLOCK 2','CHANGE DEFAUlT PASS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                        timeStamp(
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
                    })
                } catch (error) {
                    return return_err(res,'TRY CATCH BLOCK 2','CHANGE DEFAUlT PASS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                }
            }
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','CHANGE DEFAUlT PASS ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

// for admin add begin data
module.exports.addSchoolDefaultData = async(req,res) => {
    const pass = req.body.default_password
    const slogan = req.body.slogan
     try{
        db.query(`
            INSERT INTO school_setting(
                banner_img,
                banner_slogan,
                default_admin_password)
            VALUES(?,?,?)
        `,['no_image_upload',slogan,pass],(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','ADD SCHOOOL BEGIN DATA ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            res.status(200).json({
                status_code :200,
                status:true,
                msg: 'เพิ่มข้อมูลสำเร็จ'
            })
        })
     }catch(err){
        if(err) return return_err(res,'TRY CATCH BLOCK','ADD SCHOOOL BEGIN DATA ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
     }
}

module.exports.updateBanner = async (req,res) => {
    let image
    if(req.body.banner_image === 'no_image_upload'){
        image = req.body.banner_image_old
    }else{
        image = req.file.filename
    }
    const banner_slogan = req.body.banner_slogan
    const old_img = req.body.banner_image_old
    const credential_admin_fullname = req.body.credential_admin_fullname

    try{
        db.query(`SELECT COUNT(*) AS length FROM school_setting`,(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK 1','UPDATE BANNER SCHOOL ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            if(result[0].length === 0) {
                return res.status(200).json({
                    status_code : 404 ,
                    status:false,
                    msg:'ไม่มีข้อมูลในระบบ กรุณาแจ้งนักพัฒนาระบบ'
                })
            }else{
                try {
                    db.query(`
                        UPDATE school_setting 
                        SET
                            banner_img = ? ,
                            banner_slogan = ? 
                        WHERE id = 1 
                    `,[image,banner_slogan],async(err,result)=>{
                        if(err) return return_err(res,'QUERY BLOCK 2','UPDATE BANNER SCHOOL ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                        if(req.body.banner_image !== 'no_image_upload'){
                            delete_image(old_img, 'banner_image')
                        }
                        timeStamp(
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
                    })
                } catch (err) {
                    return return_err(res,'TRY CATCH BLOCK 2','UPDATE BANNER SCHOOL ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                }
            }
        })
    }catch(err){
        if(err) return return_err(res,'TRY CATCH BLOCK','UPDATE BANNER SCHOOL ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')

    }
} 