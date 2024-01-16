const db = require('../config/database');
const upload_person_directory = require('../services/upload_person_directory')
const delete_image = require('../services/delete_file')
require('dotenv').config();
const return_err =require('../services/return_err');
const timeStamp = require('../services/timeStamp');
 
// get all category 
module.exports.getAllPersonCategoryList = async (req,res) =>{
    try{
        db.query("SELECT * FROM person_directory_category", async (err,result) =>{
            if(err){
                return return_err(res,'QUERY BLOCK','GET PERSON CATEGORY',err,500,'ไม่สามารถดึงข้อมูลได้')
            }
            res.json({
                status:true,
                status_code:200,
                position_category:result
            })
        })

    }catch(err){
        return_err(res,'TRY CATCH BLOCK','GET PERSON CATEGORY',err,500,'ไม่สามารถดึงข้อมูลได้')
    }
}

// get all position 
module.exports.getAllPersonPositionList = async (req,res)=> {
    const category_id = req.body.category_id
    try{
        db.query("SELECT * FROM person_directory_position WHERE pd_category_id = ?",[category_id],(err,result)=>{
            if(err){
                return return_err(res,'QUERY BLOCK','GET PERSON POSITION',err,500,'ไม่สามารถดึงข้อมูลได้')
            }
            res.json({
                status:true,
                status_code:200,
                person_position:result
            })
        })

    }catch(err){
        return_err(res,'TRY CATCH BLOCK','GET PERSON POSITION',err,500,'ไม่สามารถดึงข้อมูลได้')
    }
}

// add new position 
module.exports.addPosition = async (req,res) => {
    const position_name = req.body.position_name
    const position_category_id = req.body.position_category_id
    const position_category_name = req.body.position_category_name
    const credential_admin_fullname = req.body.credential_admin_fullname
 
    try{
        db.query(`SELECT * FROM person_directory_position WHERE pd_position_name = ? AND pd_category_id = ?` ,
        [position_name,position_category_id],async (err,result)=>{ 
            if(err )return return_err(res,'QEURY BLOCK','ADD NEW POSITION CHECK NAME',err,500,'')
            if(result.length >= 1){
                res.status(200).json({
                    status_code:409,
                    status: false ,
                    msg:'ชื่อตำแหน่งซ้ำ กรณาป้อนใหม่' 
                })
            }else{
                try{
                    db.query(`
                    INSERT INTO person_directory_position(
                        pd_position_name,
                        pd_category_id 
                    )VALUES(?,?)` ,[position_name,position_category_id],async (err,result)=>{ 
                        if(err )return return_err(res,'QEURY BLOCK 2 ','ADD NEW POSITION',err,500,'')
                        timeStamp(
                            credential_admin_fullname,
                            'add',
                            'person_directory',
                            `${credential_admin_fullname} เพิ่มตำแหน่งบุคลกรชื่อ ' ${position_name} ' ในหมวดหมู่ ' ${position_category_name} ' `
                        )
                        
                        res.status(200).json({
                            status_code:200,
                            status:false ,
                            msg: 'เพิ่มตำแหน่งสำเร็จ'
                        })
                    })
                }catch(err){
                    return return_err(res,'TRY CATCH BLOCK 2 ','ADD NEW POSITION',err,500,'')
                }
            }
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','ADD NEW POSITION',err,500,'')
    }

    

}

// delete position
module.exports.deletePosition = async (req,res) =>{
    const position_name = req.body.position_name 
    const position_id = req.body.position_id
    const credential_admin_fullname = req.body.credential_admin_fullname
    const position_category_name = req.body.position_category_name
    try{
        db.query(`DELETE FROM person_directory_position WHERE pd_position_id = ?`,
        [position_id], async (err, result) =>{ 
            if(err) return return_err(res,'QEURY BLOCK',' DELETE POSITION',err,500,'SERVER ERROR')
            timeStamp(
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
        })     
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK',' DELETE POSITION',err,500,'SERVER ERROR')
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
    const position_name = req.body.position_name 
    const position_id = req.body.position_id
    const position_old_name = req.body.position_old_name
    const credential_admin_fullname = req.body.credential_admin_fullname
    const position_category_id = req.body.position_category_id
    try {
        db.query(`SELECT * FROM person_directory_position WHERE pd_position_name = ? AND pd_category_id = ?` ,
        [position_name,position_category_id],async (err,result)=>{ 
            if(err )return return_err(res,'QEURY BLOCK',' CHECK NAME',err,500,'เกิดความผิดพลาดไม่สามารถแก้ไขชื่อตำแหน่งได้')
            if(result.length >= 1){
                res.status(200).json({
                    status_code:409,
                    status: false ,
                    msg:'ชื่อตำแหน่งซ้ำ กรณาป้อนใหม่' 
                })
            }else{
                try{
                    db.query(`
                        UPDATE person_directory_position
                        SET pd_position_name = ?
                        WHERE pd_position_id = ?
                    `,[position_name , position_id], async (err,result)=>{
                        if(err) return return_err(res,'QEURY BLOCK 2','RENAME POSITION',err,500,'เกิดความผิดพลาดไม่สามารถแก้ไขชื่อตำแหน่งได้')

                        timeStamp(
                            credential_admin_fullname,
                            'update',
                            'person_directory',
                            `${credential_admin_fullname} เปลี่ยนชื่อตำแหน่ง ' ${position_old_name} ' เป็น ' ${position_name} ' `
                        )
                        console.log(credential_admin_fullname);
                        res.status(200).json({
                            status_code:200,
                            status: true ,
                            msg:'เพิ่มตำแหน่งสำเร็จ' 
                        })
                    }) 
                }catch(err){
                    return return_err(res,'TRY CATCH BLOCK 2 ','UPDATE POSITION',err,500,'เกิดความผิดพลาดไม่สามารถแก้ไขชื่อตำแหน่งได้')
                }
            }
        })
    }catch{
        return return_err(res,'TRY CATCH BLOCK','UPDATE POSITION',err,500,'เกิดความผิดพลาดไม่สามารถแก้ไขชื่อตำแหน่งได้')

    }
}

// add new person 
module.exports.addPerson = async (req,res)=>{
    let person_image 
    if(req.body.person_image === 'no_image_upload'){
        person_image = req.body.person_image
    }else{
        person_image = await upload_person_directory(req)
    }
    const person_name = req.body.person_name
    let person_phone = req.body.person_phone
    let person_email = req.body.person_email
    let person_desc = req.body.person_desc
    const credential_admin_fullname = req.body.credential_admin_fullname
    const person_position_id = req.body.person_position_id
    const person_position_name = req.body.person_position_name
    const person_category_id = req.body.person_category_id
    const person_category_name = req.body.person_category_name
    if(person_desc === undefined || person_desc === 'undefined') person_desc = ''
    if(person_email === undefined || person_email === 'undefined') person_email = ''
    if(person_phone === undefined || person_phone === 'undefined') person_phone = ''
    
    try{
        db.query(`INSERT INTO person_directory_persons(
            pd_person_image,
            pd_person_name,
            pd_person_phone,
            pd_person_email,
            pd_person_descript,
            pd_position_id,
            pd_category_id ) VALUES(?,?,?,?,?,?,?)
        `,[person_image,
            person_name,
            person_phone,
            person_email,
            person_desc,
            person_position_id,
            person_category_id] ,async(err,result)=>{
            if(err) return return_err(res,'QEURY BLOCK','ADD PERSON',err,500,'ไม่สามารถเพิ่มบุคลากรได้')
            
            timeStamp(
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
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','ADD PERSON',err,500,'เกิดข้อผิดพลาด ไม่สามารถเพิ่มบุคลากรได้')
    }  
}

// delete person
module.exports.deletePerson = async (req,res) =>{
    const person_id = req.body.person_id
    const person_image = req.body.person_image
    const person_name = req.body.person_name
    const credential_admin_fullname = req.body.credential_admin_fullname

    try{
        db.query(`DELETE FROM person_directory_persons WHERE pd_person_id = ?` ,
        [person_id], async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','DELETE PERSON',err,500,'เกิดข้อผิดพลาด ไม่สามารถลบบุคลากรได้')
    
            let delete_status = await delete_image(person_image,'persons_image')
            console.log('DELETE IMAGE MESSAGE : '+ delete_status.msg);

            timeStamp(
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
    
        })
    }catch{
        return return_err(res,'TRY CATCH BLOCK','DELETE PERSON',err,500,'เกิดข้อผิดพลาด ไม่สามารถลบบุคลากรได้')
    }
}

//get all person length 
module.exports.getAllpersonListLength = async(req,res)=> {
    const person_category_id =  req.body.person_category_id
    try{
        db.query(`SELECT COUNT(*) AS length FROM person_directory_persons WHERE pd_category_id = ?`,[person_category_id] , async(err,result)=>{
            if(err) return return_err(res,'QUERY BLOCK','GET LENGTH',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
            
            let data
            if(result.length === 0 ) data = 0
            else if(result.length >= 1 ) data = result[0].length 
            res.status(200).json({
                status_code:200,
                status:true,
                data_length:data
            })
        })
    }catch{
        return return_err(res,'TRY CATCH BLOCK','GET LENGTH',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
    }
}

// get all person list by category 
module.exports.getAllpersonList = async(req,res) =>{
    const start_item = req.body.start_item
    const limit = req.body.limit
    const person_category_id =  req.body.person_category_id
    try{
        db.query(`SELECT * FROM person_directory_persons WHERE pd_category_id  = ? ORDER BY pd_person_id DESC LIMIT ? OFFSET ? `,
        [person_category_id,limit,start_item],async (err,result) => {
            if(err) return return_err(res,'TRY CATCH BLOCK','GET PERSON ',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
            res.status(200).json({
                status_code:200,
                status:true,
                person_data:result,
                img_url: process.env.PERSONS_DIARECTORY_IMAGE
            })
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','GET PERSON ',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
    }
}

// get person table tree preview
module.exports.getPersonDirectoryTableTree = async (req ,res) => {
    let position_no 
    let position_detail  
    let data = []
    let dataTable = []

    const category_id = req.body.category_id
    db.query('SELECT * FROM person_directory_position WHERE pd_category_id = ?',[category_id], async (err,result)=>{
        if(err)  return return_err(res,'QUERT BLOCK','GET PERSON TABLE TREE ',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')

        position_no = result.length
        position_detail = result
  
        if(result.length === 0){
            res.json({
                personsData : data,
                personsDataTable : dataTable,
                personsBaseImageURL: process.env.PERSONS_DIARECTORY_IMAGE,
                msg:'no data' 
            })
        }
 
        
        for(let i = 0 ; i < position_no ; i++){
            data[i] = {};
            data[i].position_id = position_detail[i].pd_position_id
            data[i].position_name = position_detail[i].pd_position_name

            try{
                const result = await getPersons(position_detail[i].pd_position_id);
                data[i].persons = result;
                for (let j = 0; j < result.length; j++) {
                    dataTable.push(result[j]);
                };

                if(i >= position_no -1){
                    // console.log('in =>' , data);
                    res.json({
                        person_data : data,
                        person_data_table : dataTable,
                        image_base_url: process.env.PERSONS_DIARECTORY_IMAGE
                    })
                }
            }catch(err){
                return return_err(res,'TRY CATCH BLOCK','GET PERSON TABLE TREE ',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
            }
        }
    })

     // Function to execute a database query and return a promise
    const getPersons = async (positionId) => {
        return new Promise((resolve, reject) => {
        db.query('SELECT * FROM person_directory_persons WHERE pd_position_id = ? ', [positionId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        });
    };

}

// edit person
module.exports.updatePerson = async (req,res) => {
    let person_image 
    const person_image_old = req.body.person_image_old // ภาพเก่า
    const person_id = req.body.person_id // สำหรับระบุ
    if(req.body.person_image === 'no_image_upload'){ // ถ้าไม่ได้เปลี่ยนภาพมาให้ใช้ข้อมูลภาพเดิม
        person_image = person_image_old
    }else{
        person_image = await upload_person_directory(req) //ถ้าอัพภาพมาให้ใช้อันใหม่
    }
    const person_name = req.body.person_name
    const person_name_old = req.body.person_name_old
    let person_phone = req.body.person_phone
    let person_email = req.body.person_email
    let person_desc = req.body.person_desc
    const credential_admin_fullname = req.body.credential_admin_fullname
    const person_position_id = req.body.person_position_id
    const person_position_name = req.body.person_position_name
    const person_category_id = req.body.person_category_id
    const person_category_name = req.body.person_category_name
    if(person_desc === undefined || person_desc === 'undefined') person_desc = ''
    if(person_email === undefined || person_email === 'undefined') person_email = ''
    if(person_phone === undefined || person_phone === 'undefined') person_phone = ''

    try{
        db.query(`
            UPDATE person_directory_persons 
            SET pd_person_image = ? ,
                pd_person_name = ? ,
                pd_person_phone = ? ,
                pd_person_email = ? ,
                pd_person_descript = ? ,
                pd_position_id  = ? ,
                pd_category_id = ? 
            WHERE pd_person_id  = ? 
        `,[
            person_image,
            person_name,
            person_phone,
            person_email,
            person_desc,
            person_position_id,
            person_category_id,
            person_id
        ], async (err,result)=>{
            if(err)  return_err(res,'QUERY BLOCK','UPDATE PERSON',err,500,'เกิดข้อผิดพลาด ไม่บันทึกข้อมูลได้')
            if(req.body.person_image !== 'no_image_upload'){
                console.log(req.body.person_image !== 'no_image_upload' , 'delete');
                await delete_image(person_image_old , 'persons_image') // ลบภาพเก่า
            }
            let msg_time_stamp = `${credential_admin_fullname} ได้แก้ไขข้อมูลบุคลากรชื่อ ' ${person_name_old} '`
            if(person_name !== person_name_old){
                msg_time_stamp = msg_time_stamp + ` และได้มีการเปลี่ยนชื่อบุคลากรจาก ' ${person_name_old} '  เป็น ' ${person_name} '*** `
            }
            timeStamp(
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
        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','UPDATE PERSON',err,500,'เกิดข้อผิดพลาด ไม่บันทึกข้อมูลได้')
    }

    // const person_name = req.body.person_name
    // const person_desc = req.body.person_desc  
    // const person_position_id = req.body.person_position_id
    // const person_id = req.body.person_id
    // const person_old_image = req.body.person_old_image

    // let person_new_image
    // if(req.body.person_image === 'no_image_update'){
    //     person_new_image = person_old_image
    // }else{
    //     person_new_image =  await upload_person_directory(req , `${req.body.person_name}`)
    // }

    // console.log('EDIT PERSONS HERE !');
    // console.log(req.body);
    // console.log('new image ',person_new_image);
    // try{
    //     db.query(`
    //             UPDATE person_directory_persons
    //             SET 
    //                 pd_person_image = ? ,
    //                 pd_person_name = ? ,
    //                 pd_person_descript = ? ,
    //                 pd_position_id = ?
    //             WHERE pd_person_id = ?
    //             `,
    //         [
    //             person_new_image,
    //             person_name,
    //             person_desc,
    //             person_position_id,
    //             person_id
    //         ],async (err,result)=>{
    //              if(err) throw err
    //              if(req.body.person_image !== 'no_image_update') {  
    //                 console.log(req.body.person_image !== 'no_image_upload' , 'delete');
    //                 await delete_image(person_old_image , 'persons_image')
    //              }
    //              res.send({
    //                 status_code:200,
    //                 status:true,
    //                 image:process.env.PERSONS_DIARECTORY_IMAGE+person_new_image,
    //                 msg:'อัพเดตสำเร็จ'
    //              })
    //         })

    // }catch(err){
    //     console.error('something err');
    //     res.json({
    //         status:false,
    //         msg:'err'
    //     })
    // }
}

// search persons by category 
module.exports.searchPersons = async (req,res) => {
    const search_keyword = req.body.search_keyword
    const start_item = req.body.start_item
    const limit = req.body.limit
    const person_category_id =  req.body.person_category_id

    let search_query = `SELECT * FROM person_directory_persons WHERE pd_person_name LIKE ? AND 
    pd_category_id = ${person_category_id} ORDER BY pd_person_id DESC LIMIT ${limit} OFFSET ${start_item}`

    let search_query_length = `SELECT * FROM person_directory_persons WHERE pd_person_name LIKE ? AND 
    pd_category_id = ${person_category_id} ORDER BY pd_person_id DESC `

    try{
        db.query(search_query,
            ['%'+search_keyword+'%'],async (err,result) => {
            if(err) return return_err(res,'TRY CATCH BLOCK','SEARCH PERSON',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
            let person_data = result
            try{
                db.query(search_query_length,['%'+search_keyword+'%'],(err,result)=>{
                    if(err) return return_err(res,'TRY CATCH BLOCK','SEARCH PERSON',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
                    res.status(200).json({
                        status_code:200,
                        status:true,
                        person_data:person_data,
                        person_data_length:result.length,
                        img_url: process.env.PERSONS_DIARECTORY_IMAGE
                    })
                })
            }catch(err){
                return return_err(res,'TRY CATCH BLOCK 2 ','SEARCH PERSON',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
            }

        })
    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','SEARCH PERSON',err,500,'เกิดความผิดพลาด ไม่สามารถดึงข้อมูลได้')
    }
}