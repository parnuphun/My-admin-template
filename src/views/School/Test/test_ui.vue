<script setup lang="ts">
import {ref ,onMounted ,watch} from 'vue'
import { } from '../../../store/Interface' 
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { useRouter } from 'vue-router' ;
import { log } from 'console';

const router_s = useRouter();

const _api = new apiNamphong()
const _msg = new MsgAlert()

function nextPage(path:string) {
    router_s.push(path)
}

type errMessage = 'login_succ' | 'login_failed' | 'no_action' | 'server_err'
const errMessage = ref<errMessage>('no_action')
const btnLoading = ref(false)

const username = ref()
const password = ref()

function login(){
    btnLoading.value = true
    _api.login({username:username.value,password:password.value}).then((res) => {            
        if(res.data.status_code === 200){
            errMessage.value = 'login_succ'              
            // localStorage.setItem('Credential',JSON.stringify(res.data.user))
            setTimeout(()=>{
                nextPage('/admin/news')
            },500)
        }else if(res.data.status_code === 401){
            errMessage.value = 'login_failed'
            password.value = ''
        }else{
            errMessage.value = 'server_err'
        }
        setTimeout(() => {
            errMessage.value = 'no_action'
        }, 3000);
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
    <div class="w-full h-screen flex justify-center items-center bg-[url('/images/login_bg.jpg')]">
        <div class="w-2/3 h-full flex items-center justify-center">
            <div class="w-1/2 flex flex-col">
                <div class="w-fullflex justify-center mb-8">
                    <div class="flex flex-col ">
                        <p class="text-center text-3xl text-pink-500"> ระบบหลังบ้าน </p>
                        <p class="text-center text-2xl text-pink-600"> โรงเรียนเทศบาลน้ำพองภูริพัฒน์</p>
                    </div>
                </div>
                <div class="w-full flex flex-col justify-center items-center">
                    <div class=" h-auto w-9/12 px-6">
                        <v-alert v-if="errMessage === 'login_succ'"
                            type="success"
                            text="เข้าสู่ระบบสำเร็จ"
                        ></v-alert>
                        <v-alert v-else-if="errMessage === 'login_failed'"
                            type="error"
                            text="กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านให้ถูกต้อง"
                        ></v-alert>
                        <v-alert v-else-if="errMessage === 'server_err'"
                            type="error"
                            text="ไม่สามารถเข้าสู่ระบบได้ในตอนนี้ โปรดติดต่อผู้ดูแลระบบ"
                        ></v-alert>
                    </div>
                    <v-form @submit.prevent="login" class="w-9/12 px-6">
                        <v-text-field
                            v-model="username"
                            label="ชื่อผู้ใช้งาน"
                            type="text"
                            class="mt-4"
                            hide-details
                            variant="outlined"
                            bg-color=""
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            label="รหัสผ่าน"
                            class="mt-4"
                            type="password"
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
            <div class="w-1/2">
                <img src="/images/illustrations/login.svg" alt="">
            </div>
        </div>
    </div>
</template>