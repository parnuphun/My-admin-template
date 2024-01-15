const db = require('../config/database');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
require('dotenv').config();

// get anno list length 
module.exports.getAnnoListLength = async(req,res) => {
    try{
        db.query(`SELECT COUNT(*) AS length FROM announment `, async (err,result)=>{
            if(err)return return_err(res,'QUERY BLOCK','GET ANNO LENGTH ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            res.status(200).json({
                status_code:200,
                status:true,
                anno_length:result[0].length
            })
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET ANNO LENGTH ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

// get anno list 
module.exports.getAnnoList = async(req,res) => {
    const limit = req.body.limit
    const start_item = req.body.start_item
    try{
        db.query(`SELECT * FROM announment ORDER BY anno_date DESC `, async (err,result)=>{
            if(err)return return_err(res,'QUERY BLOCK','GET ANNO LIST ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            if(result.length > 0){
                for (let i = 0; i < result.length; i++) {
                    result[i].anno_date = await date_convert(result[i].anno_date)
                    if(result[i].anno_pin === 0){
                        result[i].anno_pin = false
                    }else{
                        result[i].anno_pin = true
                    }
                }
            }
            res.status(200).json({
                status_code:200,
                status:true,
                anno_data:result,
                default_path:process.env.ANNO_IMAGE
            })
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET ANNO LIST ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

// get example anno list 
module.exports.getExampleAnnoList = async(req,res) => {
    const limit = req.body.limit
    try{
        db.query(`SELECT anno_image FROM announment WHERE anno_pin = 1 ORDER BY anno_date DESC LIMIT ?`,[limit], async (err,result)=>{
            if(err)return return_err(res,'QUERY BLOCK','GET ANNO LIST ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            res.status(200).json({
                status_code:200,
                status:true,
                example_anno_data:result,
                default_path:process.env.ANNO_IMAGE
            })
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET ANNO LIST ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

// update limit 
module.exports.updateAnnoLimit = async(req,res) =>{
    const limit = req.body.limit
    const credential_admin_fullname = req.body.credential_admin_fullname
    try {
        db.query(`SELECT COUNT(*) AS length FROM school_setting`,(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','UPDATE ANNO LIMIT ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            if(result[0].length === 0) {
                return res.status(200).json({
                    status_code : 404 ,
                    status:false,
                    msg:'ไม่มีข้อมูลในระบบ กรุณาแจ้งนักพัฒนาระบบ'
                })
            }else{
                try {
                   db.query(`UPDATE school_setting SET anno_limit = ? WHERE id = 1`,[limit], async(err,result)=>{
                        if(err)  return return_err(res,'QUERY BLOCK 2','UPDATE ANNO LIMIT ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                        timeStamp(
                            credential_admin_fullname,
                            'update',
                            'annocement' ,
                            `${credential_admin_fullname} แก้ไขจำนวนประกาศ`
                        )
                        res.status(200).json({
                            status_code: 200,
                            status:true,
                            msg:'บันทึกข้อมูลเรียบร้อย'
                        })
                    })
                } catch (err) {
                    return return_err(res,'TRY CATCH BLOCK 2','UPDATE ANNO LIMIT ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
                }
            }
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE ANNO LIMIT ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

// add new anno 
module.exports.addNewAnno = async(req,res) => {
    const image = req.file.filename
    const name = req.body.anno_name
    const credential_admin_fullname =req.body.credential_admin_fullname
    const date = new Date()
    try {
        db.query(`
            INSERT INTO announment(anno_name,anno_image,anno_pin,anno_date,anno_author)
            VALUE(?,?,1,?,?)`,[name,image,date,credential_admin_fullname],async(err,result) => {
                if(err) return return_err(res,'QUERY BLOCK','ADD NEW ANNO  ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')

                timeStamp(
                    credential_admin_fullname,
                    'add',
                    'annocement',
                    `${credential_admin_fullname} เพิ่มประกาศ ' ${name} '`
                )

                res.status(200).json({
                    status_code:200,
                    status:true,
                    msg:'เพิ่มประกาศสำเร็จ'
                })


            })
        
    } catch (error) {
        return return_err(res,'TRY CATCH BLOCK','ADD NEW ANNO  ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')

    }
}

// delete
module.exports.deleteAnno = async(req,res) => {
    const id = req.body.anno_id
    const image = req.body.anno_image
    const name = req.body.anno_name
    const credential_admin_fullname =req.body.credential_admin_fullname
    try {
        db.query(`DELETE FROM announment WHERE anno_id = ?` ,[id] , async(err,result)=> {
            if(err) return return_err(res,'TRY QUERY','DELETE ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
            await delete_image(image,'anno_image')
            timeStamp(
                credential_admin_fullname,
                'delete',
                'annocement',
                `${credential_admin_fullname} ได้ลบประกาศ ' ${name} '`
            )

            res.status(200).json({
                status_code:200,
                status:true,
                msg:'ลบประกาศสำเร็็จ'
            })
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','DELETE ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}

// switch pin
module.exports.switchAnnoPin = async(req,res) => {
    const id = req.body.anno_id
    const name = req.body.anno_name
    const pin_status = req.body.pin_status
    const credential_admin_fullname =req.body.credential_admin_fullname
    try {
       db.query(`UPDATE announment SET anno_pin = ? WHERE anno_id = ? `,[pin_status,id],async(err,result) => {
        if(err) return return_err(res,'QUERY BLOCK','SWITCH ANNO PIN ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
        timeStamp(
            credential_admin_fullname,
            'update',
            'annocement',
            `${credential_admin_fullname} ปรับการมองเห็นประกาศ ' ${name} '`
        )
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เปลี่ยนการมองเห็นแล้ว'
        })
       })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','SWITCH ANNO PIN ',err,500,'เกิดความผิดพลาด ไม่สามารถดำเนินการได้')
    }
}
