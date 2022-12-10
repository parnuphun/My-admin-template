<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import MsgAlert  from '../../services/msgAlert'

const sw = new MsgAlert()
    // default
    function successMsg(){
        sw.succ('สำเร็จแล้ว',12)
    }
    function errorMsg(){
        sw.err('มีบางอย่างผิดพลาด')
    }
    function infoMsg(){
        sw.info('รายละเอียด')
    }
    function warningMsg(){
        sw.warning('มีบางอย่างที่คุณควรรู้ก่อน')
    }
    function questionMsg(){
        sw.question('มีคำถามใช่ไหม ?')
    }

    // toast
    function successToastMsg(){
        sw.succToast('สำเร็จแล้ว',2)
    }
    function errorToastMsg(){
        sw.errToast('มีบางอย่างผิดพลาด')
    }

    // other alert
    function confirm(){
        sw.confirm('คุณต้องการยืนยันใช่ไหม ?').then((isConfirmed)=>{
            if(isConfirmed){
                sw.succ(`isConfirmed = ${String(isConfirmed)}`)
            }else{
                sw.err(String(isConfirmed))
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

