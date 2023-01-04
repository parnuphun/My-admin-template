<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import {onMounted , ref} from 'vue'
import { CredentialDataFromLocal } from '../../store/Interface';
import moment from 'moment';
import ReplyInviteDialog from './../../components/common/ReplyInviteDialog.vue'

const _api = new apiRPTS()
const _msg = new MsgAlert()

const isReplyDialogOpen = ref(false)
const isLoadingProgressBar = ref(false)

const inviteMsgAdvisorList = ref()
const inviteAdvisorId = ref<number>()
const projectId = ref<number>()

const userData = ref<CredentialDataFromLocal>()

onMounted(()=>{
    userData.value = JSON.parse(localStorage.getItem('credential')!)
    inviteAdvisorList()
})

function inviteAdvisorList(){
    _api.inviteAdvisorlist({acceptorId:userData.value?.userId!}).then((res)=>{
        if(res.data.status){
            inviteMsgAdvisorList.value = res.data.inviteAdvisorList
            console.log(inviteMsgAdvisorList.value);
        }else{
            _msg.default_msg({title:res.data.msg,icon:'error'})
        }
    })
}

function replyInviteAdvisor(inviteId:number,pjId:number){
    inviteAdvisorId.value = inviteId
    projectId.value = pjId
    isReplyDialogOpen.value = true
}

function downloadProposal(fileName:string){
    isLoadingProgressBar.value = true
    _api.downloadProposal({fileName:fileName}).then((res)=>{
        if(res.data.status === false){
            _msg.default_msg({title:res.data.msg,icon:'error'})
        }
        isLoadingProgressBar.value = false
    })
}
</script>

<template>
    <AdminNavigationBar :isLoadingProgressBar="isLoadingProgressBar">
        <v-navigation-drawer
                :elevation="0"
        >
                <div class="w-full pl-4 pr-2 pt-5 flex flex-row justify-start text-sm">กล่องจดหมาย</div>
                <!-- menu list -->
                <v-list class="" nav >
                    <v-list-item
                        title="ทั้งหมด"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-email-multiple</v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="ยังไม่อ่าน"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-email-alert</v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="อ่านแล้ว"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-email-newsletter</v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="ถังขยะ"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-email-off </v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <div class="w-full pl-4 pr-2 pt-5 flex flex-row justify-start text-sm">หมวดหมู่</div>
                <v-list class="" nav >
                    <v-list-item
                        title="ผู้ใช้งาน"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon> mdi-account-badge </v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="โครงการ"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-text-box </v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="กำหนดการ"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-calendar-badge </v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        <div class="w-full flex flex-col">
            <div class="w-full flex gap-2">
                <div class="w-full">
                    <v-text-field
                        bg-color="#e5e7eb"
                        placeholder="กรอกชื่อที่ต้องการค้นหา"
                        append-inner-icon="mdi-email-search-outline"
                        density="comfortable">
                    </v-text-field>
                </div>
            </div>
        </div>

        <div class="w-full flex flex-col justify-start items-center">
            <v-card
                v-for="inviteAdvisor of inviteMsgAdvisorList"
                class="mb-6"
                color="warning"
                width="100%"
            >
                <v-card-title>
                    <div class="w-full flex flex-row justify-between">
                        <div>
                            <v-icon> mdi-account-arrow-right </v-icon> มีโครงการถูกเสนอเข้ามาหาคุณ
                        </div>
                        <span class="text-md">
                            {{ moment().format('D MMMM YYYY') }}
                        </span>

                    </div>
                </v-card-title>
                <div class="w-full bg-white px-6 py-3">
                    <div class="w-full">
                        <div class="flex flex-col" style="">
                            <!-- <span class="ml-2 text-black font-bold">รายละเอียดโครงการ</span> -->
                            <span class="ml-2 text-black mt-2 "><b>ชื่อโครงการ: </b>
                                {{ inviteAdvisor.project.Project_Name_TH }} ({{ inviteAdvisor.project.Project_Name_EN }})
                            </span>
                            <span class="ml-2 text-black mt-2 "><b>รายละเอียดโครงการ: </b>
                                {{ inviteAdvisor.project.Project_Detail }}
                            </span>
                            <span class="ml-2 text-black mt-3 "><b>ข้อความ: </b>
                                {{ inviteAdvisor.Project_Invite_Advisor_Detail }}
                            </span>

                            <div class="flex flex-row mt-2">
                                <span class="ml-2 text-black"><b>ไฟล์ที่แนบเข้ามา: </b>
                                    <span
                                        @click="downloadProposal(inviteAdvisor.Project_Invite_Advisor_File)"
                                        class="text-blue-500 hover:text-blue-700 cursor-pointer">
                                        {{ inviteAdvisor.Project_Invite_Advisor_File }}
                                    </span>
                                </span>
                            </div>

                            <div class="flex flex-row mt-4" v-if="inviteAdvisor.Project_Invite_Advisor_Reply_Status !== 0">
                                <span class="ml-2 text-black"><b>ตอบกลับ: </b>
                                    {{ inviteAdvisor.Project_Invite_Advisor_Reply_Msg }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full h-full flex flex-row justify-between bg-white px-6 pb-6">
                    <div class="w-1/2 flex justify-start gap-3">
                        <v-avatar
                            color="grey"
                            size="45"
                            rounded="full"
                        >
                             <v-img :src="'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg'"></v-img>
                        </v-avatar>
                    </div>
                    <div class="w-1/2 flex justify-end items-center gap-3">
                        <v-btn
                            v-if="inviteAdvisor.Project_Invite_Advisor_Reply_Status === 0"
                            color="primary"
                            prepend-icon="mdi-reply"
                            @click="replyInviteAdvisor(inviteAdvisor.Project_Invite_Advisor_Id,inviteAdvisor.project.Project_Id)">
                            ตอบกลับ
                        </v-btn>
                        <v-btn
                            v-if="inviteAdvisor.Project_Invite_Advisor_Reply_Status !== 0"
                            color="success"
                            disabled
                            prepend-icon="mdi-reply">
                            ตอบกลับแล้ว
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </div>
    </AdminNavigationBar>
    <ReplyInviteDialog
        :invite-advisor-id="Number(inviteAdvisorId)"
        :is-dialog-open="isReplyDialogOpen"
        :project-id="Number(projectId)"
        @reply-cancel="()=>{ isReplyDialogOpen = false }"
        @reply-success="()=>{ isReplyDialogOpen = false ; inviteAdvisorList()}"
    ></ReplyInviteDialog>
</template>
