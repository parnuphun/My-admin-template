const db = require('../config/database');
const upload_person_directory = require('../services/upload_person_directory')
const delete_file = require('../services/delete_file')
const date_convert = require('../services/date_convert');
const rename_file = require('../services/rename_file')
const bytes = require('bytes');
const fs = require('fs') 
const path = require('path')
require('dotenv').config();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// category
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add file category
module.exports.addFileCategory = async (req,res) =>{
    const file_category_name = req.body.file_category_name
 
    try{
        db.query('SELECT * FROM file_category WHERE file_category_name = ? ', [file_category_name], (err, result) => {
            if (err) console.log(err);
            if (result.length >= 1){
                res.json({
                    status:false,
                    msg:`มีชื่อ '${file_category_name}' อยู่ในระบบแล้ว`
                })
            }
            try{
                db.query('INSERT INTO file_category(file_category_name) VALUES(?)',[file_category_name], async(err,result)=>{
                    if(err) console.log(err);
                    res.json({
                        status:true,
                        msg:`เพิ่ม${file_category_name}สำเร็จ`
                    })
                })
            }catch(err){
                console.log(err);
                res.json({
                    status:false,
                    err:err,
                    msg:'err'
                })
            }
        });
    }catch(err){
        console.log(err);
        res.json({
            status:false,
            err:err,
            msg:'err'
        })
    } 


}

// rename file category
module.exports.renameFileCategory = async (req,res) =>{
    const file_category_name = req.body.file_category_name
    const file_category_id = req.body.file_category_id

    try{
        db.query('SELECT * FROM file_category WHERE file_category_name = ? ', [file_category_name], (err, result) => {
            if(err) console.log(err);
            if (result.length >= 1){
                res.json({
                    status:false,
                    msg:`มีชื่อ '${file_category_name}' อยู่ในระบบแล้ว`
                })
            }
            try{
                db.query(`
                UPDATE file_category
                SET file_category_name = ? 
                WHERE file_category_id = ?`,
                [file_category_name,file_category_id] , (err,result)=>{
                    if(err) console.log(err);
                    res.json({
                        status:true,
                        msg:'เปลี่ยนชื่อสำเร็จ'
                    })
                })
            }catch(err){
                console.log(err);
                res.json({
                    status:false,
                    err:err,
                    msg:'err',
                })
            }    
        }) 
    }catch(err){
        console.log(err);
        res.json({
            status:false,
            err:err,
            msg:'err',
        })
    }
}

// delete file catefgory
module.exports.deleteFileCategory = async (req,res) =>{
    const file_category_id = req.body.file_category_id
    try{
        db.query('DELETE FROm file_category WHERE file_category_id = ? ',[file_category_id],(err,result)=>{
          if(err) console.log('DELETE ERR');
          res.json({
            status:true,
            msg:'ลบสำเร็จ'
          })  
        })
    }catch(err){
        console.log(err);
        res.json({
            status:false,
            err:err,
            msg:'cant delete ...'
        }) 
    }
}

// get all file category
module.exports.getAllCategoryFile = async (req,res)=> {
    try{
        db.query(`SELECT * FROM file_category`,(err,result)=>{
            if(err) console.log(err);
            res.json({
                status:true,
                file_catefory_data:result
            })
        })
    }catch(err){
        console.log(err);
        res.json({
            status:false,
            err:err
        })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// file
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get all file length
module.exports.getFileLength = async (req,res) =>{
    try{
        db.query('SELECT COUNT(file_id) AS total_file FROM file',async (err,result) => {
            if(err){
                console.log('ERR QUERY BLOCK , CANT GET TOTAL FILES ');
                console.log('ERR : ' ,err);
                res.status(500).json({
                    status:false,
                    status_code:200,
                    msg:'เกิดข้อผิดพลาดในระบบ ไม่สามารถดึงจำนวนไฟล์ได้ !!',
                })
            }
            res.status(200).json({
                status:true,
                status_code:200,
                msg:'ดึงข้อมูลสำเร็จ',
                file_length:result[0].total_file 
            })
        })
    }catch(err){
        console.log('ERR TRY CATCH BLOCK , CANT TOTAL FILES');
        console.log('ERR : ' ,err);
        res.status(500).json({
            status:false,
            status_code:200,
            msg:'เกิดข้อผิดพลาดในระบบ ไม่สามารถดึงจำนวนไฟล์ได้ !!',
        })
    }
}

// get all file 
module.exports.getAllFiles = async (req,res) => {
    const selected_category = req.body.selected_category
    const limit = req.body.limit
    const start_item = req.body.start_item
    try{
        db.query(`
        SELECT * FROM file 
        WHERE file_category_id = ? 
        ORDER BY file_id DESC
        LIMIT ? OFFSET ?`,
        [selected_category,limit,start_item],async (err,result) => {
            if(err){
                console.log('ERR IN QUERY BLOCK , CANT GET FILES DATA !!');
                console.log('ERR : ',err);
                return res.status(200).json({
                    status_code: 500,
                    status:false,
                    msg:'ดึงข้อมูลไม่สำเร็จ !!',
                })
            }

            if(result.length != 0){
                for(let i=0 ; i<result.length ;i++){
                    if(result[i].file_pin == 0) result[i].file_pin = false
                    else result[i].file_pin = true
                    
                    await date_convert(result[i].file_date).then((date_converted)=>{
                        result[i].file_date = date_converted
                    }) 
                }
            }

            res.status(200).json({
                status_code:200,
                status:true,
                msg:'ดึงข้อมูลสำเร็จ',
                files_data:result
            })
        })
    }catch(err){
        console.log('ERR IN TRY CATCH BLOCK , CANT GET FILES DATA !!');
        console.log('ERR : ',err);
        res.status(200).json({
            status_code: 500,
            status:false,
            msg:'เกิดข้อผิดพลาดในระบบ ดึงข้อมูลไม่สำเร็จ !!',
        })
    }
}

// add new file 
module.exports.addNewFile = async (req,res)=> {
    const file_name = req.body.file_name
    const file_category_id = req.body.file_category_id
    const file_type = req.body.file_type
    const file_date = new Date() 
    const file_name_upload = `${file_name}_${Date.now()}.${file_type}`
    const file_size = bytes(req.file.size)

    await rename_file(path.join(__dirname, `../public/file/${file_name_upload}`),req.file.path)
    try{
        db.query(`
            INSERT INTO file (
                file_name,
                file_name_upload,
                file_date,
                file_pin,
                file_type,
                file_size,
                file_category_id)
            VALUES (?,?,?,1,?,?,?)
        `,[file_name,file_name_upload,file_date,file_type,file_size,file_category_id],(err,result)=>{
            if(err){
                console.log('ERR CANT ADD NEW FILE !');
                return res.status(200).json({
                    status:false,
                    statusCode:500,
                    msg:'ไม่สามารถเพิ่มไฟล์เข้าไปในระบบได้',
                    err:err
                })
            }
            console.log('ADD NEW FILES SUCCESS !!');
            res.status(200).json({
                status:true,
                statusCode:200,
                msg:'เพิ่มไฟล์สำเร็จ',
            })
        })
    }catch(err){
        console.log('ERR TRY CaTCH BLOCK ,CANT ADD NEW FILES , CHECK ERR PLS !!');
        console.log('ERR : ',err);
        res.status(200).json({
            status:false,
            statusCode:200,
            msg:'ไม่สามารถเพิ่มไฟล์ลงระบบได้ กรุณาติดต่อผู้ดูแลระบบ',
            err: err
        })
    }
 
}

// delete file 
module.exports.deleteFile = async (req,res) => {
    const file_id = req.body.file_id
    const file_name_upload = req.body.file_name_upload
    try{
        db.query('DELETE FROM file WHERE file_id = ?',[file_id],async (err,result)=>{
            await delete_file(file_name_upload,'file')
            console.log(`DELETE FILE ID ${file_id} SUCCESS !!!`)

            res.json({
                status:true,
                msg:'ลบไฟล์สำเร็จแล้ว'
            })
        })

    }catch(err){
        console.log('CANT DELETE FILE, SOMETHINF ERR PLS CHECK !!!');
        res.json({
            status:false,
            msg:'ไม่สามารถลบไฟล์ได้ กรุณษติดต่อผู้ดูแลระบบ'
        })
    }
}

// file switch pin
module.exports.fileSwitchPin = async (req,res) => {
    const file_id = req.body.file_id
    let status 
    let succ_msg 

    // set opposit value 
    if(req.body.file_pin_status == false) {
        status = 1
        succ_msg = ``
    }else{
        status = 0
        succ_msg = ``
    }

     try{
        db.query('UPDATE file SET file_pin = ? WHERE file_id = ?' ,[status , file_id] ,(err,result)=>{ 
            if(err){
                console.log('CANT SWITCH STATUS FILE');
                console.log('ERR : ',err);
                res.status(200).json({
                    status:false,
                    statusCode:500,
                    msg:'ไม่สามารถเปลี่ยนสถานะได้',
                    err:err
                })
            }
            console.log(`CHANGE STATUS FILE ID ${file_id} SUCCESS !`);
            res.status(200).json({
                status:true,
                statusCode:200,
                msg: 'อัพเดตสถานะสำเร็จ'
            })
        })
    }catch(err){
        console.log('ERR TRY CATCH BLOCK , CANT CHANGE PIN STARTUS CHECK ERR PLS !!');
        console.log('ERR : ',err);
        res.status(200).json({
            status:false,
            statusCode:500,
            msg:'เกิดข้อผิดพลาดในระบบ ไม่สามารถเปลี่ยนสถานะได้',
            err:err
        })
    }
}

// file download 
module.exports.downloadFile = async(req,res) =>{
    const file_name_upload = req.body.file_name_upload
    const filePath = path.join(__dirname, `../public/file/${file_name_upload}`)
    // console.log('file existsSync => ',fs.existsSync(filePath));
     res.download(filePath ,(err)=>{
        if (err) {
            console.error(err);
            res.send({
                status:false,
                msg:'มีบางอย่างผิดพลาดขณะดาวน์โหลดไฟล์'
            });
        }
    })
 
}

// preview file 
module.exports.previewFile = async(req,res) => {
    console.log(req.body);
    const file_name_upload = req.body.file_name_upload
    const filePath = path.join(__dirname, `../public/file/${file_name_upload}`)
    // console.log('file existsSync => ',fs.existsSync(filePath));
    if(fs.existsSync(filePath)){
        res.json({
            status:true,
            file_url:process.env.FILE_PATH+file_name_upload
        })
    }else{
        res.send({
            status:false,
            msg:'ไม่มีไฟล์นี้ในระบบ'
        })
    }
}

// edit file 
module.exports.editFile = async(req,res) => {
    const file_id = req.body.file_id
    const file_name = req.body.file_name 
    const file_type = req.body.file_type
    const file_category_id = req.body.file_category_id
    let file_name_upload 
    if(req.body.file_upload === 'no_file_upload'){ // case no file upload 
        file_name_upload = req.body.file_name_upload // use old name 
    }else{
        file_name_upload = `${file_name}_${Date.now()}.${file_type}`// use new name file uploaded
        await rename_file(path.join(__dirname, `../public/file/${file_name_upload}`),req.file.path)
    }
    try{
        // get old file name first after add new file name 
        db.query('SELECT * FROM file WHERE file_id = ? ',[file_id],(err,result)=>{
            let old_file_name = result[0].file_name_upload
            db.query(`UPDATE file 
                        SET file_name = ? ,
                        file_name_upload = ?,
                        file_type = ? ,
                        file_category_id = ? 
                    WHERE file_id = ?`,
            [file_name,file_name_upload,file_type,file_category_id,file_id],    
            async(err,result)=>{
                if(req.body.file_upload === 'no_file_upload'){
                    console.log('UPDATE FILE CASE:NO UPLOAD FILE ');
                }else{
                    console.log('UPDATE FILE CASE: UPLOAD FILE ');
                    await delete_file(old_file_name,'file') // after update remove old file
                }
                console.log('UPDATE FILED SUCCESS !!');
                res.json({
                    status:true,
                    msg:'บันทึกข้อมูลเรียบร้อย'
                })
            })
        })

    }catch(err){
        console.log('CANNOT UPDATE FILE ,PLS CHECK ERR !!');
        res.json({
            status:false ,
            msg:'ไม่สามารถบันทึกไฟล์ลงในระบบได้'
        })
    }

}

// search file 
module.exports.searchFile = async(req,res) =>{
    const search_keyword = req.body.search_keyword
    try{
        db.query("SELECT * FROM file WHERE file_name LIKE '%"+search_keyword+"%'", async (err,result)=>{
            if(err) {
                console.log('ERR CANT SEARCH FILES');
                console.log('ERR :',err);
                return res.status(200).json({
                    status:false,
                    statusCode:500,
                    msg:'เกิดข้อผิดพลาดในระบบ ไม่สามารถค้นหาข้อมูลได้',
                    err:err
                })
            }
            res.status(200).json({
                status:true,
                statusCode:200,
                msg:'ค้นหาข้อมูลสำเร็จ',
                search_data:result
            })
        })
    }catch(err){
        console.log('ERR TRY CATCH BLOCK , CANT SEARCH FILES');
        console.log('ERR :',err);
        res.status(200).json({
            status:false,
            statusCode:500,
            msg:'เกิดข้อผิดพลาดในระบบ ไม่สามารถค้นหาข้อมูลได้',
            err:err
        })
    }


}