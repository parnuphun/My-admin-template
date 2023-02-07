<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import NewUser from '../../components/common/NewUser.vue';
import {ref, onMounted} from 'vue'
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import moment from 'moment';

const _api = new apiRPTS()
const _msg = new MsgAlert()

const isOpen = ref(false)

const page = ref(1)

const teacherList = ref()

// get all student list
function getAllTeacher(){
    _api.getAllUserByRole({role:2}).then((res)=>{
        if(res.data.status){
            teacherList.value = res.data.studentList
        }else{
            _msg.default_msg({title:res.data.msg,icon:'error'})
        }
    })
}

onMounted(()=>{
    getAllTeacher()
})
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col">
            <div class="w-full flex gap-2 ">
                <v-btn
                    @click="isOpen = true"
                    prepend-icon="mdi-account-plus"
                    color="success"
                    >
                    เพิ่มอาจารย์
                </v-btn>
            </div>

            <div class="w-full">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th class="w-36 text-center">รหัสอาจารย์</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>อีเมลล์</th>
                            <th class="w-24 text-center">สถานะ</th>
                            <th class="w-60 text-center">แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(teacher , i) of teacherList" :key="i">
                            <td class="text-center"> {{i+1}} </td>
                            <td> {{teacher.User_Rmuti_Id}}</td>
                            <td> {{teacher.User_Fname}} {{teacher.User_Lname}}</td>
                            <td>
                                <span v-if="teacher.User_Email_Confirm">
                                    {{teacher.User_Email}}
                                </span>
                                <span v-else>
                                    ยังไม่ยืนยันอีเมล
                                </span>
                            </td>
                            <td class="w-24">
                                <div class="w-full flex-col justify-center items-center gap-y-2 ">
                                    <v-chip v-for="role of teacher.User_Roles"
                                        color="primary"
                                        size="small"
                                        class="w-24 mt-1">
                                        <div class="w-full text-center">
                                            {{role.Role_Name}}
                                        </div>
                                    </v-chip>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-wrap justify-center gap-2 items-center">
                                    <v-btn
                                        color="info">
                                        รายละเอียด
                                    </v-btn>
                                    <v-btn
                                        color="red">
                                        ลบ
                                    </v-btn>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <div class="w-full flex justify-end items-center">
                    <v-pagination
                        v-model="page"
                        bg-color="success"
                        class="my-4"
                        :length="100"
                        :total-visible="6"
                    ></v-pagination>
                </div>
            </div>
        </div>
    </AdminNavigationBar>

    <NewUser
        :is-open="isOpen"
        :purpose="'addTeacher'"
        @close-dialog="(event:boolean)=>{ isOpen = event ; getAllTeacher()}">
    </NewUser>
</template>

<style scoped>

</style>
