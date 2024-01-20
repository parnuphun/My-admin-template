<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import pageDataStatus from '../../../components/layout/School/pageDataStatus.vue';
import {ref , watch , onMounted , reactive} from 'vue'; 
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { StudentSResponse , dataStatus , credential , classListResponse} from '../../../store/Interface'

const _api = new apiNamphong()
const _msg = new MsgAlert()

const btnLoading = ref(false)
const addNewStudentSDialog = ref(false)
const updateStudentSDialog = ref(false)

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
    document.title = 'ตารางเรียน'
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')

    getClass()
    getAll()
})

function getAll(){
    getStudentSLength();
    getStudentS();
}

const totalList = ref()
function getStudentSLength(){
    _api.getStudentSLength().then((res)=>{
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
            ssClassSelected.value = classList.value![0].class_id
        }
    })
}
const studentSList = ref<Array<StudentSResponse>>()
const studentSListStatus = ref<dataStatus>('no_data')
function getStudentS(){
    studentSListStatus.value = 'loading_data'
    _api.getStudentS({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.status_code === 200 ){
            studentSList.value = res.data.data_list
            baseImgPath.value = res.data.base_image_path
            if(studentSList.value!.length >= 1){
                studentSListStatus.value = 'load_data_succ'
            }else if(studentSList.value!.length === 0){
                studentSListStatus.value = 'no_data'
            }else{
                studentSListStatus.value = 'err_data'
            }            
        }else{
            studentSListStatus.value = 'err_data'
        }
    }).catch((err)=>{
        studentSListStatus.value = 'network_err'
    })
}

function clearData(){
    ssImg.value = null
    ssName.value = ''
    ssSemester.value = '1'
    ssTeacher.value = ''
}

const ssImg = ref<any>()
const ssName = ref()
const ssSemester = ref('1')
const ssTeacher = ref()
const ssClassSelected = ref()
function addStudentS(){
    const formData = new FormData()
    formData.append('student_schedule_image',ssImg.value[0]!)
    formData.append('credential_admin_fullname',credential.value!.user_fullname)
    formData.append('ss_name',ssName.value)
    formData.append('ss_teacher',ssTeacher.value)
    formData.append('ss_semester',ssSemester.value)
    formData.append('class_id',ssClassSelected.value)
    btnLoading.value = true
    _api.addStudentS(formData).then((res)=>{
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

const ssDetail = ref<StudentSResponse>()
function setDataBfUpdate(item:StudentSResponse){
    ssDetail.value = item
    ssName.value = item.ss_name
    ssTeacher.value = item.ss_teacher
    ssSemester.value = item.ss_semester
    ssClassSelected.value = item.class_id
    updateStudentSDialog.value = true
}

function updateStudentS(){
    _msg.confirm('ต้องการบันทึกข้อมูลใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            const formData = new FormData()
            if(ssImg.value === undefined || ssImg.value === null){
                formData.append('student_schedule_image','no_image_upload')
            }else{
                formData.append('student_schedule_image',ssImg.value[0]!)
            }
            formData.append('credential_admin_fullname',credential.value!.user_fullname)
            formData.append('ss_id',String(ssDetail.value!.ss_id))
            formData.append('ss_name',ssName.value)
            formData.append('ss_old_name',ssDetail.value!.ss_name)
            formData.append('ss_old_image',ssDetail.value!.ss_img)
            formData.append('ss_teacher',ssTeacher.value)
            formData.append('ss_semester',ssSemester.value)
            formData.append('class_id',ssClassSelected.value)
            _api.updateStudentS(formData).then((res)=>{
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

function deleteStudentS(item:StudentSResponse){
    _msg.confirm(`ต้องการลบตารางสอน ${item.ss_name} ใช่ไหม` ).then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteStudentS({ss_id:item.ss_id,ss_name:item.ss_name,ss_image:item.ss_img,credential_admin_fullname:credential.value!.user_fullname})
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
                        @click="addNewStudentSDialog = true"
                        class="h-full less:w-full sm:w-full md:w-auto" 
                        color="pink" size="large" >
                        <p class="text-md" >
                            <v-icon icon="mdi-table-plus" class=""></v-icon> เพิ่มตารางเรียน 
                        </p>
                    </v-btn>
                </div>
            </div>
            <div class=" px-4">
                <p class="text-lg"> จำนวนรายการ : {{ totalList }}</p>
            </div>
            <v-divider class="border-opacity-75"></v-divider>
            <div clsas="w-full " v-if="studentSListStatus === 'load_data_succ'">
                <div class="w-full pr-2">
                    <div class="h-full flex less:flex-col sm:flex-row justify-center items-start group border-2 shadow-md
                    hover:shadow-xl hover:shadow-pink-100 mt-4 rounded-md border-gray-400 hover:border-pink-500" 
                    v-for="(item, i) in studentSList" :key="item.ss_id">
                        <div class="less:w-full min-w-[300px] sm:w-[300px] sm:h-[200px] less:h-[350px] rounded-md">
                            <img  
                            class="less:w-full min-w-[300px] sm:w-[300px] sm:h-[200px] less:h-[350px] less:object-fit sm:object-cover
                           rounded-md cursor-pointer"  
                            :src="baseImgPath+item.ss_img" alt="">
                        </div>
                        <div class="w-full h-[200px] flex flex-col text-lg pl-6 pr-3 py-2 group-hover:text-pink-500 duration-50 ">
                            <div class="w-full h-full ">
                                <p class="line-clamp-3">
                                    <b>ชื่อ :</b> {{ item.ss_name }}
                                </p>
                                <p>
                                    <b>ชั้นปี :</b>  {{ item.class_name }} 
                                </p>
                                <p>
                                    <b>ภาคการศึกษา :</b> {{ item.ss_semester }}
                                </p>
                                <p>
                                    <b>ครูประจำชั้น :</b> {{ item.ss_teacher }}
                                </p>
                            </div>
                            <div class="w-full h-full flex flex-row gap-2 justify-end items-end mt-2  ">
                                <v-btn
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="blue"
                                    @click="openImage(baseImgPath+item.ss_img)"
                                >   
                                    ดูตารางเรียน
                                </v-btn>
                                <v-btn
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="primary"
                                    @click="setDataBfUpdate(item)"
                                >   
                                    แก้ไข
                                </v-btn>
                                <v-btn 
                                    @click="deleteStudentS(item)"
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="red">ลบ
                                </v-btn>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pageDataStatus v-else :data-status="studentSListStatus"></pageDataStatus>
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
        v-model="addNewStudentSDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                    เพิ่มตารางเรียน
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full">
                            <v-file-input
                                accept="image/*"
                                v-model="ssImg"
                                placeholder="ภาพตารางสอน"
                                label="ภาพตารางสอน"
                                class=""
                                name="student_schedule_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ชื่อตารางสอน"
                                v-model="ssName"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ครูประจำชั้น"
                                v-model="ssTeacher"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <v-select
                            label="ชั้นปี"
                            :items="classList"
                            v-model="ssClassSelected"
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
                                v-model="ssSemester"
                                item-title="title"
                                item-value="value"
                                hide-details
                                variant="outlined"
                                class="mt-3"
                            ></v-select>
                        </div>
                    </div>
                <div class="w-full flex mt-4 justify-end  gap-4">
                <v-btn color="red" @click="addNewStudentSDialog = false , clearData()">
                    ยกเลิก
                </v-btn>
                <v-btn color="green" 
                    :loading="btnLoading"
                    :disabled="
                    !!!ssName || !!!ssTeacher || !!!ssSemester || !!!ssImg
                    "
                    @click="addStudentS()"
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
        v-model="updateStudentSDialog"
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
                                v-model="ssImg"
                                placeholder="ภาพตารางสอน"
                                label="ภาพตารางสอน"
                                class=""
                                name="student_schedule_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ชื่อตารางสอน"
                                v-model="ssName"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="ครูประจำชั้น"
                                v-model="ssTeacher"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>
                        <v-select
                            label="ชั้นปี"
                            :items="classList"
                            v-model="ssClassSelected"
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
                                v-model="ssSemester"
                                item-title="title"
                                item-value="value"
                                hide-details
                                variant="outlined"
                                class="mt-3"
                            ></v-select>
                        </div>
                    </div>
                <div class="w-full flex mt-4 justify-end  gap-4">
                <v-btn color="red" @click="updateStudentSDialog = false , clearData()">
                    ยกเลิก
                </v-btn>
                <v-btn color="green" 
                    :loading="btnLoading"
                    :disabled="
                    !!!ssName || !!!ssTeacher || !!!ssSemester  
                    "
                    @click="updateStudentS()"
                >
                    บันทึก
                </v-btn>
            </div>
            </div>
            </div>
        </v-card>
    </v-dialog>
</template>