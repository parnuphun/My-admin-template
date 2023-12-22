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


onMounted(()=>{
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')

    getAllPersonCategoryList()
    getAllPersonPositionList()
})

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

watch(selectedPersonCategory ,()=>[
    getAllPersonPositionList()

])

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
        let cagegoryIndex = personCategory.value!.findIndex(obj => obj.pd_category_id === selectedPersonCategory.value);
        let categoryName = personCategory.value![cagegoryIndex].pd_category_name

    _api.addPosition({position_name:positionName.value , position_category_id:selectedPersonCategory.value,
    position_category_name:categoryName , credential_admin_fullname:credential.value!.user_fullname}).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})

            // add in arr obj
            // personCategory.value.push({
            //     pd_category_id: res.data.new_position_id,
            //     pd_category_name: positionName.value
            // })
            positionName.value = ''
            getAllPersonPositionList();
        }else if(res.data.status_code === 409){
            _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:3})
        }
        else{
            _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:3})
        }
    }).catch(()=>{
        _msg.toast_msg({title:'เครือข่ายมีปัญหา',icon:'error',progressbar:true,timer:3})
    })
}

</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col h-full ">
            <div class="w-full flex flex-wrap">
                <div class="w-full flex flex-wrap">
                    <div class="md:w-1/2 less:w-full p-1 flex flex-row gap-2 less:justify-between md:justify-start items-center">
                        <v-btn class="h-full less:w-1/2 sm:w-auto" 
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-account-plus" class=""></v-icon> เพิ่มบุคลากร  
                            </p>
                        </v-btn>
                        <v-btn 
                            @click="positionDrawer = true"
                            class="h-full less:w-1/2 sm:w-auto" 
                            color="pink-lighten-1" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-badge-account-outline" class=""></v-icon> ตำแหน่ง
                            </p>
                        </v-btn>
                        <v-btn 
                            @click="positionDrawer = true"
                            class="h-full less:w-1/2 sm:w-auto" 
                            color="pink-lighten-2" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-account-box-multiple-outline" class=""></v-icon> ทำเนียบ
                            </p>
                        </v-btn>
                    </div>
                    <div class="md:w-1/2 less:w-full p-1 flex flex-wrap justify-end">
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
                    <v-selection>
                        <v-select
                            variant="outlined"
                            hide-details="auto"
                        ></v-select>
                    </v-selection>
                </div>
                <div class="sm:w-fit">
                    <v-pagination 
                        :total-visible="3">
                    </v-pagination>
                </div>
            </div>
        </div>

        <v-navigation-drawer :disable-resize-watcher="true" :width="370" location="right" v-model="positionDrawer">
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
                        class=""
                        item-title="pd_category_name"
                        item-value="pd_category_id"
                        hide-details
                        density="comfortable"
                        variant="outlined"
                    >
                    </v-select>
                        <v-btn @click="positionDialogAdd = true"
                        color="green" icon="mdi-plus">
                    </v-btn>
                </div>
                <div class="w-full flex flex-col mt-2 gap-2 px-2 pb-2" v-if="dataPositionStatus === 'load_data_succ'">
                    <div v-for="item in personPosition" :key="item.pd_position_id"
                    class="w-full flex flex-row gap-1 border-2 border-pink-200 p-3 rounded-md
                    hover:bg-[#EC407A] hover:text-white cursor-pointer duration-100 hover:border-pink-50">
                        <div class="w-full flex items-center">
                            <p>{{ item.pd_position_name }}</p>
                        </div>
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
                    <div @click="positionDialogAdd = false"
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
                        <v-btn color="green" size="xl" tex 
                            :disabled="!!!positionName"
                            @click="addPosition()" 
                            class="้px-3 w-[100px]">
                                <p class="text-xl">เพิ่ม</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    

</template>