const express = require('express')
const route = express.Router()
const {authorization} = require('../services/auth')

const db = require('../config/database');

const {
    upload_person_image, 
    upload_file, 
    upload_admin_image,
    upload_activity_image,
    upload_news_cover_image,
    upload_baner_image
} = require('../services/upload')
const delete_image = require('../services/delete_file')

const login_c = require('../controller/login')
const persons_pd_c = require('../controller/personal_directory')
const file_c = require('../controller/files')
const admin_c = require('../controller/admin')
const activity_image_ct = require('../controller/activity_image')
const history_ct = require('../controller/history_log')
const news_ct = require('../controller/news')
const school_setting_ct = require('../controller/school_setting')
////////////////////////////////////////////////////////////////////////////
// login
////////////////////////////////////////////////////////////////////////////
route.post('/login',login_c.login)
route.post('/adminRegister',login_c.adminRegister)

////////////////////////////////////////////////////////////////////////////
// users
////////////////////////////////////////////////////////////////////////////
route.post('/searchAdmin',authorization,admin_c.searchAdmin)
route.post('/getAllAdminLength',authorization,admin_c.getAllAdminLength)
route.post('/addNewAdmin',authorization,upload_admin_image,admin_c.addNewAdmin)
route.post('/updateAdmin',authorization,upload_admin_image,admin_c.updateAdmin)
route.post('/getAllAdmin',authorization,admin_c.getAllAdmin)
route.post('/deleteAdmin',authorization,admin_c.deleteAdmin)
route.post('/resetPassword',authorization,admin_c.resetPassword)

////////////////////////////////////////////////////////////////////////////
// person directory
////////////////////////////////////////////////////////////////////////////
route.post('/getAllPersonCategoryList',authorization,persons_pd_c.getAllPersonCategoryList)
route.post('/getAllPersonPositionList',authorization,persons_pd_c.getAllPersonPositionList)
route.post('/addPosition',authorization,persons_pd_c.addPosition)
route.post('/deletePosition',authorization,persons_pd_c.deletePosition)
route.post('/renamePosition',authorization,persons_pd_c.renamePosition)
route.post('/getPersonDirectoryTableTree',authorization,persons_pd_c.getPersonDirectoryTableTree)
route.post('/addPerson',authorization,upload_person_image,persons_pd_c.addPerson)
route.post('/updatePerson',authorization,upload_person_image,persons_pd_c.updatePerson)
route.post('/deletePerson',authorization,persons_pd_c.deletePerson)

route.post('/getAllpersonListLength',authorization,persons_pd_c.getAllpersonListLength)
route.post('/getAllpersonList',authorization,persons_pd_c.getAllpersonList)
route.post('/searchPersons',authorization,persons_pd_c.searchPersons)

////////////////////////////////////////////////////////////////////////////
// files
////////////////////////////////////////////////////////////////////////////
route.post('/getFileLength',authorization,file_c.getFileLength)
route.post('/getAllFiles',authorization,file_c.getAllFiles)
route.post('/addFileCategory',authorization,file_c.addFileCategory)
route.post('/renameFileCategory',authorization,file_c.renameFileCategory)
route.post('/deleteFileCategory',authorization,file_c.deleteFileCategory)
route.post('/getAllCategoryFile',authorization,file_c.getAllCategoryFile)
route.post('/addNewFile',authorization,upload_file,file_c.addNewFile)
route.post('/editFile',authorization,upload_file,file_c.editFile)
route.post('/deleteFile',authorization,file_c.deleteFile)
route.post('/fileSwitchPin',authorization,file_c.fileSwitchPin)
route.post('/downloadFile',authorization,file_c.downloadFile)
route.post('/previewFile',authorization,file_c.previewFile)
route.post('/searchFile',authorization,file_c.searchFile)

////////////////////////////////////////////////////////////////////////////
// activity images
////////////////////////////////////////////////////////////////////////////
route.post('/getActivityLength',authorization,activity_image_ct.getActivityLength)
route.post('/addNewActivityImage',authorization,upload_activity_image,activity_image_ct.addNewActivityImage)
route.post('/updateActivity',authorization,upload_activity_image,activity_image_ct.updateActivity)
route.post('/getActivityImage',authorization,activity_image_ct.getActivityImage)
route.post('/deleteActivityImage',authorization,activity_image_ct.deleteActivityImage)
route.post('/searchActivityImage',authorization,activity_image_ct.searchActivityImage)


////////////////////////////////////////////////////////////////////////////
// news
////////////////////////////////////////////////////////////////////////////

route.post('/addNewsCategory',authorization,news_ct.addNewsCategory)
route.post('/getAllNewsCategory',authorization,news_ct.getAllNewsCategory)
route.post('/updateNewsCategory',authorization,news_ct.updateNewsCategory)
route.post('/deleteNewsCategory',authorization,news_ct.deleteNewsCategory)

route.post('/searchNews',authorization,news_ct.searchNews)
route.post('/getAllNewsLength',authorization,news_ct.getAllNewsLength)
route.post('/getAllNewsList',authorization,news_ct.getAllNewsList)

route.post('/addNews',authorization,upload_news_cover_image,news_ct.addNews)
route.post('/deleteNews',authorization,news_ct.deleteNews)
route.post('/updateNews',authorization,upload_news_cover_image,news_ct.updateNews)

////////////////////////////////////////////////////////////////////////////
// history 
////////////////////////////////////////////////////////////////////////////
route.post('/getHistoryLength',authorization,history_ct.getHistoryLength)
route.post('/getHistory',authorization,history_ct.getHistory)
route.post('/searchHistory',authorization,history_ct.searchHistory)

////////////////////////////////////////////////////////////////////////////
// school setting 
////////////////////////////////////////////////////////////////////////////
route.post('/changeDefaultPassword',authorization,school_setting_ct.changeDefaultPassword)
route.post('/addSchoolDefaultData',school_setting_ct.addSchoolDefaultData)
route.post('/getSchoolDataSetting',authorization,school_setting_ct.getSchoolDataSetting)
route.post('/updateBanner',authorization,upload_baner_image,school_setting_ct.updateBanner)


////////////////////////////////////////////////////////////////////////////
// test
////////////////////////////////////////////////////////////////////////////

// check token in header
route.post('/test_check_token', authorization ,(req,res) => {
    const token = String(req.headers.authorization).split(' ')[1]
    res.status(200).json({
        status:true,
        status_code:200,
        token: 'token ทำงานถูกต้อง'
    })
})

// delete file check err permission 
route.post('/test_delete_image', authorization ,(req,res)=>{
    let dl_state = delete_image(req.body.image_name , 'persons_image')
    if(dl_state.status){
        res.json({
            msg:dl_state.msg
        })
    }else{
        res.json({
            msg:dl_state.msg
        })
    }
})

const {faker } = require('@faker-js/faker');
// add fake data
route.post('/test_add_faker_file', authorization,(req,res)=>{ 
    console.log(req.body);
    const num = req.body.number_of_file
    
    try{
        for(let i =0 ; i < num ; i++){
            let file_name = faker.company.name()
            let file_name_upload = faker.company.name()
            let file_date = new Date()
            db.query(`
                INSERT INTO file(
                    file_name,
                    file_name_upload,
                    file_pin,
                    file_type,
                    file_size,
                    file_date,
                    file_category_id
                )
                VALUES(?,?,1,'pdf','10KB',?,1)
            `,[file_name,file_name_upload,file_date],(err,result)=>{

                if(err) {
                    console.log( 'err in query => ' , err);
                    return res.json({
                        err : err
                    })
                }
                if(i >= num-1){
                    res.json({
                        msg:'add faker data success !'
                    })
                }
            })
        }

    }catch(err){
        console.log(err);
        return res.json({
            err:err
        })
    }
})


module.exports = route;