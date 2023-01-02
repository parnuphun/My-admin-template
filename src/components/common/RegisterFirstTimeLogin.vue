<script setup lang="ts">
import {ref , onMounted , watch} from 'vue'
import router from '../../plugin/routes';
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import { isThaiLang , isRmutiId , isRmutiEmail , isUsername } from '../../services/validationRules';
import OTPInput from './OTPInput.vue';

const _api = new apiRPTS()
const _msg = new MsgAlert()
// roles

// validator rules
let rmutiRule = [(v:string) => isRmutiId(v)]
let thaiRule = [(v:string) => isThaiLang(v)]
let emailRule = [(v:string) => isRmutiEmail(v)]
let usernameRule = [(v:string) => isUsername(v)]

const email = ref('')
const emailValid = ref('')

const isOtpSend = ref(false)
const isOtpValid = ref(false)
const isEmailValid = ref(false)

watch(email,()=>{
    if(email.value.endsWith('@rmuti.ac.th')){
        isEmailValid.value = true
    }else{
        isEmailValid.value = false
    }
})

const props = defineProps<{
    isDialogOpen: boolean
    data : any
}>()

const emit = defineEmits<{
    (event: 'register-success' ,size:boolean):void
    (event: 'loadingProgressBar',size:boolean):void
}>()

// send email for get otp
function confirmEmail(){
    emit('loadingProgressBar',true)
    _api.OtpSend({email:email.value,purpose:'EmailConfirm',rmutiId:props.data.User_Rmuti_Id}).then((res)=>{
        if(res.data.status){
            _msg.default_msg({title:res.data.msg,timer:1})
            isOtpSend.value = true
            emit('loadingProgressBar',false)
         }else{
            _msg.default_msg({title:res.data.msg,timer:1})
         }
    })
}

function registerSuccess(){

    _api.registerFirstTime({rmutiId:props.data.User_Rmuti_Id,
                            username:props.data.User_Usernname,
                            fName:props.data.User_Fname,
                            lName:props.data.User_Lname,
                            email:email.value})
    .then((res)=>{
        if(res.status){
            _msg.default_msg({title:res.data.msg,timer:2})
            setTimeout(() => {
                emit('register-success',true)
            }, 2000);
        }else{
            _msg.default_msg({title:res.data.msg})
        }
    })
}

function otpValid(value:boolean){
    if(value){
        emailValid.value = email.value
        isOtpSend.value = false
        isOtpValid.value = true
    }else{
        isOtpSend.value = true
        isOtpValid.value = false
    }
}

watch(email,()=>{
    if(email.value === emailValid.value && email.value !== ''){
        isOtpValid.value = true
    }else{
        isOtpValid.value = false
    }
})

</script>

<template>
    <v-dialog v-model="props.isDialogOpen" hidden-overlay width="550">
        <v-card height="100%">
            <v-card-title class="p-6 bg-blue-500  text-white text-center">
                <span class="text-2xl"> ลงทะเบียนผู้ใช้ใหม่</span>
            </v-card-title>

            <v-card-text>
                <v-form @submit.prevent="registerSuccess">
                    <div class="flex flex-wrap w-full h-full">
                        <div class="w-full mb-3">
                            <v-text-field
                                v-model="props.data.User_Rmuti_Id"
                                :counter="13"
                                label="รหัสนักศึกษา"
                                readonly
                                required
                                bg-color="#e5e7eb"
                                density="comfortable"
                                maxlength="13"
                                :rules="rmutiRule"
                            ></v-text-field>
                        </div>
                        <div class="w-full mb-3">
                            <v-text-field
                                v-model="props.data.User_Usernname"
                                :counter="13"
                                label="ชื่อผู้ใช้งาน"
                                required
                                bg-color="#e5e7eb"
                                density="comfortable"
                                maxlength="255"
                                clearable
                                :rules="usernameRule"
                            ></v-text-field>
                        </div>
                        <div class="w-1/2 pr-1 mb-3">
                            <v-text-field
                                v-model="props.data.User_Fname"
                                :counter="255"
                                label="ชื่อจริง"
                                required
                                bg-color="#e5e7eb"
                                density="comfortable"
                                maxlength="255"
                                :rules="thaiRule"
                                clearable
                            ></v-text-field>
                        </div>
                        <div class="w-1/2 pl-1 mb-3">
                            <v-text-field
                                v-model="props.data.User_Lname"
                                :counter="255"
                                maxlength="255"
                                label="นามสกุล"
                                required
                                bg-color="#e5e7eb"
                                density="comfortable"
                                :rules="thaiRule"
                                clearable
                            >
                            </v-text-field>
                        </div>
                        <div class="w-full mb-3">
                            <v-text-field
                                v-model="email"
                                :counter="255"
                                label="อีเมลล์มหาลัย"
                                required
                                bg-color="#e5e7eb"
                                density="comfortable"
                                maxlength="255"
                                :rules="emailRule"
                                >
                                <template v-slot:append-inner v-if="isOtpValid">
                                    <v-icon
                                        color="success"
                                    >
                                        mdi-check-circle
                                    </v-icon>
                                </template>
                            </v-text-field>
                        </div>
                        <div class="w-full mb-3" v-if="isOtpSend">
                            <OTPInput
                                :purpose="'EmailConfirm'"
                                :email="data.User_Email"
                                :compact="true"
                                @is-o-t-p-valid="(value:boolean)=>{ otpValid(value) }">
                            </OTPInput>
                        </div>
                    </div>
                    <div class="mt-3 flex w-full justify-center gap-3 items-center">
                        <v-btn
                            v-if="!isOtpValid"
                            color="success"
                            @click="confirmEmail"
                            :disabled="!isEmailValid"
                            class="py-2 px-3 text-center text-white w-40 bg-green-500 hover:bg-green-700 rounded-full cursor-pointer">
                            ส่งรหัสยืนยัน Email
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="registerSuccess"
                            :disabled="!isOtpValid"
                            class="py-2 px-3 text-center text-white w-40 bg-green-500 hover:bg-green-700 rounded-full cursor-pointer">
                            บันทึกข้อมูล
                        </v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
