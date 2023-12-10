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
const adminDelete = ref(false)
const _imgValid = [(v:any)=>imageValidate(v)]
const personImage = ref()
const desserts = ref<Array<any>>([
    {
        user: 'user01',
        password: 12345678910,
        fullname: 'sahassawat meekaew',
        email: 'sahassawatneszz@gmail.com',
        phonenumber: '0000000',
    },
    {
        user: 'Ice cream sandwich',
        password: 237,
    },
    {
        user: 'Eclair',
        password: 262,
    },
    {
        user: 'Cupcake',
        password: 305,
    },
    {
        user: 'Gingerbread',
        password: 356,
    },
    {
        user: 'Jelly bean',
        password: 375,
    },
    {
        user: 'Lollipop',
        password: 392,
    },
    {
        user: 'Jelly bean',
        password: 375,
    },
    {
        user: 'Jelly bean',
        password: 375,
    },
    {
        user: 'Jelly bean',
        password: 375,
    },
    {
        user: 'Jelly bean',
        password: 375,
    },



],)
</script>

<template>
    <AdminNavigationBar>


        <div class="flex justify-between mb-4 ml-4 mr-4">
            <div class="text-2xl">
                ผู้ดูแลระบบ
            </div>

            <v-btn @click="adminDialogAdd = !adminDialogAdd" color="pink">
                <v-icon icon="mdi-account"> </v-icon> เพิ่มบุคลากร
            </v-btn>
        </div>

        <div class="w-full h-96 overflow-auto border-2 border-gray-300">
            <div>

                <v-table>
                    <thead>
                        <tr>
                            <td class="text-left font-bold text-xl">
                                ภาพ
                            </td>
                            <td class="text-left font-bold text-xl">
                                ชื่อผู้ใช้
                            </td>
                            <td class="text-left font-bold text-xl">
                                รหัสผ่าน
                            </td>
                            <td class="text-left font-bold text-xl">
                                ชื่อ-นามสกุล
                            </td>
                            <td class="text-left font-bold text-xl">
                                อีเมลล์
                            </td>
                            <td class="text-left font-bold text-xl">
                                เบอร์โทร
                            </td>
                            <td class="text-center w-fit">

                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(item, i) in desserts" :key="item.name">
                            <td>
                                <img class="w-10 h-10 object-cover" :src="item.url" alt="">
                            </td>
                            <td>{{ item.user }}</td>
                            <td>{{ item.password }}</td>
                            <td>{{ item.fullname }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.phonenumber }}</td>
                            <td>
                                <div class="w-full flex flex-row gap-2 justify-center">
                                    <div class="text-blue-500 hover:text-blue-600 cursor-pointer">
                                        <v-btn @click="adminEdit = !adminEdit">
                                            <v-icon
                                                class="fill-current text-blue-500 hover:text-blue-600">mdi-pencil</v-icon>
                                        </v-btn>
                                    </div>

                                    <div class="text-red-500 hover:text-red-600 cursor-pointer">
                                        <v-btn @click="adminDelete = !adminDelete">
                                            <v-icon class="fill-current text-red-500 hover:text-red-600">mdi-delete</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>

                </v-table>

            </div>
        </div>

        <v-pagination :length="4"></v-pagination>
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



    <!-- delete -->
    <v-dialog class="mx-auto" v-model="adminDelete" width="800" transition="dialog-bottom-transition">
        <v-card class=" pb-15">
            <!-- content -->
            <div class=" flex flex-col w-full ">
                <div class="w-full py-6 flex justify-center text-2xl mt-4 mb-2 relative">
                    ต้องการลบ
                    <div @click="adminDelete = !adminDelete"
                        class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="mx-auto   w-[100px] ">

                    <div
                        class=" flex items-center justify-center px-3 w-[100px] h-[55px] rounded-lg text-xl bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                        ลบ
                    </div>
                </div>
            </div>

        </v-card>
    </v-dialog>
</template>
