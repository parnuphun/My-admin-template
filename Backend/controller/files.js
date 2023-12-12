const db = require('../config/database');
const upload_person_directory = require('../services/upload_person_directory')
const delete_image = require('../services/delete_image')
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// file
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add new file 