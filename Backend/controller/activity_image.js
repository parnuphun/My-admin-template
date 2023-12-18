const db = require('../config/database');
const date_convert = require('../services/date_convert');
const delete_image = require('../services/delete_file')

require('dotenv').config();

// get activity image 
module.exports.getActivityImage = async (req,res) => {
    try{
        db.query(`SELECT * FROM activity_image ORDER BY activity_image_id DESC`, async (err,result)=>{
            if(err){
                console.log(' ERR , QUERY ACTIVITY IMAGE');
                console.log('ERR : ',err);
                return res.status(200).json({
                    status:false,
                    statusCode:500,
                    msg:'ไม่สามารถดึงข้อมูลภาพกิจกรรมได้!!'
                })
            }

            console.log('QUREY ACTIVITY IMAGE SUCCESS');
            for(let i = 0 ; i < result.length ; i++){
                await date_convert(result[i].file_date).then((date_converted)=>{
                    result[i].activity_image_date = date_converted
                }) 
            }
            
            return res.status(200).json({
                status:true,
                statusCode:200,
                fileUrl:process.env.ACTIVITY_IMAGE,
                activityImageData:result,
            })
        })
    }catch(err){
        console.log('ERR IN TRY CATCH BLOCK CANT GET ACTIVITY IMAGE , PLS CHECK ERR !!');
        console.log('ERR : ',err);
        res.status(200).json({
            status:false,
            statusCode: 500,
            msg: 'เกิดข้อผิดพลาดในระบบ ไม่สามารถดึงข้อมูลภาพกิจกรรมได้!!'
        })
    }
}

// add new activity image
module.exports.addNewActivityImage = async (req,res) => {
    const activity_image_cover = req.file.filename
    const activity_image_name = req.body.activity_image_name
    const activity_image_link = req.body.activity_image_link
    const activity_image_date = new Date()

    try{
        db.query(`
        INSERT INTO activity_image(
            activity_image_cover,
            activity_image_name,
            activity_image_link,
            activity_image_date)
        VALUES (?,?,?,?)`,
        [activity_image_cover,
        activity_image_name,
        activity_image_link,
        activity_image_date],
        (err,result)=>{
            if(err){
                console.log('ERR INSERTING IMAGE');
                console.log('ERR : ' , err);
                return res.status(200).json({
                    status:false,
                    statusCode: 500,
                    msg: 'ไม่สามารถเพิ่มภาพกิจกรรมได้!!'
                })
            }
            console.log(result);
            console.log('ADD NEW ACTIVITY IMAGE SUCCESS!!');
            res.status(200).json({
                status:true,
                statusCode:200,
                msg:'เพิ่มภาพกิจกรมมสำเร็จ !!'
            })
        })
    }catch(err){
        console.log('ERR IN TRY CATCH BLOCK CANT ADD NEW ACTIVITY , PLS CHECK ERR !!');
        console.log('ERR : ',err);
        res.status(200).json({
            status:false,
            statusCode: 500,
            msg: 'เกิดข้อผิดพลาดในระบบ ไม่สามารถเพิ่มภาพกิจกรรมได้!!'
        })
    }
}

// delete activity image
module.exports.deleteActivityImage = async (req,res) => {
    const activity_image_id = req.body.activity_image_id
    const activity_image_cover_delete = req.body.activity_image_cover_delete
    try{
        db.query('DELETE FROM activity_image WHERE activity_image_id = ? ',[activity_image_id], async(err,result)=>{
            if(err){
                console.log('ERR CANT DELETE ACTIVITY IMAGE');
                console.log('ERR :', err);
                return res.status(200).json({
                    status:false,
                    statusCode:500,
                    msg:'ไม่สามารถลบรูปภาพกิจกรรม'
                })
            }
            delete_image(activity_image_cover_delete,'activity_image')
            console.log(`DELETED ACTIVITI IMAGE ID : ${activity_image_id} SUCCESS !!`);
            res.status(200).json({
                status:true,
                statusCode:200,
                msg:'ไม่สามารถลบรูปภาพกิจกรรม'
            })
        })
    }catch(err){
        console.log('ERR IN TRY CATCH BLOCK CANT DELETE ACTIVITY IMAGE , PLS CHECK ERR !!');
        console.log('ERR : ',err);
        res.status(200).json({
            status:false,
            statusCode: 500,
            msg: 'เกิดข้อผิดพลาดในระบบ ไม่สามารถลบภาพกิจกรรมได้!!'
        })
    }
}