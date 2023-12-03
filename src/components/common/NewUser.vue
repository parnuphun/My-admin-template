<!-- <script setup lang="ts">
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import {ref , onMounted} from 'vue';
import {isValidEmail , isUsername,  isRmutiId , isThaiLang} from '../../services/validationRules'

const props = defineProps<{
    isOpen:boolean,
    purpose: 'addStudent' | 'addTeacher'
}>()

const emit = defineEmits<{
    (event: 'close-dialog' , size:boolean) :void
}>()


const _api = new apiRPTS()
const _msg = new MsgAlert()

const rmutiId = ref('')
const firstName = ref('')
const lastName = ref('')
const username = ref('')

const isFormValid = ref(false)

// validator rules
let rmutiRule = [(v:string) => isRmutiId(v)]
let thaiRule = [(v:string) => isThaiLang(v)]
let usernameRule = [(v:string) => isUsername(v)]

async function addStudent(){
    if(isFormValid){
        const data = {
            rmutiId:rmutiId.value,
            firstName:firstName.value,
            lastName:lastName.value,
            role:1
        }

        _api.userRegister(data).then((res)=>{
            if(res.data.status){
                _msg.default_msg({title:res.data.msg,timer:1.5})
                closeDialog()
            }else{
                _msg.default_msg({title:res.data.msg,icon:'error'})
            }
        })
    }
}

async function addTeacher(){
    if(isFormValid){
        const data = {
            rmutiId: rmutiId.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            role: 2
        }

        _api.userRegister(data).then((res)=>{
            if(res.data.status){
                _msg.default_msg({title:res.data.msg,timer:1.5})
                closeDialog()
            }else{
                _msg.default_msg({title:res.data.msg,icon:'error'})
            }
        })
    }
}

function closeDialog(){
    rmutiId.value = ''
    firstName.value = ''
    lastName.value = ''
    isFormValid.value = false
    emit('close-dialog',false)
}

</script>

<template>
    <v-dialog v-model="props.isOpen" persistent width="600">
        <v-card height="">
            <v-card-title class="p-6 bg-blue-500  text-white text-center">
                <span class="text-2xl" v-if="props.purpose === 'addStudent'"> เพิ่มนักศึกษา  </span>
                <span class="text-2xl" v-if="props.purpose === 'addTeacher'"> เพิ่มอาจารย์  </span>
            </v-card-title>

            <v-card-text>
                <v-form v-model="isFormValid" @submit.prevent="addStudent" v-if="props.purpose === 'addStudent'">
                    <div class="w-full flex flex-wrap">
                        <div class="w-full mb-3">
                            <v-text-field
                                v-model="rmutiId"
                                label="รหัสนักศึกษา"
                                bg-color="#e5e7eb"
                                density="comfortable"
                                prepend-inner-icon=""
                                :rules="rmutiRule"
                                :counter="13"
                                maxlength="13"
                                clearable
                                >
                            </v-text-field>
                        </div>
                        <div class="w-1/2 pr-2">
                            <v-text-field
                                v-model="firstName"
                                label="ชื่อจริง"
                                bg-color="#e5e7eb"
                                density="comfortable"
                                prepend-inner-icon=""
                                :counter="255"
                                :rules="thaiRule"
                                maxlength="255"
                                clearable
                                >
                            </v-text-field>
                        </div>
                        <div class="w-1/2 pl-2">
                            <v-text-field
                                v-model="lastName"
                                label="นามสกุล"
                                bg-color="#e5e7eb"
                                density="comfortable"
                                prepend-inner-icon=""
                                :counter="255"
                                :rules="thaiRule"
                                maxlength="255"
                                clearable
                                >
                            </v-text-field>
                        </div>
                    </div>
                    <div class="mt-6 w-full flex gap-3 justify-center items-center">
                    <v-btn
                        @click="closeDialog"
                        color="error"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        :disabled="!isFormValid"
                        type="submit"
                        color="primary"
                    >
                        เพิ่ม
                    </v-btn>
                </div>
                </v-form>
                <v-form v-model="isFormValid" @submit.prevent="addTeacher" v-if="props.purpose === 'addTeacher'">
                    <div class="w-full flex flex-wrap">
                        <div class="w-full mb-3">
                            <v-text-field
                                v-model="rmutiId"
                                label="รหัสอาจารย์"
                                bg-color="#e5e7eb"
                                density="comfortable"
                                prepend-inner-icon=""
                                :rules="rmutiRule"
                                :counter="13"
                                maxlength="13"
                                clearable
                                >
                            </v-text-field>
                        </div>
                        <div class="w-full mb-3">
                            <v-text-field
                                v-model="username"
                                label="ชื่อผู้ใช้งาน"
                                bg-color="#e5e7eb"
                                density="comfortable"
                                prepend-inner-icon=""
                                :rules="usernameRule"
                                :counter="255"
                                maxlength="255"
                                clearable
                                >
                            </v-text-field>
                        </div>
                        <div class="w-1/2 pr-2">
                            <v-text-field
                                v-model="firstName"
                                label="ชื่อจริง"
                                bg-color="#e5e7eb"
                                density="comfortable"
                                prepend-inner-icon=""
                                :counter="255"
                                :rules="thaiRule"
                                maxlength="255"
                                clearable
                                >
                            </v-text-field>
                        </div>
                        <div class="w-1/2 pl-2">
                            <v-text-field
                                v-model="lastName"
                                label="นามสกุล"
                                bg-color="#e5e7eb"
                                density="comfortable"
                                prepend-inner-icon=""
                                :counter="255"
                                :rules="thaiRule"
                                maxlength="255"
                                clearable
                                >
                            </v-text-field>
                        </div>
                    </div>
                    <div class="mt-6 w-full flex gap-3 justify-center items-center">
                    <v-btn
                        @click="closeDialog"
                        color="error"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        :disabled="!isFormValid"
                        type="submit"
                        color="primary"
                    >
                        เพิ่ม
                    </v-btn>
                </div>
                </v-form>
            </v-card-text>


        </v-card>
    </v-dialog>
</template> -->
