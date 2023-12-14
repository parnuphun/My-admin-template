<script setup lang="ts">
import { useRouter } from 'vue-router' ;

function nextPage(path:string) {
    router_s.push(path)
}

const router_s = useRouter();
</script>

<template>
    <div class="w-full h-auto bg-pink-900 flex flex-wrap justify-center px-4 ">
        <div class="less:w-full sm:w-1/3 xl:w-1/3 
        flex flex-col p-2 gap-4 text-white ">
            <p class="less:text-2xl sm:text-md md:text-lg xl:text-2xl mt-2 text-center line-clamp-1">
                โรงเรียนเทศบาลน้ำพองภูริพัฒน์
            </p>
            <div class="w-full flex flex-wrap xl:px-28 ">
                <p class="w-1/2 text-center cursor-pointer hover:text-gray-300">หน้าแรก</p>
                <p class="w-1/2 text-center cursor-pointer hover:text-gray-300">ข่าวสาร</p>
                <p class="w-1/2 text-center cursor-pointer hover:text-gray-300">บุคลากร</p>
                <p class="w-1/2 text-center cursor-pointer hover:text-gray-300">ภาพกิจกรรม</p>
                <p class="w-1/2 text-center cursor-pointer hover:text-gray-300">เอกสาร</p>
                <p class="w-1/2 text-center cursor-pointer hover:text-gray-300">ตารางเรียน</p>
                <p class="w-1/2 text-center cursor-pointer hover:text-gray-300">เกี่ยวกับ</p>
                <p class="w-1/2 text-center cursor-pointer hover:text-gray-300">ติดต่อ</p>
                <p class="w-1/2 text-center cursor-pointer hover:text-gray-300"
                @click="nextPage('/login')"> ผู้ดูแลระบบ </p>
            </div>
        </div>
        <div class="less:w-full sm:w-1/3 xl:w-1/3 flex flex-col items-start pt-6 px-2 gap-2">
            <div class="text-white"><v-icon icon="mdi-phone" class="text-white"> </v-icon> 043 441 007 </div>
            <div class="text-white"><v-icon icon="mdi-map" class="text-white"> </v-icon> เลขที่ 29 หมู่ 15 ตำบลน้ำพอง อำเภอน้ำพอง จังหวัดขอนแก่น 40310</div>
            <div class="text-white"><v-icon icon="mdi-email" class="text-white"> </v-icon> nampongpuripat@gmail.com </div>
        </div>
        <div class="less:w-full sm:w-1/3 xl:w-1/3 p-3 less:mt-9">
            <iframe class="w-full h-auto" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15283.8701330741!2d102.8032608!3d16.7284717!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312257d8d3dac247%3A0xa51a22cdfef48f19!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4LmA4LiX4Lio4Lia4Liy4Lil4LiZ4LmJ4Liz4Lie4Lit4LiH4Lig4Li54Lij4Li04Lie4Lix4LiS4LiZ4LmM!5e0!3m2!1sth!2sth!4v1700965260491!5m2!1sth!2sth" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</template>