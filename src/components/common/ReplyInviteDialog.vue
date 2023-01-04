<script setup lang="ts">
import { isRmutiId } from '../../services/validationRules';
import {ref , onMounted ,watch , watchEffect} from 'vue'
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import { CredentialDataFromLocal, userDataRes } from '../../store/Interface';
import { userData } from '../../store/GlobalData';
import _default from 'vue3-otp-input';

const _api = new apiRPTS()
const _msg = new MsgAlert()


const isFormValid = ref()
const replyMsg = ref()


const props = defineProps<{
    isDialogOpen: boolean,
    inviteAdvisorId: number ,
    projectId:number
}>()

const emit = defineEmits<{
    (event: 'reply-success' ,size:boolean):void
    (event: 'reply-cancel' ,size:boolean):void
}>()

function replyInviteAdvisor(replyStatus:1 | 2){
    let msg:string =''
    if(replyStatus===1) msg = 'ต้องการตอบรับเป็นที่ปรึกษาใช่ไหม'
    if(replyStatus===2) msg = 'ต้องการปฏิเสธการเป็นที่ปรึกษาใช่ไหม'
    let userData:CredentialDataFromLocal = JSON.parse(localStorage.getItem('credential')!)
    _msg.confirm(msg,'warning').then((isConfirmed)=>{
        if(isConfirmed){
            let data = {
                replyMsg:replyMsg.value,
                replyStatus:replyStatus,
                inviteAdvisorId:props.inviteAdvisorId,
                projectId:props.projectId,
                advisorId:userData.userId
            }
            _api.replyInviteAdvisor(data).then((res)=>{
                if(res.data.status){
                    _msg.default_msg({title:res.data.msg,timer:1.5,progressbar:true})
                    emit('reply-success',true)
                }else{
                    _msg.default_msg({title:res.data.msg,icon:'error'})
                }
            })
        }
    })
}

function close() {
    emit('reply-cancel',false)
    replyMsg.value = ''
}


</script>

<template>
    <v-dialog v-model="props.isDialogOpen" hidden-overlay persistent width="600">
        <v-card height="100%">
            <v-card-title class="px-6 py-4 bg-blue-500  text-white text-center">
                <span class="text-2xl"> ตอบกลับ </span>
             </v-card-title>
            <v-card-text>
                <v-form v-model="isFormValid" @submit.prevent="">
                    <v-textarea
                        v-model="replyMsg"
                        label="ข้อความตอบกลับไปถึงผู้ส่ง"
                        :counter="255"
                        maxlength="255"
                        clearable
                        bg-color="#e5e7eb"
                        required
                    >
                    </v-textarea>
                    <div class="flex w-full justify-between mb-4 gap-4 items-center">
                        <div>
                            <v-btn color="grey" @click="close" >
                                ปิดหน้าต่าง
                            </v-btn>
                        </div>
                        <div class="flex gap-3">
                            <v-btn color="error" @click="replyInviteAdvisor(2)">
                                ปฏิเสธ
                            </v-btn>
                            <v-btn color="green" @click="replyInviteAdvisor(1)">
                                ตอบรับ
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
