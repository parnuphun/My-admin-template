const db = require('../config/database');
const upload_person_directory = require('../services/upload_person_directory')
const delete_file = require('../services/delete_file')
const date_convert = require('../services/date_convert');
const rename_file = require('../services/rename_file')
const timeStamp = require('../services/timeStamp')
const return_err =require('../services/return_err');
const bytes = require('bytes');
const fs = require('fs') 
const path = require('path');
const { dbQuery } = require('../services/query');
require('dotenv').config();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// file category
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add file category (not use on cllient now)
module.exports.addFileCategory = async (req,res) =>{

    try {
        const file_category_name = req.body.file_category_name
        const qr_check_username = `SELECT * FROM file_category WHERE file_category_name = ?`
        const qr_add = `INSERT INTO file_category(file_category_name) VALUES(?)`

        const result_check_username = await dbQuery(qr_check_username,[qr_check_username])
        if(result_check_username.length >= 1) return res.json({
            status_code: 200 ,
            status:false,
            msg:`มีชื่อ '${file_category_name}' อยู่ในระบบแล้ว`
        })

        await dbQuery(qr_add,[file_category_name])
        res.status(200).json({
            status_code: 200,
            status:true ,
            msg:`เพิ่ม${file_category_name}สำเร็จ`
        })
        
    } catch (err) {
        return return_err(res,'TRY CATCH','ADD CATEGORY FILE',err,500)
    }
}

// rename file category (not use on cllient now)
module.exports.renameFileCategory = async (req,res) =>{
    try {
        const file_category_name = req.body.file_category_name
        const file_category_id = req.body.file_category_id

        const qr_check_username = `SELECT * FROM file_category WHERE file_category_name = ?`
        const qr_rename = `UPDATE file_category
        SET file_category_name = ? 
        WHERE file_category_id = ?`

        const result_check_username = await dbQuery(qr_check_username , [file_category_name])
        if(result_check_username.length >= 1) return res.status(200).json({
            status_code: 200 ,
            status: false,
            msg:`มีชื่อ '${file_category_name}' อยู่ในระบบแล้ว`
        })

        await dbQuery(qr_rename,[file_category_name,file_category_id])
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เปลี่ยนชื่อสำเร็จ'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH','RENAME FILE',err,500)
    }
}

// delete file catefgory (not use on cllient now)
module.exports.deleteFileCategory = async (req,res) =>{

    try {
        const file_category_id = req.body.file_category_id
        const qr_delete = `DELETE FROM file_category WHERE file_category_id = ? `

        await dbQuery(qr_delete,[qr_delete])
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ลบหมวดหมู่ไฟล์สำเร็จ'
          })  

    } catch (err) {
        return return_err(res,'TRY CATCH','GET CATEGORY FILE',err,500)
    }
}

// get all file category
module.exports.getAllCategoryFile = async (req,res)=> {
    try{
        const result = await dbQuery(`SELECT * FROM file_category`)
        res.status(200).json({
            status_code: 200 ,
            status:true ,
            file_catefory_data:result
        })
       
    }catch(err){
        return return_err(res,'TRY CATCH','GET CATEGORY FILE',err,500)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// file
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get all file length
module.exports.getFileLength = async (req,res) =>{
    try {
        const selected_category = req.body.selected_category
        let qr_length = 'SELECT COUNT(*) AS length FROM file'
        if(selected_category !== 0) qr_length += ` WHERE file_category_id = ${selected_category}`

        const result_length = await dbQuery(qr_length)
        const length = result_length[0].length

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ดึงข้อมูลสำเร็จ',
            file_length: length
        })

    } catch (err) {
        return return_err(res,'TRY CATCH','GET FILE LENGTH',err,500)
    }
}

// get all file 
module.exports.getAllFiles = async (req,res) => {
    try {
        const selected_category = req.body.selected_category
        const limit = req.body.limit
        const start_item = req.body.start_item
        let query_select = `SELECT * FROM file`
        let query_where = ` WHERE file_category_id = ${selected_category}`
        let query_limit = ` ORDER BY file_id DESC LIMIT ${limit} OFFSET ${start_item}`
        
        if(selected_category !== 0 )query_select += query_where + query_limit
        else query_select += query_limit
        
        const result_data = await dbQuery(query_select)

        // format data
        if(result_data.length != 0){
            for(let i=0 ; i<result_data.length ;i++){
                if(result_data[i].file_pin == 0) result_data[i].file_pin = false
                else result_data[i].file_pin = true
                
                await date_convert(result_data[i].file_date).then((date_converted)=>{
                    result_data[i].file_date = date_converted
                }) 
            }
        }

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ดึงข้อมูลสำเร็จ',
            files_data:result_data
        })

    } catch (err) {
        return return_err(res,'TRY CATCH','GET FILE ',err,500)
    }
}

// add new file 
module.exports.addNewFile = async (req,res)=> {
    try {
        const file_name = req.body.file_name
        const file_category_id = req.body.file_category_id
        const file_type = req.body.file_type
        const file_date = new Date() 
        const file_name_upload = `${file_name}_${Date.now()}.${file_type}`
        const file_size = bytes(req.file.size)
        const credential_admin_fullname = req.body.credential_admin_fullname

        await rename_file(path.join(__dirname, `../public/file/${file_name_upload}`),req.file.path)

        const qr_add = `
            INSERT INTO file (
                file_name,
                file_name_upload,
                file_date,
                file_pin,
                file_type,
                file_size,
                file_category_id)
            VALUES (?,?,?,1,?,?,?)`
        const qr_add_params = [
            file_name,
            file_name_upload,
            file_date,
            file_type,
            file_size,
            file_category_id]

        await dbQuery(qr_add,qr_add_params)
        await timeStamp(
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

    } catch (err) {
        return return_err(res,'TRY CATCH','ADD FILE ',err,500)
    }
}

// delete file 
module.exports.deleteFile = async (req,res) => {
    try {
        const file_id = req.body.file_id
        const file_name_upload = req.body.file_name_upload
        const credential_admin_fullname = req.body.credential_admin_fullname
        const file_name = req.body.file_name

        const qr_delete = `DELETE FROM file WHERE file_id = ?`
        await dbQuery(qr_delete,[file_id])
        await delete_file(file_name_upload,'file')
        await timeStamp(
            credential_admin_fullname,
            'delete',
            'file',
            `${credential_admin_fullname} ลบไฟล์เอกสาร ' ${file_name} '`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ลบไฟล์สำเร็จแล้ว'
        })


    } catch (error) {
        return_err(res,'TRY CATCH','DELETE FILE ',err,500)
    }
 
}

// file switch pin
module.exports.fileSwitchPin = async (req,res) => {
    try {
        const file_id = req.body.file_id
        const credential_admin_fullname = req.body.credential_admin_fullname
        const file_name = req.body.file_name
        
        let status = (req.body.file_pin_status === false)? 1 : 0

        const qr_update = `UPDATE file SET file_pin = ? WHERE file_id = ?`
        await dbQuery(qr_update,[status,file_id])
        await timeStamp(
            credential_admin_fullname,
            'update',
            'file',
            `${credential_admin_fullname} เปลี่ยนการมองเห็นไฟล์เอกสาร ' ${file_name} '`
        )

        res.status(200).json({
            status:true,
            statusCode:200,
            msg: 'ปักหมุดเรียบร้อย'
        })

    } catch (err) {
        return_err(res,'TRY CATCH','SWITCH FILE PIN ',err,500)
    }
}

// file download 
module.exports.downloadFile = async(req,res) =>{
    try {
        const file_name_upload = req.body.file_name_upload
        const filePath = path.join(__dirname, `../public/file/${file_name_upload}`)

        res.download(filePath ,(err)=>{
            if (err) return_err(res,'TRY CATCH','DOWNLOAD FILE ',err,500)
        })
    } catch (err) {
        return_err(res,'TRY CATCH','DOWNLOAD FILE ',err,500)
    }
}

// preview file 
module.exports.previewFile = async(req,res) => {
    try {        
        const file_name_upload = req.body.file_name_upload
        const filePath = path.join(__dirname, `../public/file/${file_name_upload}`)
        // console.log('file existsSync => ',fs.existsSync(filePath));
        if(fs.existsSync(filePath)){
            res.json({
                status: true,
                status_code: 200 ,
                file_url:process.env.FILE_PATH+file_name_upload
            })
        }else{
            res.send({
                status: false,
                status_code: 200 ,
                msg:'ไม่มีไฟล์นี้ในระบบ'
            })
        }
    } catch (err) {
        return_err(res,'TRY CATCH','PREVIEW FILE ',err,500)
    }
}

// update file 
module.exports.editFile = async(req,res) => {
    try {
        const file_id = req.body.file_id
        const file_name = req.body.file_name 
        const file_old_name = req.body.file_old_name // old file name case not upload 
        const file_type = req.body.file_type
        const file_category_id = req.body.file_category_id
        const credential_admin_fullname = req.body.credential_admin_fullname

        let file_name_upload = (req.body.file_upload === 'no_file_upload') ? req.body.file_name_upload : `${file_name}_${Date.now()}.${file_type}`;
        if (req.body.file_upload !== 'no_file_upload') await rename_file(path.join(__dirname, `../public/file/${file_name_upload}`), req.file.path);


        const qr_old_filename = `SELECT * FROM file WHERE file_id = ?`
        const qr_update = `UPDATE file 
            SET file_name = ? ,
            file_name_upload = ?,
            file_type = ? ,
            file_category_id = ? 
            WHERE file_id = ?`
        const qr_update_params = [file_name,file_name_upload,file_type,file_category_id,file_id]

        const result_old_file_name = await dbQuery(qr_old_filename,[file_id])
        const old_file_name = result_old_file_name[0].file_name_upload // old file name 
        await dbQuery(qr_update,qr_update_params)

        // check file before delete
        if(req.body.file_upload !== 'no_file_upload') await delete_file(old_file_name,'file') // after update remove old file

        let msg_time_stamp = `${credential_admin_fullname} แก้ไขไฟล์ ' ${file_old_name} '`
        if(file_name !== file_old_name) msg_time_stamp += ` และได้มีการเปลี่ยนชื่อไฟล์เป็น ' ${file_name} '`
        
        
        await timeStamp(
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

    } catch (err) {
        return_err(res,'TRY CATCH','UPDATE FILE ',err,500)
    }

}

// search file 
module.exports.searchFile = async(req,res) =>{

    try {
        const search_keyword = req.body.search_keyword
        const selected_category = req.body.selected_category
        const limit = req.body.limit
        const start_item = req.body.start_item
    
        // search query with category id
        let query_select = `SELECT * FROM file WHERE file_name LIKE ?` 
        let query_and_condition = ` AND file_category_id = ${selected_category}`
        let query_limit = ` LIMIT ${limit} OFFSET ${start_item}`

        let query_length = `SELECT COUNT(*) AS length FROM file WHERE file_name LIKE ?`

        // query data
        if(selected_category === 0) query_select += query_limit // search all without category id 
        else query_select += query_and_condition + query_limit // search all with category id

        // query length
        if(selected_category !== 0) query_length += query_and_condition 

        const result_search = await dbQuery(query_select , ['%'+search_keyword+'%'])
        const result_length = await dbQuery(query_length , ['%'+search_keyword+'%'])
        const length = result_length[0].length

        // format pin and date 
        if(result_search.length != 0){
            for(let i=0 ; i<result_search.length ;i++){
                if(result_search[i].file_pin == 0) result_search[i].file_pin = false
                else result_search[i].file_pin = true

                await date_convert(result_search[i].file_date).then((date_converted)=>{
                    result_search[i].file_date = date_converted
                }) 
            }
        }

        res.status(200).json({
            statusCode: 200,
            status: true,
            search_data: result_search ,
            data_length: length 
        })


    } catch (err) {
        return_err(res,'TRY CATCH','SEARCH FILE ',err,500)
    }
}