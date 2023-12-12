const express = require('express')
const route = express.Router()
const login_c = require('../controller/login')
const persons_pd_c = require('../controller/personal_directory')
const {upload_person_image, upload_file  } = require('../services/upload')
const delete_image = require('../services/delete_file')
const file_c = require('../controller/files')
////////////////////////////////////////////////////////////////////////////
// admin
////////////////////////////////////////////////////////////////////////////
// login
route.post('/login',login_c.login)
route.post('/adminRegister',login_c.adminRegister)

////////////////////////////////////////////////////////////////////////////
// person directory
////////////////////////////////////////////////////////////////////////////
// personal directory
route.post('/getAllPositionList',persons_pd_c.getAllPositionList)
route.post('/addPosition',persons_pd_c.addPosition)
route.post('/deletePosition',persons_pd_c.deletePosition)
route.post('/RenamePosition',persons_pd_c.RenamePosition)
route.post('/getPersonDirectoryOne',persons_pd_c.getPersonDirectoryOne)
route.post('/addPerson',upload_person_image,persons_pd_c.addPerson)
route.post('/editPerson',upload_person_image,persons_pd_c.editPerson)
route.post('/deletePerson',persons_pd_c.deletePerson)

////////////////////////////////////////////////////////////////////////////
// files
////////////////////////////////////////////////////////////////////////////
route.post('/addFileCategory',file_c.addFileCategory)
route.post('/renameFileCategory',file_c.renameFileCategory)
route.post('/deleteFileCategory',file_c.deleteFileCategory)
route.post('/getAllCategoryFile',file_c.getAllCategoryFile)
route.post('/addNewFile',upload_file,file_c.addNewFile)




route.post('/test_delete_image',(req,res)=>{
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
module.exports = route;