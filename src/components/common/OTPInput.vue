<script setup lang="ts">
import {ref , onMounted} from 'vue'
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import VOtpInput from 'vue3-otp-input';
import { useRouter } from 'vue-router';


const _api = new apiRPTS()
const _msg = new MsgAlert()
const router = useRouter()

const OTP = ref()

// send otp for confirm
function validateOTP(){
    const data = {
        email : props.email,
        purpose : props.purpose,
        OTP : OTP.value,
    }
    _api.validateOTP(data).then((res)=>{
        if(res.data.status){
            _msg.default_msg({title:res.data.msg,timer:1})
            setTimeout(()=>{
                emit('isOTPValid',true)
            },1000)
        }else{
            _msg.default_msg({title:res.data.msg,icon:'error',timer:3,progressbar:true,cancelBtn:false})
        }
    })
}

// send email for get otp
function confirmEmail(){
    emit('loading',true)
    _api.OtpSend({email:props.email,purpose:'ForgotPassword'}).then((res)=>{
        if(res.data.status){
            _msg.default_msg({title:res.data.msg,timer:1})
            emit('loading',false)
        }else{
            _msg.default_msg({title:res.data.msg,timer:1})
            emit('loading',false)
        }
    })
}

const props = defineProps<{
    email:string
    purpose: 'ForgotPassword' | 'EmailConfirm'
    loading?:boolean
    compact?:boolean
}>()

const emit = defineEmits<{
    (event:'loading',size: boolean):void
    (event:'isOTPValid',size:boolean):void
}>()
</script>

<template>
    <div v-if="!compact">
        <div class="text-center mb-10">
            <span class="text-3xl text-center"> Confirm OTP </span>
        </div>
        <div class="flex flex-wrap justify-center mb-3">
                <v-otp-input
                    input-classes="otp-input"
                    separator="-"
                    :num-inputs="6"
                    :should-auto-focus="true"
                    :is-input-num="true"
                    :conditionalClass="['one', 'two', 'three', 'four','five','six']"
                    @on-complete="(completedOTP:string)=>{ OTP = completedOTP}"
                    @on-change="(changedOTP:string)=>{ OTP = changedOTP}"
                />

            <div class="w-full flex justify-end mb-3 mt-3 mr-10">
                <span class="text-blue-500 hover:text-blue-700 cursor-pointer"
                    @click="confirmEmail">
                    ส่งรหัสอีกครั้ง
                </span>
            </div>
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
                @click="validateOTP">
                ยืนยันรหัส
            </v-btn>
        </div>
    </div>
    <div v-else>
        <div class="flex flex-row justify-center mb-3">
            <div class="w-10/12 flex justify-start items-center">
                <v-otp-input
                    input-classes="otp-input"
                    separator=""
                    :num-inputs="6"
                    :should-auto-focus="true"
                    :is-input-num="true"
                    :conditionalClass="['one', 'two', 'three', 'four','five','six']"
                    @on-complete="(completedOTP:string)=>{ OTP = completedOTP}"
                    @on-change="(changedOTP:string)=>{ OTP = changedOTP}"
                />
            </div>

            <div class="w-full flex items-center px-2">
                <v-btn
                    @click="validateOTP()"
                    color="success"
                    width="100%">
                    ยืนยันรหัส
                </v-btn>
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
