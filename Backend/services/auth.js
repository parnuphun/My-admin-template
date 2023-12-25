const jwt = require('jsonwebtoken');
const date_convert = require('./date_convert');

module.exports.authorization = async (req,res,next) =>{ 
    const token = String(req.headers.authorization).split(' ')[1]
    if(typeof token !== 'undefined' && token !=='' ){
        jwt.verify(token,String(process.env.JWT_PRIVATE_KEY),async (err,result)=>{
            if(err){
                console.log('token invalid !!!');
                if(err.expiredAt){
                    // console.log('TOKEN EXPIRE : ', await date_convert(err.expiredAt));
                    return res.status(200).json({
                        status:false ,
                        status_code:401,
                        msg: 'สิทธิ์การเข้าใช้งานหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
                    })
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

// module.exports.isTokenExpire() = async (req,res) => {
//     {
//     const token = req.body.token
//     const decoded = jwt.decode(token) 

//     // ถ้า decoded ไม่มีค่าให้ return err ออกไป
//     if(!decoded){
//         res.send({
//             status: false ,
//             msg: 'Token Invalid or Token Expired '
//         })
//     }

//     // get current date is type number because decode.exp is a number type
//     const currentTime = new Date().getTime() / 1000
//     if(decoded.exp <= currentTime){
//         res.send({
//             status: false ,
//             msg: 'หมดเวลาการใช้งาน กรุณาเข้าสู่ระบบใหม่'
//         })
//     }else{
//         res.send({
//             status: true ,
//             msg: 'ยังไม่หมดอายุการใช้งาน'
//         })
//     }
// }
// }