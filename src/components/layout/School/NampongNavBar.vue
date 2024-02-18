<script setup lang="ts">

import { ref } from 'vue';
import { useRouter , useRoute} from 'vue-router';
//route
const router = useRouter()
const currentPath = useRoute()
const menuDrawer = ref(false)
function getCurrentPath(url:string){
    router.push(url)
}

const menu_icon = ref('mdi-menu') // เมนูตอนเปิดปิด

function menu(e:Event){
    let list = document.querySelector('ul');        
    // ตรวจสอบการเปลี่ยน icon
    if(menu_icon.value === 'mdi-menu' && list){
        menu_icon.value = 'mdi-close';
        // list.classList.add('top-90');
        list.classList.remove('top-[-400px]');
        list.classList.add('opacity-100');
    }
    else if(menu_icon.value === 'mdi-close' && list){
        menu_icon.value = 'mdi-menu';
        list.classList.add('top-[-400px]');
        list.classList.remove('opacity-100');
    }else { 
        console.log( 'some ting wrong ');
    }
}
</script>

<template>
    <!-- <div class="w-full less:bg-pink-500 md:bg-white">
        <div class="w-full flex flex-row justify-between">
            <div class="min-w-fit less:w-full md:w-full flex flex-row px-6 h-[90px] justify-center items-center">
                <div class="w-[80px] h-[80px] flex-none md:block hidden cursor-pointer" @click="getCurrentPath('/')">
                    <img class="w-[80px] h-[80px] object-contain" src="/images/logo/logo_โรงเรียนเทศบาลน้ำพองภูริพัฒน์-removebg-preview.png" alt="">
                </div>
                <div class="w-full h-full flex flex-col justify-start items-center md:px-7 cursor-pointer" @click="getCurrentPath('/')">
                    <div class="w-full h-full flex
                    less:justify-start less:items-center md:justify-start md:items-end ">
                        <p class="less:text-2xl md:text-3xl xl:text-3xl text-pink-100  md:text-black line-clamp-1"> โรงเรียนเทศบาลน้ำพองภูริพัฒน์ </p>
                    </div>
                    <div class="w-full h-full md:flex md:justify-start md:items-start md:visible hidden">
                        <p class="text-xl text-pink-600 line-clamp-1"> อำเภอน้ำพอง จังหวัดขอนแก่น</p>
                    </div>
                </div>
                <div class="less:flex xl:hidden">
                    <div class="cursor-pointer text-pink-100 hover:text-pink-900 flex justify-center items-center
                    md:hidden border-2 border-pink-100 hover:border-pink-900 duration-500 rounded-lg p-1 mr-6"
                    @click="menu($event)">
                        <v-icon size="30" end :icon="menu_icon" class="-left-0.5" > </v-icon>
                    </div>
                </div>
            </div>
            <div class="w-full gap-6 px-6 less:hidden sm:hidden md:flex justify-end items-center text-2xl">
                <div 
                @click="getCurrentPath('/')"
                class="flex justify-center min-w-[100px] w-auto hover:text-pink-500 cursor-pointer">
                    หน้าแรก
                </div>
                <div 
                @click="getCurrentPath('/')"
                class="flex justify-center min-w-[100px] w-auto hover:text-pink-500 cursor-pointer">
                    ข่าวสาร
                </div>
                <div 
                @click="getCurrentPath('/')"
                class="flex justify-center min-w-[100px] w-auto hover:text-pink-500 cursor-pointer">
                    บุคลากร
                </div>
                <div 
                @click="getCurrentPath('/')"
                class="flex justify-center min-w-[120px] w-auto hover:text-pink-500 cursor-pointer">
                    เกี่ยวกับเรา
                </div>
                <div 
                @click="getCurrentPath('/')"
                class="flex justify-center min-w-[100px] w-auto hover:text-pink-500 cursor-pointer">
                    ติดต่อ
                </div>
            </div>
        </div>
    </div> -->

    <nav class=" bg-pink-500 md:bg-white md:flex md:items-center md:justify-between z-20" >
        <div class="flex justify-between items-center h-[90px] bg-pink-500 md:bg-white">
            <div class="flex flex-row items-center justify-center  px-6">
                <div class="w-[80px] h-[80px] flex-none md:block hidden cursor-pointer" @click="getCurrentPath('/')">
                    <img class="w-[80px] h-[80px] object-contain" src="/images/logo/logo_โรงเรียนเทศบาลน้ำพองภูริพัฒน์-removebg-preview.png" alt="">
                </div>
                <div class="w-full h-full flex flex-col justify-start items-center md:px-7 cursor-pointer" @click="getCurrentPath('/')">
                    <div class="w-full h-full flex md:justify-start md:items-end justify-center">
                        <p class="less:text-xl md:text-3xl xl:text-3xl text-pink-100  md:text-black line-clamp-1"> โรงเรียนเทศบาลน้ำพองภูริพัฒน์ </p>
                    </div>
                    <div class="w-full h-full md:flex md:justify-start md:items-start md:visible hidden">
                        <p class="text-xl text-pink-600 line-clamp-1"> อำเภอน้ำพอง จังหวัดขอนแก่น</p>
                    </div>
                </div>
            </div>

            <div class="cursor-pointer text-pink-100 hover:text-pink-900 flex justify-center items-center
            md:hidden border-2 border-pink-100 hover:border-pink-900 duration-500 rounded-lg p-1 mr-6"
            @click="menu($event)">
                <v-icon size="30" end :icon="menu_icon" class="-left-0.5" > </v-icon>
            </div>
        </div>

        <!-- <ul class="w-full list-none md:flex less:shadow-xl md:shadow-none md:z-auto less:z-[-1] md:static less:absolute ">
            <li class="less:bg-pink-500 text-xl w-full less:m-0 less:py-4">หน้าแรก</li>
            <li class="less:bg-pink-500 text-xl w-full less:m-0 less:py-4">ข่าวสาร</li>
            <li class="less:bg-pink-500 text-xl w-full less:m-0 less:py-4">บุคลากร</li>
            <li class="less:bg-pink-500 text-xl w-full less:m-0 less:py-4">เกี่ยวกับเรา</li>
            <li class="less:bg-pink-500 text-xl w-full less:m-0 less:py-4">ติดต่อ</li>
        </ul> -->

        <ul class="md:flex md:items-center less:z-[-1] less:shadow-xl md:shadow-none
                    md:z-auto md:static less:absolute 
                    w-full less:-left-[32px] md:w-auto md:py-0
                    md:pl-0 md:opacity-100 opacity-100 top-[-400px]
                    transition-all ease-in-out duration-200">
            <li class="w-full md:w-fit text-xl list-none cursor-pointer text-pink-100 md:hover:text-pink-300 md:hover:bg-white md:text-pink-400
                        duration-500 md:truncate less:m-0 hover:text-pink-500 bg-pink-400 md:bg-white hover:bg-pink-100 
                        border-t-4 border-pink-700 md:border-none " @click="getCurrentPath('/')">
                <div class="p-5">
                    หน้าแรก
                </div>
            </li>
            <li class="w-full md:w-fit text-xl list-none cursor-pointer text-pink-100 md:hover:text-pink-300 md:hover:bg-white md:text-pink-400
                        duration-500 md:truncate less:m-0 hover:text-pink-500 bg-pink-400 md:bg-white hover:bg-pink-100 ">
                <div class="p-5"  @click="getCurrentPath('/news')">
                    ข่าวสาร
                </div>
            </li>
            <li class="w-full md:w-fit text-xl list-none cursor-pointer text-pink-100 md:hover:text-pink-300 md:hover:bg-white md:text-pink-400
                        duration-500 md:truncate less:m-0 hover:text-pink-500 bg-pink-400 md:bg-white hover:bg-pink-100 ">
                <div class="p-5"  @click="getCurrentPath('/persons')">
                    บุคลากร
                </div>
            </li> 
            <li class="w-full md:w-fit text-xl list-none cursor-pointer text-pink-100 md:hover:text-pink-300 md:hover:bg-white md:text-pink-400
                        duration-500 md:truncate less:m-0 hover:text-pink-500 bg-pink-400 md:bg-white hover:bg-pink-100 ">
                <div class="p-5" @click="getCurrentPath('/about')" >
                    เกี่ยวกับเรา
                </div>
            </li>
            <li class="w-full md:w-fit text-xl list-none cursor-pointer text-pink-100 md:hover:text-pink-300 md:hover:bg-white md:text-pink-400
                        duration-500 md:truncate less:m-0 hover:text-pink-500 bg-pink-400 md:bg-white hover:bg-pink-100 ">
                <div class="p-5"  @click="getCurrentPath('/contact')">
                    ติดต่อ
                </div>
            </li>
        </ul>
    </nav>

     
</template>