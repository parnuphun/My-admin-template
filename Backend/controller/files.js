const db = require('../config/database');
const upload_person_directory = require('../services/upload_person_directory')
const delete_file = require('../services/delete_file')
const date_convert = require('../services/date_convert');
const rename_file = require('../services/rename_file')
const timeStamp = require('../services/timeStamp')
const return_err =require('../services/return_err');
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
    const selected_category = req.body.selected_category
    let query = 'SELECT COUNT(file_id) AS total_file FROM file'
    if(selected_category !== 0){
        query += ` WHERE file_category_id = ${selected_category}`
    }
    try{
        db.query(query,async (err,result) => {
            if(err){
                console.log('ERR QUERY BLOCK , CANT GET TOTAL FILES ');
                console.log('ERR : ' ,err);
                res.status(500).json({
                    status:false,
                    status_code:200,
                    msg:'เกิดข้อผิดพลาดในระบบ ไม่สามารถดึงจำนวนไฟล์ได้ !!',
                })
            }
            if(result.length === 0) {
                res.status(200).json({
                    status:true,
                    status_code:200,
                    msg:'ดึงข้อมูลสำเร็จ',
                    file_length: 0
                })
            }
            else if(result.length >= 1) {
                res.status(200).json({
                    status:true,
                    status_code:200,
                    msg:'ดึงข้อมูลสำเร็จ',
                    file_length:result[0].total_file
                })
            }
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
    let query_select = `SELECT * FROM file`
    let query_where = ` WHERE file_category_id = ${selected_category}`
    let query_limit = ` ORDER BY file_id DESC LIMIT ${limit} OFFSET ${start_item}`

    if(selected_category !== 0 ){
        query_select = query_select + query_where + query_limit
    }else{
        query_select = query_select + query_limit
    }
    try{
        db.query(query_select,async (err,result) => {
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
    const credential_admin_fullname = req.body.credential_admin_fullname

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

            timeStamp(
                credential_admin_fullname,
                'add',
                'file', 
                `${credential_admin_fullname} เพิ่มไฟล์เอกสาร '${file_name}'`
            )
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
    const credential_admin_fullname = req.body.credential_admin_fullname
    const file_name = req.body.file_name
    try{
        db.query('DELETE FROM file WHERE file_id = ?',[file_id],async (err,result)=>{
            await delete_file(file_name_upload,'file')
            console.log(`DELETE FILE ID ${file_id} SUCCESS !!!`)
            timeStamp(
                credential_admin_fullname,
                'delete',
                'file',
                `${credential_admin_fullname} ลบไฟล์เอกสาร ' ${file_name} '`
            )
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
    const credential_admin_fullname = req.body.credential_admin_fullname
    const file_name = req.body.file_name
    let status 
    let succ_msg 

    // set opposit value 
    if(req.body.file_pin_status == false) {
        status = 1
        succ_msg = `เปิดการมองเห็น`
    }else{
        status = 0
        succ_msg = `ปิดการมองเห็น`
    }

     try{
        db.query('UPDATE file SET file_pin = ? WHERE file_id = ?' ,[status , file_id] ,(err,result)=>{ 
            if(err){
                console.log('CANT SWITCH STATUS FILE');
                console.log('ERR : ',err);
                res.status(200).json({
                    status:false,
                    statusCode:500,
                    err:err
                })
            }
            
            timeStamp(
                credential_admin_fullname,
                'update',
                'file',
                `${credential_admin_fullname} ${succ_msg} ไฟล์เอกสาร ' ${file_name} '`
            )

            res.status(200).json({
                status:true,
                statusCode:200,
                msg: succ_msg
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

// update file 
module.exports.editFile = async(req,res) => {
    const file_id = req.body.file_id
    const file_name = req.body.file_name 
    const file_old_name = req.body.file_old_name // old file anme not upload 
    const file_type = req.body.file_type
    const file_category_id = req.body.file_category_id
    const credential_admin_fullname = req.body.credential_admin_fullname
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
            if(err){
                console.log('ERR QEURY BLOCK ,CANNOT UPDATE FILE ERR AT GET OLD FILE NAME ,');
                console.log('ERR : ',err);
                return res.status(200).json({
                    status_code: 500,
                    status:false ,
                    msg:'ไม่สามารถบันทึกไฟล์ลงในระบบได้',
                    err:err
                })
            }
            let old_file_name = result[0].file_name_upload // old file name upload
            try{
                db.query(`UPDATE file 
                        SET file_name = ? ,
                        file_name_upload = ?,
                        file_type = ? ,
                        file_category_id = ? 
                        WHERE file_id = ?`,
                [file_name,file_name_upload,file_type,file_category_id,file_id],    
                async(err,result)=>{
                    if(err){
                        console.log('ERR QEURY BLOCK 2 ,CANNOT UPDATE FILE  ,');
                        console.log('ERR : ',err);
                        return res.status(200).json({
                            status_code: 500,
                            status:false ,
                            msg:'ไม่สามารถบันทึกไฟล์ลงในระบบได้',
                            err:err
                        })
                    }
                    // check file before delete
                    if(req.body.file_upload === 'no_file_upload'){
                        console.log('UPDATE FILE CASE:NO UPLOAD FILE ');
                    }else{
                        console.log('UPDATE FILE CASE: UPLOAD FILE ');
                        await delete_file(old_file_name,'file') // after update remove old file
                    }

                    let msg_time_stamp = `${credential_admin_fullname} แก้ไขไฟล์ ' ${file_old_name} '`
                    if(file_name !== file_old_name){
                        msg_time_stamp = msg_time_stamp + ` และได้มีการเปลี่ยนชื่อไฟล์เป็น ' ${file_name} '`
                    }
                    timeStamp(
                        credential_admin_fullname,
                        'update',
                        'file',
                        msg_time_stamp
                    )
                    res.status(200).json({
                        status:true,
                        status_code: 200 ,
                        msg:'บันทึกข้อมูลเรียบร้อย',
                        new_file_name : file_name_upload
                    })
                })
            }catch{
                console.log('ERR TRY CATCH BLOCK 2,CANNOT UPDATE FILE');
                console.log('ERR : ',err);
                res.status(200).json({
                    status_code: 500,
                    status:false ,
                    msg:'เกิดข้อผิดพลาดในระบบ ไม่สามารถบันทึกไฟล์ลงในระบบได้',
                    err:err
                })
            }
        })

    }catch(err){
        console.log('ERR TRY CATCH BLOCK ,CANNOT UPDATE FILE ');
        console.log('ERR : ',err);
        res.status(200).json({
            status_code: 500,
            status:false ,
            msg:'เกิดข้อผิดพลาดในระบบ ไม่สามารถบันทึกไฟล์ลงในระบบได้',
            err:err
        })
    }

}

// search file 
module.exports.searchFile = async(req,res) =>{
    const search_keyword = req.body.search_keyword
    const selected_category = req.body.selected_category
    const limit = req.body.limit
    const start_item = req.body.start_item

    let query_select = `SELECT * FROM file WHERE file_name LIKE ?` 
    let query_and_condition = ` AND file_category_id = ${selected_category}`
    let query_limit = ` LIMIT ${limit} OFFSET ${start_item}`

    if(selected_category === 0) {
        query_select = query_select + query_limit
    }else{
        query_select = query_select + query_and_condition + query_limit
    }

    try{
        db.query(query_select, ['%'+search_keyword+'%'], async (err,result)=>{
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
            
            if(result.length != 0){
                for(let i=0 ; i<result.length ;i++){
                    if(result[i].file_pin == 0) result[i].file_pin = false
                    else result[i].file_pin = true
                    
                    await date_convert(result[i].file_date).then((date_converted)=>{
                        result[i].file_date = date_converted
                    }) 
                }
            }
            let search_file_data = result 
            
            try {
                if(selected_category === 0) {
                    query_select = `SELECT * FROM file WHERE file_name LIKE ?` 
                }else{
                    query_select = `SELECT * FROM file WHERE file_name LIKE ?` + query_and_condition 
                }
                db.query(query_select ,['%'+search_keyword+'%'], async (err ,result)=>{
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
                        search_data:search_file_data ,
                        data_length: result.length 
                    })
                })

            } catch (err) {
                console.log('ERR TRY CATCH BLOCK 2 , CANT SEARCH FILES');
                console.log('ERR :',err);
                res.status(200).json({
                    status:false,
                    statusCode:500,
                    msg:'เกิดข้อผิดพลาดในระบบ ไม่สามารถค้นหาข้อมูลได้',
                    err:err
                })
            }
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