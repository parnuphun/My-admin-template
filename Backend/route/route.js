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
    upload_baner_image,
    upload_anno_image,
    upload_teaching_schedule_image,
    upload_student_schedule_image,
    upload_syllabus_image,
    checkAbortedReq
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
const anno_ct = require('../controller/announcement')
const teaching_schedule_ct = require('../controller/teahing_schedule')
const student_schedule_ct = require('../controller/student_schedule')
const syllabus_ct = require('../controller/syllabus')
const email_ct = require('../controller/email')

////////////////////////////////////////////////////////////////////////////
// login
////////////////////////////////////////////////////////////////////////////
route.post('/login',login_c.login) // เข้าสู่ระบบ - 1
route.post('/adminRegister',login_c.adminRegister) //*** สำหรับแอดมินเท่านั้น

////////////////////////////////////////////////////////////////////////////
// users
////////////////////////////////////////////////////////////////////////////
route.post('/searchAdmin',authorization,admin_c.searchAdmin) // ค้าหารายชื่อผู้ใช้งาน - 2
route.post('/getAllAdminLength',authorization,admin_c.getAllAdminLength) // ดึงข้อมูลจำนวนของรายชื่อผู้ใช้งานทั้งหมด - 3
route.post('/getAllAdmin',authorization,admin_c.getAllAdmin) // ดึงข้อมูลผู้ใช้งาน - 4
route.post('/addNewAdmin',authorization,upload_admin_image,admin_c.addNewAdmin) // เพิ่มผู้ใช้งาน - 5 
route.post('/updateAdmin',authorization,upload_admin_image,admin_c.updateAdmin) // อัะเดตผู้ใช่งาน - 6
route.post('/deleteAdmin',authorization,admin_c.deleteAdmin) // ลบผู้ใช้งาน - 7
route.post('/resetPassword',authorization,admin_c.resetPassword) // เปลี่ยนรหัสผ่าน - 8

////////////////////////////////////////////////////////////////////////////
// person directory
////////////////////////////////////////////////////////////////////////////
route.post('/getAllPersonCategoryList',authorization,persons_pd_c.getAllPersonCategoryList) // ดึงรายชื่อหมวดหมู่ทำเนียบบุคลากร - -
route.post('/getAllPersonPositionList',authorization,persons_pd_c.getAllPersonPositionList) // ดึงรายชื่อตำแหน่งทำเนียบบุคลากร - 10 
route.post('/addPosition',authorization,persons_pd_c.addPosition) // เพิ่มตำแหน่งบุคลากร - 11
route.post('/deletePosition',authorization,persons_pd_c.deletePosition) // ลบตำแหน่งบุคลากร - 12
route.post('/renamePosition',authorization,persons_pd_c.renamePosition) // เปลี่ยนชื่อตำแหน่ง - 13 
route.post('/getPersonDirectoryTableTree',authorization,persons_pd_c.getPersonDirectoryTableTree) // ดึงข้อมูลรายชื่อผู้ใช้งานแบ่งหมวดหมู่ตามตำแหน่ง - 14
route.post('/addPerson',authorization,upload_person_image,persons_pd_c.addPerson) // เพิ่มผู้ใบุคลากร - 15
route.post('/updatePerson',authorization,upload_person_image,persons_pd_c.updatePerson) // อัพเดตบุคลากร - 16
route.post('/deletePerson',authorization,persons_pd_c.deletePerson) // ลบบุคลากร - 17

route.post('/getAllpersonListLength',authorization,persons_pd_c.getAllpersonListLength) // ดึงจำนวนของบุคลากรทั้งหมด - 18
route.post('/getAllpersonList',authorization,persons_pd_c.getAllpersonList) // ดึงข้อมูลบุคลากรทั้งหมด - 19 
route.post('/searchPersons',authorization,persons_pd_c.searchPersons) // ค้นหาบุคลากร - 20

////////////////////////////////////////////////////////////////////////////
// files
////////////////////////////////////////////////////////////////////////////
route.post('/getFileLength',authorization,file_c.getFileLength) // ดึงข้อมูลจำนวนของไฟล์ทั้งหมด - 21 
route.post('/getAllFiles',authorization,file_c.getAllFiles) // ดึงข้อมูลของไฟล์ทั้งหมด - 22
route.post('/addFileCategory',authorization,file_c.addFileCategory) // เพิ่มหมวดหมู่เอกสาร - 23 
route.post('/renameFileCategory',authorization,file_c.renameFileCategory) // เปลี่ยนชือหมวดหมู่เอกสาร - 24
route.post('/deleteFileCategory',authorization,file_c.deleteFileCategory) // ลบหมวดหมู่เอกสาร - 25
route.post('/getAllCategoryFile',authorization,file_c.getAllCategoryFile) // ดึงข้อมูลหมวดหมู่เอกสารทั้งหมด -26 
route.post('/addNewFile',authorization,checkAbortedReq,upload_file,file_c.addNewFile) // เพิ่มเอกสาร - 27 
route.post('/editFile',authorization,checkAbortedReq,upload_file,file_c.editFile) // อัพเดตเอกสาร -28 
route.post('/deleteFile',authorization,file_c.deleteFile) // ลบเอกสาร - 29
route.post('/fileSwitchPin',authorization,file_c.fileSwitchPin) // ปักหมุดเอกสาร - 30
route.post('/downloadFile',authorization,file_c.downloadFile) // ดาวน์โหลดเอกสาร - 31 
route.post('/previewFile',authorization,file_c.previewFile) // ส่งข้อมูลไฟล์ไปแสดงผล - 32 
route.post('/searchFile',authorization,file_c.searchFile) // ค้นหาเอกสาร - 33

////////////////////////////////////////////////////////////////////////////
// activity images
////////////////////////////////////////////////////////////////////////////
route.post('/getActivityLength',authorization,activity_image_ct.getActivityLength) // ดึงข้อมูลจำนวนของภาพกิจกรรมทั้งหมด -34
route.post('/getActivityImage',authorization,activity_image_ct.getActivityImage) // ดึงข้อมูลภาพกิจกรรมทั้งหมด - 35
route.post('/addNewActivityImage',authorization,upload_activity_image,activity_image_ct.addNewActivityImage) // เพิ่มภาพกิจกรรม -36
route.post('/updateActivity',authorization,upload_activity_image,activity_image_ct.updateActivity) // บันทึกภาพกิจกรรรม -37
route.post('/deleteActivityImage',authorization,activity_image_ct.deleteActivityImage) // ลบภาพกิจกรรม -38
route.post('/searchActivityImage',authorization,activity_image_ct.searchActivityImage) // ค้นหาภาพกิจกรรม -39 


////////////////////////////////////////////////////////////////////////////
// news
////////////////////////////////////////////////////////////////////////////

route.post('/addNewsCategory',authorization,news_ct.addNewsCategory) // เพิ่มหมวดหมู่ข่าวสาร -40
route.post('/getAllNewsCategory',authorization,news_ct.getAllNewsCategory) // ดึงข้อมูลหมวดหมู่ข่าวสาร -41
route.post('/updateNewsCategory',authorization,news_ct.updateNewsCategory) // อัพเดตหมวดหมู่ข่าวสาร -42
route.post('/deleteNewsCategory',authorization,news_ct.deleteNewsCategory) // ลบหมวดหมู่ข่าวสาร -43 

route.post('/searchNews',authorization,news_ct.searchNews) // ค้นหาข่าวสาร - 44
route.post('/getAllNewsLength',authorization,news_ct.getAllNewsLength) // ดึงข้อมูลจำนวนของข่าวสารทั้งหมด -45
route.post('/getAllNewsList',authorization,news_ct.getAllNewsList) // ดึงข้อมูลข่าวสารทั้งหมด -46

route.post('/addNews',authorization,upload_news_cover_image,news_ct.addNews) // เพิ่มข่าวสาร -47
route.post('/deleteNews',authorization,news_ct.deleteNews) // ลบข่าวสาร -48 
route.post('/updateNews',authorization,upload_news_cover_image,news_ct.updateNews) // บันทึกข่าวสาร -49

////////////////////////////////////////////////////////////////////////////
// history 
////////////////////////////////////////////////////////////////////////////
route.post('/getHistoryLength',authorization,history_ct.getHistoryLength) // ดึงข้อมูลจำนวนของประวัติการใช้งานทั้งหมด -50
route.post('/getHistory',authorization,history_ct.getHistory) // ดึงข้อมูลประวัติการใช้งานทั้งหมด -51 
route.post('/searchHistory',authorization,history_ct.searchHistory) // ค้นหาประวัติการใช้งาน -52

////////////////////////////////////////////////////////////////////////////
// school setting 
////////////////////////////////////////////////////////////////////////////
route.post('/changeDefaultPassword',authorization,school_setting_ct.changeDefaultPassword) // เปลี่ยนรหัสผ่านเริ่มต้นสำหรับเพิ่มผู้ใช้งานใหม่ -53
route.post('/addSchoolDefaultData',school_setting_ct.addSchoolDefaultData) // เพิ่มข้อมูลการตั้งค่าของโรงเรียนครั้งแรก *** สำหรับแอดมินเท่านั้น
route.post('/getSchoolDataSetting',authorization,school_setting_ct.getSchoolDataSetting) // ดึงข้อมูลการตั้งค่าของโรงเรียนเบื้องต้น -54
route.post('/updateBanner',authorization,upload_baner_image,school_setting_ct.updateBanner) // เปลี่ยนภาพแบนเนอร์หน้าเว็บกับคำขวัญ -55

route.post('/getClass',authorization,school_setting_ct.getClass) // ดึงข้อมูลรายชื่อชั้นเรียน - 56
route.post('/addClass',authorization,school_setting_ct.addClass) // เพิ่มชั้นเรียน -57
route.post('/updateClass',authorization,school_setting_ct.updateClass) // เปลี่ยนชื่อชั้นเรียน -58
route.post('/deleteClass',authorization,school_setting_ct.deleteClass) // ลบชั้นเรียน -59


////////////////////////////////////////////////////////////////////////////
// annoicement  
////////////////////////////////////////////////////////////////////////////
 
route.post('/searchAnno',authorization,anno_ct.searchAnno) // ค้นหาประกาศ - 60
route.post('/getAnnoListLength',authorization,anno_ct.getAnnoListLength) // ดึงข้อมูลจำนวนของประกาศทั้งหมด - 61
route.post('/getAnnoList',authorization,anno_ct.getAnnoList) // ดึงข้อมูลประกาศทั้งหมด - 62
route.post('/getExampleAnnoList',authorization,anno_ct.getExampleAnnoList) // ดึงข้อมูลตัวอย่างที่จำนำประกาศมาแสดง - 63
route.post('/updateAnnoLimit',authorization,anno_ct.updateAnnoLimit) // ปรับจำนวนประกาศที่จำนำมาแสดง - 64
route.post('/addNewAnno',authorization,upload_anno_image,anno_ct.addNewAnno) // เพิ่มประกาศใหม่ -65
route.post('/deleteAnno',authorization,anno_ct.deleteAnno) // ลบประกาศ - 66
route.post('/switchAnnoPin',authorization,anno_ct.switchAnnoPin) // ปักหมุดประกาศ - 67
route.post('/updateAnno',authorization,upload_anno_image,anno_ct.updateAnno) // อัพเดตประกาศ -68

////////////////////////////////////////////////////////////////////////////
// teaching schedule  
////////////////////////////////////////////////////////////////////////////
route.post('/getTeachingSLength',authorization,teaching_schedule_ct.getTeachingSLength) // ดึงจำนวนทั้งหมดตารางสอน -69
route.post('/getTeachingS',authorization,teaching_schedule_ct.getTeachingS) // ดึงข้อมูลตารางสอน -70
route.post('/deleteTeachignS',authorization,teaching_schedule_ct.deleteTeachignS) // ลบตารางสอย -71
route.post('/addTeachingS',authorization,upload_teaching_schedule_image,teaching_schedule_ct.addTeachingS) // เพิ่มตารางสอน -72
route.post('/updateTeachS',authorization,upload_teaching_schedule_image,teaching_schedule_ct.updateTeachS) // อัพเดตตารางสอน -73

////////////////////////////////////////////////////////////////////////////
// student schedule  
////////////////////////////////////////////////////////////////////////////
route.post('/getStudentSLength',authorization,student_schedule_ct.getStudentSLength) // ดึงจำนวนทั้งหมดของตารางเรียน -74
route.post('/getStudentS',authorization,student_schedule_ct.getStudentS) // ดึงข้อมูลตารางเรียน -75
route.post('/deleteStudentS',authorization,student_schedule_ct.deleteStudentS) // ลบตาราเรียน -76
route.post('/addStudentS',authorization,upload_student_schedule_image,student_schedule_ct.addStudentS) // เพิ่มตารางเรียนเรียน -77
route.post('/updateStudentS',authorization,upload_student_schedule_image,student_schedule_ct.updateStudentS) // อัพเดตตารางเรียน -78 

////////////////////////////////////////////////////////////////////////////
// syllabus
////////////////////////////////////////////////////////////////////////////
route.post('/getSyllabusLength',authorization,syllabus_ct.getSyllabusLength) // ดึงจำนวนทั้งหมดของหลักสูตร -79
route.post('/getSyllabusList',authorization,syllabus_ct.getSyllabusList) // ดึงข้อมูลหลักสูตร -80
route.post('/deleteSyllabus',authorization,syllabus_ct.deleteSyllabus) // ลบหลักสูตร -81
route.post('/addSyllabus',authorization,upload_syllabus_image,syllabus_ct.addSyllabus) // เพิ่มหลักสูตร -82
route.post('/updateSyllabus',authorization,upload_syllabus_image,syllabus_ct.updateSyllabus) // อัพเดตหลักสูตร -83

////////////////////////////////////////////////////////////////////////////
//  email
////////////////////////////////////////////////////////////////////////////
route.post('/sendEmail',authorization,email_ct.sendEmail) // ส่งอีเมล - 84
route.post('/getEmailList',authorization,email_ct.getEmailList) // ดึงรายชื่ออีเมลที่มีในระบบ -85
route.post('/getemailSendedList',email_ct.getemailSendedList) // ดึงรายการอีเมลที่ส่งไปแล้ว -86
route.post('/getEmailSendedLength',email_ct.getEmailSendedLength) // ดึงจำนวนอีเมลที่ส่งไปแล้ว -87
route.post('/searchEmailSended',email_ct.searchEmailSended) // ค้นหาอีเมล -88




route.post('/getTeachersList',authorization,school_setting_ct.getTeacherList) // *** แก้ไขใหม่เพิ้มเติม ดึงรายชื่อครูผู้สอน -89
route.post('/addNewTeacher',authorization,school_setting_ct.addNewTeacher) // *** แก้ไขใหม่เพิ้มเติม เพิ่มรายชื่อครูผู้สอน -90
route.post('/renameTeacher',authorization,school_setting_ct.renameTeacher) // *** แก้ไขใหม่เพิ้มเติม เปลี่ยนชื่อครูผู้สอน -91
route.post('/deleteTeacher',authorization,school_setting_ct.deleteTeacher) // *** แก้ไขใหม่เพิ้มเติม เปลี่ยนชื่อครูผู้สอน -92

route.post('/getYears',authorization,school_setting_ct.getYears) // *** แก้ไขใหม่เพิ้มเติม ดึงรายชื่อปีการศึกษา -93
route.post('/addNewYear',authorization,school_setting_ct.addNewYear) // *** แก้ไขใหม่เพิ้มเติม เพิ่มปีการศึกษา -94
route.post('/updateYear',authorization,school_setting_ct.updateYear) // *** แก้ไขใหม่เพิ้มเติม แก้ไขปีการศึกษา -95
route.post('/deleteYear',authorization,school_setting_ct.deleteYear) // *** แก้ไขใหม่เพิ้มเติม เปลี่ยนชื่อครูผู้สอน -96


route.post('/getAccountDetail',authorization,admin_c.getAccountDetail) // *** แก้ไขใหม่เพิ้มเติม ดึงข้อมูลผู้ใช้งาน -97

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