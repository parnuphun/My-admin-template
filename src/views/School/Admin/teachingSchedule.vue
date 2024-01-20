<script lang="ts" setup>
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import pageDataStatus from '../../../components/layout/School/pageDataStatus.vue';
import {ref , watch , onMounted , reactive} from 'vue'; 
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { teachingSResponse , dataStatus , credential , classListResponse} from '../../../store/Interface'

const _api = new apiNamphong()
const _msg = new MsgAlert()

const btnLoading = ref(false)
const addNewTeachingSDialog = ref(false)
const updateTeachSDialog = ref(false)

const baseImgPath = ref()
const semesterList = [{
    title:'1',
    value:'1'
},{
    title:'2',
    value:'2'
}]
const credential = ref<credential>()

onMounted(()=>{
    document.title = 'ตารางสอน'
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    getClass()
    getAll()
})

// get list and length 
function getAll(){
    if(searchValue.searchText === ''){
        // no value in seachValue the get common data
        getTeachingSLength();
        getTeachingS();
    }else{
        // triger seachValue for seaching next after change category id       
        searchValue.searchTriger = !searchValue.searchTriger
    }
}

const totalList = ref()
function getTeachingSLength(){
    _api.getTeachingSLength().then((res)=>{
        if(res.data.status_code === 200){
            totalList.value = res.data.data_length            
            totalPage.value = Math.ceil(totalList.value / sizeSelected.value)        
        }
    })
}

const classList = ref<Array<classListResponse>>()
function getClass(){
    _api.getClass().then((res)=>{
        if(res.data.status_code === 200){
            classList.value = res.data.class_data
            tsClassSelected.value = classList.value![0].class_id
        }
    })
}

const teachList = ref<Array<teachingSResponse>>()
const teachListStatus = ref<dataStatus>('no_data')
function getTeachingS(){
    teachListStatus.value = 'loading_data'
    _api.getTeachingS({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.status_code === 200 ){
            teachList.value = res.data.data_list
            baseImgPath.value = res.data.base_image_path
            if(teachList.value!.length >= 1){
                teachListStatus.value = 'load_data_succ'
            }else if(teachList.value!.length === 0){
                teachListStatus.value = 'no_data'
            }else{
                teachListStatus.value = 'err_data'
            }
            console.log(teachList.value);
            
        }else{
            teachListStatus.value = 'err_data'
        }
    }).catch((err)=>{
        teachListStatus.value = 'network_err'
    })
}

function clearData(){
    tsImg.value = null
    tsName.value = ''
    tsSemester.value = '1'
    tsTeacher.value = ''
}

const tsImg = ref<any>()
const tsName = ref()
const tsSemester = ref('1')
const tsTeacher = ref()
const tsClassSelected = ref()
function addTeachingS(){
    const formData = new FormData()
    formData.append('teaching_schedule_image',tsImg.value[0]!)
    formData.append('credential_admin_fullname',credential.value!.user_fullname)
    formData.append('ts_name',tsName.value)
    formData.append('ts_teacher',tsTeacher.value)
    formData.append('ts_semester',tsSemester.value)
    formData.append('class_id',tsClassSelected.value)
    btnLoading.value = true
    _api.addTeachingS(formData).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
            clearData()
            getTeachingS()
        }else{
            _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
        }
        btnLoading.value = false
    }).catch((err)=>{
        btnLoading.value = false
        _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
    })
}

const tsDetail = ref<teachingSResponse>()
function setDataBfUpdate(item:teachingSResponse){
    tsDetail.value = item
    tsName.value = item.ts_name
    tsTeacher.value = item.ts_teacher
    tsSemester.value = item.ts_semester
    tsClassSelected.value = item.class_id
    updateTeachSDialog.value = true
}

function updateTeachS(){
    _msg.confirm('ต้องการบันทึกข้อมูลใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            const formData = new FormData()
            if(tsImg.value === undefined || tsImg.value === null){
                formData.append('teaching_schedule_image','no_image_upload')
            }else{
                formData.append('teaching_schedule_image',tsImg.value[0]!)
            }
            formData.append('credential_admin_fullname',credential.value!.user_fullname)
            formData.append('ts_id',String(tsDetail.value!.ts_id))
            formData.append('ts_name',tsName.value)
            formData.append('ts_old_name',tsDetail.value!.ts_name)
            formData.append('ts_old_image',tsDetail.value!.ts_img)
            formData.append('ts_teacher',tsTeacher.value)
            formData.append('ts_semester',tsSemester.value)
            formData.append('class_id',tsClassSelected.value)
            _api.updateTeachS(formData).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
                    getAll()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
            })
        }
    })
}

function deleteTeachS(item:teachingSResponse){
    _msg.confirm(`ต้องการลบตารางสอน ${item.ts_name} ใช่ไหม` ).then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteTeachignS({ts_id:item.ts_id,ts_name:item.ts_name,ts_image:item.ts_img,credential_admin_fullname:credential.value!.user_fullname})
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
                    getAll()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
            })
        }
    })
}



function lightBox(img:string){
    _msg.lightBox(img,'70%')
}

// pagination 
const totalPage = ref()  
const size = ref([25,50,100]) // 
const sizeSelected = ref(size.value[0]) // "LIMIT"
const currentPage = ref(1) // current page
const startItem = ref<number>(0) // first item "OFFSET"
const pagination = ref(1) // v-model v-pagination 

function changePage(){
    currentPage.value = pagination.value
    startItem.value = (currentPage.value -1) * sizeSelected.value 
}

// detect pagination 
watch(pagination,()=>{         
    changePage()
    getAll()
})

// detect sizeSelected
watch(sizeSelected,()=>{
    pagination.value = 1 // reset
    changePage()
    getAll()
})

// search 
const searchValue = reactive({
    searchText:'',
    searchTriger:false // triger 
})


</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col h-full">
            <div class="w-full flex flex-wrap">
                <!-- <div class="w-full p-1 flex flex-wrap justify-end">
                    <div class="w-full p-1">
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
                </div> -->
                <div class="less:w-full p-1 flex less:flex-wrap sm:flex-row md:flex-row gap-2 less:justify-center md:justify-start items-center">
                    <v-btn 
                        @click="addNewTeachingSDialog = true"
                        class="h-full less:w-full sm:w-full md:w-auto" 
                        color="pink" size="large" >
                        <p class="text-md" >
                            <v-icon icon="mdi-table-plus" class=""></v-icon> เพิ่มตารางสอน  
                        </p>
                    </v-btn>
                </div>
            </div>
            <div class=" px-4">
                <p class="text-lg"> จำนวนรายการ : {{ totalList }}</p>
            </div>
            <v-divider class="border-opacity-75"></v-divider>
            <div clsas="w-full " v-if="teachListStatus === 'load_data_succ'">
                <div class="w-full pr-2">
                    <div class="h-full flex less:flex-col sm:flex-row justify-center items-start group border-2 shadow-md
                    hover:shadow-xl hover:shadow-pink-100 mt-4 rounded-md border-gray-400 hover:border-pink-500" 
                    v-for="(item, i) in teachList" :key="item.ts_id">
                        <div class="less:w-full min-w-[300px] sm:w-[300px] sm:h-[200px] less:h-[350px] rounded-md">
                            <img  
                            class="less:w-full min-w-[300px] sm:w-[300px] sm:h-[200px] less:h-[350px] less:object-fit sm:object-cover
                           rounded-md cursor-pointer" @click="lightBox(baseImgPath+item.ts_img)"
                            :src="baseImgPath+item.ts_img" alt="">
                        </div>
                        <div class="w-full h-[200px] flex flex-col text-lg pl-6 pr-3 py-2 group-hover:text-pink-500 duration-50 ">
                            <div class="w-full h-full ">
                                <p class="line-clamp-3">
                                    <b>ชื่อ :</b> {{ item.ts_name }}
                                </p>
                                <p>
                                    <b>ชั้นปี :</b>  {{ item.class_name }} 
                                </p>
                                <p>
                                    <b>ภาพการศึกษา :</b> {{ item.ts_semester }}
                                </p>
                                <p>
                                    <b>ผู้สอน :</b> {{ item.ts_teacher }}
                                </p>
                            </div>
                            <div class="w-full h-full flex flex-row gap-2 justify-end items-end mt-2  ">
                                <v-btn
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="primary"
                                    @click="setDataBfUpdate(item)"
                                >   
                                    แก้ไข
                                </v-btn>
                                <v-btn 
                                    @click="deleteTeachS(item)"
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="red">ลบ
                                </v-btn>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pageDataStatus v-else :data-status="teachListStatus"></pageDataStatus>
            <div class="w-full flex justify-end mt-3 pr-12">
                <div class="w-[100px]">
                    <v-select
                        :items="size"
                        variant="outlined"
                        v-model="sizeSelected"
                        hide-details="auto"
                    ></v-select>
                </div>
                <div class="sm:w-fit">
                    <v-pagination 
                        :length="totalPage"
                        v-model="pagination"
                        :total-visible="3"
                        >
                    </v-pagination>
                </div>
            </div>
        </div>
    </AdminNavigationBar>


    <!-- add dialog  -->
    <v-dialog
        persistent
        v-model="addNewTeachingSDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                    เพิ่มตารางสอน
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full">
                            <v-file-input
                                accept="image/*"
                                v-model="tsImg"
                                placeholder="ภาพตารางสอน"
                                label="ภาพตารางสอน"
                                class=""
                                name="teaching_schedule_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ชื่อตารางสอน"
                                v-model="tsName"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ชื่อผู้สอน"
                                v-model="tsTeacher"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <v-select
                            label="ชั้นปี"
                            :items="classList"
                            v-model="tsClassSelected"
                            item-title="class_name"
                            item-value="class_id"
                            hide-details
                            variant="outlined"
                            class="mt-3"
                        ></v-select>
           
                        <div class="w-full">
                            <v-select
                                label="ภาคเรียน"
                                :items="semesterList"
                                v-model="tsSemester"
                                item-title="title"
                                item-value="value"
                                hide-details
                                variant="outlined"
                                class="mt-3"
                            ></v-select>
                        </div>
                    </div>
                <div class="w-full flex mt-4 justify-end  gap-4">
                <v-btn color="red" @click="addNewTeachingSDialog = false , clearData()">
                    ยกเลิก
                </v-btn>
                <v-btn color="green" 
                    :loading="btnLoading"
                    :disabled="
                    !!!tsName || !!!tsTeacher || !!!tsSemester || !!!tsImg
                    "
                    @click="addTeachingS()"
                >
                    เพิ่ม
                </v-btn>
            </div>
            </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- update dialog  -->
    <v-dialog
        persistent
        v-model="updateTeachSDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                    แก้ไขตารางสอน
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full">
                            <v-file-input
                                accept="image/*"
                                v-model="tsImg"
                                placeholder="ภาพตารางสอน"
                                label="ภาพตารางสอน"
                                class=""
                                name="teaching_schedule_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ชื่อตารางสอน"
                                v-model="tsName"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ชื่อผู้สอน"
                                v-model="tsTeacher"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <v-select
                            label="ชั้นปี"
                            :items="classList"
                            v-model="tsClassSelected"
                            item-title="class_name"
                            item-value="class_id"
                            hide-details
                            variant="outlined"
                            class="mt-3"
                        ></v-select>
           
                        <div class="w-full">
                            <v-select
                                label="ภาคเรียน"
                                :items="semesterList"
                                v-model="tsSemester"
                                item-title="title"
                                item-value="value"
                                hide-details
                                variant="outlined"
                                class="mt-3"
                            ></v-select>
                        </div>
                    </div>
                <div class="w-full flex mt-4 justify-end  gap-4">
                <v-btn color="red" @click="updateTeachSDialog = false , clearData()">
                    ยกเลิก
                </v-btn>
                <v-btn color="green" 
                    :loading="btnLoading"
                    :disabled="
                    !!!tsName || !!!tsTeacher || !!!tsSemester  
                    "
                    @click="updateTeachS()"
                >
                    บันทึก
                </v-btn>
            </div>
            </div>
            </div>
        </v-card>
    </v-dialog>

</template>