<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import  MsgAlert  from '../../services/msgAlert';
import apiRPTS from '../../services/apiRPTS';
import moment from 'moment';
import { ref } from 'vue';


const date = ref(moment(new Date()).add(543,'year').format('MMM Do YY'))

const api = new apiRPTS()
const nn = new MsgAlert()
function nes(){
   nn.succ("สำเร็จ",0,false)
}
function mes(){
    nn.err("ไม่สำเร็จ")
}
function bes(){
    nn.succToast("N",2)
}
function des(){
    nn.confirm("ยืนยีน").then((isConfirmed)=>{
        if(isConfirmed === true){
            api.productdetail(22,'maartin').then((res)=>{
                console.log(res.data)
            })
        }
    })
}
function photo(){
    const url = 'https://i.guim.co.uk/img/media/b62e032371c61a32c045ea0aabfce94a9d886a7a/0_155_4930_2958/master/4930.jpg?width=1300&quality=45&dpr=2&s=none'
    nn.lightBox(url,'1000px')
}

  </script>

<template>
<AdminNavigationBar>
    {{date}}
     <button @click="nes"> hhh </button>
     <button class="m-2 bg-red-600 py-2 px-8 rounded text-white hover:bg-red-400"  @click="mes"> error </button>
     <button class="m-2 bg-red-600 py-2 px-8 rounded text-white hover:bg-red-400"  @click="bes"> OK </button>
     <button class="m-2 bg-red-600 py-2 px-8 rounded text-white hover:bg-red-400"  @click="des"> ลบ </button>
     <button class="m-2 bg-red-600 py-2 px-8 rounded text-white hover:bg-red-400"  @click="photo"> รูป </button>
    </AdminNavigationBar>

</template>
