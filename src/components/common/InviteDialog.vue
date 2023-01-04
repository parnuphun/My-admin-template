<script setup lang="ts">
import { isRmutiId } from '../../services/validationRules';
import {ref , onMounted ,watch , watchEffect} from 'vue'
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import { userDataRes } from '../../store/Interface';

const _api = new apiRPTS()
const _msg = new MsgAlert()

const rmutiIdRule = [(v:string)=>isRmutiId(v)]
const isFormValid = ref<boolean>()
const isTeacherFormValid = ref<boolean>()
const teacherList = ref<any>()

const teacherId = ref()
const file = ref()
const detail = ref()


const props = defineProps<{
    isDialogOpen: boolean,
    inviterId: number ,
    projectId: number ,
    user: 'นักศึกษา' | 'อาจารย์'
}>()

const emit = defineEmits<{
    (event: 'create-success' ,size:boolean):void
    (event: 'create-cancel' ,size:boolean):void
}>()

// get all teacjer list
function getAllTeacher(){
    _api.getAllUserByRole({role:2}).then((res)=>{
        if(res.data.status){
            teacherList.value = res.data.studentList
            teacherList.value.map((teacher:any)=>{
                teacher.User_Fullname = teacher.User_Fname + ' ' +teacher.User_Lname
                return teacher
            })
        }else{
            _msg.default_msg({title:res.data.msg,icon:'error'})
        }
    })
}

function inviteOwner() {

}
function inviteAdvisor () {
    let formData = new FormData()
    formData.append('proposal',file.value[0])
    formData.append('inviterId',String(props.inviterId))
    formData.append('acceptorId',String(teacherId.value))
    formData.append('projectId',String(props.projectId))
    formData.append('detail',detail.value)

    _api.inviteAdvisor(formData).then((res)=>{
        if(res.data.status){
            _msg.default_msg({title:res.data.msg,timer:1.5,progressbar:true})
            close()
        }else{
            _msg.default_msg({title:res.data.msg,icon:'error'})
        }
    })
}

function close() {
    emit('create-cancel',false)
    teacherId.value = ''
    detail.value = ''
}

watchEffect(()=>{
    if(props.user === 'อาจารย์'){
        getAllTeacher()
    }
})

watch(teacherId,()=>{
    if(typeof teacherId.value === 'number'){
        isTeacherFormValid.value = true
    }else{
        isTeacherFormValid.value = false
    }
})

</script>

<template>
    <v-dialog v-model="props.isDialogOpen" hidden-overlay persistent width="600">
        <v-card height="100%">
            <v-card-title class="px-6 py-4 bg-blue-500  text-white text-center">
                <span v-if="props.user === 'นักศึกษา'" class="text-2xl"> เชิญผู้ร่วมทำโครงการ </span>
                <span v-else class="text-2xl"> เสนอหัวข้อโครงการให้อาจารย์ </span>
             </v-card-title>
            <v-card-text>
                <v-form v-model="isFormValid" @submit.prevent="inviteOwner" v-if="props.user === 'นักศึกษา'">
                    <v-text-field
                        label="ใส่รหัสนักศึกษาที่ต้องการเชิญ"
                        :counter="13"
                        maxlength="13"
                        clearable
                        bg-color="#e5e7eb"
                        :rules="rmutiIdRule"
                        required
                    >
                    </v-text-field>
                    <div class="flex w-full justify-center mb-4 gap-4 items-center">
                        <v-btn color="grey" @click="close" size="large">
                            ปิดหน้าต่าง
                        </v-btn>
                        <v-btn color="green" type="submit" size="large" :disabled="!isFormValid">
                            เชิญ
                        </v-btn>
                    </div>
                </v-form>
                <v-form v-model="isFormValid" @submit.prevent="inviteAdvisor" v-if="props.user === 'อาจารย์'">
                    <v-autocomplete
                        v-model="teacherId"
                        bg-color="#e5e7eb"
                        label="เลือกอาจารย์ที่ต้องการเสนอชื่อโครงการ"
                        prepend-inner-icon="mdi-account-tie"
                        :items="teacherList"
                        item-title="User_Fullname"
                        item-value="User_Id"
                        prependAva
                        required
                    >
                        <template v-slot:item="{ props, item }">
                            <v-list-item v-if="typeof item.raw !== 'object'" v-bind="props"></v-list-item>
                            <v-list-item
                            v-else
                            v-bind="props"
                            :prepend-avatar="item.raw.User_Avatar"
                            :title="item.raw.User_Fullname"
                            :subtitle="item.raw.User_Rmuti_Id"
                            ></v-list-item>
                        </template>
                    </v-autocomplete>
                    <v-file-input
                        v-model="file"
                        show-size
                        counter
                        prepend-icon=""
                        prepend-inner-icon="mdi-file"
                        label="แนบไฟล์แบบร่างโครงการ"
                        accept=".pdf"
                        bg-color="#e5e7eb"
                        name="proposal"
                        required
                    ></v-file-input>
                    <v-textarea
                        v-model="detail"
                        label="รายละเอียด"
                        :counter="255"
                        maxlength="255"
                        clearable
                        bg-color="#e5e7eb"
                    >
                    </v-textarea>

                    <div class="flex w-full justify-center mb-4 gap-4 items-center">
                        <v-btn color="grey" @click="close" size="large">
                            ปิดหน้าต่าง
                        </v-btn>
                        <v-btn color="green" type="submit" size="large" :disabled="!isTeacherFormValid">
                            เสนอหัวข้อ
                        </v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
