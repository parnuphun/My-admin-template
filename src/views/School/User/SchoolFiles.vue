<script setup lang="ts">
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';

import { ref } from 'vue';

const breadcrumb = ref<Array<object>>([
    {
        title: 'หน้าแรก',
        disabled: false,
        href: '/',
    },
    {
        title: 'เอกสาร',
        disabled: true,
        href: '/files',
    },
])

const files = ref<Array<Object>>([
    {
        topicFiles:'สำหรับคุณครู',
        files:[
            {
                fileName:'แต่งตั้งคุณครู...',
                filePath:'',
                fileExtend:'pdf',
                fileDate:'12/22/2566'
            },
        ]
    },
    {
        topicFiles:'สำหรับคุณครู',
        files:[
            {
                fileName:'ใบขัดซื้อจัดจ้าง',
                filePath:'',
                fileExtend:'pdf',
                fileDate:'12/22/2566'
            },
        ]
    },
    {
        topicFiles:'สำหรับนักเรียน',
        files:[
            {
                fileName:'ตารางเรียน ป.6',
                filePath:'',
                fileExtend:'pdf',
                fileDate:'12/22/2566'
            },
            {
                fileName:'ตารางเรียน ป.5',
                filePath:'',
                fileExtend:'pdf',
                fileDate:'12/22/2566'
            },
            {
                fileName:'ตารางเรียน ป.4',
                filePath:'',
                fileExtend:'pdf',
                fileDate:'12/22/2566'
            },
            {
                fileName:'ตารางเรียน ป.3',
                filePath:'',
                fileExtend:'pdf',
                fileDate:'12/22/2566'
            },
            {
                fileName:'ตารางเรียน ป.2',
                filePath:'',
                fileExtend:'pdf',
                fileDate:'12/22/2566'
            },
            {
                fileName:'ตารางเรียน ป.1',
                filePath:'',
                fileExtend:'pdf',
                fileDate:'12/22/2566'
            },
        ]
    }
]) 

</script>

<template>
    <div class="flex flex-col w-full relative min-h-screen">
        <NampongNavBar></NampongNavBar>
        <v-divider></v-divider>
        <div class="flex flex-col w-full h-full min-h-screen bg-pink-50 justify-start items-center">
            <div class="w-full h-full">
                <div class="w-full h-full flex justify-center items-center  text-xl">
                    <div class="w-[1000px] h-full bg-white">
                        <p class="text-xl py-4 border-l-8 border-pink-500 ">  
                            <v-breadcrumbs :items="breadcrumb">
                                <template v-slot:title="{ item }">
                                    <div v-if="item.disabled === true">
                                        <p class="text-gray-500">
                                            {{ item.title }}
                                        </p>
                                    </div>
                                    <div v-else>
                                        <p class="">
                                            {{ item.title }}
                                        </p>
                                    </div>
                                </template>
                            </v-breadcrumbs>
                        </p>
                        <v-divider></v-divider>
                        <div class="w-full min-h-screen">
                             <div class="w-full">
                                <div class="w-full flex flex-col pb-5">
                                    <div v-for="file of files" class="w-full ">
                                        <div class="text-2xl pl-5 text-white bg-pink-500 py-5">
                                        {{ (file as any).topicFiles }}
                                        </div>
                                        <div v-for="item of (file as any).files"
                                         class="w-full text-xl cursor-pointer flex justify-between items-end px-3 py-1" >
                                            <div class="w-full bg-gray-200 py-5 pl-10 px-5 hover:text-pink-600 duration-200
                                                ">
                                                <p class="line-clamp-1">
                                                    {{ item.fileName }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NampongFooter></NampongFooter>
    </div>
</template>