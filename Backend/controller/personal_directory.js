const db = require('../config/database');
const upload_person_directory = require('../services/upload_person_directory')
const delete_image = require('../services/delete_file')
require('dotenv').config();

// send all position 
module.exports.getAllPositionList = async (req,res)=> {
    const category_id = req.body.category_id
    try{
        db.query("SELECT * FROM personal_directory_position WHERE pd_category_id = ?",[category_id],(err,result)=>{
            if(err) return 'db err'
            res.json({
                status:true,
                status_code:200,
                msg:`query success!!`,
                positionData:result
            })
        })

    }catch(err){
        console.error('something err');
        res.json({
            status:false,
            msg:'err'
        })
    }
}

// add new position 
module.exports.addPosition = async (req,res) => {
    const position_name = req.body.position_name
    const position_category = req.body.position_category
    try{
        // check order first
        db.query('SELECT * FROM personal_directory_position',(err,result)=>{
            if(err) return 'db err' 
            if(result.length === 0){
                // if no one position add first ordered
                try{
                    db.query(`INSERT INTO personal_directory_position(pd_position_name ,pd_position_order,pd_category_id)
                        VALUES(?,1,?)`,[position_name,position_category], async (err, result) =>{ 
                        if(err) return 'db err'
                        res.json({
                            status:true,
                            status_code:200,
                            msg:`เพิ่มตำแหน่ง ${position_name} สำเร็จ!`
                        })
                    })
                }catch(err){
                    console.error('something err');
                    res.json({
                        status:false,
                        msg:'err'
                    })
                }
            }else{
                // not first 
                let order = result.length+1 
                try{
                    db.query(`INSERT INTO personal_directory_position(pd_position_name ,pd_position_order,pd_category_id)
                    VALUES(?,?,?)`,[position_name,order,position_category], async (err, result) =>{ 
                    if(err) throw err
                    res.json({
                        status:true,
                        status_code:200,
                        msg:`เพิ่มตำแหน่ง ${position_name} สำเร็จ!`
                    })
                })
                }catch(err){
                    console.error('something err');
                    res.json({
                        status:false,
                        msg:'err'
                    })
                }
            }
        })



    }catch(err){
        console.error('something err');
        res.json({
            status:false,
            msg:'err'
        })
    }
}

// delete position
module.exports.deletePosition = async (req,res) =>{
    const position_id = req.body.position_id
    try{
        db.query(`DELETE FROM personal_directory_position WHERE pd_position_id = ?`,
        [position_id], async (err, result) =>{ 
            if(err) return 'db err'
            try{
                // arrange new order 
                const qry = `CREATE TEMPORARY TABLE temp_order AS
                SELECT pd_position_id, ROW_NUMBER() OVER (ORDER BY pd_position_id) AS temp_order_value
                FROM personal_directory_position;
                
                UPDATE personal_directory_position pdp
                JOIN temp_order tmp ON pdp.pd_position_id = tmp.pd_position_id
                SET pdp.pd_position_order = tmp.temp_order_value;
                
                DROP TEMPORARY TABLE IF EXISTS temp_order`
                db.query(qry, async (err,result)=>{
                    if(err) return 'db err'
                    res.json({
                        status:true,
                        status_code:200,
                        msg:`ลบตำแหน่งสำเร็จ!`
                    })
                })

            }catch(err){
                console.error('something err');
                res.json({
                    status:false,
                    msg:'err'
                })
            }
        })
    }catch(err){
        console.error('something err');
        res.json({
            status:false,
            msg:'err'
        })
    }
}

// rename position 
module.exports.RenamePosition = async (req,res) => {
    const position_name = req.body.position_name 
    const position_id = req.body.position_id
    console.log(position_name);
    console.log(position_id);
    try {
        db.query(`
            UPDATE personal_directory_position
            SET pd_position_name = ?
            WHERE pd_position_id = ?;
        `,[position_name,position_id],(err,result)=>{
            if(err) throw err
            res.json({
                status:true,
                status_code:200,
                msg: `เปลี่ยนชื่อสำเร็จ`
            })
        })
    }catch{
        console.error('something err');
        res.json({
            status:false,
            msg:'err'
        })
    }

}

// add new person 
module.exports.addPerson = async (req,res)=>{
    const image = await upload_person_directory(req , `${req.body.person_name}`)
    const name = req.body.person_name
    const desc = req.body.person_desc  
    const position = req.body.person_position_id
    const category = req.body.person_category_id
 
    try{
        db.query(`
                INSERT INTO personal_directory_persons(
                    pd_person_image,
                    pd_person_name,
                    pd_person_descript,
                    pd_position_id,
                    pd_category_id)
                VALUES(?,?,?,?,?)`,
            [
                image,
                name,
                desc,
                position,
                category
            ],(err,result)=>{
                 if(err) throw err
                 res.send({
                    status_code:200,
                    status:true,
                    msg:'เพิ่มบุคลากรสำเร็จ'
                 })
            })

    }catch(err){
        console.error('something err');
        res.json({
            status:false,
            msg:'err'
        })
    }
}

// delete person
module.exports.deletePerson = async (req,res) =>{
    const person_id = req.body.person_id
    const person_image = req.body.person_image

    db.query(`DELETE FROM personal_directory_persons WHERE pd_person_id = ?` ,
    [person_id], async(err,result)=>{
        let delete_status = await delete_image(person_image,'persons_image')
        if(delete_status.status === true){
            console.log('DELETE IMAGE MESSAGE : '+ delete_status.msg);
            res.json({
                status_code:200,
                status:true,
                msg: 'ลบสำเร็จ'
            })
        }else{
            console.log('DELETE IMAGE MESSAGE : '+ delete_status.msg);
            res.json({
                status_code:500,
                status:false,
                msg:'null'
            })
        }
    })
}

// get all persons รายชื่อบุคลากร ****
module.exports.getPersonDirectoryOne = async (req ,res) => {
    let position_no 
    let position_detail  
    let data = []
    let dataTable = []

    const category_id = req.body.category_id
    console.log('get all person by category ',category_id);
    db.query('SELECT * FROM personal_directory_position WHERE pd_category_id = ?',[category_id], async (err,result)=>{
        if(err) return 'db err'
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
                const result = await executeQuery(position_detail[i].pd_position_id);
                data[i].persons = result;
                for (let j = 0; j < result.length; j++) {
                    dataTable.push(result[j]);
                };

                if(i >= position_no -1){
                    // console.log('in =>' , data);
                    res.json({
                        personsData : data,
                        personsDataTable : dataTable,
                        personsBaseImageURL: process.env.PERSONS_DIARECTORY_IMAGE
                    })
                }
            }catch(err){
                console.log('err execute query');
            }
        }
    })

     // Function to execute a database query and return a promise
    const executeQuery = async (positionId) => {
        return new Promise((resolve, reject) => {
        db.query('SELECT * FROM personal_directory_persons WHERE pd_position_id = ? ', [positionId], (err, result) => {
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
module.exports.editPerson = async (req,res) => {
    
    const person_name = req.body.person_name
    const person_desc = req.body.person_desc  
    const person_position_id = req.body.person_position_id
    const person_id = req.body.person_id
    const person_old_image = req.body.person_old_image

    let person_new_image
    if(req.body.person_image === 'no_image_update'){
        person_new_image = person_old_image
    }else{
        person_new_image =  await upload_person_directory(req , `${req.body.person_name}`)
    }

    console.log('EDIT PERSONS HERE !');
    console.log(req.body);
    console.log('new image ',person_new_image);
    try{
        db.query(`
                UPDATE personal_directory_persons
                SET 
                    pd_person_image = ? ,
                    pd_person_name = ? ,
                    pd_person_descript = ? ,
                    pd_position_id = ?
                WHERE pd_person_id = ?
                `,
            [
                person_new_image,
                person_name,
                person_desc,
                person_position_id,
                person_id
            ],async (err,result)=>{
                 if(err) throw err
                 if(req.body.person_image !== 'no_image_update') {  
                    console.log(req.body.person_image !== 'no_image_upload' , 'delete');
                    await delete_image(person_old_image , 'persons_image')
                 }
                 res.send({
                    status_code:200,
                    status:true,
                    image:process.env.PERSONS_DIARECTORY_IMAGE+person_new_image,
                    msg:'อัพเดตสำเร็จ'
                 })
            })

    }catch(err){
        console.error('something err');
        res.json({
            status:false,
            msg:'err'
        })
    }
}