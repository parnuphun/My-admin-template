const db = require('../config/database');
const bcrypt = require('bcrypt');
const delete_image = require('../services/delete_file')
require('dotenv').config();

// get all user
module.exports.getAllAdmin = async(req,res) => {
    try{
        db.query('SELECT * FROM user ORDER BY user_id DESC',(err,result)=>{
            res.json({
                status:true,
                msg:'ดึงข้อมูลสำเร็จ',
                adminData:result,
                image_path:process.env.ADMIN_IMAGE
            })
        })

    }catch(err){
        console.log('CANT GET ADMIN LIST , PLS CHECK ERR !');
        console.log('ERR : ',err);
        res.json({
            status:false,
            msg:'ไม่สามารถดึงข้อมูลในระบบได้'
        })
    }
}

// add new admin
module.exports.addNewAdmin = async(req,res) =>{
    const username = req.body.username
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const address = req.body.address
    const phone = req.body.phone
    let image 
 
    if(req.body.admin_image === 'no_image_upload' ){
        image = 'no_image_upload'
    }else{
        image = req.file.filename
    }

    try{
        // check username 
        db.query(`SELECT * FROM user WHERE user_username = ?` , [username] , async(err , result )=>{
            if(err) return 'database err'
            if(result.length >= 1){
                console.log('CANT ADD NEW ADMIN , THIS USERNAME AREADY !');
                res.json({
                    msg: 'มีชื่อผู้ใช้งานนี้อล้วในระบบ',
                    status:false
                })
            }

            if(result.length === 0){
                // no username then register
                // and before register bcrypt password first 
                const hashedPassword = await bcrypt.hash(password, 10);

                try{
                    db.query(`
                        INSERT INTO user (
                            user_username, 
                            user_password, 
                            user_image,
                            user_firstname, 
                            user_lastname,
                            user_email,
                            user_phone,
                            user_address
                            )
                        VALUES (?,?,?,?,?,?,?,?)` 
                        , 
                        [
                            username,
                            hashedPassword,
                            image,
                            firstname,
                            lastname,
                            email,
                            phone,
                            address
                        ] , async(err , result) => {   
                        console.log('ADD NEW ADMIN SUCCESS !!');                     
                        return res.json({
                            status:true,
                            msg:'สมัครเสร็จเรียบร้อย'
                        })

                    })
                }catch(err){
                    console.log('CANT ADD NEW ADMIN , PLS CHECK ERR !!!')
                    console.log('ERR 2 : ',err)
                    res.json({
                        msg:'ไม่สามารถเพิ่มผู้ดูแลระบบได้',
                        status:false
                    })
                }
            }
        })

    }catch(err){
        console.log('CANT ADD NEW ADMIN , PLS CHECK ERR !')
        console.log('ERR 1  : ', err)
        res.json({
            msg:'ไม่สามารถเพิ่มผู้ดูแลระบบได้',
            status:false
        })
    }

}

// update admin 
module.exports.updateAdmin = async(req,res) =>{
    console.log(req.body);

    let user_id = req.body.userid
    let new_username = req.body.username
    let old_username = req.body.oldUsername
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let address = req.body.address
    let phone = req.body.phone
    
    let image 
    let oldImage = req.body.oldimage
    if(address === undefined || address === 'undefined' || address === null || address === 'null') address = ''

    if(req.body.admin_image === 'no_image_upload' ){
        image = oldImage
    }else{
        image = req.file.filename
    }
    
    try{
        db.query('SELECT * FROM user WHERE user_username = ? ', [new_username],(err,result)=>{
            if(old_username!=new_username){
                if(result.length >= 1){
                    return res.json({
                        msg:'ชื่อผู้ใช้ซ้ำกรุณากรอกใหม่',
                        status: false
                    })
                }
            }
            try{
                db.query(`
                    UPDATE user 
                    SET user_username = ?, 
                        user_image = ?,
                        user_firstname = ?, 
                        user_lastname = ?,
                        user_email = ?,
                        user_phone = ?,
                        user_address = ? 
                    WHERE user_id = ?
                `,[
                    new_username,
                    image,
                    firstname,
                    lastname,
                    email,
                    phone,
                    address,
                    user_id
                ],async (err,result)=>{
                    if(oldImage != image){
                         await delete_image(oldImage,'admin_image')
                    }
                    console.log('UPDATE ADMIN SUCCESSS!')
                    res.json({
                        msg:'บันทึกข้อมูลเรียบร้อยแล้ว',
                        status:true,
                        new_image_name:image
                    })
                })
            }catch{
                console.log('ERR UPDATE ADMIN ,PLS CHECK USERNAME !!');
                console.log('ERR 2 : ',err);
                reject( {
                    status: false ,
                    msg: 'มีปัญหาในการตรวจสอบ username '
                })
            }
        })
    }catch(err){
        console.log('ERR UPDATE ADMIN ,PLS CHECK USERNAME !!');
        console.log('ERR 1 : ',err);
        reject( {
            status: false ,
            msg: 'มีปัญหาในการตรวจสอบ username '
        })
    }
        
}

// delete admin 
module.exports.deleteAdmin = async(req,res) =>{
    const user_id = req.body.user_id
    const image_name = req.body.image_name
    try{
        db.query('DELETE FROM user WHERE user_id = ? ',[user_id],async (err,result)=>{
            console.log(`DELETE USER ID ${user_id} SUCCESS!!`);
            await delete_image(image_name , 'admin_image')
            res.json({
                msg:'ลบผู้ใช้งานสำเร็จ',
                status: true
            })
        })

    }catch(err){
        console.log('CANT DELETE USER , PLS CHECK ERR !!');
        console.log('ERR : ', err);
        res.json({
            msg:'ลบผู้ใช้งานไม่สำเร็จ',
            status:false
        })
    }
}

