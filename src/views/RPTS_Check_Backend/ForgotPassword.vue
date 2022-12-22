<script setup lang="ts">
import {ref ,onMounted , watch} from 'vue'
import { useRouter } from 'vue-router';
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import OTPInput from '../../components/common/OTPInput.vue';

const _api = new apiRPTS()
const _msg = new MsgAlert()

const router = useRouter()

const isEmailSend = ref(false)
const isOTPValid = ref(false)
const isLoadingProgresBar = ref(false)
const isButtonDisable = ref(true)
const matchPasswordMsg:string = 'Password is not match'

const email = ref<string>('')

const newPassword = ref('')
const repeatNewPassword = ref('')

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
        _msg.err('Password ที่ป้อนไม่ตรงกัน')
    }
}

watch([() => newPassword.value, () => repeatNewPassword.value],([newPasswordValue, repeatNewPasswordValue]) => {
    if(newPasswordValue === '' || repeatNewPasswordValue === ''){
        isButtonDisable.value = true;
    }else{
        if (newPasswordValue === repeatNewPasswordValue) {
            isButtonDisable.value = false;
        } else {
            isButtonDisable.value = true;
        }
    }
  }
);

</script>

<template>
    <v-progress-linear v-if="isLoadingProgresBar" indeterminate></v-progress-linear>
    <div class="w-full h-screen flex items-center justify-center bg-gray-100">
        <div    style="width:500px;"
            class="py-10 px-6 bg-white border-2 border-gray-400 border-solid rounded text-center">
            <div class="h-full w-full">
                <v-form @submit.prevent="" class="h-full text-left" v-if="!isEmailSend">
                    <div class="h-full">
                        <div class="text-center mb-10">
                            <span class="text-3xl text-center"> Forgot Password </span>
                        </div>
                        <div class="">
                            <v-text-field
                                prepend-icon="mdi-email"
                                v-model="email"
                                bg-color="#e5e7eb"
                                label="Enter your Email"
                                required
                            ></v-text-field>
                        </div>
                        <div class="flex justify-center items-end gap-2 mb-3">
                            <v-btn
                                class="w-32"
                                color="error"
                                @click="router.push('/testBackend/login')" >
                                ยกเลิก
                            </v-btn>
                            <v-btn
                                class="w-32"
                                color="success"
                                @click="confirmEmail">
                                ขอรหัสยืนยัน
                            </v-btn>
                        </div>

                    </div>
                </v-form>
                <div class="h-full text-left" v-if="isEmailSend && isOTPValid === false">
                    <OTPInput
                        :email="email"
                        @loading="(isLoading:boolean)=>{ isLoadingProgresBar = isLoading}"
                        @isOTPValid="(OTPValid:boolean)=>{ isOTPValid = OTPValid}">
                    </OTPInput>
                </div>
                <v-form @submit.prevent="" class="h-full text-left" v-if="isOTPValid">
                    <div class="h-full">
                        <div class="text-center mb-10">
                            <span class="text-3xl text-center"> New Password </span>
                        </div>
                        <div class="">
                            <v-text-field
                                prepend-inner-icon="mdi-form-textbox-password"
                                v-model="newPassword"
                                label="New Password"
                                bg-color="#e5e7eb"
                                type="password"
                                required
                            ></v-text-field>
                        </div>
                        <div class="">
                            <v-text-field
                                prepend-inner-icon="mdi-form-textbox-password"
                                v-model="repeatNewPassword"
                                bg-color="#e5e7eb"
                                label="Repeat Password"
                                type="password"
                                required
                            ></v-text-field>
                        </div>
                        <div class="w-full text-left pl-3 -mt-3 mb-5">
                            <span class="text-center text-red-500" v-if="isButtonDisable && (repeatNewPassword !== '' && newPassword !== '')"> {{matchPasswordMsg}} </span>
                        </div>

                        <div class="flex justify-center items-end gap-2 mb-3">
                            <v-btn
                                class="w-32"
                                color="error"
                                @click="router.push('/testBackend/login')" >
                                ยกเลิก
                            </v-btn>
                            <v-btn
                                class="w-32"
                                color="success"
                                @click="confirmNewPassword"
                                :disabled="isButtonDisable">
                                ยืนยัน
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </div>
        </div>
    </div>


</template>

<style>
    .otp-input {
        width: 40px;
        height: 40px;
        padding: 5px;
        margin: 0 10px;
        font-size: 20px;
        background-color: #e5e7eb;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        text-align: center;
    }
    /* Background colour of an input field with value */
    .otp-input.is-complete {
        background-color: #e4e4e4;
    }
        .otp-input::-webkit-inner-spin-button,
        .otp-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input::placeholder {
        font-size: 15px;
        text-align: center;
        font-weight: 600;
    }
</style>
