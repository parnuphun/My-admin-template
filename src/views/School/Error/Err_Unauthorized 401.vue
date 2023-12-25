<script setup lang="ts">
 
import {useRouter} from 'vue-router'

const router = useRouter()

function nextPage(path:string){
    router.push(path)
}
 
</script>

<template>
        <div class="w-full h-screen bg-[url('/images/login_bg.jpg')] flex justify-center items-center">
            <div class="h-[500px] sm:w-full lg:w-1/2 flex flex-col justify-center items-center">
                <div class="w-[400px] h-full ">
                    <img src="/images/illustrations/401 Error Unauthorized-rafiki.svg" alt="">
                </div>
                <div class="flex flex-col justify-center items-center">
                    <p class="less:text-md md:text-2xl text-pink-500">คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้หรือสิทธิ์การเข้าใช้งานหมดอายุ </p>
                    <p class="text-xl text-pink-400">กรุณาเข้าสู่ระบบใหม่อีกครั้ง</p>
                </div>
                <div class="flex less:flex-col md:flex-row w-full gap-2 justify-center items-center mt-2">
                    <v-btn color="pink" class="less:w-1/2 md:w-1/4 px-2" size="large"  @click="nextPage('/')">
                        <v-icon class="mr-2">mdi-home</v-icon>    ไปหน้าเว็บไซต์
                    </v-btn>
                    <v-btn color="pink" class="less:w-1/2 md:w-1/4 px-2" size="large" @click="nextPage('/login')">
                        <v-icon class="mr-2">mdi-login</v-icon>    ไปหน้าเข้าสู่ระบบ
                    </v-btn>
                </div>
            </div>
        </div>
 
 </template>