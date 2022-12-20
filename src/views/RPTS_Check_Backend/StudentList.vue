<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import NewUser from '../../components/common/NewUser.vue';
import {ref, onMounted} from 'vue'
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';

const _api = new apiRPTS()
const _msg = new MsgAlert()

const isOpen = ref(false)

const studentList = ref()
function getAllStudent(){
    _api.getAllStudent().then((res)=>{
        studentList.value = res.data.studentList
    })
}

onMounted(()=>{
    getAllStudent()
})
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col">
            <div class="w-full flex gap-2 ">
                <v-btn
                    prepend-icon="mdi-account-plus"
                    color="success"
                    @click="isOpen = true">
                    เพิ่มนักศึกษา
                </v-btn>
                <v-btn
                    prepend-icon="mdi-account-multiple-plus"
                    color="success">
                    นำเข้ารายชื่อนักศึกษา
                </v-btn>
            </div>

            <div class="w-full">
                <v-table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>อีเมลล์</th>
                            <th>สถานะ</th>
                            <th class="w-40 text-center">ปีการศึกษา</th>
                            <th class="w-64 text-center">แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
            </div>
        </div>
    </AdminNavigationBar>

    <NewUser
        :is-open="isOpen"
        @close-dialog="(event:boolean)=>{ isOpen = event }">
    </NewUser>
</template>

<style scoped>

</style>
