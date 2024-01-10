<script setup lang="ts">
import {ref ,onMounted ,watch} from 'vue'
import { } from '../../../store/Interface' 
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { useRouter } from 'vue-router' ;
import axiosAuth from '../../../services/auth';

const router_s = useRouter();

const _api = new apiNamphong()
const _msg = new MsgAlert()

onMounted(()=>{
    document.title = 'เข้าสู่ระบบ'
})

function nextPage(path:string) {
    router_s.push(path)
}

type errMessage = 'login_succ' | 'login_failed' | 'no_action' | 'server_err'
const errMessage = ref<errMessage>('no_action')
const errMsgResponse = ref()
const btnLoading = ref(false)

const username = ref()
const password = ref()

function login(){
    btnLoading.value = true
    _api.login({username:username.value,password:password.value}).then((res) => {            
        if(res.data.status_code === 200){            
            errMessage.value = 'login_succ'              
            localStorage.setItem('Credential',JSON.stringify(res.data.user_data))
            axiosAuth.defaults.headers['Authorization'] = `Bearer ${res.data.user_data.user_token}`; // update token in header
            setTimeout(()=>{
                nextPage('/admin/news')
            },500)
        }else if(res.data.status_code === 401){
            errMessage.value = 'login_failed'
            errMsgResponse.value = res.data.msg
            password.value = ''
        }else{
            errMessage.value = 'server_err'
            errMsgResponse.value = res.data.msg
        }
        setTimeout(() => {
            // errMessage.value = 'no_action'
        }, 6000);
        btnLoading.value = false
    })
    .catch((error) => {
        console.error('Error:', error);
        _msg.default_msg({title:'something wrong ...',timer:3,progressbar:true,icon:'error'})
        btnLoading.value = false
    });
}
 
</script>

<template>
    <div class="relative w-full h-screen flex justify-center items-center bg-[url('/images/login_bg.jpg')]">
        <div class="less:w-full lg:w-2/3 h-full flex flex-wrap items-center justify-center">
            <div class="less:w-full md:w-1/2 flex flex-col">
                <div class="w-full flex justify-center mb-8">
                    <transition name="toast">
                        <div class="flex flex-col ">
                            <p class="text-center text-3xl text-pink-500"> ระบบหลังบ้าน </p>
                            <p class="text-center text-2xl text-pink-600"> โรงเรียนเทศบาลน้ำพองภูริพัฒน์</p>
                        </div>
                    </transition>
                </div>
                <div class="w-full flex flex-col justify-center items-center">
                    <div class=" h-auto less:w-full  md:w-full px-6">
                        <transition name="toast">
                            <v-alert v-if="errMessage === 'login_succ'"
                                type="success"
                                text="เข้าสู่ระบบสำเร็จ"
                            ></v-alert>
                            <v-alert v-else-if="errMessage === 'login_failed'"
                                type="error"
                                :text="errMsgResponse"
                            ></v-alert>
                            <v-alert v-else-if="errMessage === 'server_err'"
                                type="error"
                                text="ไม่สามารถเข้าสู่ระบบได้ในตอนนี้ โปรดติดต่อผู้ดูแลระบบ"
                            ></v-alert>
                        </transition>
                    </div>
                    <v-form @submit.prevent="login" class="less:w-full  md:w-full px-6">
                        <v-text-field
                            v-model="username"
                            label="ชื่อผู้ใช้งาน"
                            type="text"
                            class="mt-4"
                            hide-details
                            variant="outlined"
                            autocomplete="current-username"
                            bg-color=""
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            label="รหัสผ่าน"
                            class="mt-4"
                            type="password"
                            autocomplete="current-password"
                            hide-details
                            variant="outlined"
                            bg-color=""
                            required
                        ></v-text-field>
                        <v-btn type="submit" :loading="btnLoading"
                        class="mt-4 w-full" size="large" color="pink">
                            เข้าสู่ระบบ
                        </v-btn>
                    </v-form>
                </div>
            </div>
            <div class="less:w-full sm:w-fit md:w-1/2 less:hidden md:block">
                <img src="/images/illustrations/login.svg" alt="">
            </div>
        </div>
        <div class="absolute w-auto mt-12 text-center text-[14px] bottom-0">
            <p>หากพบปัญหาในการใช้งานระบบติดต่อได้ที่เบอร์ 043-441-007 , อีเมล nampongpuripat@gmail.com หรือ
                <a class="underline text-blue-500 hvoer:text-blue-700"
                    href="www.facebook.com" >เฟสบุ๊คโรงเรียนน้ำพองภูริพัฒน์ </a>
            </p>
        </div>
    </div>
</template>

<style>
    /* enter msg */
    .toast-enter-from{
        opacity: 0;
        transform: translateX(-10px);
    }

    .toast-enter-to{
        opacity: 1;
        transform: translateX(0);
    }

    .toast-enter-active{
        transition: all 0.7 ease;
    }

    /* leace msg */
    .toast-leave-from{
        opacity: 1;
        transform: translateX(0);
    }

    .toast-leave-to{

        opacity: 0;
        transform: translateX(-30px);
    }

    .toast-leave-active{
        transition: all 0.7 ease-in-out;
    }
</style>