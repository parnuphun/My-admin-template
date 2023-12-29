const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const timeStamp = require('../services/timeStamp')
const return_err =require('../services/return_err');
const date_convert = require('../services/date_convert');
require('dotenv').config();


function createToken(data,rememberMe){
    return new Promise((resolve,reject)=>{

        let loginOption = {
            algorithm:'HS256',
            expiresIn:'1h'
        }

        if(rememberMe){
            loginOption.expiresIn = '1d'
        }

        resolve(jwt.sign(data,String(process.env.JWT_PRIVATE_KEY),loginOption))
    })
}

module.exports.adminRegister = async (req,res) => {
    const username = req.body.username 
    const password = req.body.password
    const firstname = req.body.firstname 
    const lastname = req.body.lastname 
    const date = new Date()
    try{
        // check is username aready 
        db.query(`SELECT * FROM user WHERE user_username = ?` , [username] , async(err , result )=>{
            if(err) return 'database err'
            if(result.length >= 1){
                res.status(401).json({
                    msg: 'มีชื่อผู้ใช้งานนี้อล้วในระบบ'
                })
            }

            if(result.length === 0){
                // no username then register
                // and before register bcrypt password first 
                const hashedPassword = await bcrypt.hash(password, 10);

                try{
                    db.query(`
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
                        VALUES (?, ?, 'no_image_upload', ?, ?,'','','','user',0,?,?)` 
                        , 
                        [
                            username,
                            hashedPassword,
                            firstname,
                            lastname,
                            date,
                            date
                        ] , async(err , result) => {

                        if(err) return 'database error !'
                        
                        return res.status(200).json({
                            msg:'สมัครเสร็จเรียบร้อย'
                        })

                    })
                }catch{
                    console.error('Unexpected error:', error);
                    res.status(500).json({ error: 'Internal server error' })
                }
            }
        })
    }catch(err){
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports.login = async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    try{
        // check username 
        db.query(`SELECT * FROM user WHERE user_username = ? `,[username], async (err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','LOGIN CHECK USERNAME',err,500,'ไม่สามารถเข้าสู่ระบบได้')

            // if no username in system just return false 
            if(result.length === 0 ){
                console.log('LOGIN FAILED NO USERNAME IN SYSTEM.');
                return res.status(200).json({ 
                    status: false ,
                    status_code: 401,
                    msg: 'กรุณาตรวจสอบความถูกต้องของ username และ password อีกครั้ง' ,
                });
            }
            let user_data = result[0]
            user_data.user_fullname = `${user_data.user_firstname} ${user_data.user_lastname}`

            const user = result[0]


            try{
                // update login date
                let current_date = new Date()
                db.query(`UPDATE user SET user_latest_login_date = ? WHERE user_id = ? `,[current_date,user_data.user_id],async(err,result)=>{
                    if(err) return_err(res,'QUERY BLOCK 3 ','LOGIN CHECK USERNAME',err,500,'ไม่สามารถเข้าสู่ระบบได้')
                    
                    // check password 
                    bcrypt.compare(password, user.user_password, async function(err, result) {
                        if(err) return return_err(res,'BCRYPT PASSWORD BLOCK','LOGIN',err,500,'ไม่สามารถเข้าสู่ระบบได้')
                        if(result === true){

                            //check user delete
                            if(user.user_delete === 1){
                                return res.status(200).json({ 
                                    status: false ,
                                    status_code: 401,
                                    msg: 'กรุณาตรวจสอบความถูกต้องของ username และ password อีกครั้ง' ,
                                });
                            }

                            timeStamp(
                                `${user_data.user_firstname} ${user_data.user_lastname}`,
                                'login',
                                'login', 
                                `${user_data.user_firstname} ${user_data.user_lastname} เข้าสู่ระบบ`
                            )

                            user.user_token = await createToken(user,false);
                            let current_date = new Date()
                            user.user_login_date = await date_convert(current_date)
                            user.user_expire_date = await date_convert(current_date.getTime() + 60 * 60 * 1000) // +1 hr
                            user.user_join_date = await date_convert(user.user_join_date) 
                            user.user_latest_login_date = await date_convert(user.user_latest_login_date)
                            user.user_delete = (user.user_delete === 1)
                            user.user_base_image_path = process.env.ADMIN_IMAGE
                            // user.user_expire_date = await date_convert(new Date().addHours(1))
                            // format delete status
                            res.status(200).json({ 
                                status: true ,
                                status_code: 200,
                                msg: 'เข้าสู่ระบบสำเร็จ', 
                                user_data: user 
                            });
                        }else{
                            console.log('LOGIN FAILED , PASSWORD INVALID. ');
                            return res.json({ 
                                status: false ,
                                status_code: 401,
                                msg:  `กรุณาตรวจสอบความถูกต้องของ username และ password อีกครั้ง ` 
                            });
                            
                        }
                    });
                })
            }catch(err){
                return_err(res,' TRY CATCH BLOCK 3','LOGIN',err,500,'ไม่สามารถเข้าสู่ระบบได้ในตอนนี้ โปรดติดต่อผู้ดูแลระบบ')
            }

        })

    }catch(err) {
        return_err(res,'BCRYPT TRY CATCH BLOCK','LOGIN',err,500,'ไม่สามารถเข้าสู่ระบบได้ในตอนนี้ โปรดติดต่อผู้ดูแลระบบ')
    }

}