<script setup lang="ts">
import { reduce } from 'lodash';
import { onMounted , ref} from 'vue';
import { useRouter } from 'vue-router';
import DialogRegister from '../../components/common/DialogRegister.vue';
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
import { isLoggedIn } from '../../store/auth'

const _api = new apiRPTS()
const _msg = new MsgAlert()

const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')

const isDialogOpen = ref<boolean>(false)

function login(){
    _api.login(username.value,password.value).then((res)=>{
        const data = res.data

        if(data.status === true && data.isFirstTime === false){
            isLoggedIn.value = true
            _msg.succ(data.msg,2)
            setTimeout(()=>{
                router.push('/')
            },2000)
        }else if(data.status === true && data.isFirstTime === true){
            _msg.confirm(data.msg,'warning',false,'ไปยังหน้าลงทะเบียน').then((isConfirmed)=>{
                isLoggedIn.value = true
                if(isConfirmed === true){
                    isDialogOpen.value = true
                }
            })
        }else if(data.status === false && data.isFirstTime === false){
            _msg.err(data.msg)
        }
    })
}

function registerSuccess(closeDialog:Boolean){
    _msg.succ('ลงทะเบียนสำเร็จ',2)
    setTimeout(()=>{
        router.push('/')
    },2000)
    isDialogOpen.value = Boolean(closeDialog)
}

function openDialog(){
    isDialogOpen.value = !isDialogOpen.value
}

</script>
<template>
    <AdminNavigationBar>
        <div class="w-full h-screen flex items-center justify-center bg-gray-100">
            <div class="w-96 p-4 bg-gray-200 border-2 border-gray-400 border-solid rounded text-center">
                <div class="h-full w-full">
                    <form @submit.prevent="login" class="h-full text-left">
                        <div class="h-full">
                            <div class="text-center mb-10">
                                <span class="text-3xl text-center"> Login </span>
                            </div>
                            <div class="mb-3">
                                <label class="ml-1"> Username </label>
                                <input v-model="username" type="text" class="w-full p-2 text-md bg-white rounded-md focus:ring  ">
                            </div>
                            <div class="mb-10">
                                <label class="ml-1"> Password </label>
                                <input v-model="password" type="password" class="w-full mb-2 p-2 text-md bg-white rounded-md focus:ring ">
                                <div class="flex justify-between items-center">
                                    <span class="ml-1 text-blue-500 hover:text-blue-600 cursor-pointer"> forgot password ? </span>
                                    <span class="mr-1 text-blue-500 hover:text-blue-600 cursor-pointer"> Register </span>
                                </div>
                            </div>
                            <div class="flex justify-center items-end mb-3">
                                <button type="submit" class="py-2 px-3 text-center text-white w-40 bg-blue-500 hover:bg-blue-700 rounded-full cursor-pointer">
                                    Login
                                </button>
                            </div>
                            <div class="flex justify-center items-end ">
                                <div
                                    @click="openDialog"
                                    class="py-2 px-3 text-center text-white w-40 bg-orange-500 hover:bg-orange-700 rounded-full cursor-pointer">
                                    Open Dialog
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminNavigationBar>

    <DialogRegister
            persistent
            v-model:isDialogOpen="isDialogOpen"
            @register-success="registerSuccess">
    </DialogRegister>


</template>
