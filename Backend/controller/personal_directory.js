const db = require('../config/database');

// send all position 
module.exports.allPosition = async (req,res)=> {
    try{
        db.query("SELECT * FROM personal_directory_position",(err,result)=>{
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
                    db.query(`INSERT INTO personal_directory_position(pd_position_name ,pd_position_order)
                        VALUES(?,?)`,[position_name,order], async (err, result) =>{ 
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

module.exports.getPersonalOne = async (req ,res) => {
    db.query('SELECT * FROM personal_directory_position',(err,result)=>{
        if(err) return 'db err'
        let position_no = result.length
        let position_detail = result
        let data = []

        if(result.length === 0){
            res.json({
                personsData : data
            })
        }
        
        for(let i = 0 ; i < position_no ; i++){
            data[i] = {};

            data[i].position_id = position_detail[i].pd_position_id
            data[i].position_name = position_detail[i].pd_position_name
            db.query('SELECT * FROM personal_directory_persons WHERE pd_position_id = ? ',
            [position_detail[i].pd_position_id],(err,result)=>{
                if(err)  throw err
                data[i].persons = result
                
                if(i >= position_no -1){
                    res.json({
                        personsData : data
                    })
                }
            })
        }
    })
}

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
module.exports.addPersonDirec =async (req,res)=>{
    const name = req.body.person_name
    const image = req.body.person_image
    const desc = req.body.person_desc
    const position = req.body.person_position_id
    const category = req.body.person_category_id

    try{
        db.query(`INSERT INTO personal_directory_persons(
            pd_person_image,
            pd_person_name,
            pd_person_descript,
            pd_position_id,
            pd_category_id,)
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
