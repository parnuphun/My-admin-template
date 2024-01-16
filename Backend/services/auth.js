const jwt = require('jsonwebtoken');
const date_convert = require('./date_convert');

module.exports.authorization = async (req,res,next) =>{ 
    const token = String(req.headers.authorization).split(' ')[1]
    if(typeof token !== 'undefined' && token !=='' ){
        jwt.verify(token,String(process.env.JWT_PRIVATE_KEY),async (err,result)=>{
            if(err){
                
                if(err.expiredAt){
                    console.log('TOKEN EXPIRED !!!');
                    return res.status(200).json({
                        status:false ,
                        status_code:401,
                        msg: 'สิทธิ์การเข้าใช้งานหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
                    })
                }else{
                    console.log('TOKEN INVALID !!!');
                }
                
                res.status(200).json({
                    status:false ,
                    status_code:401,
                    msg: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้หรือสิทธิ์การเข้าใช้งานหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
                })
            }else{
                next()        
            }
        })
    }else{
        res.status(200).json({
            status_code: 401,
            status:false ,
            msg: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้หรือสิทธิ์การเข้าใช้งานหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง'
        })
    }
}

 