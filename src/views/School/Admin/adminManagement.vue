<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref, onMounted } from 'vue'
import {imageValidate} from '../../../services/validationRules'

onMounted(() => {
    console.log(dialog.value)
})
const dialog = ref(false)
const adminDialogAdd = ref(false)
const adminEdit = ref(false)
const adminMoveoutline = ref(false)
const _imgValid = [(v:any)=>imageValidate(v)]
const personImage = ref()

interface adminsType {
    admin_id:number,
    admin_image:string,
    admin_username:string,
    admin_fullname:string,
    admin_email:string,
    admin_phone:string
}

const admins = ref<Array<adminsType>>([
    {
        admin_id: 1,
        admin_image: '/images/avartars/avartar fuse template/male-04.jpg',
        admin_username: 'admin0998',
        admin_fullname: 'asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas ',
        admin_email: 'asdasddasdasdas@rmuti.ac.th',
        admin_phone: '098-106-5122',
    },
    {
        admin_id: 1,
        admin_image: '/images/avartars/avartar fuse template/male-04.jpg',
        admin_username: 'admin0998',
        admin_fullname: 'asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas ',
        admin_email: 'asdasddasdasdas@rmuti.ac.th',
        admin_phone: '098-106-5122',
    },
    {
        admin_id: 1,
        admin_image: '/images/avartars/avartar fuse template/male-04.jpg',
        admin_username: 'admin0998',
        admin_fullname: 'asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas ',
        admin_email: 'asdasddasdasdas@rmuti.ac.th',
        admin_phone: '098-106-5122',
    },
    {
        admin_id: 1,
        admin_image: '/images/avartars/avartar fuse template/male-04.jpg',
        admin_username: 'admin0998',
        admin_fullname: 'asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas ',
        admin_email: 'asdasddasdasdas@rmuti.ac.th',
        admin_phone: '098-106-5122',
    },
    {
        admin_id: 1,
        admin_image: '/images/avartars/avartar fuse template/male-04.jpg',
        admin_username: 'admin0998',
        admin_fullname: 'asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas ',
        admin_email: 'asdasddasdasdas@rmuti.ac.th',
        admin_phone: '098-106-5122',
    },
    {
        admin_id: 1,
        admin_image: '/images/avartars/avartar fuse template/male-04.jpg',
        admin_username: 'admin0998',
        admin_fullname: 'asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas ',
        admin_email: 'asdasddasdasdas@rmuti.ac.th',
        admin_phone: '098-106-5122',
    },
    {
        admin_id: 1,
        admin_image: '/images/avartars/avartar fuse template/male-04.jpg',
        admin_username: 'admin0998',
        admin_fullname: 'asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas ',
        admin_email: 'asdasddasdasdas@rmuti.ac.th',
        admin_phone: '098-106-5122',
    },
    {
        admin_id: 1,
        admin_image: '/images/avartars/avartar fuse template/male-04.jpg',
        admin_username: 'admin0998',
        admin_fullname: 'asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas ',
        admin_email: 'asdasddasdasdas@rmuti.ac.th',
        admin_phone: '098-106-5122',
    },
    {
        admin_id: 1,
        admin_image: '/images/avartars/avartar fuse template/male-04.jpg',
        admin_username: 'admin0998',
        admin_fullname: 'asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas asdasddasdasdas ',
        admin_email: 'asdasddasdasdas@rmuti.ac.th',
        admin_phone: '098-106-5122',
    },
],)
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col w-full h-full border-gray-300 border-2 ">
            <div class="w-full h-full flex flex-col overflow-hidden">
                <div class="w-full h-[75px] min-[75px]: border-b-2 border-gray-300 bg-white
                 flex justify-between items-center px-2 py-3 ">

                 <div class="w-full h-full flex flex-row justify-start items-center gap-2 ">
                        <div class="w-2/3 ">
                            <v-text-field
                                label="ค้นหา"
                                class=""
                                hide-details
                                variant="outlined"
                                prepend-inner-icon="mdi-magnify"
                                bg-color=""
                                density="comfortable"
                                required
                            ></v-text-field>
                        </div>
                        <div class="flex h-full items-start justify-center ">
                            <v-btn class="h-full" color="pink" size="large" >
                                <p class="text-md" >
                                    <v-icon  icon="mdi-account-plus"></v-icon> เพิ่มผู้ใช้งาน
                                </p>
                            </v-btn>
                        </div>
                    </div>
                    <div class="w-fit">
                        <v-pagination density="comfortable" :length="4"></v-pagination>
                    </div>
                </div>
                <!-- table -->
                <div class="bg-white w-full h-full pb-4 border-b-2  ">
                    <v-table class="h-[88%] overflow-x-hidden" fixed-header>
                        <thead>
                            <tr>
                                <th class="text-left w-10">
                                    #
                                </th>
                                <th class="text-center w-[100px]">
                                    รูปภาพ
                                </th>
                                <th class="text-left w-auto">
                                    ชื่อ
                                </th>
                                <th class="text-left w-80 ">
                                    อีเมล
                                </th>
                                <th class="text-center w-40 ">
                                    เบอร์โทร
                                </th>
                                <th class="text-center w-44">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover:bg-gray-300" v-for="(item, i) in admins"
                                :key="item.admin_id">
                                <td> {{ i + 1 }} </td>
                                <td class="py-1">
                                    <div class="flex w-full h-full justify-center">
                                        <img :src="item.admin_image"
                                            class="object-cover h-[70px] w-[70px] rounded-full" alt="">
                                    </div>
                                </td>
                                <td>
                                    <p class="line-clamp-1">
                                        {{ item.admin_fullname }}
                                    </p>
                                </td>
                                <td class="text-left">
                                    <p class="line-clamp-1">
                                        {{ item.admin_email }} 
                                    </p>
                                </td>
                                <td class="text-center"> {{ item.admin_phone }} </td>
                                <td>
                                    <div class="w-fit flex flex-row justify-end items-center gap-1">
                                        <v-btn>
                                            <p class="text-blue-500">
                                                <v-icon icon="mdi-pencil"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn>
                                            <p class="text-red-500">
                                                <v-icon icon="mdi-delete"></v-icon>
                                            </p>
                                        </v-btn>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                 </div>

            </div>
        </div>
    </AdminNavigationBar>

    <!-- Add -->
    <v-dialog v-model="adminDialogAdd" width="800" transition="dialog-bottom-transition">
        <v-card class="pb-2">
            <!-- content -->
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มบุคลากร
                    <div @click="adminDialogAdd = !adminDialogAdd"
                        class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full px-6 pb-4">
                    <div class="flex flex-col gap-2 w-full mt-4">
                        <v-file-input
                                :rules="_imgValid"
                                accept="image/*"
                                placeholder="เลือกภาพประจำตัว"
                                label="ภาพประจำตัว"
                                v-model="personImage"
                                class="mt-6"
                                name="person_image"
                                hide-details
                                variant="outlined"
                                prepend-icon=""
                            ></v-file-input>
                        <v-text-field label="ชื่อผู้ใช้" width="150"></v-text-field>
                        <v-text-field label="รหัส" width="100"></v-text-field>
                        <v-text-field label="ชื่อ-นามสกุล" width="250"></v-text-field>
                        <v-text-field label="อีเมลล์" width="200"></v-text-field>
                        <v-text-field label="เบอร์โทร" width="150"></v-text-field>
                    </div>

                    <div class="px-3 w-[100px] ">
                        <div class="w-full h-[55px] rounded-lg text-xl
                            bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center cursor-pointer">
                            Ok
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
    <!-- Edit -->
    <v-dialog v-model="adminEdit" width="800" transition="dialog-bottom-transition">
        <v-card class="pb-2">
            <!-- content -->
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    แก้ไข
                    <div @click="adminEdit = !adminEdit"
                        class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full px-6 pb-4">
                    <div class="flex flex-col gap-2 w-full mt-4">

                        <v-file-input
                                :rules="_imgValid"
                                accept="image/*"
                                placeholder="เลือกภาพประจำตัว"
                                label="ภาพประจำตัว"
                                v-model="personImage"
                                class="mt-6"
                                name="person_image"
                                hide-details
                                variant="outlined"
                                prepend-icon=""
                            ></v-file-input>

                        <v-text-field class="relative">
                            <label class="absolute top-0 left-0 mt-2 ml-2">
                                <img src="" alt="ภาพ" class="w-4 h-4">
                            </label>
                        </v-text-field>

                        <v-text-field label="ชื่อผู้ใช้" width="150"></v-text-field>
                        <v-text-field label="รหัส" width="100"></v-text-field>
                        <v-text-field label="ชื่อ-นามสกุล" width="250"></v-text-field>
                        <v-text-field label="อีเมลล์" width="200"></v-text-field>
                        <v-text-field label="เบอร์โทร" width="150"></v-text-field>
                    </div>

                    <div class="mx-auto  w-[100px] ">
                        <div class="w-full h-[55px] rounded-lg text-xl
                            bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center cursor-pointer">
                            ตกลง
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
 
</template>
