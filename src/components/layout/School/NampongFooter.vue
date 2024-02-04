<script setup lang="ts">
import { useRouter } from 'vue-router' ;
import {ref} from 'vue'

function nextPage(path:string , type:string) {
    if(type === 'page'){
        router_s.push(path)
    }else{
        window.open(path,'_blank')
    }
}

const menu = ref<Array<Object>>([
    {
        type : 'page' ,
        id:'about',
        title:'เกี่ยวกับเรา',
        path:'/about',
        icon:'mdi-information-outline'
    },
    {
        type : 'page' ,
        id:'contact',
        title:'ติดต่อ',
        path:'/contact',
        icon:'mdi-phone-outline'
    },
    {
        type : 'page' ,
        id:'login',
        title:'สำหรับผู้ดูแลระบบ',
        path:'/login',
        icon:'mdi-login'
    },
    {
        type : 'other' ,
        id:'location',
        title:'ที่ตั้ง',
        path:'https://www.google.com/maps?ll=16.728472,102.803261&z=14&t=m&hl=th&gl=TH&mapclient=embed&cid=11896859633793666841',
        icon:'mdi-map'
    },
    {
        type : 'other' ,
        id:'facebook',
        title:'Facebook',
        path:'https://www.facebook.com/puripatschool2560/?locale=th_TH',
        icon:'mdi-facebook'
    },
])
const router_s = useRouter();
</script>

<template>
    <!-- <div class="w-full h-auto bg-pink-900 flex flex-wrap justify-center px-4 ">
        <div class="less:w-full sm:w-1/3 xl:w-1/3 
        flex flex-col p-2 gap-4 text-white ">
            <p class="less:text-2xl sm:text-md md:text-lg xl:text-2xl mt-2 text-center line-clamp-1">
                โรงเรียนเทศบาลน้ำพองภูริพัฒน์
            </p>
            <div class="w-full flex flex-wrap xl:px-28">
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300">หน้าแรก</div>
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300">ข่าวสาร</div>
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300">บุคลากร</div>
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300">ภาพกิจกรรม</div>
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300">ตาราสอน</div>
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300">ตารางเรียน</div>
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300">เอกสาร</div>
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300">เกี่ยวกับ</div>
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300">ติดต่อ</div>
                <div class="w-1/2 less:text-center sm:text-left cursor-pointer hover:text-gray-300"
                @click="nextPage('/login')"> ผู้ดูแลระบบ </div>
            </div>
        </div>
        <div class="less:w-full sm:w-1/3 xl:w-1/3 flex flex-col items-start p-2 px-2 gap-2">
            <p class="w-full less:text-2xl sm:text-md md:text-lg xl:text-2xl mt-2 text-center line-clamp-1 text-white">
                ติดต่อ
            </p>
            <div class="text-white"><v-icon icon="mdi-map" class="text-white mr-2"> </v-icon> เลขที่ 29 หมู่ 15 ตำบลน้ำพอง อำเภอน้ำพอง จังหวัดขอนแก่น 40310</div>
            <div class="text-white"><v-icon icon="mdi-phone" class="text-white mr-2"> </v-icon> 043 441 007 </div>
            <div class="text-white"><v-icon icon="mdi-email" class="text-white mr-2"> </v-icon> nampongpuripat@gmail.com </div>
        </div>
        <div class="less:w-full sm:w-1/3 xl:w-1/3 p-3 less:mt-9">
            <iframe class="w-full h-auto" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15283.8701330741!2d102.8032608!3d16.7284717!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312257d8d3dac247%3A0xa51a22cdfef48f19!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4LmA4LiX4Lio4Lia4Liy4Lil4LiZ4LmJ4Liz4Lie4Lit4LiH4Lig4Li54Lij4Li04Lie4Lix4LiS4LiZ4LmM!5e0!3m2!1sth!2sth!4v1700965260491!5m2!1sth!2sth" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div> -->
    <div class="w-full flex flex-col  justify-center items-center bg-pink-900 ">
        <div class="w-[1000px]">
            <!-- <div class="flex flex-wrap gap-2 justify-center ">
                <div  v-for="item of menu"
                    @click="nextPage((item as any).path,(item as any).type)"
                    class="p-4 border-2 border-white rounded-lg flex justify-center items-center cursor-pointer text-white
                    hover:bg-white hover:border-pink-700 group">
                    <v-icon :icon="(item as any).icon" class="group-hover:text-pink-700"></v-icon> 
                    <v-tooltip activator="parent" location="top"> {{(item as any).title }}</v-tooltip>
                </div>
            </div> -->
            <div class="w-full py-2  flex justify-center items-center text-white text-sm">
                © 2024 NAMPHONG PHURIPHAT MUNICIPLE SCHOOL
            </div>
        </div>
    </div>
</template>