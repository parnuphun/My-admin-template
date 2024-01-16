const db = require('../config/database');
 
module.exports = async (res,block,msg_block,err,status_code , res_err_msg) =>{
    if(status_code === undefined || status_code === null) status_code = 500 
    if(msg_block === undefined || msg_block === null) msg = ''
    if(res_err_msg === undefined || res_err_msg === null) res_err_msg = 'เกิดความผิดพลาด ไม่สามารถดำเนินการได้'
    console.log(`ERR IN ${block} , ${msg_block}`);
    console.log('ERR :' ,err);

    return res.status(200).json({
        status: false,
        status_code: status_code || 500,
        msg: res_err_msg,
        err: err,
    });
    
}
 