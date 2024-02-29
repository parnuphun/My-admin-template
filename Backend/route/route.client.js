const express = require('express')
const route = express.Router()
const db = require('../config/database');

const client_c = require('../controller/client')

route.post('/clientMainPage',client_c.mainPage) // ดึงข้อมูลไปยังหน้าแรกของเว็บไซ์ -1 
route.post('/clientGetNewsContent',client_c.getNewsContent) // ดึงข้อมูลรายละเอียดข่าวสารไปแสดง -2
route.post('/getNewsListClient',client_c.getNewsListClient) // ดึงข้อมูลข่าวสารไปยังหน้าข่าวสาร -3 
route.post('/getNewsLengthClient',client_c.getNewsLengthClient) // ดึงจำนวนข้อมูลข่าวสาร -4
route.post('/getActivityImageListClient',client_c.getActivityImageListClient) // ดึงข้อมูลรายการภาพกิจกรรมไปยังหน้าภาพกิจกรรม -5 
route.post('/getActivityImageLengthClient',client_c.getActivityImageLengthClient) // ดึงจำนววนข้อมูลภาพกิจกรรม -6
route.post('/getAllfilsClient',client_c.getAllfilsClient) // ดึงไฟล์เอกสารไปยังหน้าเอกสาร -7
route.post('/previewFileClient',client_c.previewFileClient) // ดูรายละเอียดไฟล์เอกสาร -8
route.post('/getPersonTreeclient',client_c.getPersonTreeclient) // ดึงรายการทำเนียบบุคลากร -9 
route.post('/getPersonCateListClient',client_c.getPersonCateListClient) // ดึงประเภทรายการทำเนียบบุคลากร -10
route.post('/getTeachingSClient',client_c.getTeachingSClient) // ดึงข้อมูลรายการตารางสอน - 11
route.post('/getStudentSClient',client_c.getStudentSClient) // ดึงข้อมูลรายการตารางเรียน - 12 
route.post('/getClassClient',client_c.getClassClient) // ดึงรายชื่อชั้นเรียน -13 
route.post('/getSyllabusClient',client_c.getSyllabusClient) // ดึงรายการหลักสูตร -14

module.exports = route