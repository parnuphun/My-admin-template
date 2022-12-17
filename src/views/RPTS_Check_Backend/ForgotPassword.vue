<script setup lang="ts">
import {ref ,onMounted} from 'vue'
import { useRouter } from 'vue-router';
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';

const _api = new apiRPTS()
const _msg = new MsgAlert()

const router = useRouter()
const OTP = ref()

const isEmailSend = ref(false)
const isOTPValid = ref(false)
const isLoadingProgresBar = ref(false)
const email = ref<string>('')

const newPassword = ref('')
const repeatNewPassword = ref('')

// send otp for confirm
function validateOTP(){
    const data = {
        email : email.value,
        OTP:OTP.value
    }
    _api.validateOTP(data).then((res)=>{
        if(res.data.status){
            _msg.succ(res.data.msg,1)
            setTimeout(()=>{
                isOTPValid.value = true
            },1000)

        }else{
            _msg.err(res.data.msg,1)
        }
    })
}

// send email for get otp
function confirmEmail(){
    isLoadingProgresBar.value = true
    _api.forgorPassword(email.value).then((res)=>{
        if(res.data.status){
            _msg.succ(res.data.msg,1)
            isLoadingProgresBar.value = false

            setTimeout(()=>{
                isEmailSend.value = true
            },1000)
        }else{
            _msg.err(res.data.msg,1)
            isLoadingProgresBar.value = false

            email.value = ''
        }
    })
}

// set new password
function confirmNewPassword(){
    if(newPassword.value === repeatNewPassword.value){
        _msg.confirm('คุณต้องการจะเปลี่ยนรัหสผ่านใช่หรือไม่').then((isConfiremd)=>{
            if(isConfiremd){
                _api.resetPassword({newPassword: newPassword.value , email: email.value}).then((res)=>{
                    if(res.data.status){
                        _msg.succ('เปลี่ยนรหัสผ่านเรียบร้อย',1.5)
                        setTimeout(()=>{
                            router.push('/testBackend/login')
                        },1500)
                    }
                })
            }
        })
    }else{
        _msg.err('Password ที่ป้อนไม่ตรงกัน',0,true)
    }
}
</script>

<template>
    <v-progress-linear v-if="isLoadingProgresBar" indeterminate></v-progress-linear>
    <div class="w-full h-screen flex items-center justify-center bg-gray-100">
        <div    style="width:500px;"
            class="py-10 px-6 bg-white border-2 border-gray-400 border-solid rounded text-center">

            <div class="h-full w-full">
                <v-form @submit.prevent="" class="h-full text-left" v-if="!isOTPValid">
                    <div class="h-full">
                        <div class="text-center mb-10">
                            <span class="text-3xl text-center"> Forgot Password </span>
                        </div>
                        <div class="" v-if="!isEmailSend">
                            <v-text-field
                                prepend-icon="mdi-email"
                                v-model="email"
                                label="Enter your Email"
                                required
                            ></v-text-field>
                        </div>

                        <div class="" v-if="isEmailSend">
                            <v-text-field
                                prepend-icon="mdi-key"
                                v-model="OTP"
                                label="OTP"
                                required
                            ></v-text-field>
                            <div class="flex justify-end -mt-4 mb-3 mr-1">
                                <span class="text-blue-500 hover:text-blue-700 cursor-pointer"
                                    @click="confirmEmail">
                                    ขอรหัส OTP อีกครั้ง
                                </span>
                            </div>
                        </div>

                        <div class="flex justify-center items-end gap-2 mb-3">
                            <button
                                @click="router.push('/testBackend/login')"
                                class="w-content py-2 px-3 text-center text-white w-40 bg-red-500 hover:bg-red-700 rounded-full cursor-pointer">
                                ยกเลิก
                            </button>
                            <button v-if="!isEmailSend"
                                class="py-2 px-3 text-center text-white w-40 bg-green-500 hover:bg-green-700 rounded-full cursor-pointer"
                                @click="confirmEmail"
                                >
                                ขอรหัสยืนยัน
                            </button>
                            <button v-if="isEmailSend"
                                @click="validateOTP"
                                class="py-2 px-3 text-center text-white w-40 bg-green-500 hover:bg-green-700 rounded-full cursor-pointer"
                                >
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </v-form>
                <v-form @submit.prevent="" class="h-full text-left" v-if="isOTPValid">
                    <div class="h-full">
                        <div class="text-center mb-10">
                            <span class="text-3xl text-center"> New Password </span>
                        </div>

                        <div class="">
                            <v-text-field
                                prepend-icon="mdi-form-textbox-password"
                                v-model="newPassword"
                                label="New Password"
                                type="password"
                                required
                            ></v-text-field>
                        </div>
                        <div class="">
                            <v-text-field
                                prepend-icon="mdi-"
                                v-model="repeatNewPassword"
                                label="Repeat New Password"
                                type="password"
                                required
                            ></v-text-field>
                        </div>

                        <div class="flex justify-center items-end gap-2 mb-3">
                            <button
                                @click="router.push('/testBackend/login')"
                                class="w-content py-2 px-3 text-center text-white w-40 bg-red-500 hover:bg-red-700 rounded-full cursor-pointer">
                                ยกเลิก
                            </button>
                            <button
                                @click="confirmNewPassword"
                                class="py-2 px-3 text-center text-white w-40 bg-green-500 hover:bg-green-700 rounded-full cursor-pointer"
                                >
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </v-form>
            </div>
        </div>
    </div>


</template>
