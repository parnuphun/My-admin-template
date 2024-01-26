const db = require('../config/database');
const timeStamp = require('../services/timeStamp');
const return_err =require('../services/return_err');
const { dbQuery } = require('../services/query');
const {sendMail} = require('../services/send_email');
const date_convert = require('../services/date_convert');
require('dotenv').config();

// send email
module.exports.sendEmail = async(req,res) => {
    try {
        console.log(typeof req.body.content);
        const topic = req.body.topic
        const content = (req.body.content === null || req.body.content === undefined || req.body.content === 'undefined' || req.body.content === 'null')?'':req.body.content
        const email = req.body.email
        const credential_admin_fullname = req.body.credential_admin_fullname
        const date = new Date()
   
        for (let i = 0; i < email.length; i++) {
            await sendMail(topic,content,email[i])
        }

        const qr_add = `
            INSERT INTO email (email_topic,email_content,email_to,email_date,email_sender)
            VALUES(?,?,?,?,?)
        `
        const emailString = JSON.stringify(email)
        const add_params = [topic,content,emailString,date,credential_admin_fullname]

        await dbQuery(qr_add,add_params)
        await timeStamp(
            credential_admin_fullname,
            'email',
            'email',
            `${credential_admin_fullname} ส่งอีเมล`
        )

        res.status(200).json({
            status_code:200,
            status:true,
            msg:'ส่งอีเมลสำเร็จแล้ว'
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','SEND EMAIL ',err,500)
    }
}

// get all email from  
module.exports.getEmailList = async(req,res) =>{
    try{
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const qr_email_admin = `
        SELECT
            user_id,
            CONCAT(user_firstname, ' ', user_lastname) AS full_name,
            user_email,
            user_image
        FROM user`

        const qr_email_person = `
        SELECT
            pd_person_id ,
            pd_person_name,
            pd_person_email,
            pd_person_image
        FROM person_directory_persons
        `

        let data =[]
        const result_admin = await dbQuery(qr_email_admin)
        const result_person_directory = await dbQuery(qr_email_person)

        for (let i = 0; i < result_admin.length; i++) {
            let dataDetail = {}
            if(result_admin[i].user_email && emailRegex.test(result_admin[i].user_email)){
                let img = (result_admin[i].user_image === 'no_image_upload') ?  'no_image_upload' : process.env.ADMIN_IMAGE + result_admin[i].user_image
                
                const emailExists = data.some(item => item.email === result_admin[i].user_email);
                if(!emailExists){
                    dataDetail = {
                        name : result_admin[i].full_name ,
                        email : result_admin[i].user_email ,
                        image : img ,
                        from : 'ผู้ใช้งาน'
                    }
                    data.push(dataDetail)
                }
            }
        }

        for (let i = 0; i < result_person_directory.length; i++) {
            let dataDetail = {}
            if(result_person_directory[i].pd_person_email && emailRegex.test(result_person_directory[i].pd_person_email)){
                const emailExists = data.some(item => item.email === result_person_directory[i].pd_person_email);
                if(!emailExists){
                    dataDetail = {
                        name : result_person_directory[i].pd_person_name ,
                        email : result_person_directory[i].pd_person_email ,
                        image : process.env.PERSONS_DIARECTORY_IMAGE + result_person_directory[i].pd_person_image ,
                        from : 'ทำเนียบบุคลากร'
                    }
                    data.push(dataDetail)
                }
            }
        }

        res.status(200).json({
            status_code:200,
            status:true,
            data_list:data
        })

    }catch(err){
        return return_err(res,'TRY CATCH BLOCK','SEND EMAIL ',err,500)
    }
}

// get email sended length
module.exports.getEmailSendedLength = async (req,res) => {
    try {
        const qr_get = `SELECT COUNT(*) AS length FROM email`
        const result = await dbQuery(qr_get)
        const length = result[0].length

        res.status(200).json({
            status_code:200,
            status:true,
            data_length:length
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET EMAIL SENDED LENGTH ',err,500)
    }
}

// get email sended list 
module.exports.getemailSendedList = async (req,res) => {
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item

        const qr_get = `SELECT * FROM email ORDER BY email_id DESC LIMIT ? OFFSET ?`
        const result = await dbQuery(qr_get,[limit,start_item])
        
        // format data
        for (let i = 0; i < result.length; i++) {
            result[i].email_date = await date_convert(result[i].email_date)
            result[i].email_to_old = result[i].email_to
            // Parse the JSON string into a JavaScript array
            try {
                result[i].email_to= JSON.parse(result[i].email_to)
                for (let j = 0; j < result[i].email_to.length; j++) {
                    let email = {}
                    email = {
                        email_to_id : j,
                        email_to_detail : result[i].email_to[j]
                    }
                    result[i].email_to[j] = email
                }
            } catch (error) {

            }
        }
        res.status(200).json({
            status_code:200,
            status:true,
            data_list:result
        })
    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','GET EMAIL SENDED LIST ',err,500)
    }
}

// search email sended
module.exports.searchEmailSended = async (req,res) =>{ 
    try {
        const limit = req.body.limit
        const start_item = req.body.start_item
        const search_keyword = req.body.search_keyword

        const qr_get_length = `SELECT COUNT(*) AS length FROM email WHERE email_topic LIKE ? ORDER BY email_id DESC`
        const result_length = await dbQuery(qr_get_length,['%'+search_keyword+'%'])
        const length = result_length[0].length
        const qr_get = `SELECT * FROM email WHERE email_topic LIKE ? ORDER BY email_id DESC LIMIT ? OFFSET ?`
        const result = await dbQuery(qr_get,['%'+search_keyword+'%',limit,start_item])

        // format data
        for (let i = 0; i < result.length; i++) {
            result[i].email_date = await date_convert(result[i].email_date)
            result[i].email_to_old = result[i].email_to
            // Parse the JSON string into a JavaScript array
            try {
                result[i].email_to= JSON.parse(result[i].email_to)
                for (let j = 0; j < result[i].email_to.length; j++) {
                    let email = {}
                    email = {
                        email_to_id : j,
                        email_to_detail : result[i].email_to[j]
                    }
                    result[i].email_to[j] = email
                }
            } catch (error) {

            }
        }
        res.status(200).json({
            status_code:200,
            status:true,
            data_list:result,
            data_length:length
        })

    } catch (err) {
        return return_err(res,'TRY CATCH BLOCK','SEARCH EMAIL ',err,500)
    }
}