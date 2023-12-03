<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref , reactive, onMounted} from 'vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';


const _api = new apiNamphong()
const _msg = new MsgAlert()

const positionDialogAdd = ref(false)
const positionDialogEdit = ref(false)

const positionName = ref<string>('')
const positionid = ref<number>()

const positionList = ref<Array<Object>>()

    
onMounted(()=>{
    getAllPositionList()
    getPersonalOne()
})

function getAllPositionList(){
    _api.allPosition().then((res)=>{
        positionList.value = res.data.positionData
    })
}

function addPosition(){    
    if(positionName.value.trim() == ''){
        _msg.toast_msg({title:'กรุณากรอกข้อมูลให้ถูกต้อง',timer:5,icon:'error',progressbar:true})
    }else{
        _api.addPosition({position_name:positionName.value}).then((res)=>{
            if(res.data.status){
                _msg.toast_msg({title:res.data.msg,timer:5,icon:'success',progressbar:true})
                getAllPositionList()
                getPersonalOne()
                
                positionName.value='';
            }else{
                _msg.default_msg({title:res.data.msg,timer:2,icon:'error'})
            }
        })
    }
}

function deletePosition(position_id:number , position_name:string){
    _msg.confirm(`คุณต้องการลบ ${position_name} ใช่หรือไม่ ?`).then((isConfirmed)=>{
        if(isConfirmed){
            _api.deletePosition({position_id:position_id}).then((res)=>{
                if(res.data.status){
                    _msg.toast_msg({title:res.data.msg,timer:5,icon:'success',progressbar:true})
                    getAllPositionList()
                    getPersonalOne()                    
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:5,icon:'error',progressbar:true})
                }
            })
        }
    })
}

function RenamePosition(){
    _msg.confirm(`คุณต้องการเปลี่ยนชื่อใช่ไหม?`).then((isConfirmed)=>{
        if(isConfirmed){
            _api.RenamePosition({position_id:(positionid.value as number) , position_name:positionName.value}).then((res)=>{
                if(res.data.status){
                    _msg.toast_msg({title:res.data.msg,timer:5,icon:'success',progressbar:true})
                    getAllPositionList()
                    getPersonalOne()
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:5,icon:'error',progressbar:true})
                }
            })
        }
    })
}

interface ApiResponse {
  personsData: object[];
}
const persons_position = ref<ApiResponse>()
function getPersonalOne(){
    _api.getPersonalOne().then((res)=>{        
        persons_position.value = res.data.personsData as ApiResponse
    })
}


// ส่งมาเป็น arr_obj

 
</script>

<template>
    <AdminNavigationBar>
        <div class="w-full min-h-screen flex flex-row justify-start items-start gap-1">
            <div class="w-8/12 h-full bg-gray-500">

                <div class="w-full h-full bg-white pt-2 border-b-4 border-pink-300">
                    <div class=" h-auto w-full flex flex-col justify-center items-center" v-for="position in persons_position">
                            <div class="w-full text-center text-2xl border-4 border-pink-300 py-4 bg-pink-100">
                                {{(position as any).position_name}}
                            </div>
    
                            <div class="w-full h-full flex flex-wrap justify-center items-center gap-10
                                border-x-4 border-pink-300 pb-10">                        
                                <div class="w-[200px] h-[330px] flex flex-wrap mt-2" v-for="person of (position as any).persons">
                                    <img class="object-cover rounded-lg w-[200px] h-[250px]" 
                                    src="https://as2.ftcdn.net/v2/jpg/02/48/78/23/1000_F_248782375_WjBW5Bh0PSRQH9qflJ5wzsBJKVfX2OAP.jpg" alt="">
                                    <div class="w-full text-center text-md mt-2">
                                        <p>{{ person.pd_person_name }}</p>
                                        <p class="text-lg">{{ person.pd_person_descript }}</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <div class="w-4/12 h-full ">
                <div class="w-full p-2">
                    <div class="w-full h-full px-20 text-white bg-blue-500 rounded-lg flex justify-start py-4 cursor-pointer
                    hover:bg-blue-600 duration-300">
                        <v-icon icon="mdi-account-box-multiple-outline" class="mr-3"> </v-icon> บุคลากรโรงเรียน
                    </div>
                    <div class="w-full h-full px-20 mt-1 text-white bg-blue-500 rounded-lg flex justify-start py-4 cursor-pointer
                    hover:bg-blue-600 duration-300">
                        <v-icon icon="mdi-account-box-multiple-outline" class="mr-3"> </v-icon> คณะกรรมการนักเรียน
                    </div>
                    <div class="w-full h-full px-20 mt-1 text-white bg-blue-500 rounded-lg flex justify-start py-4 cursor-pointer
                    hover:bg-blue-600 duration-300">
                        <v-icon icon="mdi-account-box-multiple-outline" class="mr-3"> </v-icon> คณะกรรมการศึกษาขั้นพื้นฐาน
                    </div>
                </div>
                <div class="w-full p-2">
                    <div @click="positionDialogAdd = !positionDialogAdd" 
                    class="w-full h-full px-20 text-white bg-pink-500 rounded-lg flex justify-center py-4 cursor-pointer
                    hover:bg-pink-600 duration-300">
                        <v-icon icon="mdi-plus" class="mr-3"> </v-icon> เพิ่มตำแหน่ง
                    </div>

                    <div v-for="position of positionList"
                        class="w-full h-auto py-1 pl-6 text-md rounded-lg mt-1 bg-pink-100 flex flex-row justify-end items-center">
                        <div class="w-full truncate">
                            <p class="">
                             {{ (position as any).pd_position_name }}
                            </p>
                        </div>
                        <div @click="()=>{
                            positionDialogEdit = !positionDialogEdit; 
                            positionName =(position as any).pd_position_name
                            positionid = (position as any).pd_position_id
                         }"
                        class="w-auto p-3 cursor-pointer rounded-full duration-300 pr-3
                          text-blue-500 hover:text-blue-700 flex justify-center items-center">
                            <v-icon icon="mdi-pencil"></v-icon>
                        </div>
                        <div @click="deletePosition((position as any).pd_position_id , (position as any).pd_position_name)"
                        class="w-auto p-3 cursor-pointer rounded-full duration-300 pr-3
                        text-red-500 hover:text-red-700 flex justify-center items-center">
                            <v-icon icon="mdi-trash-can-outline"></v-icon>
                        </div>

                    </div>
                </div>

                
            </div>


        </div>

        <!-- add position -->
        <v-dialog
            persistent
            v-model="positionDialogAdd"
            width="800"
            transition="dialog-bottom-transition"
        >
            <v-card class="pb-2">
                <div class="flex flex-col w-full ">
                    <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                        เพิ่มตำแหน่ง
                        <div @click="positionDialogAdd = !positionDialogAdd"
                        class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                            <v-icon icon="mdi-close"></v-icon>
                        </div>
                    </div>
                    <div class="w-full px-6">
                        <div class="flex flex-row gap-2 w-full">
                            <v-text-field
                                v-model="positionName"
                                label="ป้อนชื่อตำแหน่งที่ต้องการ"
                            ></v-text-field>
                            <div @click="addPosition()" class="้px-3 w-[100px] ">
                                <div class="w-full h-[55px] rounded-lg text-xl
                                bg-green-500 hover:bg-green-600 text-white flex justify-center items-center cursor-pointer">
                                    เพิ่ม
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-dialog>

        <!-- rename position -->
        <v-dialog
            persistent
            v-model="positionDialogEdit"
            width="800"
            transition="dialog-bottom-transition"
        >
            <v-card class="pb-2">
                <div class="flex flex-col w-full ">
                    <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                        แก้ไขชื่อ
                        <div @click="positionDialogEdit = !positionDialogEdit"
                        class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                            <v-icon icon="mdi-close"></v-icon>
                        </div>
                    </div>
                    <div class="w-full px-6">
                        <div class="flex flex-row gap-2 w-full">
                            <v-text-field
                                v-model="positionName"
                                label="ป้อนชื่อตำแหน่งที่ต้องการ"
                            ></v-text-field>
                            <div @click="RenamePosition()" class="้px-3 w-[100px] ">
                                <div class="w-full h-[55px] rounded-lg text-xl
                                bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center cursor-pointer">
                                    แก้ไข
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </AdminNavigationBar>
</template>