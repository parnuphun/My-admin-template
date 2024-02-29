<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import pageDataStatus from '../../../components/layout/School/pageDataStatus.vue';
import {ref , watch , onMounted , reactive} from 'vue'; 
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { StudentSResponse , dataStatus , credential , classListResponse , yearsListResponse ,teacherListResponse} from '../../../store/Interface'

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
    getTeacherList()
    getYearList()
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
    formData.append('ss_teacher',teacherSelected.value)
    formData.append('ss_year',yearSelected.value)
    formData.append('ss_semester',ssSemester.value)
    formData.append('class_id',ssClassSelected.value)
    btnLoading.value = true
    _api.addStudentS(formData).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
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
    teacherSelected.value = item.ss_teacher
    yearSelected.value = item.ss_year
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
            formData.append('ss_teacher',teacherSelected.value)
            formData.append('ss_year',yearSelected.value)
            formData.append('ss_semester',ssSemester.value)
            formData.append('class_id',ssClassSelected.value)
            _api.updateStudentS(formData).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
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
    _msg.confirm(`คุณต้องการจะลบตารางสอนใช่ไหม` ).then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteStudentS({ss_id:item.ss_id,ss_name:item.ss_name,ss_image:item.ss_img,credential_admin_fullname:credential.value!.user_fullname})
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
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

const tacherListDrawer = ref(false)
const addNewTeacherDialog = ref(false)
const renameTeacherDialog = ref(false)
const teacherName = ref()
const teacherOldName = ref()
const teacherList = ref<Array<teacherListResponse>>()
const teacherId = ref()
const teacherListStatus = ref<dataStatus>()
const teacherSelected = ref<any>(null) 
const yearSelected = ref<any>(null)

function addNewTeacher(){
    btnLoading.value = true
    _api.addNewTeacher({teacher_name:teacherName.value,credential_admin_fullname:credential.value!.user_fullname})
    .then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
            teacherName.value = ''
            getTeacherList()
        }else{
            _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
        }
        btnLoading.value = false
    }).catch((err)=>{
        btnLoading.value = false
        _msg.toast_msg({title:'เกิดความผิดพลาด ไม่สามารถดำเนินการได้',icon:'error',progressbar:true,timer:20})
    })
}

function getTeacherList(){
    _api.getTeachersList().then((res)=>{
        if(res.data.status_code === 200){
            teacherList.value = res.data.teachers_data
            
            if(teacherList.value!.length >= 1){
                teacherListStatus.value = 'load_data_succ'

            }else if(teacherList.value!.length <= 0){
                teacherListStatus.value = 'no_data'
            }else{
                teacherListStatus.value = 'err_data'
            }
        }else{
            teacherListStatus.value = 'err_data'
        }
    }).catch((err)=>{
        teacherListStatus.value = 'network_err'
    })
}

function setTeacherName(name:string,id:number){
    teacherId.value = id 
    teacherOldName.value = name
    teacherName.value = name 

    renameTeacherDialog.value = true
}

function renameTeacher(){
    _msg.confirm('ต้องการเปลี่ยนชื่อครูใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.renameTeacher({teacher_id:teacherId.value , teacher_old_name:teacherOldName.value , 
                teacher_name:teacherName.value , credential_admin_fullname:credential.value!.user_fullname })
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
                    teacherOldName.value = ''
                    getTeacherList()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            })
        }
    })
}

function deleteTeacher(){
    _msg.confirm('ต้องการลบครูผู้สอนใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteTeacher({teacher_name: teacherName.value ,teacher_id:teacherId.value  ,credential_admin_fullname:credential.value!.user_fullname} )
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
                    teacherOldName.value = ''
                    getTeacherList()
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            })
        }
    })
}

const yearsList = ref<Array<yearsListResponse>>()

function getYearList() {
    _api.getYears().then((res)=>{
        if(res.data.status_code === 200){
            yearsList.value = res.data.years_data
        }
    })
}
 
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
                    <v-btn 
                        @click="tacherListDrawer = !tacherListDrawer"
                        class="h-full less:w-full sm:w-full md:w-auto" 
                        color="pink" size="large" >
                        <p class="text-md" >
                            <v-icon icon="mdi-account-tie" class=""></v-icon> เพิ่มรายชื่อครูผู้สอน  
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
                                    <b>ครูประจำชั้น :</b> {{ item.ss_teacher_name }}
                                </p>
                                <p>
                                    <b>ชั้นปี :</b>  {{ item.class_name }} 
                                </p>
                                <p>
                                    <b>ปีการศึกษา :</b>  {{ item.ss_year_name }}
                                </p>
                                <p>
                                    <b>ภาคการศึกษา :</b> {{ item.ss_semester }}
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

        <v-navigation-drawer  :disable-resize-watcher="true" 
        :width="350" location="right" v-model="tacherListDrawer">
            <div class="w-full h-full flex flex-col px-2 pt-6">
                <div class="w-full px-2 flex flex-row gap-1">
                    <v-btn  @click="addNewTeacherDialog = true" color="green" class="w-full" size="large">
                        <v-icon icon="mdi-plus"></v-icon> เพิ่มครูผู้สอนใหม่ 
                    </v-btn>
                </div>
                <div class="w-full flex flex-col mt-2 gap-2 px-2 pb-2" v-if="teacherListStatus === 'load_data_succ'">
                    <div  v-for="item in teacherList" :key="item.teacher_id"
                    @click="setTeacherName(item.teacher_name,item.teacher_id)">
                        <div 
                            class="w-full flex flex-row gap-1 border-2 border-pink-200 p-3 rounded-md
                            hover:bg-[#EC407A] hover:text-white cursor-pointer duration-100 hover:border-pink-50">
                            <div class="w-full flex items-center"  >
                                <p> {{ item.teacher_name }}</p>
                            </div>
                            <v-tooltip activator="parent" location="bottom end" >
                                แก้ไข
                            </v-tooltip>
                        </div>
                    </div>
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="teacherListStatus === 'no_data'">
                    <img src="/images/illustrations/No data.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="teacherListStatus === 'err_data'">
                    <img src="/images/illustrations/No data-amico.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="teacherListStatus === 'network_err'">
                    <img src="/images/illustrations/500 Internal Server Error-amico.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="teacherListStatus === 'loading_data'">
                    <v-progress-circular indeterminate color="pink" :size="90" :width="12"></v-progress-circular>
                </div>
            </div>
        </v-navigation-drawer>
    </AdminNavigationBar>

    <!-- add teacher dialog -->
    <v-dialog
    persistent
    v-model="addNewTeacherDialog"
    width="600"
    transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มครูผู้สอนใหม่
                    <div @click="addNewTeacherDialog = false , teacherName = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                <!-- <div class="w-full pl-7 mb-1 mt-3" v-if="errMsgNewsCategory === 'name_exist'">
                    <p class="text-red-500 text-[13px]"> มีชื่อหมวดหมู่นี้แล้ว กรุณาป้อนชื่อที่ไม่ซ้ำกัน </p>
                </div> -->
                <div class="w-full px-6 pb-4">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="teacherName"
                            label="ป้อนชื่อครูผู้สอน"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="green" size="xl" tex 
                            :disabled="!!!teacherName"
                            :loading="btnLoading"
                            @click="addNewTeacher()" 
                            class="้px-3 w-[100px]">
                                <p class="text-xl">เพิ่ม</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- rename teacher -->
    <v-dialog
        persistent
        v-model="renameTeacherDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    แก้ไข
                    <div @click="renameTeacherDialog = false , teacherName = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                    <div class="w-full px-6 pb-4 ">
                        <!-- <div class="w-full mb-1 mt-3" v-if="errMsgNewsCategory === 'name_exist'">
                            <p class="text-red-500 text-[13px]"> มีชื่อหมวดหมู่นี้แล้ว กรุณาป้อนชื่อที่ไม่ซ้ำกัน </p>
                        </div> -->
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="teacherName"
                            label="ป้อนชื่อครูผู้สอน"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="primary" size="xl" tex 
                            :disabled="!!!teacherName"
                            :loading="btnLoading"
                            @click="renameTeacher()" 
                            class="้px-3 w-[80px]">
                                <p class="text-xl">แก้ไข</p>
                        </v-btn>
                        <v-btn color="red" size="xl" tex 
                            @click="deleteTeacher()"
                            class="้px-3 w-[80px]">
                                <p class="text-xl">ลบ</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

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
                            <v-select
                                label="ครูประจำชั้น"
                                :items="teacherList"
                                v-model="teacherSelected"
                                item-title="teacher_name"
                                item-value="teacher_id"
                                hide-details
                                variant="outlined"
                                class="mt-3"
                            ></v-select>
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
                                label="ปีการศึกษา"
                                :items="yearsList"
                                v-model="yearSelected"
                                item-title="years_name"
                                item-value="years_id"
                                hide-details
                                variant="outlined"
                                class="mt-3"
                            ></v-select>
                        </div>           
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
                    !!!ssName || !!!teacherSelected  || !!!yearSelected || !!!ssSemester || !!!ssImg || !!!ssClassSelected
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
                    แก้ไขตารางเรียน
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
                            <v-select
                                label="ครูประจำชั้น"
                                :items="teacherList"
                                v-model="teacherSelected"
                                item-title="teacher_name"
                                item-value="teacher_id"
                                hide-details
                                variant="outlined"
                                class="mt-3"
                            ></v-select>
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
                                label="ปีการศึกษา"
                                :items="yearsList"
                                v-model="yearSelected"
                                item-title="years_name"
                                item-value="years_id"
                                hide-details
                                variant="outlined"
                                class="mt-3"
                            ></v-select>
                        </div>
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
                    !!!ssName || !!!teacherSelected  || !!!yearSelected || !!!ssSemester || !!!ssClassSelected
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