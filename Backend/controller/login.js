const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const timeStamp = require('../services/timeStamp')
const return_err =require('../services/return_err')
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
    const username = req.body.username 
    const password = req.body.password
    const firstname = req.body.firstname 
    const lastname = req.body.lastname 

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
                            user_address
                            )
                        VALUES (?, ?, '', ?, ?,'','','')` 
                        , 
                        [
                            username,
                            hashedPassword,
                            firstname,
                            lastname
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

            let user_data = result[0]
            user_data.user_fullname = user_data.user_firstname + ' ' + user_data.user_lastname

            // if no username in system just return false 
            if(result.length === 0 ){
                console.log('LOGIN FAILED NO USERNAME IN SYSTEM.');
                return res.status(200).json({ 
                    status: false ,
                    status_code: 401,
                    msg: 'กรุณาตรวจสอบความถูกต้องของ username และ password อีกครั้ง' ,
                });
            }

            const user = result[0]
            // check password 
            bcrypt.compare(password, user.user_password, async function(err, result) {
                if(err) return return_err(res,'BCRYPT PASSWORD BLOCK','LOGIN',err,500,'ไม่สามารถเข้าสู่ระบบได้')
                if(result === true){
                    timeStamp(
                        `${user_data.user_firstname} ${user_data.user_lastname}`,
                        'login',
                        'login', 
                        `${user_data.user_firstname} ${user_data.user_lastname} เข้าสู่ระบบ`
                    )

                    user.user_token = await createToken(user,false);
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

    }catch(err) {
        return_err(res,'BCRYPT TRY CATCH BLOCK','LOGIN',err,500,'ไม่สามารถเข้าสู่ระบบได้')
    }

}