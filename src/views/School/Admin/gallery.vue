<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref, onMounted } from 'vue'



const dialog = ref(false)

const uploadImageDialog = ref(false)
const adminDeletePhoto = ref(false)
const adminEditPhoto = ref(false)

interface gallerytype {
    gallery_id:number
    gallery_image_cover:string,
    gallery_name: string
    gallery_date: string
    gallery_link: string
}
const gallery = ref<Array<gallerytype>>([
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    {
        gallery_id: 1,
        gallery_image_cover: '/images/namphon_mockup/activity/activity04.jpg',
        gallery_name: 'ปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปกปก',
        gallery_date: '10 มกราคม 2566',
        gallery_link: 'www',
    },
    
],)

</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col w-full h-full border-gray-300 border-2 ">
            <div class="w-full h-full flex flex-col overflow-hidden">
                <div class="w-full h-[75px] min-[75px]: border-b-2 border-gray-300 bg-white
                 flex justify-between items-center px-2 py-3">

                 <div class="w-full h-full flex flex-row justify-start items-center gap-2">
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
                            <v-btn class="h-full" color="pink" size="large" @click="uploadImageDialog = !uploadImageDialog">
                                <p class="text- -500 text-md" >
                                    <v-icon  icon="mdi-image-plus"></v-icon> เพิ่มรูปภาพ
                                </p>
                            </v-btn>
                        </div>
                    </div>
                    <div class="w-fit">
                        <v-pagination density="comfortable" :length="4"></v-pagination>
                    </div>
                </div>
                <!-- table -->
                <div class="bg-white w-full h-full pb-4 border-b-2 ">
                    <v-table class="h-[88%] overflow-y-scroll" fixed-header>
                        <thead>
                            <tr>
                                <th class="text-left w-10">
                                    #
                                </th>
                                <th class="text-center w-[230px]">
                                    รูปภาพ
                                </th>
                                <th class="text-left w-auto">
                                    ชื่อ
                                </th>
                                <th class="text-center w-40 ">
                                    วันที่
                                </th>
                                <th class="text-center w-44">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover:bg-gray-100"
                                v-for="(item , i) in gallery"
                                :key="item.gallery_id"
                            >
                                <td> {{ i+1 }} </td>
                                <td>
                                    <img class="h-[100px] w-[200px] object-cover"
                                    :src="item.gallery_image_cover" alt="">
                                </td>
                                <td class="text-left"> {{ item.gallery_name }} </td>
                                <td class="text-center"> {{ item.gallery_date }} </td>
                                
                                <td>
                                    <div class="w-fit flex flex-row justify-end items-center gap-1">
                                        <v-btn>
                                            <p class="text-yellow-500">
                                                <v-icon icon="mdi-link"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn >
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
</template>
