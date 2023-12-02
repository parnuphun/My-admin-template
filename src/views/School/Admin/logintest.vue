<!-- Login.vue -->
<template>
    <div class="bg-image-container bg-gray-900">
        <div class="min-h-screen  flex justify-center items-center">
            <div class="max-w-screen-lg m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

                    <div class="mt-12 flex flex-col items-center">
                        <h1 class="text-2xl xl:text-3xl font-extrabold text-gray-600">
                            Login
                        </h1>
                        <div class="w-full flex-1 mt-8">
                            <div class="mx-auto max-w-xs">

                                <form>
                                    <label class="mb-4" for="username">Username:</label>
                                    <input
                                        class="w-full px-8 mb-4 mt-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                        placeholder="Username" v-model="username" type="text" id="username" name="username"
                                        required>

                                    <label class="mb-4" for="password">Password:</label>
                                    <input
                                        class="w-full px-8 mb-4 mt-2 py-4 rounded-lg font-medium bg-gray-100 border border-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                        placeholder="Password" v-model="password" type="password" id="password"
                                        name="password" required>

                                    <button @click="nextPage('/')"
                                        class="mt-5 tracking-wide font-semibold bg-pink-600 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <span class="ml-3">
                                            Login
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            <div class="flex-1 bg-[#f36bbc] text-center hidden lg:flex rounded-r-lg ">
                <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat "
                    style="background-image: url('../../../../public/iamges/logo/logo_โรงเรียนเทศบาลน้ำพองภูริพัฒน์-removebg-preview.png');">
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router' ;

const router_s = useRouter();

const login  = '';
const password = 'sss'
const username = ''

function nextPage(path:string) {
    router_s.push(path)
}
</script>


<style >
.bg-image-container {
    height: 100vh;
    /* ความสูงเต็มหน้าจอ */
    background-image: url('src/views/Testnes/background.png');

}
</style>
