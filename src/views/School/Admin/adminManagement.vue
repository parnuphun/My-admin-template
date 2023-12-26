<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref, onMounted ,watch } from 'vue'
import {imageValidate} from '../../../services/validationRules'
import { adminResponse } from '../../../store/Interface' 
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import {isUsername , isPasswordStrength , isEmail , isAllNumber , required} from '../../../services/validationRules'

const _api = new apiNamphong()
const _msg = new MsgAlert()



onMounted(() => {
    getAllAdmin()
})

 
// get all admin
const users = ref<Array<adminResponse>>()
const imagePath = ref()
function getAllAdmin(){
    _api.getAllAdmin().then((res)=>{
        if(res.data.status){
            users.value = res.data.adminData
            imagePath.value = res.data.image_path
            
        }else{
            _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
        }
    })
}


// add new admin 
const addNewAdminDialog = ref(false)
const adminImage = ref()
const username = ref()
const password = ref()
const confirmPassword = ref()
const firstname = ref()
const lastname = ref()
const email = ref()
const phone = ref()
const address = ref()
 
function addNewAdmin(){
    const formData = new FormData()
    if(adminImage.value === undefined || adminImage.value === null){
        formData.append('admin_image','no_image_upload')
    }else{
        formData.append('admin_image',adminImage.value[0])
    }
    formData.append('username',username.value)
    formData.append('password',password.value)
    formData.append('firstname',firstname.value)
    formData.append('lastname',lastname.value)
    formData.append('email',email.value)
    formData.append('phone',phone.value)
    formData.append('address',address.value)
 
    _api.addNewAdmin(formData).then((res)=>{
        if(res.data.status){
            _msg.toast_msg({title:res.data.msg,timer:3,icon:'success'})
            getAllAdmin()
            resetFormAdmin()
        }
        else {
            _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
            password.value = ''
            confirmPassword.value = ''
        }

    })
}

const editAdminDialog = ref(false)
const adminImageDetail = ref()
const editAdminid = ref()
const editAdminOldusername = ref()
const editAdminIndex = ref()
function editAdminDialogF(user_index:number){
    if(users.value){
        console.log('===>',users.value[user_index]);
        
        // send value to edit dialog 
        editAdminIndex.value = user_index
        username.value = users.value[user_index].user_username
        editAdminOldusername.value = users.value[user_index].user_username
        firstname.value = users.value[user_index].user_firstname
        lastname.value = users.value[user_index].user_lastname
        email.value = users.value[user_index].user_email
        phone.value = users.value[user_index].user_phone
        address.value = users.value[user_index].user_address
        adminImageDetail.value = users.value[user_index].user_image
        editAdminid.value = users.value[user_index].user_id
        editAdminDialog.value = true
        
    }
}
//update user
function updateAdmin(){
    const formData = new FormData()
    console.log(address.value);

    // ถ้าอัพภาพให่เข้าไปให้ส่งภาพเก่าเพื่อไปลบ
    // แต่ถ้าไม่ได้อัพภาพใหม่ก็แค่ส่งภาพเก่าเข้าอัพเดทเหมือนเดิม
    if(adminImage.value === undefined || adminImage.value === null){
        formData.append('admin_image','no_image_upload')
        formData.append('oldimage',adminImageDetail.value)
    }else{
        formData.append('admin_image',adminImage.value[0])
        formData.append('oldimage',adminImageDetail.value)
    }
    formData.append('userid',editAdminid.value) // id สำหรับแก้ไข
    formData.append('username',username.value)
    formData.append('oldUsername',editAdminOldusername.value)
    formData.append('firstname',firstname.value)
    formData.append('lastname',lastname.value)
    formData.append('email',email.value)
    formData.append('phone',phone.value)
    formData.append('address',address.value)
    
    _api.updateAdmin(formData).then(async(res)=>{
        if(res.data.status){
            _msg.toast_msg({title:res.data.msg,timer:3,icon:'success'})
            adminImageDetail.value = res.data.new_image_name
            getAllAdmin()          
            adminImage.value = null
        }
        else {
            _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
        }

    })
}

//delete user
function deleteUser(user_id:number,image:string){
    _msg.confirm('คุณต้องการลบผู้ใช่งานใช่หรือไม่').then((isConfirm)=>{
        _api.deleteAdmin({image_name:image,user_id:user_id,user_fullname:'',credential_admin_fullname:''}).then((res)=>{
            if(res.data.status) _msg.toast_msg({title:res.data.msg,timer:3,icon:'success'})
            else  _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
            getAllAdmin();
        })
    })
}

//validate
const usernameRule = [(v:any)=>isUsername(v)]
const passwordStrRule = [(v:any) => isPasswordStrength(v)]
const phoneRule = ref(false)
watch(phone,()=>{
    if(phone.value.length === 10) {
        phoneRule.value = true
    } 
})

// reset variable after save or add 
function resetFormAdmin(){
    adminImage.value = null
    username.value = ''
    password.value = ''
    confirmPassword.value = ''
    firstname.value = ''
    lastname.value = ''
    email.value = ''
    phone.value = ''
    address.value = ''
    adminImageDetail.value = ''
    editAdminid.value = ''
    editAdminOldusername.value = ''
}
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col w-full h-full border-gray-300 border-2 ">
            <div class="w-full h-full flex flex-col overflow-hidden">
                <div class="w-full h-[75px] min-[75px]: border-b-2 border-gray-300 bg-white
                 flex justify-between items-center px-2 py-3 ">

                 <div class="w-full h-full flex flex-row justify-start items-center gap-2 ">
                        <div class="flex h-full items-start justify-center ">
                            <v-btn class="h-full" color="green" size="large" @click="addNewAdminDialog = !addNewAdminDialog">
                                <p class="text-md" >
                                    <v-icon icon="mdi-account-plus"></v-icon> เพิ่มผู้ใช้งาน
                                </p>
                            </v-btn>
                        </div>
                    </div>
                    <div class="w-fit">
                        <v-pagination density="comfortable" :length="4"></v-pagination>
                    </div>
                </div>
                <!-- table -->
                <div class="bg-white w-full h-full pb-4 border-b-2  ">
                    <v-table class="h-[100%] overflow-x-hidden" fixed-header>
                        <thead>
                            <tr>
                                <th class="text-left w-10">
                                    #
                                </th>
                                <th class="text-center w-[100px]">
                                    รูปภาพ
                                </th>
                                <th class="text-left w-auto">
                                    ชื่อผู้ใช้งาน
                                </th>
                                <th class="text-left w-auto">
                                    ชื่อ
                                </th>
                                <th class="text-left w-80 ">
                                    อีเมล
                                </th>
                                <th class="text-center w-40 ">
                                    เบอร์โทร
                                </th>
                                <th class="text-center w-44">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover:bg-gray-200" v-for="(item, i) in users"
                                :key="item.user_id">
                                <td> {{ i + 1 }} </td>
                                <td class="py-2">
                                    <div class="flex w-full h-full justify-center">
                                        <img v-if="item.user_image !== 'no_image_upload'"
                                        :src="imagePath+item.user_image"
                                        class="object-cover h-[70px] w-[70px] rounded-full" alt="">
                                        <img v-else
                                        src="/images/avartars/default_avatar.png"
                                        class="object-cover h-[70px] w-[70px] rounded-full" alt="">
                                    </div>
                                </td>
                                <td>
                                    <p class="line-clamp-1">
                                        {{ item.user_username }}
                                    </p>
                                </td>
                                <td>
                                    <p class="line-clamp-1">
                                        {{ item.user_firstname }} {{ item.user_lastname }}
                                    </p>
                                </td>
                                <td class="text-left">
                                    <p class="line-clamp-1">
                                        {{ item.user_email }} 
                                    </p>
                                </td>
                                <td class="text-center"> {{ item.user_phone }} </td>
                                <td>
                                    <div class="w-fit flex flex-row justify-end items-center gap-1">
                                        <v-btn @click="editAdminDialogF(i)">
                                            <p class="text-blue-500">
                                                <v-icon icon="mdi-account"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn @click="deleteUser(item.user_id,item.user_image)">
                                            <p class="text-red-500">
                                                <v-icon icon="mdi-delete"></v-icon>
                                            </p>
                                        </v-btn>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                 </div>

            </div>
        </div>
    </AdminNavigationBar>
 
    <!-- add new admin  -->
    <v-dialog
    persistent
    v-model="addNewAdminDialog"
    width="550"
    transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     เพิ่มผู้ใช้งาน
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <form @submit.prevent="addNewAdmin">
                            <v-file-input
                                accept="image/*"
                                placeholder="เลือกภาพประจำตัว"
                                label="เลือกภาพประจำตัว"
                                v-model="adminImage"
                                class=""
                                name="admin_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                            <v-text-field
                                v-model="username"
                                :rules="usernameRule"
                                label="*ชื่อผู้ใช้งาน"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="password"
                                :rules="passwordStrRule"
                                label="*รหัสผ่าน"
                                class="mt-3"
                                variant="outlined"
                                type="password"
                                hide-details="auto"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="confirmPassword"
                                label="*ยืนยันรหัสผ่าน"
                                :rules="[(v) => v ==='' || v === password || 'กรุณากรอกรหัสให้ตรง']"
                                class="mt-3"
                                variant="outlined"
                                type="password"
                                bg-color=""
                                required
                                hide-details="auto"
                            ></v-text-field>
                            <v-text-field
                                v-model="firstname"
                                label="*ชื่อจริง"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="lastname"
                                label="*นามสกุล"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                label="*อีเมล"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                                type="email"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="phone"
                                label="*เบอร์โทรศัพท์"
                                class="mt-3"
                                hide-details="auto"
                                variant="outlined"
                                bg-color=""
                                maxlength="10"
                                required
                            ></v-text-field>
                            <v-textarea 
                                v-model="address"
                                label="ที่อยู่"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                            ></v-textarea >
                            <div class="w-full mt-6 flex justify-center items-center gap-2">
                                <v-btn color="red"
                                @click="addNewAdminDialog = false">
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="green" type="submit" 
                                :disabled="
                                    (!!!username) ||
                                    (password !== confirmPassword) ||
                                    (!!!password) ||
                                    (!!!phone) ||
                                    (!phoneRule) ||
                                    (!!!email) ||
                                    (!!!firstname)"
                                > เพิ่มผู้ใช้งาน </v-btn>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- edit admin -->
    <v-dialog
    persistent
    v-model="editAdminDialog"
    width="550"
    transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     แก้ไขผู้ใช้งาน
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full h-[200px] flex justify-center">
                            <img v-if="adminImageDetail !== 'no_image_upload'"
                            :src="imagePath+adminImageDetail"
                            class="object-cover h-[200px] w-[200px] rounded-lg" alt="">
                            <img v-else
                            src="/images/avartars/default_avatar.png"
                            class="object-cover h-[200px] w-[200px] rounded-lg" alt="">
                        </div>
                        <form @submit.prevent="updateAdmin">
                            <v-file-input
                                accept="image/*"
                                placeholder="เลือกภาพประจำตัว"
                                label="เลือกภาพประจำตัว"
                                v-model="adminImage"
                                class=""
                                name="admin_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                            <v-text-field
                                v-model="username"
                                :rules="usernameRule"
                                label="*ชื่อผู้ใช้งาน"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="firstname"
                                label="*ชื่อจริง"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="lastname"
                                label="*นามสกุล"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                label="*อีเมล"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                                type="email"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="phone"
                                label="*เบอร์โทรศัพท์"
                                class="mt-3"
                                hide-details="auto"
                                variant="outlined"
                                bg-color=""
                                maxlength="10"
                                required
                            ></v-text-field>
                            <v-textarea 
                                v-model="address"
                                label="ที่อยู่"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                            ></v-textarea >
                            <div class="w-full mt-6 flex justify-center items-center gap-2">
                                <v-btn color="red"
                                @click="editAdminDialog = false , resetFormAdmin()">
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="green" type="submit" 
                                :disabled="
                                    (!!!username) ||
                                    (!!!phone) ||
                                    (!phoneRule) ||
                                    (!!!email) ||
                                    (!!!firstname)"
                                > บันทึก </v-btn>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
 
</template>


<style>
 
</style>
