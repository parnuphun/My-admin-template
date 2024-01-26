const express = require('express')
const route = express.Router()
const db = require('../config/database');

const client_c = require('../controller/client')

route.post('/clientMainPage',client_c.mainPage) // ดึงข้อมูลไปยังหน้าแรกของเว็บไซ์
route.post('/clientGetNewsContent',client_c.getNewsContent) // ดึงข้อมูลรายละเอียดข่าวสารไปแสดง
route.post('/getNewsListClient',client_c.getNewsListClient) // ดึงข้อมูลข่าวสารไปยังหน้าข่าวสาร
route.post('/getNewsLengthClient',client_c.getNewsLengthClient) // ดึงจำนวนข้อมูลข่าวสาร
route.post('/getActivityImageListClient',client_c.getActivityImageListClient) // ดึงข้อมูลรายการภาพกิจกรรมไปยังหน้าภาพกิจกรรม
route.post('/getActivityImageLengthClient',client_c.getActivityImageLengthClient) // ดึงจำนววนข้อมูลภาพกิจกรรม
route.post('/getAllfilsClient',client_c.getAllfilsClient) // ดึงไฟล์เอกสารไปยังหน้าเอกสาร
route.post('/previewFileClient',client_c.previewFileClient) // ดูรายละเอียดไฟล์เอกสาร 
route.post('/getPersonTreeclient',client_c.getPersonTreeclient) // ดึงรายการทำเนียบบุคลากร
route.post('/getPersonCateListClient',client_c.getPersonCateListClient) // ดึงประเภทรายการทำเนียบบุคลากร
route.post('/getTeachingSClient',client_c.getTeachingSClient) // ดึงข้อมูลรายการตารางสอน
route.post('/getStudentSClient',client_c.getStudentSClient) // ดึงข้อมูลรายการตารางเรียน
route.post('/getClassClient',client_c.getClassClient) // ดึงรายชื่อชั้นเรียน
route.post('/getSyllabusClient',client_c.getSyllabusClient) // ดึงรายการหลักสูตร

module.exports = route