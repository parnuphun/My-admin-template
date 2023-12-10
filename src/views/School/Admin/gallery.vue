<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref, onMounted } from 'vue'



const dialog = ref(false)
const adminAddPhoto = ref(false)
const adminDeletePhoto = ref(false)
const adminEditPhoto = ref(false)
const photoGallery = ref<Array<any>>([
    {
        gallery_name: 'user01',
        gallery_date: 10 / 12 / 2566,
        gallery_link: 'www',

    },
    {
        gallery_name: 'user01',
        gallery_date: 10 / 12 / 2566,
        gallery_link: 'wwww',
    },
    {
        gallery_name: 'user01',
        gallery_date: 10 / 12 / 2566,
        gallery_link: 'www',
    },
    {
        gallery_name: 'user01',
        gallery_date: 10 / 12 / 2566,
        gallery_link: 'www',
    },
    {
        gallery_name: 'user01',
        gallery_date: 10 / 12 / 2566,
        gallery_link: 'www',
    },
    {
        gallery_name: 'user01',
        gallery_date: 10 / 12 / 2566,
        gallery_link: 'www',
    },
    {
        gallery_name: 'user01',
        gallery_date: 10 / 12 / 2566,
        gallery_link: 'www',
    },
    {
        gallery_name: 'user01',
        gallery_date: 10 / 12 / 2566,
        gallery_link: 'ww',
    },

],)

</script>

<template>
    <AdminNavigationBar>

        <div class="w-full h-full overflow-auto border-2 border-gray-300">
            <div class="w-full h-full flex flex-col overflow-hidden">
                <div class="w-full h-[75x] min-[75px]: border-b-2 border-gray-300 bg-white
                 flex justify-between items-center px-2 py-3">

                    <div class="w-full h-full flex flex-row justify-start items-center gap-2">

                        <div class="flex justify-between mb-4 ml-4 mr-4 mt-2">

                            <v-btn @click="adminAddPhoto = !adminAddPhoto" color="pink">
                                <v-icon icon="mdi-account"> </v-icon> เพิ่มรูปภาพกิจกรรม
                            </v-btn>
                        </div>
                    </div>

                </div>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left font-bold text-xl">
                                ชื่อกิจกรรม
                            </th>
                            <th class="text-left font-bold text-xl">
                                วันที่
                            </th>
                            <th class="text-left font-bold text-xl">
                                ลิ้งค์ URL
                            </th>

                            <th class="text-left font-bold text-xl">
                                จัดการ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in photoGallery" :key="item.name">
                            <td>{{ item.gallery_name }}</td>
                            <td>{{ item.gallery_date }}</td>
                            <td>{{ item.gallery_link }}</td>


                            <td class="flex justify-center">
                                <div class="w-full flex flex-row gap-2 justify-center">
                                    <div class="w-fit flex flex-row justify-end items-center gap-1">
                                        <v-btn @click="adminEditPhoto = !adminEditPhoto">
                                            <v-icon
                                                class="fill-current text-blue-500 hover:text-blue-600">mdi-pencil</v-icon>
                                        </v-btn>
                                    </div>

                                    <div class="w-fit flex flex-row justify-end items-center gap-1">
                                        <v-btn @click="adminDeletePhoto = !adminDeletePhoto">
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


    </AdminNavigationBar>
</template>
