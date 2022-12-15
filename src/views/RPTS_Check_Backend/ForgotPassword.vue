<script setup lang="ts">
import {ref} from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const inputOTP = ref()

function validateOTP(){

}

</script>

<template>
    <div class="w-full h-screen flex items-center justify-center bg-gray-100">
        <div    style="width:500px;"
            class="py-10 px-6 bg-white border-2 border-gray-400 border-solid rounded text-center">
            <div class="h-full w-full">
                <v-form @submit.prevent="validateOTP" class="h-full text-left">
                    <div class="h-full">
                        <div class="text-center mb-10">
                            <span class="text-3xl text-center"> Forgot Password </span>
                        </div>
                        <div class="">
                            <v-text-field
                                prepend-icon="mdi-email"
                                v-model="inputOTP"
                                label="กรุณากรอก Email ผู้ใช้งาน"
                                required
                            ></v-text-field>
                        </div>

                        <div class="">
                            <v-text-field
                                prepend-icon="mdi-key"
                                v-model="inputOTP"
                                label="OTP"
                                required
                            ></v-text-field>
                        </div>

                        <div class="flex justify-center items-end gap-2 mb-3">
                            <button
                                @click="router.push('/testBackend/login')"
                                class="w-content py-2 px-3 text-center text-white w-40 bg-red-500 hover:bg-red-700 rounded-full cursor-pointer">
                                ยกเลิก
                            </button>
                            <button
                                type="submit"
                                class="py-2 px-3 text-center text-white w-40 bg-green-500 hover:bg-green-700 rounded-full cursor-pointer"
                                >
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </v-form>
            </div>
        </div>
    </div>


</template>
