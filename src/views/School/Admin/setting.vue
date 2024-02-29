<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref , watch , onMounted} from 'vue'; 
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { classListResponse, credential , schoolDataResonse , yearsListResponse} from '../../../store/Interface'
import { useRouter } from 'vue-router' ;

const router_s = useRouter();
const _api = new apiNamphong()
const _msg = new MsgAlert()
const btnLoading = ref()
const credential = ref<credential>()


onMounted(()=>{
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    if(credential.value!.user_rule !== 'admin') {
        router_s.push('/admin/annoucement')
    }
    
    getSchoolDataSetting();
    getClass();
    getYearList();
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

const classList = ref<Array<classListResponse>>()
function getClass(){
    _api.getClass().then((res)=>{
        if(res.data.status_code === 200){
            classList.value = res.data.class_data
        }
    })
}

const addClassDialog = ref(false)
const updateClassDialog = ref(false)
const className = ref()
const classDetail = ref<classListResponse>()

function addClass(){
    btnLoading.value = true
    _api.addClass({class_name:className.value , credential_admin_fullname:credential.value!.user_fullname}).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
            className.value =''
            getClass()
        }else{
            _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
        }
        btnLoading.value = false
    }).catch((err)=>{
        btnLoading.value = false
        _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
    })
}

function setDatabeforUpdateClass(item:classListResponse){
    classDetail.value = item
    className.value = item.class_name
    updateClassDialog.value = true

}

function updateClass(){
    _msg.confirm('คุณต้องการจะเปลี่ยชื่อชั้นเรียนใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.updateClass({
                class_id:classDetail.value!.class_id,
                class_old_name:classDetail.value!.class_name,
                class_name:className.value,
                credential_admin_fullname:credential.value!.user_fullname})
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
                    getClass()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
            })
        }
    })
}

function deleteClass(item:classListResponse){
    _msg.confirm('คุณต้องการจะลบชั้นเรียนใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteClass({class_id:item.class_id,class_name:item.class_name,credential_admin_fullname:credential.value!.user_fullname})
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
                    getClass()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
            })
        }
    })
}

const addYearsDialog = ref(false)
const updateYearDialog = ref(false)
const yearsList = ref<Array<yearsListResponse>>()
const yearDetail = ref<yearsListResponse>()
const yearName = ref()

function getYearList() {
    _api.getYears().then((res)=>{
        if(res.data.status_code === 200){
            yearsList.value = res.data.years_data
        }
    })
}

function addYear(){
    _api.addNewYear({years_name:yearName.value ,credential_admin_fullname:credential.value!.user_fullname}).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
            className.value =''
            getYearList()
        }else{
            _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
        }
        btnLoading.value = false
    }).catch((err)=>{
        btnLoading.value = false
        _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
    })
}

function deleteYear(item:yearsListResponse){
    _msg.confirm('คุณต้องการลบปีการศึกษาใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteYear({years_name:item.years_name,years_id:item.years_id,credential_admin_fullname:credential.value!.user_fullname})
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
                    getYearList()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
            })
        }
    })
}

function setDatabeforUpdateYear(item:yearsListResponse){
    yearDetail.value = item
    yearName.value = yearDetail.value.years_name
    updateYearDialog.value = true
}

function updateYear(){
    _msg.confirm('คุณต้องการลบปีการศึกษาใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.updateYear({years_id:yearDetail.value!.years_id,years_name:yearName.value , years_old_name:yearDetail.value!.years_name,
            credential_admin_fullname:credential.value!.user_fullname})
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
                    getYearList()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
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
                                    class="mt-3 w-[157px]" color="green">
                                        บันทึก
                                    </v-btn>
                                </div>
                        </div>
                        <v-parallax class="less:h-[300px] xl:h-[500px] mt-4 rounded-md"
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
                            ตั้งค่ารหัสผ่านเริ่มต้น ของผู้ใช้งานที่เพิ่มเข้ามาทีหลัง
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
                                class="mt-3 w-[157px]" color="green">
                                    บันทึก
                                </v-btn>
                            </div>
                        </div>

                    </div>
                    <div class="w-full  p-1 mt-4">
                        <p class="text-2xl">
                            ปีการศึกษา
                        </p>
                        <p class="text-md text-gray-600">
                            จัดการปีการศึกษาสำหรับฟังก์ชัน หลักสูตรและตารางเรียนนักเรียนและตารางสอนขอคุณครู
                        </p>
                        <v-divider class="border-opacity-75 mt-2"></v-divider>
                        <div class="mt-2 flex justify-end">
                            <v-btn class="w-[157px]" color="green" @click="addYearsDialog = true"> เพิ่มปีการศึกษา </v-btn>
                        </div>
                        <div class="w-full flex flex-wrap max-h-[200px] overflow-auto mt-2">
                            <div v-for="item in yearsList"
                            class="rounded-md border-2 h-full w-full py-2 px-2 flex flex-row mt-2 justify-between items-center" >
                                <div class="w-auto h-full flex justify-center items-center">
                                    {{ item.years_name }}
                                </div>
                                <div class="w-fit flex flex-row gap-2">
                                    <v-btn color="primary" @click="setDatabeforUpdateYear(item)">แก้ไข</v-btn>
                                    <v-btn color="red" @click="deleteYear(item)">ลบ</v-btn>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="w-full  p-1 mt-4">
                        <p class="text-2xl">
                            ชั้นปี
                        </p>
                        <p class="text-md text-gray-600">
                            จัดการชั้นปีการศึกษาสำหรับฟังก์ชัน หลักสูตรและตารางเรียนนักเรียนและตารางสอนขอคุณครู
                        </p>
                        <v-divider class="border-opacity-75 mt-2"></v-divider>
                        <div class="mt-2 flex justify-end">
                            <v-btn class="w-[157px]" color="green" @click="addClassDialog = true"> เพิ่มชั้นปี </v-btn>
                        </div>
                        <div class="w-full">
                            <div class="w-full flex flex-wrap max-h-[600px] overflow-auto">
                                <div v-for="item in classList"
                                class="rounded-md border-2 h-full w-full py-2 px-2 flex flex-row mt-2 justify-between items-center" >
                                    <div class="w-auto h-full flex justify-center items-center">
                                        {{ item.class_name }}
                                    </div>
                                    <div class="w-fit flex flex-row gap-2">
                                        <v-btn color="primary" @click="setDatabeforUpdateClass(item)">แก้ไข</v-btn>
                                        <v-btn color="red" @click="deleteClass(item)">ลบ</v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminNavigationBar>

    <!-- add year -->
    <v-dialog
        persistent
        v-model="addYearsDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มปีการศึกษา
                    <div @click="addYearsDialog = false , className = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                <div class="w-full px-6 pb-4">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="yearName"
                            label="ปีการศึกษา"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="green" size="xl" tex 
                            :disabled="!!!yearName"
                            :loading="btnLoading"
                            @click="addYear()" 
                            class="้px-3 w-[100px]">
                                <p class="text-xl">เพิ่ม</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- rename year  -->
    <v-dialog
    persistent
    v-model="updateYearDialog"
    width="600"
    transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    แก้ไขปีการศึกษา
                    <div @click="updateYearDialog = false , yearName = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full px-6 pb-4 ">     
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="yearName"
                            label="ป้อนปีการศึกษา"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="primary" size="xl" tex 
                            :disabled="!!!yearName"
                            :loading="btnLoading"
                            @click="updateYear()" 
                            class="้px-3 w-[80px]">
                                <p class="text-xl">แก้ไข</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- add class -->
    <v-dialog
        persistent
        v-model="addClassDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มชั้นปี
                    <div @click="addClassDialog = false , className = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                <div class="w-full px-6 pb-4">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="className"
                            label="ป้อนชื่อหมวดหมู่"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="green" size="xl" tex 
                            :disabled="!!!className"
                            :loading="btnLoading"
                            @click="addClass()" 
                            class="้px-3 w-[100px]">
                                <p class="text-xl">เพิ่ม</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- rename class  -->
    <v-dialog
    persistent
    v-model="updateClassDialog"
    width="600"
    transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    แก้ไข
                    <div @click="updateClassDialog = false , className = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full px-6 pb-4 ">     
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="className"
                            label="ป้อนชื่อตำแหน่ง"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="primary" size="xl" tex 
                            :disabled="!!!className"
                            :loading="btnLoading"
                            @click="updateClass()" 
                            class="้px-3 w-[80px]">
                                <p class="text-xl">แก้ไข</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>