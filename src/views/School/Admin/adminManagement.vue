<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref, onMounted } from 'vue'

onMounted(() => {
    console.log(dialog.value)
})
const dialog = ref(false)
const adminDialogAdd = ref(false)
const desserts = ref<Array<any>>([
    {
        user: 'user01',
        password: 159,
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

],)
</script>

<template>
    <AdminNavigationBar>
        ผู้ดูแลระบบ
        <div class="flex flex-col w-full h-full ">
            <div class="w-full h-full flex flex-wrap ">

                <div class="w-3/2 h-full overflow-auto border-2 border-gray-300">
                    <v-card class="h-full" color="">
        <v-btn @click="adminDialogAdd = !adminDialogAdd" color="pink">
            <v-icon icon="mdi-account"> </v-icon> เพิ่มบุคลากร
        </v-btn>
        <v-table>


            <thead>
                <tr>
                    <th class="text-left">
                        ภาพ
                    </th>

                    <th class="text-left">
                        ชื่อผู้ใช้
                    </th>
                    <th class="text-left">
                        รหัสผ่าน
                    </th>
                    <th class="text-left">
                        ชื่อ-นามสกุล
                    </th>
                    <th class="text-left">
                        อีเมลล์
                    </th>
                    <th class="text-left">
                        เบอร์โทร
                    </th>
                    <th class="text-center w-fit">

                    </th>
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
                                <v-icon icon="mdi-pencil"></v-icon>
                            </div>
                            <div class="text-green-500 hover:text-green-600 cursor-pointer">
                                <v-icon icon="mdi-folder-move-outline"></v-icon>
                            </div>
                            <div class="text-red-500 hover:text-red-600 cursor-pointer">
                                <v-icon icon="mdi-delete"></v-icon>
                            </div>
                        </div>
                    </td>
                </tr>

            </tbody>

        </v-table>
    </v-card>
    </div>
    </div>
    </div>
        <v-pagination :length="4"></v-pagination>
    </AdminNavigationBar>


    <v-dialog v-model="adminDialogAdd" width="800" transition="dialog-bottom-transition">
        <v-card class="pb-2">
            <!-- content -->
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    dialog example
                    <div @click="adminDialogAdd = !adminDialogAdd"
                        class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-row gap-2 w-full">
                        <tb> <v-text-field label="ภาพ"></v-text-field>
                            <v-text-field label="ชื่อผู้ใช้"></v-text-field>
                            <v-text-field label="รหัส"></v-text-field>
                            <v-text-field label="ชื่อ-นามสกุล"></v-text-field>
                            <v-text-field label="อีเมลล์"></v-text-field>
                            <v-text-field label="เบอร์โทร"></v-text-field>
                        </tb>

                        <div class="้px-3 w-[100px] ">
                            <div class="w-full h-[55px] rounded-lg text-xl
                            bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center cursor-pointer">
                                ok
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
