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

const studentList = ref()
const newStudentList = ref<any[]>()
const inputFile = ref<HTMLInputElement | null>(document.querySelector('#insert-studen-list-file'))

// click inpit file
function inputfile(){
    if(inputFile.value){
        inputFile.value.click();
    }
}

// read excel file
function readExcel(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
      };
      reader.readAsArrayBuffer(file);
    }
}

// get all student list
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
                    @click="isOpen = true"
                    prepend-icon="mdi-account-plus"
                    color="success"
                    >
                    เพิ่มนักศึกษา
                </v-btn>
                <v-btn
                    @click="inputfile"
                    prepend-icon="mdi-account-multiple-plus"
                    color="success">
                    นำเข้ารายชื่อนักศึกษา
                </v-btn>
                <input
                    ref="inputFile"
                    @change="readExcel"
                    id="insert-studen-list-file"
                    type="file"
                    class="hidden"
                >
            </div>

            <div class="w-full">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th class="w-36 text-center">รหัสนักศึกษา</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>อีเมลล์</th>
                            <th class="w-24 text-center">สถานะ</th>
                            <th class="w-18 text-center">ปีการศึกษา</th>
                            <th class="w-60 text-center">แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student , i) of studentList" :key="i">
                            <td class="text-center"> {{i+1}} </td>
                            <td> {{student.User_Rmuti_Id}}</td>
                            <td> {{student.User_Fname}} {{student.User_Lname}}</td>
                            <td> {{student.User_Email}}</td>
                            <td class="w-24">
                                <div class="w-full flex-col justify-center items-center gap-y-2 ">
                                    <v-chip v-for="role of student.User_Roles"
                                        color="primary"
                                        size="small"
                                        class="w-24 mt-1">
                                        <div class="w-full text-center">
                                            {{role.Role_Name}}
                                        </div>
                                    </v-chip>
                                </div>
                            </td>
                            <td class="w-18 text-center"> {{ moment(student.User_Joined_Date).add(543,'year').format('YYYY') }}</td>
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
        @close-dialog="(event:boolean)=>{ isOpen = event ; getAllStudent()}">
    </NewUser>
</template>

<style scoped>

</style>
