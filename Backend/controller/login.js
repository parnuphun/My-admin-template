const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    console.log(req.body);
    const username = req.body.username
    const password = req.body.password
    try{
        // check username 
        db.query(`SELECT * FROM user WHERE user_username = ? `,[username], async (err,result)=>{
            if(err) return 'database error ';

            if(result.length === 0 ){
                return res.json({ 
                    status: false ,
                    status_code: 401,
                    msg: 'กรุณาตรวจสอบความถูกต้องของ username และ password อีกครั้ง' ,
                });
            }

            const user = result[0]
            // check password 
            bcrypt.compare(password, user.user_password, async function(err, result) {
                if(err) return 'bcrypt password err'
                if(result === true){
                    user.user_token = await createToken(user,false);
                    res.json({ 
                        status: true ,
                        status_code: 401,
                        msg: 'เข้าสู่ระบบสำเร็จ', 
                        user: user 
                    });
                }else{
                    return res.json({ 
                        status: false ,
                        status_code: 401,
                        msg:  `กรุณาตรวจสอบความถูกต้องของ username และ password อีกครั้ง ` 
                    });
                }
            });
        })

    }catch(err) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error' })
    }

}