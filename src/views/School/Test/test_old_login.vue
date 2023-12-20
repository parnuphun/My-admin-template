<script setup lang="ts">
import { useRouter } from 'vue-router' ;
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import {ref} from 'vue';

const router_s = useRouter();

const _api = new apiNamphong()
const _msg = new MsgAlert()

function nextPage(path:string) {
    router_s.push(path)
}

const username = ref()
const password = ref()

function login(){
    _api.login({username:username.value,password:password.value})
        .then((res) => {            
            if(res.data.status){                
                _msg.default_msg({title:res.data.msg,timer:2,progressbar:true,icon:'success'})                
                localStorage.setItem('Credential',JSON.stringify(res.data.user))
                setTimeout(()=>{
                    nextPage('/admin/news')
                },2000)
            }else{
                _msg.default_msg({title:res.data.msg,timer:3,progressbar:true,icon:'error'})
                password.value = ''
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            _msg.default_msg({title:'something wrong ...',timer:3,progressbar:true,icon:'error'})
        });
}

</script>

<!-- Login.vue -->
<template>
    <div class="bg-image-container bg-pink-100">
        <div class="min-h-screen flex justify-center items-center">
            <div class="max-w-screen-lg m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center 
            flex-1 border-2 border-pink-400">
                <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

                    <div class="mt-12 flex flex-col items-center">
                        <h1 class="text-2xl xl:text-3xl font-extrabold text-gray-600">
                            ระบบหลังบ้าน
                        </h1>
                        <div class="w-full flex-1 mt-8">
                            <div class="mx-auto max-w-xs">

                                <form @submit.prevent="login">
                                    <v-text-field
                                        v-model="username"
                                        label="ชื่อผู้ใช้งาน"
                                        class="mt-2 mb-4"
                                        hide-details
                                        required
                                        name="username"
                                        id="username"
                                        variant="outlined"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="password"
                                        label="รหัสผ่าน"
                                        class="mt-2 mb-4 "
                                        hide-details
                                        type="password"
                                        required
                                        name="password"
                                        id="password"
                                        variant="outlined"
                                    ></v-text-field>
                                    <!-- <input
                                        class="w-full px-8 mb-4 mt-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                        placeholder="Username" v-model="username" type="text" id="username" name="username"
                                        required> -->

                                    <!-- <input
                                        class="w-full px-8 mb-4 mt-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                        placeholder="Password" v-model="password" type="password" id="password"
                                        name="password" required> -->

                                    <v-btn type="submit" size="large" class="w-full mt-3 rounded-lg" color=pink >
                                        <span class="">
                                            เข้าสู่ระบบ
                                        </span>
                                    </v-btn>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-1 bg-pink-400 text-center hidden lg:flex rounded-r-lg ">
                    <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat "
                        style="background-image: url('images/logo/logo_โรงเรียนเทศบาลน้ำพองภูริพัฒน์-removebg-preview.png');">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


 