<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref , reactive, onMounted , watch} from 'vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import {personCategory,personPosition ,personDirectoryResponse ,dataStatus , credential} from '../../../store/Interface'

const _api = new apiNamphong()
const _msg = new MsgAlert()
const dataCategoryStatus = ref<dataStatus>('no_data')
const dataPositionStatus = ref<dataStatus>('no_data')

const credential = ref<credential>()

const btnLoading = ref(false)

onMounted(()=>{
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    getAllPersonCategoryList()
    getAllPersonPositionList()
})

function findIndexCategory(){
    let cagegoryIndex = personCategory.value!.findIndex(obj => obj.pd_category_id === selectedPersonCategory.value);
    let categoryName = personCategory.value![cagegoryIndex].pd_category_name
    return categoryName
}

function findIndexPosition(){
    let positionIndex = personPosition.value!.findIndex(obj => obj.pd_position_id === selectedAddNewPersonPosition.value);
    let positionName = personPosition.value![positionIndex].pd_position_name
    return positionName
}

const errMessageAddPosition = ref<'no_action' | 'name_exist'>('no_action')
const personCategory = ref<Array<personCategory>>([])
const selectedPersonCategory = ref(1)
const personPosition = ref<Array<personPosition>>([])
const personDirectoryResponse = ref<Array<personDirectoryResponse>>()

function getAllPersonCategoryList(){
    dataCategoryStatus.value = 'loading_data'
    _api.getAllPersonCategoryList().then((res)=>{
        if(res.data.status_code === 200){
            if(res.data.position_category.length <= 0 ){
                dataCategoryStatus.value = 'no_data'
                personCategory.value = []
            }else{
                dataCategoryStatus.value = 'load_data_succ'
                personCategory.value = res.data.position_category
            }
        }else{
            dataCategoryStatus.value = 'err_data'
        }
    }).catch((err)=>{
        dataCategoryStatus.value = 'network_err'
    })
}



function getAllPersonPositionList(){
    dataPositionStatus.value = 'loading_data'
    _api.getAllPersonPositionList({category_id:selectedPersonCategory.value}).then((res) => {
        if(res.data.status_code === 200){
            if(res.data.person_position.length <= 0){
                dataPositionStatus.value = 'no_data'
                personPosition.value = []
            }else{
                dataPositionStatus.value = 'load_data_succ'
                personPosition.value = res.data.person_position
            }
        }else{
            dataPositionStatus.value = 'err_data'
        }
    }).catch(()=>{
        dataPositionStatus.value = 'network_err'
    })
}

const positionDrawer = ref(false)
const positionDialogAdd = ref(false)


const positionName = ref()
function addPosition(){  
    btnLoading.value = true      
    let cagegoryIndex = personCategory.value!.findIndex(obj => obj.pd_category_id === selectedPersonCategory.value);
    let categoryName = personCategory.value![cagegoryIndex].pd_category_name

    _api.addPosition({position_name:positionName.value , position_category_id:selectedPersonCategory.value,
    position_category_name:categoryName , credential_admin_fullname:credential.value!.user_fullname}).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
            errMessageAddPosition.value = 'no_action'
            positionName.value = ''
            getAllPersonPositionList();
        }else if(res.data.status_code === 409){
            errMessageAddPosition.value = 'name_exist'
        }else{
            errMessageAddPosition.value = 'no_action'
            _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:3})
        }
        btnLoading.value = false
    }).catch(()=>{
        errMessageAddPosition.value = 'no_action'
        _msg.toast_msg({title:'เครือข่ายมีปัญหา',icon:'error',progressbar:true,timer:3})
        btnLoading.value = false
    })
}

const renamePostionDialog = ref()
const positionObject = ref<personPosition>()
 
function renamePosition(){
    btnLoading.value = true
    _api.renamePosition({
        position_id : positionObject.value!.pd_position_id,
        position_name : positionName.value,
        position_old_name : positionObject.value!.pd_position_name,
        credential_admin_fullname :  credential.value!.user_fullname,
        position_category_id : positionObject.value!.pd_category_id
    }).then((res)=>{
        if(res.data.status_code === 200){
            errMessageAddPosition.value = 'no_action'
            _msg.toast_msg({title:res.data.msg,progressbar:true,timer:3,icon:'success'})
            getAllPersonPositionList();
        }else if(res.data.status_code === 200){
            errMessageAddPosition.value = 'name_exist'
         }else{
            errMessageAddPosition.value = 'no_action'
            _msg.toast_msg({title:res.data.msg,progressbar:true,timer:6,icon:'error'})
        }
        btnLoading.value = false
    }).catch(()=>{
        btnLoading.value = false
        _msg.toast_msg({title:'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้',progressbar:true,timer:20,icon:'error'})
    })
}

function deletePosition(){
    let categoryname = findIndexCategory()
    _msg.confirm(`คุณต้องการลบตำแหน่ง ${positionObject.value!.pd_position_name} ใช่ไหม`).then((isConfirmed)=>{
        if(isConfirmed){
            _api.deletePosition({
                position_id : positionObject.value!.pd_position_id,
                position_name : positionName.value,
                credential_admin_fullname : credential.value!.user_fullname,
                position_category_name : categoryname}
            ).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,progressbar:true,timer:3,icon:'success'})
                    getAllPersonPositionList();
                    positionName.value = ''
                    renamePostionDialog.value = false 
                }else{
                    _msg.toast_msg({title:res.data.msg,progressbar:true,timer:6,icon:'error'})

                }
            }).catch(()=>{
                _msg.toast_msg({title:'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้',progressbar:true,timer:20,icon:'error'})
            })
        }
    })
}

watch(selectedPersonCategory ,()=>{
    // reset selected position if no one postition in category or if have just set the first one 
    if(personPosition.value.length === 0){ // equa 0 it mean no position data 
        selectedAddNewPersonPosition.value = null
    }else if(personPosition.value.length >= 1){ // just set one 
        selectedAddNewPersonPosition.value = null
    }
    getAllPersonPositionList()
})

const addNewPersonDialog = ref()
const selectedAddNewPersonPosition = ref<any>(null)
const errMsgSelectPosition = ref<'no_position_select' | 'position_selected'>('no_position_select')

const personImageFile = ref()
const personName = ref()
const errMsgCheckPersonName = ref<'no_value' | 'value_exist'>('no_value')
const personPhone = ref()
const personEmail = ref()
const personDesc = ref()

function addPerson(){
    let formData = new FormData()
    console.log(personImageFile.value);
    console.log('before check iamge');
    
    if(personImageFile.value === undefined || personImageFile.value === null){
        formData.append('person_image','no_image_upload')  // รูปภาพ -1
    }else{
        formData.append('person_image',personImageFile.value[0])
    }
    console.log('after check iamge');
    
    formData.append('person_name',personName.value) // ชื่อบุคลากร -2
    formData.append('person_phone',personPhone.value) // เบอร์ -3
    formData.append('person_email',personEmail.value) // เมล -4
    formData.append('person_desc',personDesc.value) // เพิ่มเติม -5
    formData.append('credential_admin_fullname',credential.value!.user_fullname) // แอดมินผู้เพิ่ม -6
 
        
    formData.append('person_position_id',selectedAddNewPersonPosition.value) // ตำแหน่ง id -7
    formData.append('person_position_name',findIndexPosition())  // ชื่อตำแหน่ง -8
    formData.append('person_category_name',findIndexCategory())  // ชื่อหมวหมู่ -9
    _api.addPerson(formData).then((res)=>{
        console.log('res');
    })
}

watch(selectedAddNewPersonPosition ,()=>{    
    if(selectedAddNewPersonPosition.value === '' || selectedAddNewPersonPosition.value === null || selectedAddNewPersonPosition.value === undefined){
        errMsgSelectPosition.value = 'no_position_select'
    }else{
        errMsgSelectPosition.value = 'position_selected'
    }
})

watch(personName, ()=>{
    if(personName.value === '' || personName.value === null || personName.value === undefined){
        console.log('not ok');
        errMsgCheckPersonName.value = 'no_value'
    }else{
        console.log('ok');
        errMsgCheckPersonName.value = 'value_exist'
    }
})


</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col h-full ">
            <div class="w-full flex flex-wrap">
                <div class="w-full flex flex-wrap">
                    <div class="md:w-2/3 less:w-full p-1 flex less:flex-wrap sm:flex-row md:flex-row gap-2 less:justify-center md:justify-start items-center">
                        <v-btn class="h-full less:w-full sm:w-full md:w-auto"  @click="addNewPersonDialog = true"
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-account-plus" class=""></v-icon> เพิ่มบุคลากร  
                            </p>
                        </v-btn>
                        <v-btn 
                            @click="positionDrawer = !positionDrawer"
                            class="h-full less:w-full sm:w-full md:w-auto" 
                            color="pink-lighten-1" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-badge-account-outline" class=""></v-icon> ตำแหน่ง
                            </p>
                        </v-btn>
                        <v-btn 
                            
                            class="h-full less:w-full sm:w-full md:w-auto" 
                            color="pink-lighten-2" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-account-box-multiple-outline" class=""></v-icon> ทำเนียบ
                            </p>
                        </v-btn>
                    </div>
                    <div class="md:w-1/3 less:w-full p-1 flex flex-wrap justify-end">
                        <div class="less:w-full md:w-full p-1">
                            <v-text-field
                                label="ค้นหา"
                                class=""
                                hide-details
                                variant="outlined"
                                prepend-inner-icon="mdi-magnify"
                                bg-color=""
                                density="comfortable"
                                required
                            ></v-text-field>
                        </div>
                    </div>
                </div>
            </div>
 
            <v-divider class="border-opacity-75"></v-divider>

            <div clsas="w-full sm:hidden md:block ">
     
            </div>

            <v-divider class="border-opacity-75"></v-divider>
            
            <div class="w-full flex justify-end mt-3">
                <div class="w-[100px]">
                    <v-select
                        variant="outlined"
                        hide-details="auto"
                    ></v-select>
                </div>
                <div class="sm:w-fit">
                    <v-pagination 
                        :total-visible="3">
                    </v-pagination>
                </div>
            </div>
        </div>

        <v-navigation-drawer :disable-resize-watcher="true" :width="350" location="right" v-model="positionDrawer">
            <div class="w-full h-full flex flex-col px-2">
                <div class="w-full h-auto flex flex-row justify-start text-4xl text-gray-500" >
                    <v-icon 
                        class=" hover:text-gray-400 cursor-pointer duration-300" 
                        icon="mdi-chevron-right" 
                        @click="positionDrawer = false ">
                    </v-icon>
                </div>
                <div class="w-full px-2 flex flex-row gap-1">
                    <v-select
                        v-model="selectedPersonCategory"
                        label="ประเภท"
                        :items="personCategory"
                        item-title="pd_category_name"
                        item-value="pd_category_id"
                        hide-details
                        density="comfortable"
                        variant="outlined"
                    >
                    </v-select>
  
                    <v-btn @click="positionDialogAdd = true" color="green" icon="mdi-plus">
                        <v-tooltip location="top" activator="parent">
                            เพิ่มตำแหน่ง
                        </v-tooltip>
                        <v-icon icon="mdi-plus"></v-icon>
                    </v-btn>

                </div>
                <div class="w-full flex flex-col mt-2 gap-2 px-2 pb-2" v-if="dataPositionStatus === 'load_data_succ'">
                    <div v-for="item in personPosition" :key="item.pd_position_id"  
                    @click="positionObject = item , positionName = item.pd_position_name , renamePostionDialog = true"
                        class="w-full flex flex-row gap-1 border-2 border-pink-200 p-3 rounded-md
                        hover:bg-[#EC407A] hover:text-white cursor-pointer duration-100 hover:border-pink-50">
                        <div class="w-full flex items-center"  >
                            <p>{{ item.pd_position_name }}</p>
                        </div>
                        <v-tooltip activator="parent" location="bottom end" >
                            แก้ไข
                        </v-tooltip>
                    </div>
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="dataPositionStatus === 'no_data'">
                    <img src="/images/illustrations/No data.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="dataPositionStatus === 'err_data'">
                    <img src="/images/illustrations/500 Internal Server Error-cuate.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="dataPositionStatus === 'loading_data'">
                    <v-progress-circular indeterminate color="pink" :size="90" :width="12"></v-progress-circular>
                </div>
            </div>
        </v-navigation-drawer>
        
    </AdminNavigationBar>


    <!-- add position -->
    <v-dialog
        persistent
        v-model="positionDialogAdd"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มตำแหน่ง
                    <div @click="positionDialogAdd = false , errMessageAddPosition = 'no_action' , positionName = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                <div class="w-full pl-7 mb-1 mt-3" v-if="errMessageAddPosition === 'name_exist'">
                    <p class="text-red-500 text-[13px]"> มีชื่อตำแหน่งนี้แล้ว กรุณาป้อนชื่อที่ไม่ซ้ำกัน </p>
                </div>
                <div class="w-full px-6 pb-4">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="positionName"
                            label="ป้อนชื่อตำแหน่ง"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="green" size="xl" tex 
                            :disabled="!!!positionName"
                            :loading="btnLoading"
                            @click="addPosition()" 
                            class="้px-3 w-[100px]">
                                <p class="text-xl">เพิ่ม</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- rename position  -->
    <v-dialog
        persistent
        v-model="renamePostionDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    แก้ไข
                    <div @click="renamePostionDialog = false , positionName = ''"
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                <div class="w-full px-6 pb-4 mt-3">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="positionName"
                            label="ป้อนชื่อตำแหน่ง"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="primary" size="xl" tex 
                            :disabled="!!!positionName"
                            :loading="btnLoading"
                            @click="renamePosition()" 
                            class="้px-3 w-[80px]">
                                <p class="text-xl">แก้ไข</p>
                        </v-btn>
                        <v-btn color="red" size="xl" tex 
                            @click="deletePosition()"
                            class="้px-3 w-[80px]">
                                <p class="text-xl">ลบ</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- add person -->
    <v-dialog
        persistent
        v-model="addNewPersonDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มบุคลากร
                </div>

                <div class="w-full px-6 pb-4 mt-3">
                    <v-file-input
                        v-model="personImageFile"
                        accept="image/*"
                        label="ภาพประจำตัว"
                        show-size
                        name="person_image"
                        hide-details
                        variant="outlined"
                        prepend-icon=""
                    ></v-file-input>
                    <v-text-field
                        label="*ชื่อบุคลากร"
                        v-model="personName"
                        class="mt-3"
                        hide-details="auto"
                        :rules="[
                            ()=> !!personName || 'กรุณากรอกชื่อบุคลากร'
                        ]"
              
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="personPhone"
                        label="เบอร์โทร"
                        class="mt-3"
                        hide-details
                        variant="outlined"
                        maxlength="10"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="personEmail"
                        label="อีเมล"
                        class="mt-3"
                        hide-details
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-select
                        v-model="selectedPersonCategory"
                        label="หมวดหมู่บุคลากร"
                        :items="personCategory"
                        class="mt-3"
                        item-title="pd_category_name"
                        item-value="pd_category_id"
                        hide-details
                        density="comfortable"
                        variant="outlined"
                    >
                    </v-select>
                    <div class="w-full flex flex-row justif-center items-start gap-2 mt-3"> 
                        <v-autocomplete
                            v-model="selectedAddNewPersonPosition"
                            :items="personPosition"
                            label="*ตำแหน่ง"
                            class=" w-full"
                            item-title="pd_position_name"
                            :rules="[
                                ()=> errMsgSelectPosition === 'position_selected' || 'กรุณาเลือกตำแหน่งก่อน'
                            ]"
                            item-value="pd_position_id"
                            hide-details="auto"
                            density="comfortable"
                            variant="outlined"
                        ></v-autocomplete>
                        <v-btn @click="positionDialogAdd = true"
                         class="mb-1" color="" size="large">  
                            เพิ่มตำแหน่ง
                        </v-btn>
                    </div>
                    <v-textarea 
                        v-model="personDesc"
                        label="เพิ่มเติม"
                        class="mt-3"
                        hide-details
                        variant="outlined"
                        bg-color=""
                    ></v-textarea >
                </div>
                <div class="flex w-full flex-row justify-center items-center gap-2">
                    <v-btn class="w-[100px]" color="red"
                    @click="addNewPersonDialog = false" >
                        ยกเลิก
                    </v-btn>
                    <v-btn class="w-[100px]" color="green" @click="addPerson()"
                    :disabled="errMsgSelectPosition === 'no_position_select' || !!!personName">
                        เพิ่มบุคลากร
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
    

</template>