const db = require('../config/database');
const upload_person_directory = require('../services/upload_person_directory')
const delete_image = require('../services/delete_file')
require('dotenv').config();
const return_err =require('../services/return_err');
const timeStamp = require('../services/timeStamp');
const {dbQuery} = require('../services/query')
// get all category 
module.exports.getAllPersonCategoryList = async (req,res) =>{
    try {
        const result = await dbQuery(`SELECT * FROM person_directory_category`)
        res.json({
            status:true,
            status_code:200,
            position_category:result
        })
    } catch (err) {
        return_err(res,'TRY CATCH BLOCK','GET PERSON CATEGORY',err,500)
    }
}

// get all position 
module.exports.getAllPersonPositionList = async (req,res)=> {
    try {
        const category_id = req.body.category_id
        const qr_get_data = `SELECT * FROM person_directory_position WHERE pd_category_id = ?`

        const result_data = await dbQuery(qr_get_data,[category_id])
        res.status(200).json({
            status:true,
            status_code:200,
            person_position:result_data
        })
    } catch (err) {
        return_err(res,'TRY CATCH BLOCK','GET PERSON POSITION',err,500)

    }
}

// add new position 
module.exports.addPosition = async (req,res) => {
    try {
        const position_name = req.body.position_name
        const position_category_id = req.body.position_category_id
        const position_category_name = req.body.position_category_name
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_check_position_name =`SELECT * FROM person_directory_position WHERE pd_position_name = ? AND pd_category_id = ?`
        const qr_add_position =`
        INSERT INTO person_directory_position(
            pd_position_name,
            pd_category_id 
        )VALUES(?,?)`
 
        const result_check_name = await dbQuery(qr_check_position_name,[position_name,position_category_id])
        if (result_check_name.length>=1) return res.status(200).json({
            status_code:409,
            status: false ,
            msg:'ชื่อตำแหน่งซ้ำ กรุณาป้อนใหม่' 
        })

        await dbQuery(qr_add_position,[position_name,position_category_id])
        await timeStamp(
            credential_admin_fullname,
            'add',
            'person_directory',
            `${credential_admin_fullname} เพิ่มตำแหน่งบุคลกรชื่อ ' ${position_name} ' ในหมวดหมู่ ' ${position_category_name} ' `
        )
        
        res.status(200).json({
            status_code:200,
            status:true ,
            msg: 'เพิ่มตำแหน่งสำเร็จ'
        })
        
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','ADD NEW POSITION',err,500)
    }
}

// delete position
module.exports.deletePosition = async (req,res) =>{
    try {
        const position_name = req.body.position_name 
        const position_id = req.body.position_id
        const credential_admin_fullname = req.body.credential_admin_fullname
        const position_category_name = req.body.position_category_name

        const qr_delete = `DELETE FROM person_directory_position WHERE pd_position_id = ?`
        await dbQuery(qr_delete,[position_id])
        await timeStamp(
            credential_admin_fullname ,
            'delete',
            'person_directory',
            `${credential_admin_fullname} ลบตำแหน่ง ' ${position_name} ' ในหมวดหมู่ ' ${position_category_name} ' `
            )
        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ลบตำแหน่งเรียบร้อย'
        })
    } catch (err) {
        if(err.code === 'ER_ROW_IS_REFERENCED_2'){
            return res.status(200).json({
                status_code:500,
                status:true,
                msg:'ไม่สามารถลบตำแหน่งนี้ได้ เนื่องจากมีบุคลากรอยู่ในตำแหน่งอยู่ในตอนนี้'
            })
        }else {
            return return_err(res,'TRY CATCH BLOCK','DELETE NEWS CATEGORY ',err,500)
        }
    }
     
        //         // arrange new order 
        //         const qry = `CREATE TEMPORARY TABLE temp_order AS
        //         SELECT pd_position_id, ROW_NUMBER() OVER (ORDER BY pd_position_id) AS temp_order_value
        //         FROM person_directory_position;
                
        //         UPDATE person_directory_position pdp
        //         JOIN temp_order tmp ON pdp.pd_position_id = tmp.pd_position_id
        //         SET pdp.pd_position_order = tmp.temp_order_value;
                
        //         DROP TEMPORARY TABLE IF EXISTS temp_order`
        //         db.query(qry, async (err,result)=>{
        //             if(err) return 'db err'
        //             res.json({
        //                 status:true,
        //                 status_code:200,
        //                 msg:`ลบตำแหน่งสำเร็จ!`
        //             })
        //         })

        //     }catch(err){
        //         console.error('something err');
        //         res.json({
        //             status:false,
        //             msg:'err'
        //         })
        //     }
        // })
}

// rename position 
module.exports.renamePosition = async (req,res) => {
    try {
        const position_name = req.body.position_name 
        const position_id = req.body.position_id
        const position_old_name = req.body.position_old_name
        const credential_admin_fullname = req.body.credential_admin_fullname
        const position_category_id = req.body.position_category_id

        const qr_check_name = `SELECT * FROM person_directory_position WHERE pd_position_name = ? AND pd_category_id = ?`
        const qr_rename = `UPDATE person_directory_position SET pd_position_name = ? WHERE pd_position_id = ?`

        const result_check_name = await dbQuery(qr_check_name,[position_name,position_category_id])
        if(result_check_name.length >= 1)return res.status(200).json({
            status_code:409,
            status: false ,
            msg:'ชื่อตำแหน่งซ้ำ กรุณาป้อนใหม่' 
        })

        await dbQuery(qr_rename,[position_name , position_id])
        await timeStamp(
            credential_admin_fullname,
            'update',
            'person_directory',
            `${credential_admin_fullname} เปลี่ยนชื่อตำแหน่ง ' ${position_old_name} ' เป็น ' ${position_name} ' `
        )
        res.status(200).json({
            status_code:200,
            status: true ,
            msg:'บันทึกข้อมูลเสร็จสิ้น' 
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE POSITION',err,500)
    }
}

// add new person 
module.exports.addPerson = async (req,res)=>{
    try {
        let person_image = (req.body.person_image === 'no_image_upload')? req.body.person_image : await upload_person_directory(req)
        const person_name = req.body.person_name
        const person_phone = (req.body.person_phone === undefined || req.body.person_phone === 'undefined')? '':req.body.person_phone
        const person_email = (req.body.person_email === undefined || req.body.person_email === 'undefined')? '':req.body.person_email
        const person_desc = (req.body.person_desc === undefined || req.body.person_desc === 'undefined')? '':req.body.person_desc
        const credential_admin_fullname = req.body.credential_admin_fullname
        const person_position_id = req.body.person_position_id
        const person_position_name = req.body.person_position_name
        const person_category_id = req.body.person_category_id
        const person_category_name = req.body.person_category_name
        
        const qr_add = `INSERT INTO person_directory_persons(
            pd_person_image,
            pd_person_name,
            pd_person_phone,
            pd_person_email,
            pd_person_descript,
            pd_position_id,
            pd_category_id ) VALUES(?,?,?,?,?,?,?)`

        const qr_add_params = [person_image,
            person_name,
            person_phone,
            person_email,
            person_desc,
            person_position_id,
            person_category_id]

        await dbQuery(qr_add,qr_add_params)
        await timeStamp(
            credential_admin_fullname ,
            'add',
            'person_directory',
            `${credential_admin_fullname} เพิ่มบุคลากร ${person_name} คนใหม่ในตำแหน่ง ${person_position_name} `
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:`เพิ่ม ${person_name} สำเร็จ`
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','ADD PERSON',err,500)
    }
}

// delete person
module.exports.deletePerson = async (req,res) =>{
    try {
        const person_id = req.body.person_id
        const person_image = req.body.person_image
        const person_name = req.body.person_name
        const credential_admin_fullname = req.body.credential_admin_fullname

        const qr_delete = `DELETE FROM person_directory_persons WHERE pd_person_id = ?`
        await dbQuery(qr_delete,[person_id])
        await delete_image(person_image,'persons_image')
        await timeStamp(
            credential_admin_fullname ,
            'delete',
            'person_directory',
            `${credential_admin_fullname} ลบบุคลากรชื่อ ' ${person_name} ' `
        )
        res.status(200).json({
            status_code:200,
            status:true,
            msg: 'ลบสำเร็จ'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','DELETE PERSON',err,500)
    }
 
}

//get all person length 
module.exports.getAllpersonListLength = async(req,res)=> {
    try {
        const person_category_id =  req.body.person_category_id
        const qr_persons_length = `SELECT COUNT(*) AS length FROM person_directory_persons WHERE pd_category_id = ?`

        const result_length = await dbQuery(qr_persons_length,[person_category_id])
        const length = result_length[0].length
        res.status(200).json({
            status_code:200,
            status:true,
            data_length:length
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET LENGTH',err,500)
    }
}

// get all person list by category 
module.exports.getAllpersonList = async(req,res) =>{
    try {
        const start_item = req.body.start_item
        const limit = req.body.limit
        const person_category_id =  req.body.person_category_id

        const qr_get_person = `SELECT * FROM person_directory_persons WHERE pd_category_id  = ? ORDER BY pd_person_id DESC LIMIT ? OFFSET ?`

        const result_data = await dbQuery(qr_get_person,[person_category_id,limit,start_item])
        res.status(200).json({
            status_code:200,
            status:true,
            person_data:result_data,
            img_url: process.env.PERSONS_DIARECTORY_IMAGE
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET PERSON ',err,500)
    }
     
}

// get person table tree preview
module.exports.getPersonDirectoryTableTree = async (req ,res) => {
    try {
        let position_detail  
        let data = []
        let dataTable = []

        const category_id = req.body.category_id
        const qr_position_list = `SELECT * FROM person_directory_position WHERE pd_category_id = ?`
        const qr_persons = `SELECT * FROM person_directory_persons WHERE pd_position_id = ? `
        
        const result_position = await dbQuery(qr_position_list,[category_id])
        const position_length = result_position.length
        position_detail = result_position

        if(position_length === 0)return res.status(200).json({
            personsData : data,
            personsDataTable : dataTable,
            personsBaseImageURL: process.env.PERSONS_DIARECTORY_IMAGE,
            msg:'ไม่มีข้อมูล' 
        })
        // format data
        for(let i = 0 ; i < position_length ; i++){
            data[i] = {};
            data[i].position_id = position_detail[i].pd_position_id
            data[i].position_name = position_detail[i].pd_position_name

            // const result = await getPersons(position_detail[i].pd_position_id);
            const result = await dbQuery(qr_persons,[position_detail[i].pd_position_id])

            // add persons to prosition 
            data[i].persons = result;
            for (let j = 0; j < result.length; j++) {
                dataTable.push(result[j]);
            };

            if(i >= (position_length-1)){
                res.status(200).json({
                    status_code : 200,
                    status : true ,
                    person_data : data,
                    person_data_table : dataTable,
                    image_base_url: process.env.PERSONS_DIARECTORY_IMAGE
                })
            }
            
        }
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET PERSON TABLE TREE ',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
    }
}

// edit person
module.exports.updatePerson = async (req,res) => {
    try {
        const person_image_old = req.body.person_image_old // ภาพเก่า
        const person_id = req.body.person_id // สำหรับระบุ
        const person_image = (req.body.person_image === 'no_image_upload') ? person_image_old : await upload_person_directory(req) //ถ้าอัพภาพมาให้ใช้อันใหม่

        const person_name = req.body.person_name
        const person_name_old = req.body.person_name_old
        const person_phone = (req.body.person_phone === undefined || req.body.person_phone === 'undefined')? '' : req.body.person_phone
        const person_email = (req.body.person_email === undefined || req.body.person_email === 'undefined')? '' : req.body.person_email
        const person_desc = (req.body.person_desc === undefined || req.body.person_desc === 'undefined')? '' : req.body.person_desc
        const credential_admin_fullname = req.body.credential_admin_fullname
        const person_position_id = req.body.person_position_id
        const person_position_name = req.body.person_position_name
        const person_category_id = req.body.person_category_id
        const person_category_name = req.body.person_category_name

        const qr_update = `
            UPDATE person_directory_persons 
            SET pd_person_image = ? ,
                pd_person_name = ? ,
                pd_person_phone = ? ,
                pd_person_email = ? ,
                pd_person_descript = ? ,
                pd_position_id  = ? ,
                pd_category_id = ? 
            WHERE pd_person_id  = ? `
        
        const qr_update_params = [
            person_image,
            person_name,
            person_phone,
            person_email,
            person_desc,
            person_position_id,
            person_category_id,
            person_id
        ]

        await dbQuery(qr_update,qr_update_params)

        if(req.body.person_image !== 'no_image_upload')await delete_image(person_image_old , 'persons_image') // ลบภาพเก่า
        
        let msg_time_stamp = `${credential_admin_fullname} ได้แก้ไขข้อมูลบุคลากรชื่อ ' ${person_name_old} '`
        if(person_name !== person_name_old) msg_time_stamp = msg_time_stamp + ` และได้มีการเปลี่ยนชื่อบุคลากรจาก ' ${person_name_old} '  เป็น ' ${person_name} ' `
        
        await timeStamp(
            credential_admin_fullname,
            'update',
            'person_directory',
            msg_time_stamp
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'บันทึกข้อมูลสำเร็จ'
        })
        
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','UPDATE PERSON',err,500)
    }
 
}

// search persons by category 
module.exports.searchPersons = async (req,res) => {
    try {
        const search_keyword = req.body.search_keyword
        const start_item = req.body.start_item
        const limit = req.body.limit
        const person_category_id =  req.body.person_category_id

        let search_query = `SELECT * FROM person_directory_persons WHERE pd_person_name LIKE ? AND 
        pd_category_id = ${person_category_id} ORDER BY pd_person_id DESC LIMIT ${limit} OFFSET ${start_item}`

        let search_query_length = `SELECT COUNT(*) AS length FROM person_directory_persons WHERE pd_person_name LIKE ? AND 
        pd_category_id = ${person_category_id} ORDER BY pd_person_id DESC `

        const search_length = await dbQuery(search_query_length,['%'+search_keyword+'%'])
        const result_search = await dbQuery(search_query,['%'+search_keyword+'%'])

        const length = search_length[0].length

        res.status(200).json({
            status_code:200,
            status:true,
            person_data:result_search,
            person_data_length:length,
            img_url: process.env.PERSONS_DIARECTORY_IMAGE
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','SEARCH PERSON',err,500)
    }


     
}