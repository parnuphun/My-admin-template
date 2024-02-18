<script setup lang="ts">
import { ref , onMounted , watch } from 'vue';
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue'
import {activityImageResonse, imageGalleryType , mainPageResponse} from '../../../store/Interface'
import NampongFooter from './../../../components/layout/School/NampongFooter.vue'
import { useRouter , useRoute} from 'vue-router';
import apiNamphong from '../../../services/api/api_namphong'
import MsgAlert from '../../../services/msgAlert';
import { onUnmounted } from 'vue';

const _api = new apiNamphong()
const _msg = new MsgAlert()

const main_data = ref<mainPageResponse>()
interface base_img_path {
    base_banner_img : string 
    base_anno_img : string 
    base_activity_img : string 
    base_news_img : string
}

const base_img_path = ref<base_img_path>()
const banner_img = ref()
const banner_slogan = ref()

// elemente ref
const scheduleElement = ref<any>()
const aImgElement = ref<any>()
const facebookMenuElement =ref<any>()
const annoElement = ref<any>()
const scrollPercentage =ref()
const oldScrollPercentage =ref()
const crrImgSlide = ref()

//route
const router = useRouter()
const currentPath = useRoute()

const dialog = ref<boolean>(false)
const readit = ref<boolean>(false)

onMounted(async ()=>{
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', calculateScrollPercentage);
    document.title = 'โรงเรียนเทศบาลน้ำพองภูริพัฒน์'
    await clientMainPage();
    
})

onUnmounted(()=>{
    window.addEventListener('scroll', calculateScrollPercentage);
})
const handleScroll = () => {

    if (scheduleElement.value) {
        const elementRect = scheduleElement.value.getBoundingClientRect();
        if (window.scrollY > elementRect.top) {
            scheduleElement.value.classList.add('animate__animated','animate__fadeInRight','opacity-1');
        }
    }

    if(aImgElement.value){
        const elementRect = aImgElement.value.getBoundingClientRect();
        if (window.scrollY > elementRect.top) {
                aImgElement.value.classList.add('animate__animated','animate__fadeInRight','opacity-1');
            }
        }
};

function nextPage(url:string , other?:boolean){
    if(other){
        window.open(url,'_blank')
    }else{
        router.push(url)
    }
}

const aImgList = ref<Array<activityImageResonse>>()
const aImgLioaded = ref(false)
async function clientMainPage(){
    _api.clientMainPage().then((res)=>{
        if(res.data.status_code = 200){
            main_data.value = res.data.main_data
            base_img_path.value = res.data.base_image_path
            aImgList.value = main_data.value?.activity_img
            aImgLioaded.value = true
            banner_img.value = main_data.value?.banner[0].banner_img
            banner_slogan.value = main_data.value?.banner[0].banner_slogan

            // check first 
            if(localStorage.getItem('clientSetting')){
                const annoCheckState = JSON.parse(localStorage.getItem('clientSetting') || '') 
                // compare 
                // old data != new data
                if(JSON.stringify(annoCheckState.anno_data ) === JSON.stringify(main_data.value!.anno)){
                    dialog.value = false
                  
                }else{
                    localStorage.setItem('clientSetting',JSON.stringify({
                        anno_data : main_data.value!.anno
                    }))  
                    dialog.value = true
                }
                // no data in local storage
            }else{           
                localStorage.setItem('clientSetting',JSON.stringify({
                    anno_data : main_data.value!.anno
                })) 
                dialog.value = true
            }
        }
    })
}

// open link
function openLink(url:string){
    window.open(url, '_blank')
}

// สร้างฟังก์ชันเพื่อคำนวณเปอร์เซ็นต์ของการเลื่อน
function calculateScrollPercentage() {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const currentScroll = window.scrollY || document.documentElement.scrollTop;
  scrollPercentage.value = (currentScroll / totalHeight) * 100;
  oldScrollPercentage.value = scrollPercentage.value
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const menu = ref<Array<{title:string,path:string,icon:string}>>([
    {
        title:'ข่าวประชาสัมพันธ์',
        path:'/news',
        icon:'mdi-newspaper'
    },
    {
        title:'ภาพกิจกรรม',
        path:'/gallery',
        icon:'mdi-image-outline'
    },
    {
        title:'บุคลากร',
        path:'/persons',
        icon:'mdi-account-outline'
    },
    {
        title:'ตารางเรียน',
        path:'/studentSchedule',
        icon:'mdi-table'
    },
    {
        title:'ตารางสอน',
        path:'/teachingSchedule',
        icon:'mdi-table-clock'
    },
    {
        title:'หลักสูตร',
        path:'/syllabus',
        icon:'mdi-book-outline'
    },
    {
        title:'เอกสาร',
        path:'/files',
        icon:'mdi-file-outline'
    },
    {
        title:'เกี่ยวกับเรา',
        path:'/about',
        icon:'mdi-information-outline'
    },
    {
        title:'ติดต่อ',
        path:'/contact',
        icon:'mdi-phone-outline'
    },
    {
        title:'ผู้ดูแลระบบ',
        path:'/login',
        icon:'mdi-phone-outline'
    },
])


function animateOn(element:'facebook' | 'anno',e:Event){
    if(element === 'facebook' && e.isTrusted === true){
        facebookMenuElement.value.classList.add('animate__animated','animate__swing');
    }else if(element === 'anno' && e.isTrusted === true){
        annoElement.value.classList.add('animate__animated','animate__swing');
    }
}

function animateOff(e:Event){
    facebookMenuElement.value.classList.remove('animate__animated','animate__swing');
    annoElement.value.classList.remove('animate__animated','animate__swing');
}
 
</script>

<template>

    <div class="w-full flex flex-col relative">
        <div ref="annoElement" 
        @click="dialog = true "
        @mouseover="e => animateOn('anno',e)"
        @mouseout="animateOff"
        class="mb-8 mr-8 fixed h-[75px] w-[75px] rounded-full bg-pink-50 less:bottom-0 sm:bottom-[90px] right-0  
        hover:bg-pink-500 text-3xl cursor-pointer flex justify-center items-center duration-500 z-20">
            📢
        </div>

        <div @click="nextPage('https://www.facebook.com/puripatschool2560' , true)"
        ref="facebookMenuElement" 
        @mouseover="e => animateOn('facebook',e)"
        @mouseout="animateOff"
        class="mb-8 mr-8 fixed h-[75px] w-[75px] rounded-full bottom-[180px] right-0 hover:brightness-75
        text-3xl cursor-pointer less:hidden sm:flex justify-center items-center duration-500 z-20 
        animate__animated">
            <img src="/images/logo/log_facebook.png" alt="">
        </div>

        <div @click="scrollToTop()"
        class="mb-8 mr-8 fixed h-[75px] w-[75px] rounded-full bg-white bottom-0 right-0 bg 
        cursor-pointer less:hidden sm:flex justify-center items-center z-20 group duration-200">
            <v-progress-circular 
            :model-value="scrollPercentage" 
            value
            class="text-pink-500 group-hover:text-pink-600"
            :size="100" 
            :width="4">
                <p class="text-3xl text-pink-500 
                group-hover:text-4xl group-hover:text-pink-600 duration-200">
                    <v-icon >mdi-arrow-up-thin</v-icon>
                </p>
            </v-progress-circular>
        </div>

        <NampongNavBar class=""></NampongNavBar>
        <v-divider class="border-opacity-100"></v-divider>
        
        <div class="w-full flex flex-col justify-center items-center mb-10 mt-2">
            <div class="less:w-full xl:w-[1200px] flex flex-col ">
                <v-parallax class="less:h-[300px] xl:h-[400px] less:rounded-none md:rounded-md 
                animate__animated animate__fadeIn"  
                    :src="base_img_path?.base_banner_img && banner_img ? base_img_path.base_banner_img + banner_img : ''">
                        <div class="relative w-full h-full flex justify-center items-center bg-black opacity-40"></div>
                        <div class="absolute w-full h-full flex justify-center items-center top-0">
                            <p class=" less:text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
                                {{ banner_slogan }}
                            </p>
                        </div>
                </v-parallax>
                
                <div class="w-full flex flex-col mt-4">
                    <div class="w-full border-b-4 border-pink-500 flex less:justify-center sm:justify-start">
                        <p class="text-white text-2xl text-center sm:w-fit bg-pink-500 py-2 px-4">ข่าวประชาสัมพันธ์</p>
                        <p class=" duration-200 cursor-pointer text-center sm:w-fit 
                        bg-pink-500 flex items-center pr-4"  @click="nextPage(`/news`)">
                            <v-icon class="text-white hover:scale-[1.15] duration-200">mdi-open-in-new</v-icon>
                        </p>
                    </div>
                    <div class="w-full flex flex-wrap py-2 animate__animated animate__fadeInRight animate__delay">
                        <div v-for="item of main_data?.news" class="less:w-1/2 md:w-1/4 h-auto p-1 ">
                            <div @click="nextPage(`/news/${item.news_id}`)"
                            class="w-full flex flex-col bg-gray-50 border-2 rounded-md shadow-md
                            hover:shadow-lg duration-200 hover:shadow-pink-200  cursor-pointer">
                                <div class="w-full less:w-full less:h-[200px] xl:h-[200px] flex flex-col rounded-t-md group overflow-hidden">
                                    <img v-if="item.news_cover_image !== 'no_image_upload'"
                                    class="group-hover:scale-[1.05] group-hover:brightness-75 w-full h-full object-cover duration-500 rounded-t-md" 
                                    :src="base_img_path?.base_news_img+ item.news_cover_image" alt=""> 
                                    <img v-else 
                                    class="group-hover:scale-[1.05] group-hover:brightness-75 w-full h-full object-cover duration-500 rounded-t-md" 
                                    src="/images/namphong_default_cover_image.jpg" alt=""> 
                                </div>
                                <div class="w-full flex flex-col justify-start items-start min-h-[100px] max-h-[100px]">
                                    <p class="px-2 text-xl line-clamp-3 mt-3 group-hover:text-pink-500 duration-500">
                                        {{ item.news_topic }}
                                    </p>
                                </div>
                                <div class="w-full flex justify-end mt-4">
                                    <p @click="nextPage(`/news/${item.news_id}`)"
                                    class="text-md text-pink-500 cursor-pointer hover:text-pink-600 py-2 px-4" >
                                        อ่านเพิ่มเติม
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div ref="scheduleElement" class="w-full flex flex-wrap mt-4 less:opacity-1 md:opacity-0 ">
                    <div 
                    @click="nextPage('/studentSchedule')"
                    class="less:w-full md:w-1/2 group less:px-2 md:px-1 hover:shadow-md hover:shadow-pink-200 rounded-md duration-200">
                        <img class="w-full h-auto rounded-md  
                        group-hover:scale-[1.01] cursor-pointer  duration-200" 
                        src="/images/menu/studentMenu.png" alt="">
                    </div>
                    <div 
                    @click="nextPage('/teachingSchedule')"
                    class="less:w-full md:w-1/2 group less:px-2 md:px-1 hover:shadow-md hover:shadow-pink-200 rounded-md duration-200 
                    less:mt-2 md:mt-0">
                        <img class="w-full h-auto rounded-md 
                        group-hover:scale-[1.01] cursor-pointer  duration-200" 
                        src="/images/menu/teachMenu.png" alt="">
                    </div>
                    <div 
                    @click="nextPage('/syllabus')"
                    class="less:w-full md:w-1/2 group less:px-2 md:px-1 hover:shadow-md hover:shadow-pink-200 rounded-md duration-200">
                        <img class="w-full h-auto rounded-md 
                        group-hover:scale-[1.01] cursor-pointer  duration-200" 
                        src="/images/menu/syllabusMenu.png" alt="">
                    </div>
                    <div 
                    @click="nextPage('/files')"
                    class="less:w-full md:w-1/2 group less:px-2 md:px-1 hover:shadow-md hover:shadow-pink-200 rounded-md duration-200 
                    less:mt-2 md:mt-0">
                        <img class="w-full h-auto rounded-md 
                        group-hover:scale-[1.01] cursor-pointer  duration-200" 
                        src="/images/menu/filesMenu.png" alt="">
                    </div>
                </div>
      
                <div ref="aImgElement" class="w-full flex flex-col mt-4 less:opacity-1 md:opacity-0 ">
                    <div class="w-full border-b-4 border-pink-500 flex less:justify-center sm:justify-start">
                        <p class="text-white text-2xl text-center sm:w-fit bg-pink-500 py-2 px-4">ภาพกิจกรรม</p>
                        <p class=" duration-200 cursor-pointer text-center sm:w-fit 
                        bg-pink-500 flex items-center pr-4"  @click="nextPage(`/gallery`)">
                            <v-icon class="text-white hover:scale-[1.15] duration-200">mdi-open-in-new</v-icon>
                        </p>
                    </div>
                    <div class="w-full mt-2 rounded-md flex flex-col">
                        <v-carousel 
                            v-if="aImgLioaded"
                            v-model="crrImgSlide"
                            cycle 
                            class="rounded-md"
                            height="500"
                            color="pink"
                            :hide-delimiters="true"
                        >
                            <template v-slot:prev="{ props }">
                                <div  @click="props.onClick" 
                                class="text-pink-500 text-7xl cursor-pointer hover:text-pink-600">
                                    <v-icon class="" end icon="mdi-chevron-left"></v-icon>
                                </div>
                            </template>
                            <template v-slot:next="{ props }">
                                <div  @click="props.onClick" 
                                class="text-pink-500 text-7xl cursor-pointer hover:text-pink-600">
                                    <v-icon class="" end icon="mdi-chevron-right"></v-icon>
                                </div>
                            </template>
                            <v-carousel-item
                                v-for="(item , i) in aImgList" 
                                :key="i"
                                @click="openLink(item.activity_image_link)"
                                class="relative"
                            >
                                <div class="w-full h-full overflow-hidden group cursor-pointer">
                                    <img 
                                    class="object-cover w-full h-full group-hover:brightness-75 duration-200" 
                                    :src="base_img_path?.base_activity_img+item.activity_image_cover" 
                                    alt="activityImg">
                                    
                                </div>
                                <div class="absolute bottom-0 opacity-0 w-full h-20">
                                    <div class="w-full h-full relative bg-red-500 opacity-10">

                                        <p class="absolute top-0 text-3xl text-pink-500 line-clamp-2 z-[999] ">
                                            {{ item.activity_image_name }}
                                        </p>
                                    </div>
                                </div>
                            </v-carousel-item>
                        </v-carousel>
                        <div class="w-full flex flex-wrap mt-2">
                            <div v-for="(item , i) in aImgList" :key="i"
                            class="less:w-1/3 sm:w-1/5 md:w-1/6 h-[130px] p-1 border-2 cursor-pointer " @click="crrImgSlide = i"
                            :class="{'bg-pink-500 border-pink-500 brightness-75' : i === crrImgSlide}">
                                <div class="w-full h-full group overflow-hidden">
                                    <img class="w-full h-full group-hover:scale-[1.02] duration-200 object-cover"
                                        :src="base_img_path?.base_activity_img+item.activity_image_cover" 
                                        alt="activityImg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full flex flex-wrap mt-4 justify-center">
                    <div class="w-full flex flex-col border-2 shadow-md rounded-md">
                        <div class="w-full py-2 flex justify-center items-center text-xl">
                            เมนูด่วน
                        </div>
                        <v-divider class="border-opacity-100"></v-divider>
                        <div class="w-full p-2 flex flex-wrap gap-2 justify-center items-start">
                            <p class="py-2 px-4 hover:text-pink-500 cursor-pointer"
                            v-for="(item , i) in menu" :key="i"
                            @click="nextPage(item.path)">
                                {{ item.title }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <nampong-footer></nampong-footer>

    <v-dialog
        v-model="dialog"
        width="800"
    >
        <v-card class="pb-2">
            <div class="relative w-full h-auto">
                <div class="sticky w-full h-full top-0 right-0 z-20 bg-white">
                    <div class="relative w-full text-center py-6 text-2xl text-pink-500 flex justify-center items-center border-b-4 border-pink-500">
                        <div class="less:text-lg md:text-3xl xl:text-4xl">
                            ประชาสัมพันธ์
                        </div>
                        <div class="absolute top-0 mt-2 right-0 h-20 w-20 text-pink-500 text-3xl flex 
                        justify-center items-center cursor-pointer hover:text-pink-300"
                        @click="dialog = !dialog ; readit = true">
                            <v-icon icon="mdi-close"></v-icon>
                        </div>
                    </div>

                    <v-divider></v-divider>
                </div>
                <div class="w-full flex flex-col px-2">
                    <div class="w-full " v-for="item of main_data?.anno" :key="item.anno_id">
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
</template>

<style>
    
</style>