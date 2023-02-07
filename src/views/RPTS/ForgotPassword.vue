<script setup lang="ts">
import {ref , watch} from 'vue'
import { useRouter } from 'vue-router';
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import OTPInput from '../../components/common/OTPInput.vue';
import ResetPassword from '../../components/common/ResetPassword.vue'
import { isRmutiEmail } from '../../services/validationRules';

const _api = new apiRPTS()
const _msg = new MsgAlert()

const router = useRouter()

const emailRule = [(v:string)=>isRmutiEmail(v)]

const isEmailSend = ref(false)
const isOTPValid = ref(false)
const isLoadingProgresBar = ref(false)
const isButtonDisable = ref(true)

const email = ref<string>('')

// send email for get otp
function confirmEmail(){
    isLoadingProgresBar.value = true
    _api.OtpSend({email:email.value,purpose:'ForgotPassword'}).then((res)=>{
        if(res.data.status){
            _msg.default_msg({title:res.data.msg,timer:1})
            isLoadingProgresBar.value = false

            setTimeout(()=>{
                isEmailSend.value = true
            },1000)
        }else{
            _msg.default_msg({title:res.data.msg,timer:1})
            isLoadingProgresBar.value = false

            email.value = ''
        }
    })
}

</script>

<template>
    <v-progress-linear v-if="isLoadingProgresBar" indeterminate></v-progress-linear>
    <div class="w-full h-screen flex items-center justify-center bg-gray-100">
        <div    style="width:500px;"
            class="py-10 px-6 bg-white border-2 border-gray-400 border-solid rounded text-center">
            <div class="h-full w-full">

                <!-- email -->
                <div class="h-full text-left" v-if="!isEmailSend">
                    <v-form @submit.prevent="" class="h-full text-left" >
                        <div class="h-full">
                            <div class="text-center mb-10">
                                <span class="text-3xl text-center"> Forgot Password </span>
                            </div>
                            <div class="mb-1">
                                <v-text-field
                                    prepend-icon="mdi-email"
                                    v-model="email"
                                    bg-color="#e5e7eb"
                                    label="Enter your Email"
                                    required
                                    :rules="emailRule"
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
                </div>

                <!-- OTP -->
                <div class="h-full text-left" v-if="isEmailSend && isOTPValid === false">
                    <OTPInput
                        :email="email"
                        :purpose="'ForgotPassword'"
                        @loading="(isLoading:boolean)=>{ isLoadingProgresBar = isLoading}"
                        @isOTPValid="(OTPValid:boolean)=>{ isOTPValid = OTPValid}">
                    </OTPInput>
                </div>

                <!-- reset password -->
                <div  v-if="isOTPValid">
                    <ResetPassword
                        :email="email"
                        :density="'default'"
                        :input-bg-color="'#e5e7eb'"
                        :text-header="'ตั้งรหัสผ่านใหม่'"
                        purpose="ForgotPassword"
                        @reset-password-success="(value:boolean)=>{ router.push('/testBackend/login')}">
                    </ResetPassword>
                </div>
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
