<script setup lang="ts">
import { useRouter } from 'vue-router';
import {ref , watch} from 'vue'
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import { isPasswordMatch , isPasswordStrength } from '../../services/validationRules';

const props = defineProps<{
    email:string,
    textHeader?:string,
    enableHeader?:boolean,
    inputBgColor?:string,
    density?: 'comfortable' | 'compact' | 'default'
}>()

const emit = defineEmits<{
    (event:'resetPasswordSuccess',size:boolean) :void
}>()

const _api = new apiRPTS()
const _msg = new MsgAlert()

const router = useRouter()

const newPassword = ref('')
const repeatNewPassword = ref('')
const isFormValid = ref<boolean>()

// set new password
function confirmNewPassword(){
    if(newPassword.value === repeatNewPassword.value){
        _msg.confirm('คุณต้องการจะเปลี่ยนรัหสผ่านใช่หรือไม่').then((isConfiremd)=>{
            if(isConfiremd){
                _api.resetPassword({newPassword: newPassword.value , email: props.email}).then((res)=>{
                    if(res.data.status){
                        _msg.succ('เปลี่ยนรหัสผ่านเรียบร้อย',1.5)
                        setTimeout(()=>{
                            emit('resetPasswordSuccess',true)
                        },1500)
                    }
                })
            }
        })
    }else{
        _msg.err('Password ที่ป้อนไม่ตรงกัน')
    }
}

const matchRule = [(v:string)=>isPasswordMatch(newPassword.value , v)]
const isStrength =[(v:string)=>isPasswordStrength(v)]

const isButtonDisable = ref(true)

// button disable tracking form is valid or is not
watch(isFormValid,()=>{
    if(isFormValid.value === true){
        isButtonDisable.value = false
    }else{
        isButtonDisable.value = true
    }
})

const strengthPassword = ref(0)
const strengthColor = ref('red')
const strengthText = ref('')

// validate password
watch(newPassword,()=>{
    const specialCharacters = '!@#$%^&*()_+-=';
    if(newPassword.value === '' || newPassword.value.length < 8){
        strengthPassword.value = 0
        strengthText.value = ''
    }
    if(newPassword.value.length >= 8){
        strengthPassword.value = 33
        strengthColor.value = 'error'
        strengthText.value = 'ต่ำ'
    }
    if(newPassword.value.length >= 8 && (/\d/.test(newPassword.value) || specialCharacters.split('').some(char => newPassword.value.includes(char)))){
        strengthPassword.value = 66
        strengthColor.value = 'amber'
        strengthText.value = 'ปานกลาง'
    }
    if(newPassword.value.length >= 8 && /\d/.test(newPassword.value) && specialCharacters.split('').some(char => newPassword.value.includes(char))){
        strengthPassword.value = 100
        strengthColor.value = 'success'
        strengthText.value = 'แข็งแรง'
    }
})

</script>


<template>
    <v-form v-model="isFormValid" @submit.prevent="" class="h-full text-left">
        <div class="h-full">
            <div class="text-center mb-10" v-if="props.enableHeader && !props.textHeader">
                <span class="text-3xl text-center"> New Password </span>
            </div>
            <div class="text-center mb-10" v-if="props.textHeader">
                <span class="text-3xl text-center"> {{  props.textHeader  }} </span>
            </div>
            <div class="mb-1">
                <v-text-field
                    prepend-inner-icon="mdi-form-textbox-password"
                    v-model="newPassword"
                    label="New Password"
                    :bg-color="props.inputBgColor"
                    type="password"
                    :density="props.density"
                    :rules="isStrength"
                    required
                ></v-text-field>
            </div>
            <div class="mb-1">
                <v-text-field
                    prepend-inner-icon="mdi-form-textbox-password"
                    v-model="repeatNewPassword"
                    bg-color="#e5e7eb"
                    label="Repeat Password"
                    type="password"
                    :density="props.density"
                    :rules="matchRule"
                    required
                ></v-text-field>
            </div>

            <!-- progress bar -->
            <div class="w-full" v-if="strengthPassword >= 33">
                <v-progress-linear
                    v-model="strengthPassword"
                    :color="strengthColor"
                    height="15"
                    rounded="xl"
                    class="mb-1"
                >
                <template v-slot:default="{ value }">
                    <strong class="text-white">{{ strengthText }}</strong>
                </template>
                </v-progress-linear>
            </div>

            <div class="flex justify-center items-end gap-2 mb-3 mt-3">
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
                    :disabled="isButtonDisable"
                >
                    ยืนยัน
                </v-btn>
            </div>
        </div>
    </v-form>
</template>
