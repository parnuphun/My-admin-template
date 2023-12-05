<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref , reactive, onMounted , watch} from 'vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import {imageValidate} from '../../../services/validationRules'

const _api = new apiNamphong()
const _msg = new MsgAlert()

const tab = ref()
const categoryNo = ref()
const positionDialogAdd = ref(false)
const positionDialogEdit = ref(false)
const personDialogAdd = ref(false)
const personDialogEdit = ref(false)
const selectedPosition = ref()

const positionName = ref<string>('') // for add new position and rename 
const positionid = ref<number>() // for rename 

interface positionData {
    pd_position_id : number
    pd_position_name : string 
    pd_position_order : number
}
const positionList = ref<Array<positionData>>() // all position list

onMounted(()=>{
    getAllPositionList()
    getPersonalOne()
})
 
watch(tab , ()=>{
    // console.log('position selected value is ' + selectedPosition.value);
    console.log('category of position is ' + tab.value )
    if(tab.value === 'one'){
        categoryNo.value = 1
    }else if(tab.value === 'two'){
        categoryNo.value = 2
    }else if(tab.value === 'three'){
        categoryNo.value = 3
    }
})

// get position list
function getAllPositionList(){
    _api.allPosition().then((res)=>{
        positionList.value = res.data.positionData
        selectedPosition.value = positionList.value![0]?.pd_position_id
    })
}

// add new position
function addPosition(){    
    if(positionName.value.trim() == ''){
        _msg.toast_msg({title:'กรุณากรอกข้อมูลให้ถูกต้อง',timer:5,icon:'error',progressbar:true})
    }else{
        _api.addPosition({position_name:positionName.value,position_category:categoryNo.value}).then((res)=>{
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

// delete position
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

// rename position 
function RenamePosition(){
    _msg.confirm(`คุณต้องการเปลี่ยนชื่อใช่ไหม?`).then((isConfirmed)=>{
        if(isConfirmed){            
            _api.RenamePosition({position_id:(selectedPosition.value as number) , position_name:positionName.value}).then((res)=>{
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

// get person from position 
interface ApiResponse {
  personsData: object[];
}
const persons_position = ref<ApiResponse>()
function getPersonalOne(){
    _api.getPersonalOne().then((res)=>{        
        persons_position.value = res.data.personsData as ApiResponse
    })
}

// validate image
const _imgValid = [(v:any)=>imageValidate(v)]
const personName =ref()
const personDescript =ref()

// add new person
function addNewPerson(){

}

// mockup data table
const position = ref([    
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
])
 
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col w-full h-full ">
            <div class="w-full h-full flex flex-wrap ">
                <!-- Manage -->
                <div class="w-1/2 h-full overflow-auto border-2 border-gray-300">
                    <v-card class="h-full" color="">
                        <v-tabs
                            v-model="tab"
                            fixed-tabs
                            bg-color=""
                        >                                
                            <v-tab value="one">บุคลากรโรงเรียน</v-tab>
                            <v-tab value="two">คณะกรรมการศึกษาขั้นพื้นฐาน</v-tab>
                            <v-tab value="three">คณะกรรมการนักเรียน</v-tab>
                        </v-tabs>

                        <v-card-text class="h-full" >
                            <v-window v-model="tab" class="h-[96%]">
                                <v-window-item value="one" class="h-full" color="primary" >
                                    <div class="h-full w-full flex flex-col ">
                                        <!-- menu -->
                                        
                                        <div class="w-full h-auto flex flex-row justify-between">
                                            <div class="w-full px-2 flex flex-row gap-2" >
                                                <div class="w-full">
                                                    <v-select
                                                        label="เลือกตำแหน่ง"
                                                        density="compact"
                                                        :items="positionList"
                                                        item-title="pd_position_name"
                                                        item-value="pd_position_id"
                                                        v-model="selectedPosition"
                                                    >
                                                    </v-select>
                                                </div>
                                                <div class="w-fit flex flex-row gap-1">
                                                    <!-- rename position -->
                                                    <v-btn class="w-fit" color="blue"
                                                    @click="positionDialogEdit = !positionDialogEdit">
                                                        <v-icon icon="mdi-pencil"> </v-icon> 
                                                    </v-btn>
                                                    <!-- add new position -->
                                                    <v-btn class="w-fit" color="green"
                                                    @click="positionDialogAdd = !positionDialogAdd">
                                                        <v-icon icon="mdi-plus"> </v-icon> 
                                                    </v-btn>
                                                    <!-- delete position -->
                                                    <v-btn class="w-fit" color="red" 
                                                    @click="deletePosition(selectedPosition,positionName)">
                                                        <v-icon icon="mdi-delete"> </v-icon> 
                                                    </v-btn>
                                                </div>
                                            </div>
                                        </div>
                                        <v-divider></v-divider>
                                        <!-- table -->
                                        <div class="w-full h-full overflow-hidden">
                                            <v-table 
                                                fixed-header
                                                class="h-full overflow-auto"
                                            >
                                                <thead >
                                                    <tr>
                                                        <th class="text-left">
                                                        ภาพ 
                                                        </th>
                                                        <th class="text-left">
                                                        ชื่อ
                                                        </th>
                                                        <th class="text-left">
                                                        เกี่ยวกับ
                                                        </th>
                                                        <th class="text-center w-fit">
                                                            <!-- add new person -->
                                                            <v-btn class="w-fit" color="green" 
                                                            @click="personDialogAdd = !personDialogAdd">
                                                                <v-icon icon="mdi-account"> </v-icon> เพิ่มบุคลากร
                                                            </v-btn>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        v-for="(item , i) in position"
                                                        :key="item.name"
                                                    >
                                                        <td>
                                                            <img class="w-10 h-10 object-cover" 
                                                            :src="item.url" alt="">    
                                                        </td>
                                                        <td>{{ i+1 }}. {{ item.name }}</td>
                                                        <td>{{ item. position}}</td>
                                                        <td>
                                                            <div class="w-full flex flex-row gap-2 justify-center">
                                                                <div class="text-blue-500 hover:text-blue-600 cursor-pointer">
                                                                    <v-icon icon="mdi-pencil"></v-icon>
                                                                </div>
                                                                <div class="text-green-500 hover:text-green-600 cursor-pointer">
                                                                    <v-icon icon="mdi-folder-move-outline"></v-icon>
                                                                </div>
                                                                <div class="text-red-500 hover:text-red-600 cursor-pointer">
                                                                    <v-icon icon="mdi-delete"></v-icon>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </div>
                                    </div>
                                </v-window-item>
                                
                                <v-window-item value="two">
                                    คณะกรรมการศึกษาขั้นพื้นฐาน
                                </v-window-item>

                                <v-window-item value="three">
                                    คณะกรรมการนักเรียน
                                </v-window-item>
                            </v-window>
                        </v-card-text>
                    </v-card>
                </div>

                <!-- Preview -->
                <div class="w-1/2 h-full bg-red-100 overflow-auto border-l-0 border-2 border-gray-300">
                    <div class="w-full bg-white h-full">
                        <v-card class="w-full h-full" color="">
                            <div class="w-full text-md h-[47px] flex justify-center items-center shadow-xl">
                                <v-icon icon="mdi-eye" class="mr-3"> </v-icon> ตัวอย่าง
                            </div>
                            <div class="w-full h-full p-4 bg-gray-50 overflow-auto">
                                <div class="w-full h-full">
                                    <div class="w-full ">
                                        <div class="h-full w-full flex flex-col justify-center items-center" 
                                        v-for="position in persons_position">
                                            <div class="w-full text-center text-lg py-4 flex flex-row justify-center">
                                                <p class="underline">
                                                    {{(position as any).position_name}} 
                                                </p>
                                            </div>
                    
                                            <div class="w-full h-full flex flex-wrap justify-center items-center gap-10 pb-10">                        
                                                <div class="relative w-[150px] h-[200px] flex flex-wrap justify-center mt-2" v-for="person of (position as any).persons">
                                                    <img class="object-cover rounded-lg w-[100px] h-[150px]" 
                                                    src="https://as2.ftcdn.net/v2/jpg/02/48/78/23/1000_F_248782375_WjBW5Bh0PSRQH9qflJ5wzsBJKVfX2OAP.jpg" alt="">
                                                    
                                                    <div class="absolute top-0 right-0 flex flex-col">
                                                        <div class="text-blue-500 hover:text-blue-600 cursor-pointer">
                                                            <v-icon icon="mdi-pencil"></v-icon>
                                                        </div>
                                                        <div class="text-red-500 hover:text-red-600 cursor-pointer">
                                                            <v-icon icon="mdi-delete"></v-icon>
                                                        </div>
                                                    </div>
                                                    <div class="w-full text-center text-sm mt-2">
                                                        <p>{{ person.name }}</p>
                                                        <p class="text-sm">{{ person.discript }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </div>
                </div>
            </div>
        </div>


        

    </AdminNavigationBar>
    
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

    <!-- add new person -->
    <v-dialog
        persistent
        v-model="personDialogAdd"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                    เพิ่มบุคลากร
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <v-file-input
                            :rules="_imgValid"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Pick an avatar"
                            label="ภาพประจำตัว"
                        ></v-file-input>
                        <v-text-field
                            v-model="personName"
                            label="ชื่อเต็ม"
                            hide-details
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="personDescript"
                            label="เพิ่มเติม"
                            hide-details
                            required
                        ></v-text-field>
                    </div>

                    <div class="w-full mt-2 flex justify-center items-center gap-2">
                        <v-btn color="red">
                            ยกเลิก
                        </v-btn>
                        <v-btn color="green" @click="personDialogAdd = !personDialogAdd"> ตกลง </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>