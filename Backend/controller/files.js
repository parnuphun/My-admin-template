const db = require('../config/database');
const upload_person_directory = require('../services/upload_person_directory')
const delete_file = require('../services/delete_file')
const date_convert = require('../services/date_convert');
const rename_file = require('../services/rename_file')
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
// add new file 
module.exports.addNewFile = async (req,res)=> {
    // console.log('file size => ',req.file.size);
    const file_name = req.body.file_name
    const file_category_id = req.body.file_category_id
    const file_type = req.body.file_type
    const file_date = new Date() 
    const file_name_upload = `${file_name}_${Date.now()}.${file_type}`
    
    await rename_file(path.join(__dirname, `../public/file/${file_name_upload}`),req.file.path)
    try{
        db.query(`
            INSERT INTO file (
                file_name,
                file_name_upload,
                file_date,
                file_pin,
                file_type,
                file_category_id)
            VALUES (?,?,?,1,?,?)
        `,[file_name,file_name_upload,file_date,file_type,file_category_id],(err,result)=>{
            console.log(' ADD NEW FILES SUCCESS !!');

            res.json({
                status:true,
                msg:'เพิ่มไฟล์สำเร็จ',
            })
        })
    }catch(err){
        console.log('CANT ADD NEW FILES , CHECK ERR PLS !!',err);
        res.json({
            status:false,
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

// get all file 
module.exports.getAllFiles = async (req,res) => {
    const selected_category = req.body.selected_category
    try{
        db.query('SELECT * FROM file WHERE file_category_id = ? ORDER BY file_id DESC',[selected_category],async (err,result) => {
            if(result.length != 0){
                for(let i=0 ; i<result.length ;i++){
                    if(result[i].file_pin == 0) result[i].file_pin = false
                    else result[i].file_pin = true
                    
                    await date_convert(result[i].file_date).then((date_converted)=>{
                        result[i].file_date = date_converted
                    }) 
                     
                }
            }
            res.json({
                status:true,
                msg:'ดึงข้อมูลสำเร็จ',
                fileData:result
            })
        })
    }catch(err){
        console.log('CANT GET ALL FILES PLS CHECK ERR!!!');
        res.json({
            status:false,
            msg:'ดึงข้อมูลไม่สำเร็จ !!',
        })
    }
}

// file switch pin
module.exports.fileSwitchPin = async (req,res) => {
    const file_id = req.body.file_id
    let status 

    // opposit value 
    if(req.body.file_pin_status == false) status = 1
    else status = 0

     try{
        db.query('UPDATE file SET file_pin = ? WHERE file_id = ?' ,[status , file_id] ,(err,result)=>{ 
            console.log(`CHANGE STATUS FILE ID ${file_id} SUCCESS !`);
            res.json({
                status:true,
                msg:'เปลี่ยนสถานะสำเร็จ'
            })
        })
    }catch(err){
        console.log('CANT CHANGE PIN STARTUS CHECK ERR PLS !!');
        console.log('ERR ==> ',err);
        res.json({
            status:false,
            msg:'ไม่สามารถเปลี่ยนสถานะได้'
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
    let file_name_upload
    const file_type = req.body.file_type
    const file_category_id = req.body.file_category_id
    if(req.body.file_upload === 'no_file_upload'){ // case no file upload 
        file_name_upload = req.file_name_upload // use old name 
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