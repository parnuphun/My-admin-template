const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const timeStamp = require('../services/timeStamp')
const return_err =require('../services/return_err');
const date_convert = require('../services/date_convert');
const {dbQuery} = require('../services/query');

require('dotenv').config();


function createToken(data,rememberMe){
    return new Promise((resolve,reject)=>{
        let loginOption = {
            algorithm:'HS256',
            expiresIn:'8h'
        }

        if(rememberMe){
            loginOption.expiresIn = '1d'
        }

        resolve(jwt.sign(data,String(process.env.JWT_PRIVATE_KEY),loginOption))
    })
}

module.exports.adminRegister = async (req,res) => {
    try{
        const username = req.body.username 
        const password = req.body.password
        const firstname = req.body.firstname 
        const lastname = req.body.lastname 
        const date = new Date()

        const qr_check_username = `SELECT * FROM user WHERE user_username = ?`
        const qr_register = `
            INSERT INTO user (
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
                user_latest_login_date
                )
            VALUES (?, ?, 'no_image_upload', ?, ?,'','','','admin',0,?,?)
        `
        const result_check_username = await dbQuery(qr_check_username,[username])

        if(result_check_username.length >= 1) return res.status(200).json({
            status_code:200,
            statis:false,
            msg: 'มีชื่อผู้ใช้งานนี้แล้วในระบบ'
        })

        // no username then register
        // and before register bcrypt password first 
        const hashedPassword = await bcrypt.hash(password, 10);

        await dbQuery(qr_register,[username,hashedPassword,firstname,lastname,date,date])

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ลงทะเบียนผู้ดูแลระบบสำเร็จ'
        })

    }catch(err){
        return_err(res,'TRY CATCH BLOCK','LOGIN',err,500)
    }
}

module.exports.login = async (req,res) => {
    
    try{
        let current_date = new Date()

        const username = req.body.username
        const password = req.body.password
        
        const qr_check_username = `SELECT * FROM user WHERE user_username = ?`
        const qr_update_login_date = `UPDATE user SET user_latest_login_date = ? WHERE user_id = ?`
        const err_res_msg = 'กรุณาตรวจสอบความถูกต้องของ username และ password อีกครั้ง'

        const errRes = {
            status: false ,
            status_code: 401,
            msg: err_res_msg ,
        }

        const check_username_result = await dbQuery(qr_check_username, [username])
        if(check_username_result.length === 0 ) return res.status(200).json(errRes);

        let user_data = check_username_result[0]
        user_data.user_fullname = `${user_data.user_firstname} ${user_data.user_lastname}`
        const user = check_username_result[0]

        // update login date
        await dbQuery(qr_update_login_date,[current_date,user_data.user_id])

        // check password 
        const passwordMatch = await bcrypt.compare(password, user.user_password)
        if(passwordMatch !== true) return res.status(200).json(errRes);

        //check user delete (not use now )
        if(user.user_delete === 1) return res.status(200).json(errRes);

        await timeStamp(
            `${user_data.user_firstname} ${user_data.user_lastname}`,
            'login',
            'login', 
            `${user_data.user_firstname} ${user_data.user_lastname} เข้าสู่ระบบ`
        )

        // format credential data before login 
        
        user.user_token = await createToken(user,false);
        user.user_login_date = await date_convert(current_date)
        user.user_expire_date = await date_convert(current_date.getTime() + (8 * 60 * 60 * 1000)) // +8hr
        user.user_join_date = await date_convert(user.user_join_date) 
        user.user_latest_login_date = await date_convert(user.user_latest_login_date)
        user.user_delete = (user.user_delete === 1)
        user.user_base_image_path = process.env.ADMIN_IMAGE
        
        res.status(200).json({ 
            status: true ,
            status_code: 200,
            msg: 'เข้าสู่ระบบสำเร็จ', 
            user_data: user 
        });
                    
    }catch(err) {
        return_err(res,'TRY CATCH BLOCK','LOGIN',err,500,'ไม่สามารถเข้าสู่ระบบได้ในตอนนี้ โปรดติดต่อผู้ดูแลระบบ')
    }

}