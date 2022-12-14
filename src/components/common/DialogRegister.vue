<script setup lang="ts">
import {ref , onMounted} from 'vue'
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
const _api = new apiRPTS()
const _msg = new MsgAlert()

    const props = defineProps<{
        isDialogOpen: boolean
        data : any
    }>()

    const emit = defineEmits<{
        (event: 'register-success' ,size:boolean):void
    }>()

    onMounted(()=>{
        _api.register
    })

    function registerSuccess(){
        _msg.confirm('ต้องการบันทึกข้อมูลใช่หรือไม่').then((isConfirmed)=>{
            if(isConfirmed){
                _api.register(props.data).then((res)=>{
                    const data = res.data
                    if(data.status){
                        _msg.succ(data.msg,2)
                        setTimeout(()=>{
                            emit('register-success',false)
                        },2000)
                    }
                })
            }
        })
    }



</script>

<template>
    <v-dialog v-model="props.isDialogOpen" hidden-overlay width="600">
        <v-card height="100%">
            <v-card-title class="p-6 bg-blue-500  text-white text-center">
                <span class="text-2xl"> ลงทะเบียนผู้ใช้ใหม่</span>
            </v-card-title>

            <v-card-text>
                <form action="" @submit.prevent="registerSuccess">
                    <div class="flex flex-wrap w-full h-full">
                        <div class="w-full">
                            <v-text-field
                                v-model="props.data.OldAccount_Id"
                                :counter="13"
                                label="รหัสนักศึกษา"
                                readonly
                                required
                            ></v-text-field>
                        </div>
                        <div class="w-1/2 pr-1">
                            <v-text-field
                                v-model="props.data.OldAccount_Fname"
                                :counter="255"
                                label="ชื่อจริง"
                                required
                            ></v-text-field>
                        </div>
                        <div class="w-1/2 pl-1">
                            <v-text-field
                                v-model="props.data.OldAccount_Lname"
                                :counter="255"
                                label="นามสกุล"
                                required
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                v-model="props.data.OldAccount_UserName"
                                :counter="255"
                                label="อีเมลล์มหาลัย"
                                readonly
                                required
                            ></v-text-field>
                        </div>
                        <div class="w-3/4 pr-1">
                            <v-text-field
                                v-model="props.data.OldAccount_Password"
                                :counter="255"
                                label="รหัสผ่าน"
                                type="password"
                                disabled
                                required
                            ></v-text-field>
                        </div>
                        <div class="w-1/4 pl-1">
                            <div class="w-full h-14 text-white bg-red-500 hover:bg-red-700 cursor-pointer rounded-lg flex justify-center items-center transition duration-300">
                                <span>ตั้งรหัสผ่านใหม่</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 flex w-full justify-center items-center">
                        <button
                            type="submit"
                            class="py-2 px-3 text-center text-white w-40 bg-green-500 hover:bg-green-700 rounded-full cursor-pointer">
                            บันทึกข้อมูล
                        </button>

                    </div>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
