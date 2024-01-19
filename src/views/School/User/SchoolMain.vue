<script setup lang="ts">
import { ref , onMounted , watch } from 'vue';
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue'
import {imageGalleryType , mainPageResponse} from '../../../store/Interface'
import NampongFooter from './../../../components/layout/School/NampongFooter.vue'
import { useRouter , useRoute} from 'vue-router';
import apiNamphong from '../../../services/api/api_namphong'

const _api = new apiNamphong()
const main_data = ref<mainPageResponse>()
const base_img_path = ref<{
    base_banner_img : string 
    base_anno_img : string 
    base_activity_img : string 
    base_news_img : string
}>()
const banner_img = ref()
const banner_slogan = ref()

//route
const router = useRouter()
const currentPath = useRoute()

const dialog = ref<boolean>(false)
const readit = ref<boolean>(false)

onMounted(async ()=>{
    document.title = 'โรงเรียนเทศบาลน้ำพองภูริพัฒน์'
    await clientMainPage();
    await checkNewsBanner();
    
})

async function checkNewsBanner() {
    if(localStorage.getItem('clientSetting')){
        const annoCheckState = JSON.parse(localStorage.getItem('clientSetting') || '') 
        readit.value = true
        // if(annoCheckState.annoData !== main_data.value?.anno){
        //     localStorage.setItem('clientSetting',JSON.stringify({
        //         annoCheck:false
        //     }))  
        // }else{
        //     localStorage.setItem('clientSetting',JSON.stringify({
        //         annoCheck:true
        //     }))  
        // }
    }else{            
        localStorage.setItem('clientSetting',JSON.stringify({
            annoCheck:false
        }))  
    }
}

function getCurrentPath(url:string){
    router.push(url)
}

async function clientMainPage(){
    _api.clientMainPage().then((res)=>{
        if(res.data.status_code = 200){
            main_data.value = res.data.main_data
            base_img_path.value = res.data.base_image_path
            
            banner_img.value = main_data.value?.banner[0].banner_img
            banner_slogan.value = main_data.value?.banner[0].banner_slogan

        }
    })
}

// open link
function openLink(url:string){
    window.open(url, '_blank')
}

const menu = ref<Array<Object>>([
    {
        title:'ข่าวประชาสัมพันธ์',
        path:'/news',
        icon:'mdi-newspaper'
    },
    // {
    //     title:'ตารางเรียน',
    //     path:'/schedules',
    //     icon:'mdi-table'
    // },
    {
        title:'ภาพกิจกรรม',
        path:'/gallery',
        icon:'mdi-image'
    },
    {
        title:'บุคลากร',
        path:'/persons',
        icon:'mdi-account'
    },
    {
        title:'หลักสูตร',
        path:'/course',
        icon:'mdi-book'
    },
    {
        title:'เอกสาร',
        path:'/files',
        icon:'mdi-file'
    },
    {
        title:'เกี่ยวกับเรา',
        path:'/about',
        icon:'mdi-information'
    },
    {
        title:'ติดต่อ',
        path:'/contact',
        icon:'mdi-phone'
    },
])
</script>

<template>

    <div class="flex flex-col w-full relative">
        <div @click="dialog = true "
        class="mb-8 mr-8 fixed h-20 w-20 rounded-full bg-pink-50 bottom-0 right-0 bg border-4 border-pink-500
         hover:bg-pink-500 text-3xl cursor-pointer flex justify-center items-center duration-500 z-20">
            📢
            <!-- <span v-if="readit === false" 
             class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span> -->
        </div>
        <NampongNavBar class=""></NampongNavBar>

        <!-- Banner -->
        <div class="w-full h-[auto] max-h-[600px] bg-gradient-to-tr flex justify-center items-start z-10" >
            <v-parallax class="less:h-[200px] xl:h-[500px]"
                :src="base_img_path?.base_banner_img + banner_img">
                    <div class="relative w-full h-full flex justify-center items-center bg-black opacity-40"></div>
                    <div class="absolute w-full h-full flex justify-center items-center top-0">
                        <p class=" less:text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
                            {{ banner_slogan }}
                        </p>
                    </div>
            </v-parallax>
        </div>

        <!-- news relese -->
        <div class="w-full h-auto px-10 pt-10 flex justify-center items-center">
            <div class="w-[1200px] h-auto flex flex-col">
                <div class="xl:p-4 less:p-2 flex flex-row justify-between items-center">
                    <div class="text-pink-500 border-l-8 border-pink-500 less:text-xl xl:text-2xl py-4 pl-4">
                        ข่าวประชาสัมพันธ์
                    </div>
                    <div class="text-pink-500 less:sm xl:text-lg hover:text-pink-300 cursor-pointer" @click="getCurrentPath('/news')">
                        อ่านข่าวทั้งหมด
                    </div>
                </div>
                <div class="w-full h-auto flex flex-wrap justify-start items-start">
                    <div class="xl:w-1/4 lg:w-1/4 md:w-1/4 sm:w-1/2 less:w-1/2 h-auto xl:p-4 flex flex-col 
                    group  cursor-pointer less:px-2 mt-2" 
                    v-for="item of main_data?.news">
                        <div class="w-full less:w-full less:h-[200px] xl:h-[200px] flex flex-col" @click="getCurrentPath(`/news/${item.news_id}`)">
                            <img class="w-full h-full object-cover group-hover:brightness-50 duration-500" 
                            v-if="item.news_cover_image !== 'no_image_upload'"
                            :src="base_img_path?.base_news_img+ item.news_cover_image" alt=""> 
                            <img v-else class="w-full h-full object-cover group-hover:brightness-50 duration-500" 
                            src="/images/namphong_default_cover_image.jpg" alt=""> 
                        </div>
                        <div class="w-full flex flex-col justify-start items-start min-h-[100px] max-h-[100px]">
                            <p class="px-2 text-xl line-clamp-3 mt-3 group-hover:text-pink-500 duration-500">
                                {{ item.news_topic }}
                            </p>
                        </div>
                        <div class="w-full h-full flex justify-start">
                            <p class="px-2 text-sm line-clamp-1 text-gray-400  group-hover:text-pink-500 duration-500">
                                {{ item.news_date }}
                            </p>
                        </div>
                        <div class="px-2 w-full mb-4 text-white bg-pink-400 hover:bg-pink-500 p-3 text-center mt-3 cursor-pointer duration-500">
                            อ่านเพิ่มเติม
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- main menu -->
        <div class="w-full h-auto flex justify-center py-10">
            <div class="w-[1200px] h-auto flex flex-col bg-white">
                <div class="flex flex-wrap justify-center items-center">

                    <div v-for="item of menu"
                    class="w-1/3 min-w-[300px] h-[100px] bg-white group p-2" 
                    @click="getCurrentPath((item as any).path)">
                        <div class="w-full h-full text-pink-500 flex md:justify-center items-center text-2xl
                        less:justify-start less:pl-10 md:pl-0  border-2 border-pink-200 rounded-md
                        group-hover:bg-gray-100 duration-500 cursor-pointer">
                            <v-icon :icon="(item as any).icon" class="mr-3"></v-icon> {{ (item as any).title}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- image gallery -->
        <div v-if="main_data?.activity_img.length !== 0" class="w-full h-auto bg-white pb-4 flex justify-center">
            <div class="w-[1200px] h-auto flex flex-col justify-center items-center ">
                <div class="w-max bg-white h-auto pt-6 pb-4 mb-4 less:text-2xl 
                xl:text-3xl text-center text-pink-500">
                    <div class="text-center text-pink-500 w-max h-full">
                        <!-- <v-icon end icon="mdi-image"></v-icon> ภาพกิจกรรม -->
                        ภาพกิจกรรมของทางโรงเรียน
                    </div>
                </div>

                <div class="w-full">
                    <div class="w-full h-auto flex flex-wrap justify-between items-center">
                        <div class="w-full h-full flex flex-wrap justify-center items-center pb-4 
                        xl:flex md:flex less:hidden">
                            <div v-for="item of main_data?.activity_img" class="relative group 
                            lg:w-1/4 md:w-1/3 sm:w-1/3 less:w-1/2 xl:w-1/4 
                            lg:h-[250px] md:h-[200px] less:h-[200px] xl:h-[250px] 
                            cursur-pointer px-1 mt-2"
                            @click="openLink(item.activity_image_link)">
                                <img class="object-cover w-full h-full scale-100 group-hover:scale-[1.01] duration-500
                                            group-hover:brightness-50 cursor-pointer rounded-lg" 
                                :src="base_img_path?.base_activity_img+item.activity_image_cover" alt="">
                                <div class="absolute w-full h-full p-3 text-white  top-0 flex justify-start items-end cursor-pointer
                                            scale-100 group-hover:scale-[1.01] duration-500 opacity-0 group-hover:opacity-100">
                                    <p class="line-clamp-3 text-lg">
                                    {{ item.activity_image_name }} 
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-auto flex flex-wrap justify-center items-center pb-4 
                        xl:hidden md:hidden less:flex px-6">
                            <v-carousel 
                                cycle 
                                height="300"
                                color="pink">
                                <v-carousel-item
                                    v-for="item of main_data?.activity_img" 
                                    :src="base_img_path?.base_activity_img+item.activity_image_cover"
                                    cover
                                    @click="openLink(item.activity_image_link)"
                                ></v-carousel-item>
                            </v-carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- footer -->
    <nampong-footer></nampong-footer>

    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            width="800"
            transition="dialog-bottom-transition"
        >
            <v-card class="pb-2">
                <div class="relative w-full h-auto">
                    <div class="sticky w-full h-full top-0 right-0 z-20 bg-white">
                        <div class="relative w-full text-center py-6 text-2xl text-pink-500 flex justify-center items-center">
                            <div class="less:text-lg md:text-3xl xl:text-4xl">
                                📢 ประกาศจากทางโรงเรียน
                            </div>
                            <div class="absolute top-0 right-0 h-20 w-20 text-pink-500 text-3xl flex 
                            justify-center items-center cursor-pointer hover:text-pink-300"
                            @click="dialog = !dialog ; readit = true">
                                <v-icon icon="mdi-close"></v-icon>
                            </div>
                        </div>

                        <v-divider></v-divider>
                    </div>
                    <div class="w-full flex flex-col px-2">
                        <div class="w-full " v-for="item of main_data?.anno">
                            <div class=" w-full h-full">
                                <img :src="base_img_path?.base_anno_img+item.anno_image" alt="" 
                                class="my-2 px-2 rounded-lg w-full scale-100 hover:scale-[1.01] duration-500">
                            </div>
                        <v-divider></v-divider>
                        </div>

                    </div>
                </div>
            </v-card>
            </v-dialog>
    </v-row>
</template>