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
                <img src="/images/illustrations/404 Error-cuate.svg" alt="">
            </div>
            <div class="flex flex-col justify-center items-center">
                <p class="text-2xl text-pink-500">ไม่พบหน้าที่คุณกำลังมองหา </p>
            </div>
            <div class="flex less:flex-col md:flex-row w-full gap-2 justify-center items-center mt-4">
                <v-btn color="pink" class="less:w-1/2 md:w-1/2 px-2" size="large"  @click="nextPage('/')">
                    <v-icon class="mr-2">mdi-home</v-icon>    ไปหน้าเว็บไซต์
                </v-btn>
            </div>
        </div>
    </div>
 
 </template>