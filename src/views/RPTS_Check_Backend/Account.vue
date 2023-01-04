<script setup lang="ts">
import {ref , onMounted ,watch} from 'vue'
import OTPInput from '../../components/common/OTPInput.vue';
import ResetPassword from '../../components/common/ResetPassword.vue';
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import { userDataRes } from '../../store/Interface';
import { isRmutiEmail, isRmutiId , isUsername ,isThaiLang } from '../../services/validationRules';

const _api = new apiRPTS()
const _msg = new MsgAlert()

const tab = ref(null)

const isOtpSend = ref(false)

const password = ref()
const isPasswordChanged = ref(false)
const isCurrentPassworRight = ref(false)
const isBtnPass = ref(false)

const isFormValid = ref(false)
const isFormEmailValid = ref(false)
const isEmailValid = ref(false)
const isEmailUpdated = ref(false)

const emailRule = [(v:string)=>isRmutiEmail(v)]
const usernameRule = [(v:string)=>isUsername(v)]
const thaiRule = [(v:string)=>isThaiLang(v)]
const rmutiIdRule =[(v:string)=>isRmutiId(v)]

const userData = ref<userDataRes>()
const fname = ref<string>()
const lname = ref<string>()
const username = ref<string>()
const rmutiId = ref<string>()
const email = ref<string>()
const oldEmail = ref<string>()
const abouteMe = ref<string>()
const phone = ref<string>()

onMounted(()=>{
    getUserData()
})

function getUserData(){
    if(localStorage.getItem('credential')){
        const credential:any = JSON.parse(localStorage.getItem('credential')!)
        const userId:number = credential.userId
        _api.getUserData({userId:userId}).then((res)=>{
            if(res.data.status){
                userData.value = res.data.userData as userDataRes

                fname.value = userData.value.User_Fname
                lname.value = userData.value.User_Lname
                username.value = userData.value.User_Usernname
                rmutiId.value = userData.value.User_Rmuti_Id
                email.value = userData.value.User_Email
                oldEmail.value = userData.value.User_Email
                abouteMe.value = userData.value.User_AboutMe
                phone.value = userData.value.User_Phone

            }else{
                _msg.default_msg({title:'มีบางอย่างผิดพลาด',msg:res.data.msg,icon:'error'})
            }
        })
    }else{
        _msg.default_msg({title:'มีบางอย่างผิดพลาด',msg:'ตรวจพบว่ายังไม่มีการเข้าสู่ระบบ กรุณาเข้าสู่ระบบก่อน',icon:'error'})
    }
}

function updateUserData(){
    emit('loadingProgressBar',true)
    if(userData.value){
        let data = {
            userId:userData.value.User_Id!,
            username:username.value!,
            fname:fname.value!,
            lname:lname.value!,
            abouteMe:abouteMe.value!,
            phone:phone.value!
        }

        _api.updateUserData(data).then((res)=>{
            if(res.data.status){
                _msg.default_msg({title:res.data.msg,timer:1.5})
                getUserData()

            }else{
                _msg.default_msg({title:res.data.msg,icon:'error'})
            }
            emit('loadingProgressBar',false)
        })
    }else{
        emit('loadingProgressBar',false)
        _msg.default_msg({title:'มีบางอย่างผิดพลาดไม่พบ ID ผู้ใช้งาน',icon:'error'})
    }
}

// send email for get otp
function confirmEmail(){
    emit('loadingProgressBar',true)
    _api.OtpSend({email:email.value!,purpose:'EmailConfirm',rmutiId:rmutiId.value}).then((res)=>{
        if(res.data.status){
            _msg.default_msg({title:res.data.msg,timer:1})
            isOtpSend.value = true
        }else{
            _msg.default_msg({title:res.data.msg,timer:1})
            email.value = ''
        }
        emit('loadingProgressBar',false)
    })
}

function updateEmail(value:boolean){
    if(value){
        _api.updateEmail({email:email.value!,userId:userData.value!.User_Id!}).then((res)=>{
            if(res.data.status){
                _msg.default_msg({title:res.data.msg,timer:2})
                setTimeout(() => {
                    getUserData()
                    isOtpSend.value = false
                    isEmailUpdated.value = true
                    isEmailValid.value = true
                }, 2000);
            }else{
                _msg.default_msg({title:res.data.msg,icon:'error'})
            }
        })
    }
}

function confirmPassword(){
    _api.confirmPassword({password:password.value,userId:userData.value!.User_Id!}).then((res)=>{
        if(res.data.status){
            _msg.default_msg({title:res.data.msg,timer:2})
            isCurrentPassworRight.value = true
        }else{
            _msg.default_msg({title:res.data.msg,icon:'error'})
        }
    })
}

watch(email,()=>{
    if(email.value === oldEmail.value){
        isEmailValid.value = true
        isEmailUpdated.value = true
    }else{
        isEmailValid.value = false
        isEmailUpdated.value = false
    }
})

const emit = defineEmits<{
    (event:'loadingProgressBar',size:boolean):void
}>()

watch(password,()=>{
    if(password.value !== ''){
        isBtnPass.value = true
    }else{
        isBtnPass.value = false
    }
})

function afterPassChenged(){
    password.value = ''
    isBtnPass.value = false
    isCurrentPassworRight.value = false
    isPasswordChanged.value = false
}
</script>

<template>
    <div class="w-full flex flex-wrap px-10 pt-10">
        <div class="w-full h-full flex flex-row justify-between gap-6">
            <div class="w-3/12 bg-red-200">
                <v-card height="100%">
                    <div class="w-full flex justify-center my-3">
                        <div class="relative">
                            <v-avatar
                                color="grey"
                                size="150"
                                rounded="full"
                            >
                                <v-img cover v-if="userData?.User_Avatar !== ''" :src="userData?.User_Avatar"></v-img>
                                <v-img cover v-else :src="'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg'"></v-img>
                            </v-avatar>
                            <div
                                class="absolute z-50 bottom-0 right-0"
                            >
                                <v-btn
                                    rounded="pill"
                                    color="grey"
                                    size="small"
                                >
                                    <v-icon color="white">
                                        mdi-camera
                                    </v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex justify-center">
                        <v-list>
                            <v-list-item
                                class="text-center"
                                :title="userData?.User_Fname + ' ' +userData?.User_Lname"
                                :subtitle="userData?.User_Rmuti_Id"
                            ></v-list-item>
                        </v-list>
                    </div>
                    <v-divider></v-divider>
                    <div class="w-full flex flex-wrap justify-center my-1.5">
                        <div v-for="role of userData?.USER_ROLES">
                            <v-chip
                                class="ma-2"
                                label
                                color="primary"
                                text-color="white"
                                size="small"
                                rounded="full"
                                >
                                    {{ role }}
                            </v-chip>
                        </div>
                    </div>
                    <v-divider></v-divider>
                </v-card>
            </div>
            <div class="w-9/12">
                <v-card height="100%">
                    <v-tabs
                    v-model="tab"
                    bg-color="primary"
                    >
                        <v-tab value="info">ข้อมูลเบื้องต้น</v-tab>
                        <v-tab value="security">ความปลอดภัย</v-tab>
                     </v-tabs>

                    <v-card-text>
                    <v-window v-model="tab">
                        <v-window-item value="info">
                            <v-form v-model="isFormValid" @submit.prevent="updateUserData">

                                <div class="w-full flex flex-wrap">
                                    <div class="w-full">
                                        <v-text-field
                                            v-model="rmutiId"
                                            label="รหัสนักศึกษา"
                                            :counter="13"
                                            maxlength="13"
                                            density="comfortable"
                                            bg-color="#e5e7eb"
                                            required
                                            :rules="rmutiIdRule"
                                        >
                                        </v-text-field>
                                    </div>
                                    <div class="w-full">
                                        <v-text-field
                                            v-model="username"
                                            label="ชื่อผู้ใช้งาน"
                                            :counter="255"
                                            maxlength="255"
                                            density="comfortable"
                                            :rules="usernameRule"
                                            required
                                            bg-color="#e5e7eb"
                                            clearable
                                        >
                                        </v-text-field>
                                    </div>
                                    <div class="w-full flex flex-row gap-4">
                                        <div class="w-1/2">
                                            <v-text-field
                                                v-model="fname"
                                                label="ชื่อจริง"
                                                required
                                                :counter="255"
                                                maxlength="255"
                                                density="comfortable"
                                                bg-color="#e5e7eb"
                                                :rules="thaiRule"
                                                clearable
                                            >
                                            </v-text-field>
                                        </div>
                                        <div class="w-1/2">
                                            <v-text-field
                                                v-model="lname"
                                                label="นามสกุล"
                                                :counter="255"
                                                maxlength="255"
                                                required
                                                density="comfortable"
                                                bg-color="#e5e7eb"
                                                :rules="thaiRule"
                                                clearable
                                            >
                                            </v-text-field>
                                        </div>
                                    </div>
                                    <div class="w-full flex flex-row gap-4">
                                        <div class="w-1/2">
                                            <v-text-field
                                                v-model="email"
                                                label="อีเมลมหาลัย"
                                                required
                                                :counter="255"
                                                maxlength="255"
                                                density="comfortable"
                                                bg-color="#e5e7eb"
                                                :rules="emailRule"
                                                readonly
                                            >
                                                <template v-slot:append-inner>
                                                    <v-icon color="success">
                                                        mdi-check-circle
                                                    </v-icon>
                                                </template>
                                            </v-text-field>
                                        </div>
                                        <div class="w-1/2">
                                            <v-text-field
                                                v-model="phone"
                                                label="เบอร์โทร"
                                                :counter="255"
                                                maxlength="255"
                                                density="comfortable"
                                                bg-color="#e5e7eb"
                                                clearable
                                            >
                                            </v-text-field>
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <v-textarea
                                            v-model="abouteMe"
                                            label="เกี่ยวกับฉัน"
                                            :counter="255"
                                            maxlength="255"
                                            density="comfortable"
                                            bg-color="#e5e7eb"
                                            rows="3"
                                            clearable
                                        >

                                        </v-textarea>
                                    </div>
                                    <div class="w-full flex justify-center items-center">
                                        <v-btn
                                            type="submit"
                                            :disabled="!isFormValid"
                                            color="primary"
                                        >
                                            บันทึกข้อมูล
                                        </v-btn>
                                    </div>
                                </div>
                            </v-form>
                        </v-window-item>

                        <!-- security -->
                        <v-window-item value="security">
                            <div class="w-full flex flex-wrap">
                                <div class="w-full text-left mb-2">
                                    <span class="text-md font-bold">เปลี่ยนอีเมล</span>
                                </div>
                                <div class="w-full ">
                                    <v-form @submit.prevent="" v-model="isFormEmailValid">
                                        <v-text-field
                                            v-model="email"
                                            label="อีเมลมหาลัย"
                                            prepend-inner-icon="mdi-email"
                                            density="comfortable"
                                            :rules="emailRule"
                                            :counter="255"
                                            maxlength="255"
                                            bg-color="#e5e7eb"
                                        >
                                            <template v-slot:append-inner v-if="isEmailValid">
                                                <v-icon color="success">
                                                    mdi-check-circle
                                                </v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-form>
                                </div>
                                <div class="w-full flex justify-center" v-if="!isEmailValid && isOtpSend === false && isEmailUpdated === false">
                                    <v-btn @click="confirmEmail" color="primary" :disabled="!isFormEmailValid">
                                        ส่งรหัสยืนยัน
                                    </v-btn>
                                </div>
                                <div class="w-full" v-if="isOtpSend">
                                    <OTPInput
                                        email=""
                                        purpose="EmailConfirm"
                                        :compact="true"
                                        @is-o-t-p-valid="(value:boolean)=>{ updateEmail(value) }"
                                    ></OTPInput>
                                </div>


                                <div class="w-full text-left mb-2">
                                    <span class="text-md font-bold">เปลี่ยนรหัสผ่าน</span>
                                </div>
                                <div class="w-full">
                                    <v-text-field
                                        v-model="password"
                                        label="ป้อนรหัสปัจจุบัน"
                                        type="password"
                                        prepend-inner-icon="mdi-key"
                                        density="comfortable"
                                        bg-color="#e5e7eb"
                                    ></v-text-field>
                                </div>
                                <div class="w-full flex justify-center" v-if="isBtnPass && !isCurrentPassworRight">
                                    <v-btn color="primary" @click="confirmPassword">
                                        ยืนยันรหัสผ่าน
                                    </v-btn>
                                </div>
                                <div class="w-full" v-if="isCurrentPassworRight === true && isPasswordChanged === false">
                                    <ResetPassword
                                        :email="email!"
                                        purpose="EditProfile"
                                        density="comfortable"
                                        @reset-password-success="()=>{ afterPassChenged }"
                                    >
                                    </ResetPassword>
                                </div>
                            </div>
                        </v-window-item>
                    </v-window>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
</template>
