const db = require('../config/database');
const delete_image = require('../services/delete_file')
const timeStamp = require('../services/timeStamp');
const date_convert = require('../services/date_convert');
const return_err =require('../services/return_err');
const {dbQuery} = require('../services/query');
require('dotenv').config();

// seach 
module.exports.searchAnno = async(req,res) => {
    try{
        const limit = req.body.limit
        const start_item = req.body.start_item
        const search_keyword = req.body.search_keyword
    
        let qr_length = `SELECT COUNT(*) AS length FROM announment WHERE anno_name LIKE ?`
        let qr_search_data = `SELECT * FROM announment WHERE anno_name LIKE ? 
                            ORDER BY anno_date DESC LIMIT ? OFFSET ? `
    
        const lengthResult = await dbQuery(qr_length , ['%'+search_keyword+'%'])
        const anno_length = lengthResult[0].length
        const dataResult = await dbQuery(qr_search_data , ['%'+search_keyword+'%' , limit , start_item])

        for (let i = 0; i < dataResult.length; i++) {
            dataResult[i].anno_date  = await date_convert(dataResult[i].anno_date)
            if(dataResult[i].anno_pin === 0) dataResult[i].anno_pin = false
            else dataResult[i].anno_pin = true
        }
    
        res.status(200).json({
            status_code:200,
            status:true,
            anno_length:anno_length,
            anno_data:dataResult,
            default_path:process.env.ANNO_IMAGE
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','SEARCH ANNO ',err,500)
    }

}

// get anno list length 
module.exports.getAnnoListLength = async(req,res) => {
    try{
        const qr_length = `SELECT COUNT(*) AS length FROM announment`
        const lengthResult = await dbQuery(qr_length)
        const length = lengthResult[0].length
        
        res.status(200).json({
            status_code:200,
            status:true,
            anno_length:length
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET ANNO LENGTH ',err,500)
    }

}

// get anno list 
module.exports.getAnnoList = async(req,res) => {
    try{
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_result = `SELECT * FROM announment ORDER BY anno_date DESC LIMIT ? OFFSET ?`
        const result = await dbQuery(qr_result,[limit,start_item])
 
        for (let i = 0; i < result.length; i++) {
            result[i].anno_date  = await date_convert(result[i].anno_date)
            if(result[i].anno_pin === 0) result[i].anno_pin = false
            else result[i].anno_pin = true
        }

        res.status(200).json({
            status_code:200,
            status:true,
            anno_data:result,
            default_path:process.env.ANNO_IMAGE
        })
       
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET ANNO LIST ',err,500)
    }

}

// get example anno list 
module.exports.getExampleAnnoList = async(req,res) => {

    try{
        const limit = req.body.limit
        const qr_update = `SELECT anno_image FROM announment WHERE anno_pin = 1 ORDER BY anno_date DESC LIMIT ?`
        const result = await dbQuery(qr_update,[limit])
        res.status(200).json({
            status_code:200,
            status:true,
            example_anno_data:result,
            default_path:process.env.ANNO_IMAGE
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET ANNO LIST ',err,500)
    }

}

// update limit 
module.exports.updateAnnoLimit = async(req,res) =>{
    try {
        const limit = req.body.limit
        const credential_admin_fullname = req.body.credential_admin_fullname
        const qr_length =`SELECT COUNT(*) AS length FROM school_setting`
        const qr_update = `UPDATE school_setting SET anno_limit = ? WHERE id = 1`

        const result_length = await dbQuery(qr_length)
        const length = result_length[0].length
        if(length === 0) return res.status(200).json({
            status_code : 404 ,
            status:false,
            msg:'ไม่มีข้อมูลในระบบ กรุณาแจ้งนักพัฒนาระบบ'
        })

        const result_update = await dbQuery(qr_update,[limit])
        await timeStamp(
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



    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE ANNO LIMIT ',err,500)
    }

}

// add new anno 
module.exports.addNewAnno = async(req,res) => {
    try {
        const image = req.file.filename
        const name = req.body.anno_name
        const credential_admin_fullname =req.body.credential_admin_fullname
        const date = new Date()

        const qr_add = `INSERT INTO announment(
                                anno_name,
                                anno_image,
                                anno_pin,
                                anno_date,
                                anno_author)
                        VALUE(?,?,1,?,?)`
        const result = await dbQuery(qr_add , [name,image,date,credential_admin_fullname] )
        await timeStamp(
            credential_admin_fullname,
            'add',
            'annocement',
            `${credential_admin_fullname} เพิ่มประกาศ ' ${name} '`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'เพิ่มประกาศใหม่สำเร็จ'
        })
        
    } catch (error) {
        return return_err(res,'TRY CATCH BLOCK','ADD NEW ANNO  ',err,500)
    }
}

// update
module.exports.updateAnno = async(req,res) => {
    try {
    let image = (req.body.anno_image === 'no_image_upload') ? req.body.anno_old_image : req.file.filename 
    const id = req.body.anno_id
    const old_image = req.body.anno_old_image
    const name = req.body.anno_name
    const old_name = req.body.anno_old_name
    const credential_admin_fullname = req.body.credential_admin_fullname
    
    const qr_update = `UPDATE announment SET anno_name = ? , anno_image = ? WHERE anno_id = ? `
    await dbQuery(qr_update,[name,image,id])
    
    if(image !== old_image) await delete_image(old_image,'anno_image')
    
    let timeStamp_msg = `${credential_admin_fullname} แก้ไขประกาศ ' ${name} '`
    if(name !== old_name) timeStamp_msg += ` และได้เปลี่ยนชื่อ '${ old_name }' เป็น ' ${name} '` 
    
    await timeStamp(
        credential_admin_fullname,
        'update',
        'annocement',
        timeStamp_msg
    )

    res.status(200).json({
        status_code:200,
        status:true,
        msg:'บันทึกข้อมูลเสร็จสิ้น'
    })
        
    } catch (error) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE ANNO  ',err,500)
    }


}

// delete
module.exports.deleteAnno = async(req,res) => {
    try {
        const id = req.body.anno_id
        const image = req.body.anno_image
        const name = req.body.anno_name
        const credential_admin_fullname =req.body.credential_admin_fullname

        const qr_delete = `DELETE FROM announment WHERE anno_id = ?`
        await dbQuery(qr_delete,[id])
        await delete_image(image,'anno_image')
        await timeStamp(
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

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','DELETE ',err,500)
    }
}

// switch pin
module.exports.switchAnnoPin = async(req,res) => {
    try {
        const id = req.body.anno_id
        const name = req.body.anno_name
        const pin_status = req.body.pin_status
        const credential_admin_fullname =req.body.credential_admin_fullname

        const qr_switch = `UPDATE announment SET anno_pin = ? WHERE anno_id = ?`
        await dbQuery(qr_switch,[pin_status,id])
        await timeStamp(
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
       
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','SWITCH ANNO PIN ',err,500)
    }
}
