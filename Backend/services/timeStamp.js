const db = require('../config/database');
 
module.exports = async (username,type,fuction,text) =>{
    const date = new Date()    
    try{
        db.query(`INSERT INTO history_logs(
            history_logs_username,
            history_logs_type,
            history_logs_fucntion,
            history_logs_text,
            history_logs_date) VALUES(?,?,?,?,?)`,[username,type,fuction,text,date], async(err,result)=>{
                if(err){
                    console.log('ERR IN QUERY BLOCK , ADD TIME STAMP');
                    console.log('ERR : ',err);
                    return {
                        err:err,
                        msg:'เพิ่มประวัติการใช้งานไม่สำเร็จ',
                        status: false
                    }
                }else{
                    return {
                        msg:'เพิ่มประวัติการใช้งานสำเร็จ',
                        status: true
                    }
                }
            })
    }catch(err){
        console.log('ERR IN TRY CATCH BLOCK , ADD TIME STAMP');
        console.log('ERR : ',err);
        return {
            err:err,
            msg:'เพิ่มประวัติการใช้งานไม่สำเร็จ',
            status: false
        }
    }
}