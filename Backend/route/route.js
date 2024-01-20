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
    upload_syllabus_image
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

////////////////////////////////////////////////////////////////////////////
// login
////////////////////////////////////////////////////////////////////////////
route.post('/login',login_c.login) // เข้าสู่ระบบ
route.post('/adminRegister',login_c.adminRegister) //*** สำหรับแอดมินเท่านั้น

////////////////////////////////////////////////////////////////////////////
// users
////////////////////////////////////////////////////////////////////////////
route.post('/searchAdmin',authorization,admin_c.searchAdmin) // ค้าหารายชื่อผู้ใช้งาน
route.post('/getAllAdminLength',authorization,admin_c.getAllAdminLength) // ดึงข้อมูลจำนวนของรายชื่อผู้ใช้งานทั้งหมด
route.post('/getAllAdmin',authorization,admin_c.getAllAdmin) // ดึงข้อมูลผู้ใช้งาน
route.post('/addNewAdmin',authorization,upload_admin_image,admin_c.addNewAdmin) // เพิ่มผู้ใช้งาน
route.post('/updateAdmin',authorization,upload_admin_image,admin_c.updateAdmin) // อัะเดตผู้ใช่งาน
route.post('/deleteAdmin',authorization,admin_c.deleteAdmin) // ลบผู้ใช้งาน
route.post('/resetPassword',authorization,admin_c.resetPassword) // เปลี่ยนรหัสผ่าน

////////////////////////////////////////////////////////////////////////////
// person directory
////////////////////////////////////////////////////////////////////////////
route.post('/getAllPersonCategoryList',authorization,persons_pd_c.getAllPersonCategoryList) // ดึงรายชื่อหมวดหมู่
route.post('/getAllPersonPositionList',authorization,persons_pd_c.getAllPersonPositionList) // ดึงรายชื่อบุคลากร
route.post('/addPosition',authorization,persons_pd_c.addPosition) // เพิ่มหมวดหมู่
route.post('/deletePosition',authorization,persons_pd_c.deletePosition) // ลบหมวดหมู่
route.post('/renamePosition',authorization,persons_pd_c.renamePosition) // เปลี่ยนชื่อตำแหน่ง
route.post('/getPersonDirectoryTableTree',authorization,persons_pd_c.getPersonDirectoryTableTree) // ดึงข้อมูลรายชื่อผู้ใช้งานแบ่งหมวดหมู่ตามตำแหน่ง
route.post('/addPerson',authorization,upload_person_image,persons_pd_c.addPerson) // เพิ่มผู้ใบุคลากร
route.post('/updatePerson',authorization,upload_person_image,persons_pd_c.updatePerson) // อัพเดตบุคลากร
route.post('/deletePerson',authorization,persons_pd_c.deletePerson) // ลบบุคลากร

route.post('/getAllpersonListLength',authorization,persons_pd_c.getAllpersonListLength) // ดึงข้อมูลจำนวนของลบบุคลากรทั้งหมด
route.post('/getAllpersonList',authorization,persons_pd_c.getAllpersonList) // ดึงข้อมูลบุคลากรทั้งหมด
route.post('/searchPersons',authorization,persons_pd_c.searchPersons) // ค้นหาบุคลากร

////////////////////////////////////////////////////////////////////////////
// files
////////////////////////////////////////////////////////////////////////////
route.post('/getFileLength',authorization,file_c.getFileLength) // ดึงข้อมูลจำนวนของไฟล์ทั้งหมด
route.post('/getAllFiles',authorization,file_c.getAllFiles) // ดึงข้อมูลของไฟล์ทั้งหมด
route.post('/addFileCategory',authorization,file_c.addFileCategory) // เพิ่มหมวดหมู่เอกสาร
route.post('/renameFileCategory',authorization,file_c.renameFileCategory) // เปลี่ยนชือหมวดหมู่เอกสาร
route.post('/deleteFileCategory',authorization,file_c.deleteFileCategory) // ลบหมวดหมู่เอกสาร
route.post('/getAllCategoryFile',authorization,file_c.getAllCategoryFile) // ดึงข้อมูลหมวดหมู่เอกสารทั้งหมด
route.post('/addNewFile',authorization,upload_file,file_c.addNewFile) // เพิ่มเอกสาร
route.post('/editFile',authorization,upload_file,file_c.editFile) // อัพเดตเอกสาร
route.post('/deleteFile',authorization,file_c.deleteFile) // ลบเอกสาร
route.post('/fileSwitchPin',authorization,file_c.fileSwitchPin) // ปักหมุดเอกสาร
route.post('/downloadFile',authorization,file_c.downloadFile) // ดาวน์โหลดเอกสาร
route.post('/previewFile',authorization,file_c.previewFile) // ส่งข้อมูลไฟล์ไปแสดงผล
route.post('/searchFile',authorization,file_c.searchFile) // ค้นหาเอกสาร

////////////////////////////////////////////////////////////////////////////
// activity images
////////////////////////////////////////////////////////////////////////////
route.post('/getActivityLength',authorization,activity_image_ct.getActivityLength) // ดึงข้อมูลจำนวนของภาพกิจกรรมทั้งหมด
route.post('/getActivityImage',authorization,activity_image_ct.getActivityImage) // ดึงข้อมูลภาพกิจกรรมทั้งหมด
route.post('/addNewActivityImage',authorization,upload_activity_image,activity_image_ct.addNewActivityImage) // เพิ่มภาพกิจกรรม
route.post('/updateActivity',authorization,upload_activity_image,activity_image_ct.updateActivity) // บันทึกภาพกิจกรรรม
route.post('/deleteActivityImage',authorization,activity_image_ct.deleteActivityImage) // ลบภาพกิจกรรม
route.post('/searchActivityImage',authorization,activity_image_ct.searchActivityImage) // ค้นหาภาพกิจกรรม


////////////////////////////////////////////////////////////////////////////
// news
////////////////////////////////////////////////////////////////////////////

route.post('/addNewsCategory',authorization,news_ct.addNewsCategory) // เพิ่มหมวดหมู่ข่าวสาร
route.post('/getAllNewsCategory',authorization,news_ct.getAllNewsCategory) // ดึงข้อมูลหมวดหมู่ข่าวสาร
route.post('/updateNewsCategory',authorization,news_ct.updateNewsCategory) // อัพเดตหมวดหมู่ข่าวสาร
route.post('/deleteNewsCategory',authorization,news_ct.deleteNewsCategory) // ลบหมวดหมู่ข่าวสาร

route.post('/searchNews',authorization,news_ct.searchNews) // ค้นหาข่าวสาร
route.post('/getAllNewsLength',authorization,news_ct.getAllNewsLength) // ดึงข้อมูลจำนวนของข่าวสารทั้งหมด
route.post('/getAllNewsList',authorization,news_ct.getAllNewsList) // ดึงข้อมูลข่าวสารทั้งหมด

route.post('/addNews',authorization,upload_news_cover_image,news_ct.addNews) // เพิ่มข่าวสาร
route.post('/deleteNews',authorization,news_ct.deleteNews) // ลบข่าวสาร
route.post('/updateNews',authorization,upload_news_cover_image,news_ct.updateNews) // บันทึกข่าวสาร

////////////////////////////////////////////////////////////////////////////
// history 
////////////////////////////////////////////////////////////////////////////
route.post('/getHistoryLength',authorization,history_ct.getHistoryLength) // ดึงข้อมูลจำนวนของประวัติการใช้งานทั้งหมด
route.post('/getHistory',authorization,history_ct.getHistory) // ดึงข้อมูลประวัติการใช้งานทั้งหมด
route.post('/searchHistory',authorization,history_ct.searchHistory) // ค้นหา ประวัติการใช้งาน

////////////////////////////////////////////////////////////////////////////
// school setting 
////////////////////////////////////////////////////////////////////////////
route.post('/changeDefaultPassword',authorization,school_setting_ct.changeDefaultPassword) // เปลี่ยนรหัสผ่านเริ่มต้นสำหรับเพิ่มผู้ใช้งานใหม่
route.post('/addSchoolDefaultData',school_setting_ct.addSchoolDefaultData) // เพิ่มข้อมูลการตั้งค่าของโรงเรียนครั้งแรก *** สำหรับแอดมินเท่านั้น
route.post('/getSchoolDataSetting',authorization,school_setting_ct.getSchoolDataSetting) // ดึงข้อมูลการตั้งค่าของโรงเรียนเบื้องต้น
route.post('/updateBanner',authorization,upload_baner_image,school_setting_ct.updateBanner) // เปลี่ยนภาพแบนเนอร์หน้าเว็บกับคำขวัญ

route.post('/getClass',authorization,school_setting_ct.getClass)
route.post('/addClass',authorization,school_setting_ct.addClass)
route.post('/updateClass',authorization,school_setting_ct.updateClass)
route.post('/deleteClass',authorization,school_setting_ct.deleteClass)

////////////////////////////////////////////////////////////////////////////
// annoicement  
////////////////////////////////////////////////////////////////////////////
 
route.post('/searchAnno',authorization,anno_ct.searchAnno) // ค้นหาประกาศ
route.post('/getAnnoListLength',authorization,anno_ct.getAnnoListLength) // ดึงข้อมูลจำนวนของประกาศทั้งหมด
route.post('/getAnnoList',authorization,anno_ct.getAnnoList) // ดึงข้อมูลประกาศทั้งหมด
route.post('/getExampleAnnoList',authorization,anno_ct.getExampleAnnoList) // ดึงข้อมูลตัวอย่างที่จำนำประกาศมาแสดง
route.post('/updateAnnoLimit',authorization,anno_ct.updateAnnoLimit) // ปรับจำนวนประกาศที่จำนำมาแสดง
route.post('/addNewAnno',authorization,upload_anno_image,anno_ct.addNewAnno) // เพิ่มประกาศใหม่
route.post('/deleteAnno',authorization,anno_ct.deleteAnno) // ลบประกาศ
route.post('/switchAnnoPin',authorization,anno_ct.switchAnnoPin) // ปักหมุดประกาศ
route.post('/updateAnno',authorization,upload_anno_image,anno_ct.updateAnno) // อัพเดตประกาศ

////////////////////////////////////////////////////////////////////////////
// teaching schedule  
////////////////////////////////////////////////////////////////////////////
route.post('/getTeachingSLength',authorization,teaching_schedule_ct.getTeachingSLength)
route.post('/getTeachingS',authorization,teaching_schedule_ct.getTeachingS)
route.post('/deleteTeachignS',authorization,teaching_schedule_ct.deleteTeachignS)
route.post('/addTeachingS',authorization,upload_teaching_schedule_image,teaching_schedule_ct.addTeachingS)
route.post('/updateTeachS',authorization,upload_teaching_schedule_image,teaching_schedule_ct.updateTeachS)

////////////////////////////////////////////////////////////////////////////
// student schedule  
////////////////////////////////////////////////////////////////////////////
route.post('/getStudentSLength',authorization,student_schedule_ct.getStudentSLength)
route.post('/getStudentS',authorization,student_schedule_ct.getStudentS)
route.post('/deleteStudentS',authorization,student_schedule_ct.deleteStudentS)
route.post('/addStudentS',authorization,upload_student_schedule_image,student_schedule_ct.addStudentS)
route.post('/updateStudentS',authorization,upload_student_schedule_image,student_schedule_ct.updateStudentS)

////////////////////////////////////////////////////////////////////////////
// syllabus
////////////////////////////////////////////////////////////////////////////
route.post('/getSyllabusLength',authorization,syllabus_ct.getSyllabusLength)
route.post('/getSyllabusList',authorization,syllabus_ct.getSyllabusList)
route.post('/deleteSyllabus',authorization,syllabus_ct.deleteSyllabus)
route.post('/addSyllabus',authorization,upload_syllabus_image,syllabus_ct.addSyllabus)
route.post('/updateSyllabus',authorization,upload_syllabus_image,syllabus_ct.updateSyllabus)


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