<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import NewProjectDialog from '../../components/common/NewProjectDialog.vue';
import { onMounted ,ref ,watch} from 'vue';
import MsgAlert from '../../services/msgAlert';
import apiRPTS from '../../services/api/apiRPTS_check';
import { useRouter } from 'vue-router';
import { ProjectDataRes , userDataRes} from '../../store/Interface'
import moment from 'moment';
import InviteDialog from '../../components/common/InviteDialog.vue';

const _msg = new MsgAlert()
const _api = new apiRPTS()

const tab = ref(null)
const panel = ref([])

const router = useRouter()

const userId = ref<number>()

const isDialogNewProject = ref(false)
const isInviteDialogOpen = ref(false)
const userInviterType = ref<'นักศึกษา' | 'อาจารย์'>('นักศึกษา')
const isLoadingProgressBar = ref(false)

const isProject = ref(false)
const projectData = ref<ProjectDataRes>()
const ownerData = ref<userDataRes[]>()
const advisorData =ref<userDataRes[]>()

onMounted(()=>{
    checkUserProject()
})

function checkUserProject(){
    if(localStorage.getItem('credential')){
        const credentialData = JSON.parse(localStorage.getItem('credential')!)
        userId.value = credentialData.userId as number
        _api.checkUserProject({userId:userId.value}).then((res)=>{
            if(res.data.status){
                console.log(res.data);

                ownerData.value = res.data.ownerData
                projectData.value = res.data.projectData
                advisorData.value = res.data.advisorData

                if(res.data.projectCount === 1){
                    isProject.value = true
                }else if(res.data.projectCount === 0){
                    isProject.value = false
                }
            }else{

            }
        })
    }


}

function openInviteDialog(users:'นักศึกษา' | 'อาจารย์'){
    userInviterType.value = users
    isInviteDialogOpen.value = true
}

function dialogClosed(){
    isInviteDialogOpen.value = false
    isDialogNewProject.value = false
    checkUserProject()
}


</script>

<template>
    <AdminNavigationBar :is-loading-progress-bar="isLoadingProgressBar">
        <v-container v-if="!isProject">
            <v-card
                width="100%" height="100%" color=""
            >
                <v-card-title>
                    <div class="w-full flex justify-between">
                        <span class="text-lg text-yellow-500"> <v-icon class="mr-3">mdi-alert</v-icon> นักศึกษายังไม่สร้างโครงการ กรุณาสร้างโครงการก่อนเพื่อดำเนินการต่อ</span>
                        <v-btn color="success" @click="isDialogNewProject = true"> สร้างโครงการ </v-btn>
                    </div>
                </v-card-title>
            </v-card>
        </v-container>
        <v-container >
            <div v-if="isProject" class="w-full flex flex-row gap-10">
                <div class="w-3/12">
                    <v-card
                        width="100%" height="100%" color=""
                    >
                        <v-toolbar
                            color="primary"
                            density="compact"
                        >
                            <div class="w-full flex justify-center items-center">
                                <span class="text-md text-white"> รายละเอียดโครงการ </span>
                            </div>
                        </v-toolbar>
                        <v-card-text>
                            <!-- <div class="w-full flex flex-row justify-center items-center my-3">
                                <div class="relative">
                                    <v-avatar
                                        color="grey"
                                        size="200"
                                        rounded=""
                                    >
                                        <v-img
                                            cover
                                            :src="'https://cdn.dribbble.com/userupload/3076724/file/original-5ae344e17b0ae56ee400dff5394f89a8.png?compress=1&resize=752x'"
                                        >
                                        </v-img>
                                    </v-avatar>
                                    <div
                                        class="absolute z-50 bottom-0 -right-6"
                                    >
                                        <v-btn
                                            rounded="pill"
                                            color="primary"
                                            size="small"
                                        >
                                            <v-icon color="white">
                                                mdi-camera
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                            <v-divider></v-divider> -->
                            <div class="w-full flex flex-col justify-start items-start -my-1 mb-2">
                                <div class="flex flex-col" style="width:275px; max-width:275px;">
                                    <!-- <span class="ml-2 text-black font-bold">รายละเอียดโครงการ</span> -->
                                    <v-tooltip location="bottom" :text=" projectData?.Project_Name_TH ">
                                        <template v-slot:activator="{ props }">
                                            <span v-bind="props" class="ml-2 text-black mt-2 truncate"><b>ชื่อไทย:</b> {{ projectData?.Project_Name_TH }}</span>
                                        </template>
                                    </v-tooltip>
                                    <v-tooltip location="bottom" :text="projectData?.Project_Name_EN">
                                        <template v-slot:activator="{ props }">
                                            <span v-bind="props" class="ml-2 text-black mt-2 truncate"><b>ชื่ออังกฤษ:</b> {{ projectData?.Project_Name_EN}}</span>
                                        </template>
                                    </v-tooltip>
                                    <v-tooltip location="bottom" text="Unknow">
                                        <template v-slot:activator="{ props }">
                                            <span v-bind="props" class="ml-2 text-black mt-2 truncate"><b>รูปแบบ:</b> Unknow</span>
                                        </template>
                                    </v-tooltip>
                                    <v-tooltip location="bottom" text="Unknow">
                                        <template v-slot:activator="{ props }">
                                            <span v-bind="props" class="ml-2 text-black mt-2 truncate"><b>ประเภท:</b> Unknow</span>
                                        </template>
                                    </v-tooltip>
                                    <v-tooltip location="bottom" :text="String(moment(projectData?.Project_Created_Date).format('DD MMMM YYYY'))">
                                        <template v-slot:activator="{ props }">
                                            <span v-bind="props" class="ml-2 text-black mt-2 truncate"><b>สร้างวันที่: </b>{{ String(moment(projectData?.Project_Created_Date).format('DD MMMM YYYY')) }} </span>
                                        </template>
                                    </v-tooltip>
                                </div>
                            </div>
                            <v-divider></v-divider>
                            <div class="w-full flex flex-col justify-start items-start my-2">
                                <span class="ml-2 text-black font-bold">สถานะโครงการ</span>
                                <div class="w-full flex flex-wrap justify-start gap-2">
                                    <v-chip
                                        class="ma-2"
                                        label
                                        color="primary"
                                        text-color="white"
                                        size="small"
                                        rounded="full"
                                        >
                                            {{ projectData?.Project_Status.Project_Status_Name }}
                                    </v-chip>
                                </div>
                            </div>
                            <v-divider></v-divider>
                            <div class="w-full flex flex-col justify-start items-start my-2">
                                <span class="ml-2 text-black font-bold">ผู้รับผิดชอบโครงการ</span>
                                <v-list>
                                    <v-list-item  v-for="owner of ownerData"
                                        :title="owner.User_Fname + ' ' +owner.User_Lname"
                                        :subtitle="owner.User_Rmuti_Id"
                                        :prepend-avatar="owner.User_Avatar"
                                    >
                                    </v-list-item>
                                </v-list>
                                <div v-if="ownerData!.length !== 2" class="w-full my-3 flex flex-row justify-center items-center">
                                    <v-btn
                                        @click="openInviteDialog('นักศึกษา')"
                                        color="primary" rounded="pill" size="small"
                                    >
                                        เชิญผู้ร่วมทำโครงการ
                                    </v-btn>
                                </div>
                            </div>
                            <v-divider></v-divider>
                            <div class="w-full flex flex-col justify-start items-start my-2">
                                <span class="ml-2 text-black font-bold">อาจารย์ที่ปรึกษา </span>
                                <v-list v-if="advisorData?.length !== 0">
                                    <v-list-item v-for="advisor of advisorData"
                                        :title="advisor.User_Fname + ' ' +advisor.User_Lname"
                                        :subtitle="'อาจารย์ที่ปรึกษาหลัก'"
                                        :prepend-avatar="advisor.User_Avatar"
                                    >
                                    </v-list-item>
                                </v-list>
                                <div v-if="projectData?.Project_Status.Project_Status_Id !== 2 && advisorData?.length === 0"
                                    class="w-full my-3 flex flex-row justify-center items-center">
                                    <v-btn
                                        @click="openInviteDialog('อาจารย์')"
                                        color="primary" rounded="pill" size="small"
                                    >
                                        เสนอหัวข้อโครงการให้อาจารย์
                                    </v-btn>
                                </div>
                                <div v-if="projectData?.Project_Status.Project_Status_Id === 2">
                                    <v-list>
                                        <v-list-item
                                            color="amber"
                                            title="อาจารย์ที่ปรึกษาหลัก"
                                            subtitle="รอการตอบกลับ..."
                                            prepend-avatar="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
                                        >
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
                <div class="w-9/12">
                    <v-card height="100%">
                        <v-tabs
                            v-model="tab"
                            bg-color="primary"
                        >
                        <v-tab value="Tracking" color="white"> <span class="text-white"> ติดตามความก้าวหน้า </span> </v-tab>
                        <v-tab value="Summary" color="white"> <span class="text-white"> กำหนดการ </span> </v-tab>
                        <v-tab value="images" color="white"> <span class="text-white"> ภาพรวม </span> </v-tab>
                        </v-tabs>
                        <v-card-text>
                            <v-window v-model="tab" v-if="projectData?.Project_Status.Project_Status_Id! > 2">
                                <v-window-item value="Tracking">
                                <v-expansion-panels
                                    variant="accordion"
                                    v-model="panel"
                                    multiple
                                >
                                    <v-expansion-panel>
                                        <v-expansion-panel-title color="">
                                            <v-icon class="mr-3">mdi-file-document</v-icon> เอกสารโครงการ 2
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text>
                                            <v-table>
                                                <thead>
                                                    <tr>
                                                        <th class="w-10 text-center">#</th>
                                                        <th class="w-60 text-left">หัวข้อ</th>
                                                        <th class="w-24 text-center">ไฟล์</th>
                                                        <th class="w-24 text-center">วันที่</th>
                                                        <th class="w-auto text-center">สถานะ</th>
                                                        <th class="w-auto text-center">หมายเหตุ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="text-center">1</td>
                                                        <td>เอกสาร PJ-01</td>
                                                        <td class="flex w-full justify-center items-center">
                                                            <v-icon color="error" size="x-large">mdi-file-pdf-box</v-icon>
                                                        </td>
                                                        <td class="text-center">9/9/2566</td>
                                                        <td class="text-center" >รอการตอบกลับ</td>
                                                        <td class="text-center" > </td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-expansion-panel-text>
                                    </v-expansion-panel>

                                    <v-expansion-panel>
                                        <v-expansion-panel-title color="">
                                            <v-icon class="mr-3">mdi-notebook</v-icon> รูปเล่ม 5 บท
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text>

                                        </v-expansion-panel-text>
                                    </v-expansion-panel>

                                    <v-expansion-panel>
                                        <v-expansion-panel-title color="">
                                            <v-icon class="mr-3">mdi-cog</v-icon> ชิ้นงาน
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text>

                                        </v-expansion-panel-text>
                                    </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-window-item>

                                <v-window-item value="Summary">
                                    Summary
                                </v-window-item>

                                <v-window-item value="images">
                                    images
                                </v-window-item>
                            </v-window>
                            <v-card v-else width="100%" height="100%" color="">
                                <v-card-title v-if="projectData?.Project_Status.Project_Status_Id! === 1">
                                    <div class="w-full flex justify-between">
                                        <span class="text-lg text-yellow-500"> <v-icon class="mr-3">mdi-alert</v-icon>
                                            <span>นักศึกษายังไม่มีอาจารย์ที่ปรึกษาโครงการ กรุณาเสนอโครงการไปให้อาจารย์ที่ตนเองต้องการก่อน</span>
                                        </span>
                                    </div>
                                </v-card-title>
                                <v-card-title v-if="projectData?.Project_Status.Project_Status_Id! === 2">
                                    <div class="w-full flex justify-between">
                                        <span class="text-lg text-yellow-500"> <v-icon class="mr-3">mdi-alert</v-icon>
                                            <span>อยู่ระหว่างการเสนอหัวข้อโครงการให้แก่อาจารย์ ต้องให้อาจารย์ตอบรับเพื่อดำเนินการต่อ</span>
                                        </span>
                                    </div>
                                </v-card-title>
                            </v-card>
                        </v-card-text>
                    </v-card>
                </div>
            </div>

            <div v-if="!isProject" class="w-full h-full flex justify-center items-center">
                <img src="../../assets/iamges/illustrations/Add tasks-bro.svg" alt=""
                class="w-1/2">
            </div>
        </v-container>
    </AdminNavigationBar>


    <NewProjectDialog
        persistent
        v-model:isDialogOpen="isDialogNewProject"
        @create-cancel="()=>{ dialogClosed() }"
        @create-success="()=>{ dialogClosed() }"
    >
    </NewProjectDialog>

    <InviteDialog
        :is-dialog-open="isInviteDialogOpen"
        :user="userInviterType"
        :inviter-id="Number(userId!)"
        :project-id="Number(projectData?.Project_Id!)"
        @create-cancel="()=>{ dialogClosed() }"
        @create-success="()=>{ dialogClosed() }"
    >
    </InviteDialog>
</template>
