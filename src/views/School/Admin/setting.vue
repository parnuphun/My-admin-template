<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref , watch , onMounted} from 'vue'; 
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { credential , schoolDataResonse} from '../../../store/Interface'

const _api = new apiNamphong()
const _msg = new MsgAlert()
const credential = ref<credential>()

onMounted(()=>{
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    getSchoolDataSetting();
})

const bannerImage = ref(undefined || '/images/namphon_mockup/banner01.jpg')
const bannerOriginName = ref()
const bannerSlogan = ref(undefined || 'คนดี มีวินัย ใฝ่คุณธรรม เลิศล้ำวิชาการ')
const schoolData = ref<schoolDataResonse>()
function getSchoolDataSetting(){
    _api.getSchoolDataSetting().then((res)=>{
        if(res.data.status_code !== 200){
            _msg.toast_msg({title:res.data.msg,timer:30,progressbar:true,icon:'error'})
        }else{
            schoolData.value = res.data.school_data[0]
            defaultPassword.value = schoolData.value!.default_admin_password 
            cfPassword.value = schoolData.value!.default_admin_password
            bannerSlogan.value = schoolData.value!.banner_slogan
            bannerImage.value = schoolData.value!.banner_img
            bannerOriginName.value = schoolData.value!.banner_img_origin_name

            if(bannerImage.value === undefined || bannerImage.value === 'undefined'){
                bannerImage.value =  '/images/namphon_mockup/banner01.jpg'
            }
            if(bannerSlogan.value === undefined || bannerSlogan.value === 'undefined'){
                bannerSlogan.value =  'คนดี มีวินัย ใฝ่คุณธรรม เลิศล้ำวิชาการ'
            }
            
        }
    })
}


const defaultPassword = ref()
const cfPassword = ref()
type msgValidate = 'invalid' | 'valid' | 'no_data'
const errMsgPassword = ref<msgValidate>('no_data')
const errMsgConfirmPassword = ref<msgValidate>('no_data')

// detect validate password 
watch(defaultPassword ,()=>{    
    if(defaultPassword.value === ''){
        errMsgPassword.value = 'no_data'        
    }else if(defaultPassword.value.length >= 6 && /^[a-zA-Z0-9]*$/.test(defaultPassword.value)){
        errMsgPassword.value = 'valid'
    }else{
        errMsgPassword.value = 'invalid'
    }

    if(cfPassword.value === defaultPassword.value){        
        errMsgConfirmPassword.value = 'valid'
    }else{
        errMsgConfirmPassword.value = 'invalid'
    }
   
})

// detect validate confirmpassword
watch(cfPassword,()=>{
    if(cfPassword.value === ''){
        errMsgConfirmPassword.value = 'no_data'
    }else if(cfPassword.value !== defaultPassword.value){
        errMsgConfirmPassword.value = 'invalid'
    }else{
        errMsgConfirmPassword.value = 'valid'
    }

})
 
function changeDefaultPassword(){
    _msg.confirm('คุณต้องการจะเปลี่ยนรหัสผ่านเริ่มต้นของผู้ใช้งานใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.changeDefaultPassword(
                {credential_admin_fullname:credential.value!.user_fullname , default_admin_password:defaultPassword.value}
            ).then((res)=>{
                if(res.data.status_code === 404){
                    _msg.toast_msg({title:res.data.msg,timer:20,progressbar:true,icon:'error'})
                    defaultPassword.value = ''
                    cfPassword.value = ''
                }else if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'success'})
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:20,progressbar:true,icon:'error'})
                    defaultPassword.value = ''
                    cfPassword.value = ''
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',timer:30,progressbar:true,icon:'error'})
            })
        }
    })
}

const banner_file = ref<any>() 
function updateBanner(){
    _msg.confirm('คุณต้องการจะเปลี่ยนรหัสผ่านเริ่มต้นของผู้ใช้งานใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            const formData = new FormData()
            if(banner_file.value === undefined || banner_file.value === null ){ // image file for upload in multer
                formData.append('banner_image','no_image_upload')
            }else{
                formData.append('banner_image',banner_file.value[0]!)
            }
            formData.append('banner_image_old', bannerOriginName.value) // old name banner send for delete if new upload
            formData.append('banner_slogan', bannerSlogan.value) // slogan 

            formData.append('credential_admin_fullname', credential.value!.user_fullname) // admin name 
            

            _api.updateBanner(formData).then((res)=>{
                if(res.data.status_code === 404){
                    _msg.toast_msg({title:res.data.msg,timer:20,progressbar:true,icon:'error'})
                }else if(res.data.status_code === 500){
                    _msg.toast_msg({title:res.data.msg,timer:20,progressbar:true,icon:'error'})
                }else {
                    _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'success'})
                    getSchoolDataSetting();
                    banner_file.value = undefined
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',timer:30,progressbar:true,icon:'error'})
            })
        }
    })
}

</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col h-full ">
            <div class="w-full h-full flex flex-wrap">
                <div class="w-full p-1 h-full flex flex-col justify-start items-center gap-2 md:px-24">
                    <div class="w-full p-1 mt-4">
                        <p class="text-2xl">
                            แบนเนอร์หน้าแรก 
                            
                        </p>
                        <p class="text-md text-gray-600">
                            ตั้งค่าภาพพื้นหลังของหน้าเว็บไซต์ และคำขวัญของทางโรงเรียน
                        </p>
                        <v-divider class="border-opacity-75 mt-2"></v-divider>
                        <div class="w-full mt-4">
                            <v-file-input
                                    accept="image/*"
                                    placeholder="เลือกภาพประจำตัว"
                                    label="เลือกไฟล์ภาพพื้นหลัง"
                                    show-size
                                    v-model="banner_file"
                                    name="banner_image"
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                    prepend-icon=""
                                ></v-file-input>
                                <v-text-field
                                    label="คำขวัญหรือข้อความที่ต้องการ"
                                    class="mt-4"
                                    v-model="bannerSlogan"
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                    bg-color=""
                                    required
                                ></v-text-field>
                                <div class="w-full flex justify-end">
                                    <v-btn 
                                    @click="updateBanner()"
                                    class="mt-3 w-[100px]" color="green">
                                        บันทึก
                                    </v-btn>
                                </div>
                        </div>
                        <v-parallax class="less:h-[300px] xl:h-[500px] mt-4"
                            :src="bannerImage">
                                <div class="relative w-full h-full flex justify-center items-center bg-black opacity-40"></div>
                                <div class="absolute w-full h-full flex justify-center items-center top-0">
                                    <p class=" less:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white">
                                        {{ bannerSlogan }}
                                    </p>
                                </div>
                        </v-parallax>

                    </div>
                    <div class="w-full  p-1 mt-4">
                        <p class="text-2xl">
                            รหัสผ่าน
                        </p>
                        <p class="text-md text-gray-600">
                            ตั้งค่ารหัสผ่าน Default ของผู้ใช้งานที่เพิ่มเข้ามาทีหลัง
                        </p>
                        <v-divider class="border-opacity-75 mt-2"></v-divider>
                        <div class="w-full mt-4">
                            <v-text-field
                                label="รหัสผ่าน"
                                class="mt-4"
                                hide-details="auto"
                                v-model="defaultPassword"
                                :rules="[
                                    ()=> errMsgPassword === 'valid' || 'กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษรและเป็นภาษาอังกฤษ'
                                ]"
                                density="compact"
                                type="password"
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-text-field
                                label="ยืนยันรหัสผ่าน"
                                v-model="cfPassword"
                                :disabled="errMsgPassword !== 'valid'"
                                type="password"
                                class="mt-4"
                                hide-details="auto"
                                density="compact"
                                :rules="[
                                    ()=> errMsgConfirmPassword === 'valid' || 'กรุณากรอกรหัสผ่านให้ตรงกัน'
                                ]"
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <div class="w-full flex justify-end">
                                <v-btn
                                :disabled="
                                        errMsgPassword !== 'valid' || 
                                        errMsgConfirmPassword !== 'valid'"
                                @click="changeDefaultPassword()"
                                class="mt-3 w-[100px]" color="green">
                                    บันทึก
                                </v-btn>
                            </div>
                        </div>

                    </div>
                    <div class="w-full  p-1 mt-4">
                        <p class="text-2xl">
                            ชั้นปี
                        </p>
                        <p class="text-md text-gray-600">
                            เปลี่ยนแปลงชั้นปีการศึกษาสำหรับฟังก์ชัน หลักสูตรและตารางสอนขอคุณครู
                        </p>
                        <v-divider class="border-opacity-75 mt-2"></v-divider>
                    </div>
                </div>
            </div>
        </div>
    </AdminNavigationBar>
</template>