<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref, reactive, onMounted ,watch } from 'vue'
import { adminResponse, dataStatus } from '../../../store/Interface' 
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import {credential} from '../../../store/Interface'

const _api = new apiNamphong()
const _msg = new MsgAlert()
const dataStatus = ref<dataStatus>()
const admin_role = ref<Array<{title:string,value:string}>>([
    {
        title:'ผู้ใช้งาน',
        value:'user'
    },
    {
        title:'ผู้ดูแลระบบ',
        value:'admin'
    }
])
const userPermission = ref(false)
const credential = ref<credential>()
const credential_id = ref()
const credential_rule = ref()
const credential_image = ref()
onMounted(() => {
    credential.value = JSON.parse(localStorage.getItem('Credential')!)
    credential_id.value = credential.value!.user_id
    credential_rule.value = credential.value!.user_rule
    credential_image.value = credential.value!.user_image
    getAllData();
})


function getAllData(){
    if(searchValue.searchText === ''){
        // no value in seachValue the get common data
        getAllAdminLength()
        getAllAdmin()
    }else{
        // triger seachValue for seaching next after change category id       
        searchValue.searchTriger = !searchValue.searchTriger
    }
}

const totalAdmins = ref()
// get all admin length 
function getAllAdminLength(){
    _api.getAllAdminLength().then((res)=>{
        totalAdmins.value = res.data.length
        totalPage.value = Math.ceil(totalAdmins.value / sizeSelected.value)        
    })
}
 
// get all admin
const users = ref<Array<adminResponse>>()
const imagePath = ref()
function getAllAdmin(){
    dataStatus.value = 'loading_data'
    _api.getAllAdmin({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.status_code === 200){
            users.value = res.data.adminData
            imagePath.value = res.data.image_path
            if(users.value!.length >= 1){
                dataStatus.value = 'load_data_succ'
            }else if(users.value!.length <=0 ){
                dataStatus.value = 'no_data'
            }else {
                dataStatus.value = 'err_data'
            }
        }else{
            dataStatus.value = 'err_data'
            _msg.toast_msg({title:res.data.msg,timer:10,icon:'error',progressbar:true})
        }
    }).catch((err)=>{
        dataStatus.value = 'network_err'
        _msg.toast_msg({title:'เกิดความผิดพลาดในระบบ กรุณาติดต่อผู้ดูแลระบบ',timer:10,icon:'error'})
    })
}
const btnLoading = ref(false)

const adminDetailDrawer = ref(false)
const resetPasswordDialog = ref(false)
const addNewAdminDialog = ref(false)
const updateAdminDialog = ref(false)

const userDetail = ref<adminResponse>()

const imageFileUpload = ref<Array<File>>()
const defaultPassword = ref(false) // checkBox set password
const addNewPassword = ref()
const confirmAddNewPassword = ref()

const selectedRule = ref<'admin'|'user'>('user') // 

const addNewUsername = ref()
const addNewFirstName = ref()
const addNewLastName = ref()
const addNewEmail = ref()
const addNewPhone = ref()
const addNewAddress = ref()

type msgValidate = 'invalid' | 'valid' | 'no_data'
const errMsgPassword = ref<msgValidate>('no_data')
const errMsgConfirmPassword =ref<msgValidate>('no_data')
const errMsgUsername = ref<msgValidate>('no_data')
const errMsgFirstName = ref<msgValidate>('no_data')
const errMsgLastName = ref<msgValidate>('no_data')
const errMsgEmail = ref<msgValidate>('no_data')
const errMsgPhone = ref<msgValidate>('no_data')
// add
function addNewAdmin(){
    const formData = new FormData()
    
    if(imageFileUpload.value !== null && imageFileUpload.value !== undefined && imageFileUpload.value.length !== 0){ // iamge -1
        formData.append('admin_image',imageFileUpload.value[0])
    }else{
        formData.append('admin_image','no_image_upload')
    }
    formData.append('admin_username',addNewUsername.value) // username -2
    formData.append('admin_password',addNewPassword.value) // password -3 
    formData.append('admin_firstname',addNewFirstName.value) // firstname -4
    formData.append('admin_lastname',addNewLastName.value) // lastname -5
    formData.append('admin_email',addNewEmail.value) // email -6
    formData.append('admin_phone',addNewPhone.value) // phone -7
    formData.append('admin_address',addNewAddress.value) // address -8
    formData.append('admin_rule',selectedRule.value) // address -8
    formData.append('credential_admin_fullname',credential.value!.user_fullname) // credential admin fullname

    btnLoading.value = true
    _api.addNewAdmin(formData).then((res)=>{        
        if(res.data.status_code === 409){
            _msg.toast_msg({title:res.data.msg,progressbar:true,icon:'error',timer:10})
        }else if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,progressbar:true,icon:'success',timer:1})
            clearData('add_form')
            getAllData()
        }else{
            _msg.toast_msg({title:res.data.msg,progressbar:true,icon:'error',timer:20})
        }
        btnLoading.value =false
    }).catch((err)=>{
        _msg.toast_msg({title:'เกิดความผิดพลาดในระบบ โปรดแจ้งผู้ดูแลระบบ',progressbar:true,icon:'error',timer:20})
        btnLoading.value =false
    })
}

// update 
// set user detail drawer 
const userDetailIndex = ref() // set newuserData after update
function setUserDetailDrawer(item:adminResponse,index:number){
    userDetail.value = item
    userDetailIndex.value = index
    adminDetailDrawer.value = true
}
// set data in form
function setUserData(){
    addNewUsername.value = userDetail.value?.user_username
    addNewFirstName.value = userDetail.value?.user_firstname
    addNewLastName.value = userDetail.value?.user_lastname
    addNewEmail.value = userDetail.value?.user_email
    addNewPhone.value = userDetail.value?.user_phone
    addNewAddress.value = userDetail.value?.user_address
    if(userDetail.value?.user_rule === 'user'){
        selectedRule.value = 'user'
    }else{
        selectedRule.value = 'admin'
    }
    updateAdminDialog.value = true
}
function updateAdmin(){
    const formData = new FormData()
    
    if(imageFileUpload.value !== null && imageFileUpload.value !== undefined && imageFileUpload.value.length !== 0){ // iamge -1
        formData.append('admin_image',imageFileUpload.value[0])
    }else{
        formData.append('admin_image','no_image_upload')
    }
    formData.append('admin_image_old',userDetail.value!.user_image) // old image -2
    formData.append('admin_username',addNewUsername.value) // username -3
    formData.append('admin_username_old',userDetail.value!.user_username) // username -4
    formData.append('admin_firstname',addNewFirstName.value) // firstname - 5
    formData.append('admin_lastname',addNewLastName.value) // lastname -6
    formData.append('admin_email',addNewEmail.value) // email -7
    formData.append('admin_phone',addNewPhone.value) // phone -8
    formData.append('admin_address',addNewAddress.value) // address -9
    formData.append('admin_rule',selectedRule.value) // rule -10
    formData.append('credential_admin_fullname',credential.value!.user_fullname) // credential admin fullname - 11 
    formData.append('admin_id',String(userDetail.value!.user_id))

    _msg.confirm('คุณต้องการบันทึกข้อมูลใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            btnLoading.value = true
            _api.updateAdmin(formData).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,progressbar:true,timer:3,icon:'success'})
                    userDetail.value!.user_image = res.data.new_image
                    userDetail.value!.user_firstname = addNewFirstName.value
                    userDetail.value!.user_lastname = addNewLastName.value
                    userDetail.value!.user_address = addNewAddress.value
                    userDetail.value!.user_email = addNewEmail.value
                    userDetail.value!.user_phone = addNewPhone.value
                    userDetail.value!.user_rule = selectedRule.value
                    // update image to local storage
                    if(credential_id.value === userDetail.value?.user_id){
                        credential_image.value = res.data.new_image
                        credential.value!.user_image = res.data.new_image
                        localStorage.setItem('Credential', JSON.stringify(credential.value));
                    }

                    getAllData();
                    
                    
                }else{
                    _msg.toast_msg({title:res.data.msg,progressbar:true,timer:10,icon:'error'})
                }
                btnLoading.value= false 
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดความผิดพลาดในระบบบ กรุณาติดต่อผู้ดูแลระบบ',progressbar:true,timer:10,icon:'error'})
                btnLoading.value= false 
            })
        }
    })
}

// delete user
function deleteUser(){
    _msg.confirm('คุณต้องการลบผู้ใช่งานใช่หรือไม่').then((isConfirm)=>{
        if(isConfirm){
            _api.deleteAdmin({
                image_name:userDetail.value!.user_image,
                user_id:userDetail.value!.user_id,
                user_fullname:`${userDetail.value!.user_firstname} ${userDetail.value!.user_lastname}`,
                credential_admin_fullname:credential.value!.user_fullname})
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,timer:3,icon:'success',progressbar:true})
                    getAllData();
                    adminDetailDrawer.value = false
                    userDetail.value = undefined
                    
                } else{
                    _msg.toast_msg({title:res.data.msg,timer:10,icon:'error',progressbar:true})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดข้อผิดพลาดในระบบ ไม่สามารถดำเนินการได้ กรุณาติดต่อผู้ดูแลระบบ',timer:10,icon:'error',progressbar:true})
            })
        }
    })
}

// reset password 
function resetPassword(){
    _msg.confirm('หากเปลี่ยนรหัสผ่านแล้วจะไม่สามารกลับไปใช้รหัสผ่านเดิมได้ ตกลงหรือไม่').then((isConfirmed)=>{
        if(isConfirmed){
            _api.resetPassword({
                password:addNewPassword.value,
                user_id:userDetail.value!.user_id,
                user_username:`${userDetail.value!.user_firstname} ${userDetail.value!.user_lastname}`,
                credential_admin_fullname:credential.value!.user_fullname,
                credential_admin_id:credential.value!.user_id
            }).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
                    clearData('reset_password')
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'ระบบเกิดปัญหา กรุณาติดต่อผู้ดูแลระบบ',icon:'error',progressbar:true,timer:20})

            })
        }
    })
}

// clear form
function clearData(formType: 'add_form' | 'update_form' | 'reset_password'){
    if(formType === 'add_form'){
        imageFileUpload.value = []
        addNewUsername.value = ''
        addNewPassword.value = ''
        addNewFirstName.value = '' 
        addNewLastName.value = ''
        addNewPhone.value = ''
        addNewEmail.value = ''
        addNewAddress.value = ''
        addNewAdminDialog.value = false
    }else if(formType === 'reset_password'){
        resetPasswordDialog.value =false
    }else if(formType === 'update_form'){
        imageFileUpload.value = []
        addNewUsername.value = ''
        addNewPassword.value = ''
        addNewFirstName.value = '' 
        addNewLastName.value = ''
        addNewPhone.value = ''
        addNewEmail.value = ''
        addNewAddress.value = ''
        selectedRule.value = 'user'
        updateAdminDialog.value = false
    }
    defaultPassword.value = false
    addNewPassword.value = ''
    confirmAddNewPassword.value = ''

    selectedRule.value = 'admin'
    errMsgPassword.value = 'no_data'
    errMsgConfirmPassword.value = 'no_data'
    errMsgUsername.value = 'no_data'
    errMsgFirstName.value = 'no_data'
    errMsgLastName.value = 'no_data'
    errMsgEmail.value = 'no_data'
    errMsgPhone.value = 'no_data'
}

// detect username 
watch(addNewUsername, ()=>{    
    if(addNewUsername.value === ''){
        errMsgUsername.value = 'no_data'     
    }else if(addNewUsername.value.length >= 6 && /^[a-zA-Z0-9]*$/.test(addNewUsername.value) ){
        errMsgUsername.value = 'valid'
    }else{
        errMsgUsername.value = 'invalid'
    }    
})

// detect validate password 
watch(addNewPassword ,()=>{    
    if(addNewPassword.value === ''){
        errMsgPassword.value = 'no_data'        
    }else if(addNewPassword.value.length >= 6 && /^[a-zA-Z0-9]*$/.test(addNewPassword.value)){
        errMsgPassword.value = 'valid'
    }else{
        errMsgPassword.value = 'invalid'
    }

    if(confirmAddNewPassword.value === addNewPassword.value){        
        errMsgConfirmPassword.value = 'valid'
    }else{
        errMsgConfirmPassword.value = 'invalid'
    }
    
})

// detect validate confirmpassword
watch(confirmAddNewPassword,()=>{
    if(confirmAddNewPassword.value === ''){
        errMsgConfirmPassword.value = 'no_data'
    }else if(confirmAddNewPassword.value !== addNewPassword.value){
        errMsgConfirmPassword.value = 'invalid'
    }else{
        errMsgConfirmPassword.value = 'valid'
    }

})

// detect first name 
watch(addNewFirstName, ()=>{
    if(addNewFirstName.value === ''){
        errMsgFirstName.value = 'no_data'
    }else if(!!!addNewFirstName.value){
        errMsgFirstName.value = 'invalid'
    }else{
        errMsgFirstName.value = 'valid'
    }
})

// detect last name 
watch(addNewLastName, ()=>{
    if(addNewLastName.value === ''){
        errMsgLastName.value = 'no_data'
    }else if(!!!addNewLastName.value){
        errMsgLastName.value = 'invalid'
    }else{
        errMsgLastName.value = 'valid'
    }
})

// detect email
watch(addNewEmail, ()=> {
    var emailValidate =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(addNewEmail.value === ''){
        errMsgEmail.value = 'no_data'
    }else if(emailValidate.test(addNewEmail.value)){
        errMsgEmail.value = 'valid'
    }else{
        errMsgEmail.value = 'invalid'
    }
})

//detect validate phone
watch(addNewPhone, ()=>{
    if(addNewPhone.value === ''){
        errMsgPhone.value = 'no_data'
    }else if(addNewPhone.value.length === 10 && /^\d+$/.test(addNewPhone.value)){
        errMsgPhone.value = 'valid'
    }else{
        errMsgPhone.value = 'invalid'
    }
})

// detect validate default password
watch(defaultPassword,()=>{
    if(defaultPassword.value === true){
        addNewPassword.value = 'namphong2566'
        confirmAddNewPassword.value = 'namphong2566'
    }else{
        addNewPassword.value = ''
        confirmAddNewPassword.value = ''
    }
})

// detect user detail drawer
watch(adminDetailDrawer,()=>{
    if(userDetail.value === undefined) {
        adminDetailDrawer.value = false 
    }
})


// pagination 
const totalPage = ref()  
const size = ref([25,50,100]) // 
const sizeSelected = ref(size.value[0]) // "LIMIT"
const currentPage = ref(1) // current page
const startItem = ref<number>(0) // first item "OFFSET"
const pagination = ref(1) // v-model v-pagination 

function changePage(){
    currentPage.value = pagination.value
    startItem.value = (currentPage.value -1) * sizeSelected.value 
}

// detect pagination 
watch(pagination,()=>{         
    changePage()
    getAllData()
})

// detect sizeSelected
watch(sizeSelected,()=>{
    pagination.value = 1 // reset
    changePage()
    getAllData()
})

// search 
const searchValue = reactive({
    searchText:'',
    searchTriger:false // triger 
})

const timeoutId = ref()
watch(searchValue , ()=>{    
    clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(() => {
        if(searchValue.searchText.trim() === ''){
            getAllData()
        }else{
            dataStatus.value = 'loading_data'
            _api.searchAdmin({search_keyword:searchValue.searchText,start_item:startItem.value,limit:sizeSelected.value}).then((res)=>{
                if(res.data.status_code === 200 ){
                    totalAdmins.value = res.data.admins_data_length
                    users.value = res.data.admins_data
                    totalPage.value = Math.ceil(totalAdmins.value / sizeSelected.value)   
                    if(users.value!.length >= 1){
                        dataStatus.value = 'load_data_succ'
                    }else if(users.value!.length <=0 ){
                        dataStatus.value = 'no_data'
                    }else {
                        dataStatus.value = 'err_data'
                    }     
                }else{
                    dataStatus.value = 'err_data'
                    _msg.toast_msg({title:res.data.msg,timer:10,icon:'error',progressbar:true})
                }
            }).catch((err)=>{
                dataStatus.value = 'network_err'
                _msg.toast_msg({title:'เกิดความผิดพลาดในระบบ กรุณาติดต่อผู้ดูแลระบบ',timer:10,icon:'error'})
            })
        }
    },500)
})

// // detect permission
// watch(userPermission,()=>{
//     if(credential_rule.value === 'admin'){
//         userPermission.value = true
//     }else{
//         if(credential_id.value === userDetail.value?.user_id){
//             userPermission.value = true
//         }else{
//             userPermission.value = false
//         }
//     }
// })
</script>

<template>
    <AdminNavigationBar :image="credential_image">
        <div class="flex flex-col w-full h-full">
            <div class="w-full flex flex-wrap p-1">
                <div class="w-1/2">
                    <v-btn class="h-full" color="pink" size="large" @click="addNewAdminDialog = !addNewAdminDialog" 
                    v-if="credential_rule === 'admin'">
                        <p class="text-md" >
                            <v-icon icon="mdi-account-plus"></v-icon> เพิ่มผู้ดูแลระบบ
                        </p>
                    </v-btn>
                </div>
                <div class="w-1/2 flex justify-end items-center">
                    <v-text-field
                        label="ค้นหา"
                        v-model="searchValue.searchText"
                        class=""
                        hide-details
                        variant="outlined"
                        prepend-inner-icon="mdi-magnify"
                        bg-color=""
                        density="comfortable"
                        required
                    ></v-text-field>
                </div>
            </div>
            <div class=" px-4">
               <p class="text-lg"> จำนวนรายการ : {{ totalAdmins }}</p>
            </div>
            <v-divider class="border-opacity-100"></v-divider>
            <div class="w-full flex flex-col gap-3 mt-3">
                <v-table v-if="dataStatus === 'load_data_succ'">
                    <thead>
                        <tr>
                            <th class="w-[20px]">#</th>
                            <th class="pl-6">ผู้ใช้งาน</th>
                            <th class="w-[100px] text-center">เบอร์โทร</th>
                            <th class="w-[300px] text-center">ใช้งานล่าสุด</th>
                            <th class="w-[100px] text-center">สิทธิ์</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,i) in users" :key="item.user_id" @click="setUserDetailDrawer(item,i)"
                        class="cursor-pointer hover:bg-pink-50">
                            <td> {{ i+1 }}</td>
                            <td class="py-2">
                                <div class="flex flex-row w-full">
                                    <div class="w-fit rounded-full border-2 border-pink-100">
                                        <img class="min-w-[80px] w-[80px] h-[80px] rounded-full object-cover" v-if="item.user_image !== 'no_image_upload'"
                                        :src="imagePath+item.user_image" alt="">
                                        <img class="min-w-[80px] w-[80px] h-[80px] rounded-full object-cover" v-else
                                        src="/images/avartars/default_avatar.png" alt="">
                                    </div>
                                    <div class="w-full flex flex-col pl-6 justify-center items-start">
                                        <p class="text-md">
                                             {{ item.user_firstname }} {{ item.user_lastname }}
                                        </p>
                                        <p class="text-[14px] text-gray-500">
                                             {{ item.user_email }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="text-center"> {{ item.user_phone }}</td>
                            <td class="text-center"> {{ item.user_latest_login_date}} </td>
                            <td class="text-center">
                                <v-chip v-if="item.user_rule === 'admin'" color="pink"> ผู้ดูแลระบบ</v-chip>
                                <v-chip v-else-if="item.user_rule === 'user'" color="primary"> ผู้ใช้งานปกติ </v-chip>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <div v-else-if="dataStatus === 'loading_data'" class="w-full h-full flex justify-center items-center">
                    <div class=" flex flex-col items-center">
                        <v-progress-circular indeterminate color="pink" :size="90" :width="12"></v-progress-circular>
                        <p class="text-xl mt-2 text-pink-600"> กำลังโหลดข้อมูลกรุณารอสักครู่...</p>
                    </div>
                </div>
                <div v-else-if="dataStatus === 'no_data'" class="w-full h-full flex justify-center items-center">
                    <div class=" flex flex-col items-center">
                        <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                            <img src="/images/illustrations/No data.svg" 
                            class="h-full w-full" alt="">
                        </div>
                        <p class="text-xl text-pink-600"> ไม่มีข้อมูลในระบบ</p>
                    </div>
                </div>
                <div v-else-if="dataStatus === 'err_data'" class="w-full h-full flex justify-center items-center">
                    <div class=" flex flex-col items-center">
                        <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                            <img src="/images/illustrations/No data-amico.svg" 
                            class="h-full w-full" alt="">
                        </div>
                        <p class="text-xl text-pink-600"> เกิดข้อผิดพลาดในการรับข้อมูล</p>
                    </div>
                </div>
                <div v-else-if="dataStatus === 'network_err'" class="w-full h-full flex justify-center items-center">
                    <div class=" flex flex-col items-center">
                        <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                            <img src="/images/illustrations/500 Internal Server Error-amico.svg" 
                            class="h-full w-full" alt="">
                        </div>
                        <p class="text-xl text-pink-600"> ไม่สามารถติดต่อกันเซิร์ฟเวอร์ได้ </p>
                    </div>
                </div>
                <v-divider class="border-opacity-75"></v-divider>
            
                <div class="w-full flex justify-end mt-3 pr-12">
                    <div class="w-[100px]">
                        <v-select
                            :items="size"
                            variant="outlined"
                            v-model="sizeSelected"
                            hide-details="auto"
                        ></v-select>
                    </div>
                    <div class="sm:w-fit">
                        <v-pagination 
                            :length="totalPage"
                            v-model="pagination"
                            :total-visible="3"
                            >
                        </v-pagination>
                    </div>
                </div>
                <!-- <div v-for="(item,i) in users" :key="item.user_id" @click="adminDetailDrawer = true"
                class="w-full h-[100px] flex flex-row rounded-md border-2 shadow-md hover:shadow-pink-200 duration-200
                cursor-pointer p-2">
                    <div class="w-[80px] h-full flex justify-center items-center border-2 rounded-full">
                        <img class="w-[80px] h-full rounded-full object-cover" v-if="item.user_image !== 'no_image_upload'"
                        :src="imagePath+item.user_image" alt="">
                        <img class="w-[80px] h-full rounded-full object-cover" v-else
                        src="/images/avartars/default_avatar.png" alt="">
                    </div>
                    <div class="w-[300px] flex flex-col justify-center items-start px-3">
                        <p>
                            ชื่อผู้ใช้งาน : {{ item.user_username }}
                        </p>
                        <p>
                            ชื่อ : {{ item.user_firstname }} {{ item.user_lastname }}
                        </p>
                    </div>
                    <div class="w-[300px] flex flex-col justify-center items-start px-3">
                        <p>
                            อีเมล : {{ item.user_email }}
                        </p>
                        <p>
                            เบอร์โทรศัพท์ : {{ item.user_phone }}
                        </p>
                    </div>
                </div> -->
            </div>
        </div>


        <v-navigation-drawer :disable-resize-watcher="true" :width="350" location="right" v-model="adminDetailDrawer">
            <div class="w-full h-full flex flex-col px-2 ">
                <div class="w-full h-auto flex flex-row justify-start text-4xl text-gray-500" >
                    <v-icon 
                        class=" hover:text-gray-400 cursor-pointer duration-300" 
                        icon="mdi-chevron-right" 
                        @click="adminDetailDrawer = false ">
                    </v-icon>
                </div>
                <div class="w-full flex items-ceter justify-center">
                    <div class="border-2 rounded-md p-2 w-full h-[300px] flex items-ceter justify-center">
                        <img class="rounded-md object-cover h-full" 
                        v-if="userDetail?.user_image !== 'no_image_upload'"
                        :src="imagePath+userDetail?.user_image" alt="">
                        <img class="rounded-md object-cover h-full" 
                        v-else src="/images/avartars/default_avatar.png" alt="">
                    </div>
                </div>
                <div class="w-full pl-3 pb-3 mt-6">
                    <p class="text-md line-clamp-4"> 
                        ชื่อผู้ใช้งาน : {{ userDetail?.user_username }}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md line-clamp-4" v-if="userDetail?.user_rule === 'user'"> 
                        สิทธิ์ผู้ใช้งาน : <v-chip color="primary">ผู้ใช้งานปกติ</v-chip> 
                    </p>
                    <p class="text-md line-clamp-4" v-if="userDetail?.user_rule === 'admin'"> 
                        สิทธิ์ผู้ใช้งาน : <v-chip color="pink">ผู้ดูแลระบบ</v-chip> 
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md"> 
                        ชื่อ-นามสกุล : {{ userDetail?.user_firstname }} {{ userDetail?.user_lastname }}
                     </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md"> 
                        อีเมล : {{ userDetail?.user_email }}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md"> 
                        เบอร์โทรศัพท์ :  {{ userDetail?.user_phone }}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md"> 
                        ที่อยู่ :  {{ userDetail?.user_address }}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md"> 
                        เป็นสมาชิก :  {{ userDetail?.user_join_date }}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md"> 
                        ใช้งานล่าสุด :  {{ userDetail?.user_latest_login_date }}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full flex flex-col gap-1 pb-2">
                    <v-btn 
                        @click="setUserData()"
                        color="blue"    
                        class="w-full" 
                    >
                        <p v-if="credential_id === userDetail?.user_id || credential_rule === 'admin'">
                            จัดการ
                        </p>
                        <p v-else="credential_id === userDetail?.user_id">
                            ดูข้อมูล
                        </p>
                    </v-btn>
                    <v-btn 
                        v-if="credential_id === userDetail?.user_id || credential_rule === 'admin'"
                        @click="resetPasswordDialog =! resetPasswordDialog"
                        color="primary" 
                        class="w-full">
                        <v-icon class="mr-3">mdi-lock</v-icon>
                        เปลี่ยนรหัสผ่าน
                    </v-btn>
                    <v-btn
                    @click="deleteUser()"
                    v-if="(credential_id === userDetail?.user_id || credential_rule === 'admin') && credential_id !== userDetail?.user_id "
                    color="red" class="w-full">
                        ลบ
                    </v-btn>
                </div>
            </div>
        </v-navigation-drawer>

    </AdminNavigationBar>
 
    <!-- add new admin  -->
    <v-dialog
        persistent
        v-model="addNewAdminDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     เพิ่มผู้ใช้งาน
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full">
                            <v-file-input
                                accept="image/*"
                                v-model="imageFileUpload"
                                placeholder="เลือกภาพประจำตัว"
                                label="เลือกภาพประจำตัว"
                                class=""
                                name="admin_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <v-select
                            v-if="credential!.user_rule === 'admin'"
                            label="สถานนะ"
                            :items="admin_role"
                            v-model="selectedRule"
                            item-title="title"
                            item-value="value"
                            hide-details
                            variant="outlined"
                            class="mt-3"
                        ></v-select>
                        <div class="w-full">
                            <v-text-field
                                label="*ชื่อผู้ใช้งาน"
                                v-model="addNewUsername"
                                :rules="[
                                    ()=> errMsgUsername === 'valid' || 'กรุณากรอกชื่อผู้ใช้งานอย่างน้อย 6 ตัวอักษรและเป็นภาษาอังกฤษ'
                                ]"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="w-full flex flex-row">
                            <div class="w-full">
                                <v-text-field
                                    label="*รหัสผ่าน"
                                    :readonly="defaultPassword"
                                    v-model="addNewPassword"
                                    type="password"
                                    :rules="[
                                        ()=> errMsgPassword === 'valid' || 'กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษรและเป็นภาษาอังกฤษ'
                                    ]"
                                    class="mt-3"
                                    variant="outlined"
                                    hide-details="auto"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="w-fit h-full flex justify-center items-center mt-3">
                                <v-checkbox hide-details color="pink" v-model="defaultPassword"
                                >
                                    <v-tooltip location="top" activator="parent">
                                        ใช้รหัสผ่านเริ่มต้น 
                                        <br>' namphong2566 '
                                    </v-tooltip>
                                </v-checkbox>
                            </div>
                        </div>
                        <div class="w-full">
                            <v-text-field
                            label="*ยืนยันรหัสผ่าน"
                            :disabled="!!!addNewPassword"
                            :readonly="defaultPassword"
                            v-model="confirmAddNewPassword"
                            type="password"
                            :rules="[
                                ()=> errMsgConfirmPassword === 'valid' || 'กรุณากรอกรหัสผ่านให้ตรงกัน'
                            ]"
                            class="mt-3"
                            variant="outlined"
                            hide-details="auto"
                            required
                            ></v-text-field>
                        </div>
                        
                        <div class="w-full flex flex-row gap-4">
                            <div class="w-1/2">
                                <v-text-field
                                    label="*ชื่อจริง"
                                    v-model="addNewFirstName"
                                    :rules="[
                                        () => errMsgFirstName === 'valid' || 'กรุณากรอกชื่อจริง'
                                    ]"
                                    class="mt-3"
                                    variant="outlined"
                                    hide-details="auto"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="w-1/2">
                                <v-text-field
                                    v-model="addNewLastName"
                                    :rules="[
                                        ()=> errMsgLastName === 'valid' || 'กรุณากรอกนามสกุล'
                                    ]"
                                    label="*นามสกุล"
                                    class="mt-3"
                                    variant="outlined"
                                    hide-details="auto"
                                    required
                                ></v-text-field>
                            </div>
                        </div>
                        <div class="w-full">
                            <v-text-field
                            label="*อีเมล"
                            v-model="addNewEmail"
                            :rules="[
                                () => errMsgEmail === 'valid' || 'กรุณากรอก Email ให้ถูกต้อง'
                            ]"
                            class="mt-3"
                            variant="outlined"
                            hide-details="auto"
                            required
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-text-field
                            label="เบอร์โทร"
                            v-model="addNewPhone"
                            :rules="[
                                ()=> errMsgPhone === 'valid' || 'กรุณากรอกเบอร์โทรให้ถูกต้อง และเป็นตัวเลข'
                            ]"
                            class="mt-3"
                            variant="outlined"
                            hide-details="auto"
                            maxlength="10"
                            required
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-textarea 
                                label="ที่อยู่"
                                class="mt-3"
                                v-model="addNewAddress"
                                hide-details
                                variant="outlined"
                                bg-color=""
                            ></v-textarea >
                        </div>
                    </div>
                </div>
                <div class="w-full flex mt-4 justify-end px-6 gap-4">
                    <v-btn color="red" @click="clearData('add_form')">
                        ยกเลิก
                    </v-btn>
                    <v-btn color="green" 
                        :loading="btnLoading"
                        @click="addNewAdmin()"
                        :disabled="
                            errMsgPassword !== 'valid' || 
                            errMsgConfirmPassword !== 'valid' || 
                            errMsgUsername !== 'valid' ||
                            errMsgFirstName !== 'valid' ||  
                            errMsgLastName !== 'valid' || 
                            errMsgEmail !== 'valid' || 
                            errMsgPhone !== 'valid'"
                    >
                        เพิ่มผู้ดูแลระบบ
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- update admin  -->
    <v-dialog
        persistent
        v-model="updateAdminDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     แก้ไขผู้ใช้งาน
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full">
                            <v-file-input v-if="(userDetail!.user_id === credential_id) || credential_rule === 'admin'"
                                accept="image/*"
                                v-model="imageFileUpload"
                                placeholder="เลือกภาพประจำตัว"
                                label="เลือกภาพประจำตัว"
                                class=""
                                name="admin_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <v-select
                            v-if="credential!.user_rule === 'admin'"
                            label="สถานนะ"
                            :readonly="(userDetail!.user_id !== credential_id) && credential_rule !== 'admin'"
                            :items="admin_role"
                            v-model="selectedRule"
                            item-title="title"
                            item-value="value"
                            hide-details
                            variant="outlined"
                            class="mt-3"
                        ></v-select>
                        <div class="w-full">
                            <v-text-field
                                label="*ชื่อผู้ใช้งาน"
                                v-model="addNewUsername"
                                :readonly="(userDetail!.user_id !== credential_id) && credential_rule !== 'admin'"
                                :rules="[
                                    ()=> errMsgUsername === 'valid' || 'กรุณากรอกชื่อผู้ใช้งานอย่างน้อย 6 ตัวอักษรและเป็นภาษาอังกฤษ'
                                ]"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>   
                        <div class="w-full flex flex-row gap-4">
                            <div class="w-1/2">
                                <v-text-field
                                    label="*ชื่อจริง"
                                    v-model="addNewFirstName"
                                    :readonly="(userDetail!.user_id !== credential_id) && credential_rule !== 'admin'"
                                    :rules="[
                                        () => errMsgFirstName === 'valid' || 'กรุณากรอกชื่อจริง'
                                    ]"
                                    class="mt-3"
                                    variant="outlined"
                                    hide-details="auto"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="w-1/2">
                                <v-text-field
                                    v-model="addNewLastName"
                                    :readonly="(userDetail!.user_id !== credential_id) && credential_rule !== 'admin'"
                                    :rules="[
                                        ()=> errMsgLastName === 'valid' || 'กรุณากรอกนามสกุล'
                                    ]"
                                    label="*นามสกุล"
                                    class="mt-3"
                                    variant="outlined"
                                    hide-details="auto"
                                    required
                                ></v-text-field>
                            </div>
                        </div>
                        <div class="w-full">
                            <v-text-field
                            label="*อีเมล"
                            v-model="addNewEmail"
                            :readonly="(userDetail!.user_id !== credential_id) && credential_rule !== 'admin'"
                            :rules="[
                                () => errMsgEmail === 'valid' || 'กรุณากรอก Email ให้ถูกต้อง'
                            ]"
                            class="mt-3"
                            variant="outlined"
                            hide-details="auto"
                            required
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-text-field
                            label="เบอร์โทร"
                            :readonly="(userDetail!.user_id !== credential_id) && credential_rule !== 'admin'"
                            v-model="addNewPhone"
                            :rules="[
                                ()=> errMsgPhone === 'valid' || 'กรุณากรอกเบอร์โทรให้ถูกต้อง และเป็นตัวเลข'
                            ]"
                            class="mt-3"
                            variant="outlined"
                            hide-details="auto"
                            maxlength="10"
                            required
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-textarea 
                                label="ที่อยู่"
                                class="mt-3"
                                :readonly="(userDetail!.user_id !== credential_id) && credential_rule !== 'admin'"
                                hide-details
                                v-model="addNewAddress"
                                variant="outlined"
                                bg-color=""
                            ></v-textarea >
                        </div>
                    </div>
                </div>
                <div class="w-full flex mt-4 justify-end px-6 gap-4">
                    <v-btn color="red" @click="clearData('update_form')">
                        <span v-if="(userDetail!.user_id === credential_id) || credential_rule=== 'admin'">ยกเลิก</span>
                        <span v-else>ปิด</span>
                        
                    </v-btn>
                    <v-btn color="primary" v-if="(userDetail!.user_id === credential_id) || credential_rule=== 'admin'"
                        @click="updateAdmin()"
                        :loading="btnLoading"
                        :disabled="
                            errMsgUsername !== 'valid' ||
                            errMsgFirstName !== 'valid' ||  
                            errMsgLastName !== 'valid' || 
                            errMsgEmail !== 'valid' || 
                            errMsgPhone !== 'valid'"
                    >
                        บันทึก
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- reset password -->
    <v-dialog
        persistent
        v-model="resetPasswordDialog"
        width="550"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                        เปลี่ยนรหัสผ่าน
                </div>
                <div class="w-full pb-4 px-4">
                    <v-text-field
                        label="รหัสผ่าน"
                        class="mt-4"
                        v-model="addNewPassword"
                        type="password"
                        autocomplete="current-password"
                        :readonly="defaultPassword"
                        :rules="[
                            ()=> errMsgPassword === 'valid' || 'กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษรและเป็นภาษาอังกฤษ'
                        ]"
                        hide-details="auto"
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-text-field
                        label="ยืนยันรหัสผ่าน"
                        class="mt-4"
                        v-model="confirmAddNewPassword"
                        :readonly="defaultPassword"
                        :rules="[
                                ()=> errMsgConfirmPassword === 'valid' || 'กรุณากรอกรหัสผ่านให้ตรงกัน'
                        ]"
                        type="password"
                        autocomplete="current-password"
                        hide-details="auto"
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-checkbox hide-details color="pink" v-model="defaultPassword"
                    label="ใช้รหัสผ่านเริ่มต้น ">
                        <v-tooltip location="top" activator="parent">
                            namphong2566
                        </v-tooltip>
                    </v-checkbox>
                </div>
                <div class="w-full flex justify-end px-6 gap-4">
                    <v-btn color="red" @click="clearData('reset_password')">
                        ยกเลิก
                    </v-btn>
                    <v-btn color="green" 
                    :disabled="!!!addNewPassword || !!!confirmAddNewPassword || errMsgConfirmPassword !== 'valid'"
                    @click="resetPassword()">
                        เปลี่ยนรหัสผ่าน
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
 
</template>


<style>
 
</style>
