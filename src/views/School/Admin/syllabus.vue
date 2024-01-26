<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import pageDataStatus from '../../../components/layout/School/pageDataStatus.vue';
import {ref , watch , onMounted , reactive} from 'vue'; 
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { dataStatus , credential , classListResponse , syllabusResponse} from '../../../store/Interface'

const _api = new apiNamphong()
const _msg = new MsgAlert()

const credential = ref<credential>()

const btnLoading = ref(false)
const addNewSyllabusDialog = ref(false)
const updateSyllabusDialog = ref(false)
const baseImgPath = ref()
onMounted(()=>{
    document.title = 'หลักสูตร'
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')

    getClass()
    getAll()
})

function getAll(){
    getSyllabusLength()
    getSyllabusList()
}

const classSelected = ref()
const classList = ref<Array<classListResponse>>()
function getClass(){
    _api.getClass().then((res)=>{
        if(res.data.status_code === 200){
            classList.value = res.data.class_data
            classSelected.value = classList.value![0].class_id
        }
    })
}

const totalList = ref()
function getSyllabusLength(){
    _api.getSyllabusLength().then((res)=>{
        if(res.data.status_code === 200){
            totalList.value = res.data.data_length
            totalPage.value = Math.ceil(totalList.value / sizeSelected.value)        
        }
    })
}

const syllabusList = ref<Array<syllabusResponse>>()
const syllabusStatus = ref<dataStatus>('no_data')
function getSyllabusList(){
    syllabusStatus.value = 'loading_data'
    _api.getSyllabusList({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.status_code === 200 ){
            syllabusList.value = res.data.data_list
            baseImgPath.value = res.data.base_image_path
            if(syllabusList.value!.length >= 1){
                syllabusStatus.value = 'load_data_succ'
            }else if(syllabusList.value!.length === 0){
                syllabusStatus.value = 'no_data'
            }else{
                syllabusStatus.value = 'err_data'
            }            
        }else{
            syllabusStatus.value = 'err_data'
        }
    }).catch((err)=>{
        syllabusStatus.value = 'network_err'
    })
}

const syllabusName = ref()
const syllabusImage = ref<any>()
function addSyllabus(){
    const formData = new FormData()
    formData.append('syllabus_image',syllabusImage.value[0])
    formData.append('credential_admin_fullname',credential.value!.user_fullname)
    formData.append('class_id',classSelected.value)
    formData.append('syllabus_name',syllabusName.value)

    btnLoading.value = true
    _api.addSyllabus(formData).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:1.5})
            clearData()
            getAll()
        }else{
            _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
        }
        btnLoading.value = false
    }).catch((err)=>{
        btnLoading.value = false
        _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
    })
}

const syllabusDetail = ref<syllabusResponse>()
function setDataBfUpdate(item:syllabusResponse){
    syllabusDetail.value = item
    syllabusName.value = item.syllabus_name
    classSelected.value = item.class_id
    updateSyllabusDialog.value = true
}

function updateSyllabus(){
    _msg.confirm('คุณต้องการจะบันทึกข้อมูลใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            const formData = new FormData()
            if(syllabusImage.value === undefined || syllabusImage.value === null){
                formData.append('syllabus_image','no_image_upload')
            }else{
                formData.append('syllabus_image',syllabusImage.value[0]) // 1
            }
            
            formData.append('credential_admin_fullname',credential.value!.user_fullname) // 2
            formData.append('class_id',classSelected.value) // 3 
            formData.append('syllabus_name',syllabusName.value) // 4 
            formData.append('syllabus_old_name',syllabusDetail.value!.syllabus_name) // 5
            formData.append('syllabus_old_image',syllabusDetail.value!.syllabus_image) // 6
            formData.append('syllabus_id',String(syllabusDetail.value!.syllabus_id)) // 7
            btnLoading.value = true
            _api.updateSyllabus(formData).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
                    getAll()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
                btnLoading.value = false
            }).catch((err)=>{
                btnLoading.value = false
                _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',icon:'error',progressbar:true,timer:20})
            })
        }
    })


}

function deleteSyllabus(item:syllabusResponse){
    _msg.confirm('คุณต้องการลบหลักสูตรใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteSyllabus({
                credential_admin_fullname:credential.value!.user_fullname,
                syllabus_id:item.syllabus_id,
                syllabus_image:item.syllabus_image,
                syllabus_name:item.syllabus_name
            })
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
                    getAll()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            }).catch((err)=>{
                btnLoading.value = false
                _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',icon:'error',progressbar:true,timer:20})
            })
        }
    })
}

function clearData(){
    syllabusImage.value = null 
    syllabusName.value = ''
}


function openImage(img:string){
    window.open(img,'_blank')
}

function lightBox(img:string){
    _msg.lightBox(img)
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
                        @click="addNewSyllabusDialog = true"
                        class="h-full less:w-full sm:w-full md:w-auto" 
                        color="pink" size="large" >
                        <p class="text-md" >
                            <v-icon icon="mdi-table-plus" class=""></v-icon> เพิ่มหลักสูตร 
                        </p>
                    </v-btn>
                </div>
            </div>
            <div class=" px-4">
                <p class="text-lg"> จำนวนรายการ : {{ totalList }}</p>
            </div>
            <v-divider class="border-opacity-75"></v-divider>
            <div clsas="w-full " v-if="syllabusStatus === 'load_data_succ'">
                <div class="w-full pr-2">
                    <div class="h-full flex less:flex-col sm:flex-row justify-center items-start group border-2 shadow-md
                    hover:shadow-xl hover:shadow-pink-200 mt-4 rounded-md border-gray-400 hover:border-pink-500 duration-200" 
                    v-for="(item, i) in syllabusList" :key="item.syllabus_id">
                        <div class="less:w-full min-w-[300px] sm:w-[300px] sm:h-[200px] less:h-[350px] rounded-md">
                            <img  
                            class="less:w-full min-w-[300px] sm:w-[300px] sm:h-[200px] less:h-[350px] less:object-fit sm:object-cover
                           rounded-md cursor-pointer"  
                            :src="baseImgPath+item.syllabus_image" alt="">
                        </div>
                        <div class="w-full h-[200px] flex flex-col text-lg pl-6 pr-3 py-2 group-hover:text-pink-500 duration-50 ">
                            <div class="w-full h-full ">
                                <p class="line-clamp-3">
                                    <b>ชื่อหลักสูตร :</b> {{ item.syllabus_name }}
                                </p>
                                <p class="line-clamp-3">
                                    <b>ชั้นปี :</b> {{ item.class_name }}
                                </p>
                            </div>
                            <div class="w-full h-full flex flex-row gap-2 justify-end items-end mt-2  ">
                                <v-btn
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="blue"
                                    @click="openImage(baseImgPath+item.syllabus_image)"
                                >   
                                    ดูหลักสูตร
                                </v-btn>
                                <v-btn
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="primary"
                                    @click="setDataBfUpdate(item)"
                                >   
                                    แก้ไข
                                </v-btn>
                                <v-btn 
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="red"
                                    @click="deleteSyllabus(item)"
                                    >ลบ
                                </v-btn>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pageDataStatus v-else :data-status="syllabusStatus"></pageDataStatus>
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
        v-model="addNewSyllabusDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                    เพิ่มหลักสูตร
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full">
                            <v-file-input
                                accept="image/*"
                                v-model="syllabusImage"
                                placeholder="*ภาพหลักสูตร"
                                label="ภาพหลักสูตร"
                                class=""
                                name="syllabus_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ชื่อหลักสูตร"
                                v-model="syllabusName"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <v-select
                            label="ชั้นปี"
                            :items="classList"
                            v-model="classSelected"
                            item-title="class_name"
                            item-value="class_id"
                            hide-details
                            variant="outlined"
                            class="mt-3"
                        ></v-select>
                    </div>
                <div class="w-full flex mt-4 justify-end  gap-4">
                <v-btn color="red" @click="addNewSyllabusDialog = false , clearData()">
                    ยกเลิก
                </v-btn>
                <v-btn color="green" 
                    :loading="btnLoading"
                    :disabled="
                    !!!syllabusName || !!!syllabusImage
                    "
                    @click="addSyllabus()"
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
        v-model="updateSyllabusDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                    แก้ไขหลักสูตร
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full">
                            <v-file-input
                                accept="image/*"
                                v-model="syllabusImage"
                                placeholder="*ภาพหลักสูตร"
                                label="ภาพหลักสูตร"
                                class=""
                                name="syllabus_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ชื่อหลักสูตร"
                                v-model="syllabusName"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <v-select
                            label="ชั้นปี"
                            :items="classList"
                            v-model="classSelected"
                            item-title="class_name"
                            item-value="class_id"
                            hide-details
                            variant="outlined"
                            class="mt-3"
                        ></v-select>
                    </div>
                <div class="w-full flex mt-4 justify-end  gap-4">
                <v-btn color="red" @click="updateSyllabusDialog = false , clearData()">
                    ยกเลิก
                </v-btn>
                <v-btn color="green" 
                    :loading="btnLoading"
                    :disabled="
                    !!!syllabusName  
                    "
                    @click="updateSyllabus()"
                >
                    บันทึก
                </v-btn>
            </div>
            </div>
            </div>
        </v-card>
    </v-dialog>
</template>