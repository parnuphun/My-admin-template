<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import MsgAlert  from '../../services/msgAlert'

const sw = new MsgAlert()
    // default
    function successMsg(){
        sw.default_msg({title:'Success',progressbar:true})
    }
    function errorMsg(){
        sw.default_msg({title:'Error',icon:'error',cancelText:'i Know ',timer:3,progressbar:true})
    }
    function infoMsg(){
        sw.default_msg({title:'Info', icon:'info',progressbar:true})
    }
    function warningMsg(){
        sw.default_msg({title:'warning', icon:'warning',progressbar:true})
    }
    function questionMsg(){
        sw.default_msg({title:'question', icon:'question',progressbar:true})
    }

    // toast
    function successToastMsg(){
        sw.toast_msg({title:'success',icon:'success'})
    }
    function errorToastMsg(){
        sw.toast_msg({title:'success',icon:'error'})
    }

    // other alert
    function confirm(){
        sw.confirm('คุณต้องการยืนยันใช่ไหม ?','warning',false).then((isConfirmed)=>{
            if(isConfirmed){
            }else{
            }
        })
    }

    function lightBox(){
        const url:string = 'https://www.w3schools.com/css/img_5terre_wide.jpg'
        sw.lightBox(url)
    }

</script>

<template>
    <AdminNavigationBar>
        <div class="mb-2 flex flex-wrap gap-2">
            <div @click="successMsg"
                class="text-white bg-green-500 hover:bg-green-700 rounded-lg p-3 cursor-pointer">
                    Success !
            </div>
            <div @click="errorMsg"
                class="text-white bg-red-500 hover:bg-red-700 rounded-lg p-3 cursor-pointer">
                    error !
            </div>
            <div @click="infoMsg"
                class="text-white bg-cyan-500 hover:bg-cyan-700 rounded-lg p-3 cursor-pointer">
                    info !
            </div>
            <div @click="warningMsg"
                class="text-white bg-yellow-500 hover:bg-yellow-700 rounded-lg p-3 cursor-pointer">
                    warning !
            </div>
            <div @click="questionMsg"
                class="text-white bg-gray-500 hover:bg-gray-700 rounded-lg p-3 cursor-pointer">
                    question !
            </div>
        </div>
        <div class="mb-2 flex flex-wrap gap-2">
            <div @click="successToastMsg"
                class="text-white bg-green-500 hover:bg-green-700 rounded-lg p-3 cursor-pointer">
                    Success Toast !
            </div>
            <div @click="errorToastMsg"
                class="text-white bg-red-500 hover:bg-red-700 rounded-lg p-3 cursor-pointer">
                    error Toast !
            </div>
        </div>
        <div class="mb-2 flex flex-wrap gap-2">
            <div @click="confirm"
                class="text-white bg-blue-500 hover:bg-blue-700 rounded-lg p-3 cursor-pointer">
                    confirm alert !
            </div>
            <div @click="lightBox"
                class="text-white bg-yellow-500 hover:bg-yellow-700 rounded-lg p-3 cursor-pointer">
                    Light Box
            </div>
        </div>

    </AdminNavigationBar>
</template>

