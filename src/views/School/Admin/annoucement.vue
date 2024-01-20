<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import pageDataStatus from '../../../components/layout/School/pageDataStatus.vue'
import {ref , watch , onMounted} from 'vue'; 
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { credential , schoolDataResonse ,msgValidate , dataStatus , annoResponse} from '../../../store/Interface'
import { reactive } from 'vue';

const _api = new apiNamphong()
const _msg = new MsgAlert()
const credential = ref<credential>()
const btnLoading = ref(false)

const annoLimitDialog = ref(false)
const addNewAnnoDialog = ref(false)
const updateAnnoDialog = ref(false)
const annoExampleDialog = ref(false)
onMounted(()=>{
    document.title = 'ประกาศประชาสัมพันธ์'
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    getSchoolDataSetting();
    getAll()
})

function getAll(){
    if(searchValue.searchText === ''){
        // no value in seachValue the get common data
        getAnnoListLength();
        getAnnoList();
    }else{
        // triger seachValue for seaching next after change category id       
        searchValue.searchTriger = !searchValue.searchTriger
    }

}
// get length 
const totalAnnoList = ref()
function getAnnoListLength(){
    _api.getAnnoListLength().then((res)=>{
    if(res.data.status_code === 200){
        totalAnnoList.value = res.data.anno_length
        totalPage.value = Math.ceil(totalAnnoList.value / sizeSelected.value)   
    }
    })
}
// get 
const annoList = ref<Array<annoResponse>>()
const annoListStatus = ref<dataStatus>('no_data')
const defaultImgPath = ref()
function getAnnoList(){
    annoListStatus.value = 'loading_data'
    _api.getAnnoList({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.status_code === 200){
            annoList.value = res.data.anno_data
            defaultImgPath.value = res.data.default_path
            if(annoList.value!.length > 0){
                annoListStatus.value = 'load_data_succ'
            }else{
                annoListStatus.value = 'no_data'
            }
        }else{
            annoListStatus.value = 'err_data'
        }
    }).catch((err)=>{
        annoListStatus.value = 'network_err'
    })
}

// limit anno list example
const annoLimit = ref()
function updateAnnoLimit(){
    btnLoading.value = true
    _api.updateAnnoLimit({limit:annoLimit.value,credential_admin_fullname:credential.value!.user_fullname}).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,timer:1.5,progressbar:true,icon:'success'})
            getSchoolDataSetting()
        }else{
            _msg.toast_msg({title:res.data.msg,timer:20,progressbar:true,icon:'error'})
        }
        btnLoading.value = false
    }).catch(()=>{
        _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',timer:30,progressbar:true,icon:'error'})
        btnLoading.value = false
    })
}

const schoolData = ref<schoolDataResonse>()
function getSchoolDataSetting(){
    _api.getSchoolDataSetting().then((res)=>{
        if(res.data.status_code !== 200){
            _msg.toast_msg({title:res.data.msg,timer:30,progressbar:true,icon:'error'})
        }else{
            schoolData.value = res.data.school_data[0]   
            annoLimit.value = schoolData.value!.anno_limit         
        }
    })
}

// add new 
const annoFile = ref<any>()
const annoName = ref()
const errMsgFileChcek = ref<msgValidate>('no_data')
const errMsgAnnoName = ref<msgValidate>('no_data')
function addNewAnno(){
    if(annoFile.value === undefined || annoFile.value === null){
        return errMsgFileChcek.value = 'invalid'
    }
    const formData = new FormData()
    formData.append('anno_image',annoFile.value[0]!)
    formData.append('anno_name',annoName.value)
    formData.append('credential_admin_fullname',credential.value!.user_fullname)
    btnLoading.value = true
    _api.addNewAnno(formData).then((res)=>{
        if(res.data.status_code===200){
            _msg.toast_msg({title:res.data.msg,timer:1.5,progressbar:true,icon:'success'})
            annoFile.value = undefined
            annoName.value = ''
            getAll()
        }else{
            _msg.toast_msg({title:res.data.msg,timer:30,progressbar:true,icon:'error'})
        }
        btnLoading.value = false
    })
}

// update
const annoDetail = ref<annoResponse>() 
const annoIndex = ref()
function setData(item:annoResponse , index:number ){
    annoFile.value = undefined
    annoDetail.value = item 
    annoName.value = annoDetail.value!.anno_name
    annoIndex.value = index
    updateAnnoDialog.value = true 
}
function updateAnno(){
    _msg.confirm('คุณต้องการบันทึกข้อมูลใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed) {
            const formData = new FormData()
            if(annoFile.value === undefined || annoFile.value === null){
                formData.append('anno_image','no_image_upload') // 1 image
            }else{
                formData.append('anno_image',annoFile.value[0]!) // 1 image
            }

            formData.append('anno_old_image',annoDetail.value!.anno_image) // 2 old image
            formData.append('anno_name',annoName.value) // 3 new name 
            formData.append('anno_old_name',annoDetail.value!.anno_name) // 4 old name 
            formData.append('credential_admin_fullname',credential.value!.user_fullname) // 5 admin
            formData.append('anno_id',String(annoDetail.value!.anno_id)) // 6 id

            btnLoading.value = true
            _api.updateAnno(formData).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,timer:1.5,progressbar:true,icon:'success'})
                    getAll();
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:30,progressbar:true,icon:'error'})
                }
                btnLoading.value = false
            }).catch((err)=>{
                _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',timer:30,progressbar:true,icon:'error'})
                btnLoading.value = false
            })
        }
    })
}

// delete 
function deleteAnno(id:number,name:string,image:string){
    _msg.confirm(`คุณต้องการลบประกาศใช่ไหม`).then((isCOnfirmed)=>{
        if(isCOnfirmed){
            _api.deleteAnno({anno_id:id,anno_image:image,anno_name:name,credential_admin_fullname:credential.value!.user_fullname})
            .then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,timer:1.5,progressbar:true,icon:'success'})
                    getAll();
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:20,progressbar:true,icon:'error'})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',timer:30,progressbar:true,icon:'error'})
            })
        }
    })
}

// switch pin 
function switchAnnoPin(id:number,status:boolean,name:string){
    let pin_status
    if(status === true) pin_status = 0 
    else pin_status = 1

    _api.switchAnnoPin({anno_id:id,pin_status:pin_status,anno_name:name,credential_admin_fullname:credential.value!.user_fullname})
    .then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,timer:1.5,progressbar:true,icon:'success'})
        }else{
            _msg.toast_msg({title:res.data.msg,timer:20,progressbar:true,icon:'error'})
        }
    }).catch((Err)=>{
        _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',timer:30,progressbar:true,icon:'error'})
    })
}

const exampleAnnoList = ref<Array<object>>()
function getExampleAnnoList(){
    _api.getExampleAnnoList({limit:annoLimit.value}).then((res)=>{
        if(res.data.status_code === 200){
            exampleAnnoList.value = res.data.example_anno_data            
        }
    })
}



//detect anno name
watch(annoName,()=>{
    if(!!!annoName.value){
        errMsgAnnoName.value = 'invalid'
    }else{
        errMsgAnnoName.value = 'valid'
    }
})
//detect anno file
watch(annoFile,()=>{
    if(!!!annoFile.value){
        errMsgFileChcek.value = 'invalid'
    }else{
        errMsgFileChcek.value = 'valid'
    }
})

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

const timeoutId = ref()
watch(searchValue , ()=>{
    clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(() => {
        if(searchValue.searchText.trim() === ''){
            getAll()
        }else{
            annoListStatus.value = 'loading_data'
            _api.searchAnno({search_keyword:searchValue.searchText,start_item:startItem.value,limit:sizeSelected.value})
            .then((res)=>{
                if(res.data.status_code === 200){
                    totalAnnoList.value = res.data.anno_length
                    annoList.value = res.data.anno_data
                    totalPage.value = Math.ceil(totalAnnoList.value / sizeSelected.value) 
                    if(annoList.value!.length > 0){
                        annoListStatus.value = 'load_data_succ'
                    }else{
                        annoListStatus.value = 'no_data'
                    }
                }else{
                    annoListStatus.value = 'err_data'
                }
            }).catch((err)=>{
                annoListStatus.value = 'network_err'
            })
        }
    },500)
})
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col ">
            <div class="w-full flex flex-wrap">
                <div class="w-full p-1 flex flex-wrap justify-end">
                    <div class="w-full p-1">
                        <v-text-field
                            label="ค้นหา"
                            class=""
                            v-model="searchValue.searchText"
                            hide-details
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            bg-color=""
                            density="comfortable"
                            required
                        ></v-text-field>
                    </div>
                </div>
                <div class="less:w-full p-1 flex less:flex-wrap sm:flex-row md:flex-row gap-2 less:justify-center md:justify-start items-center">
                    <v-btn 
                        @click="addNewAnnoDialog = true"
                        class="h-full less:w-full sm:w-full md:w-auto" 
                        color="pink" size="large" >
                        <p class="text-md" >
                            <v-icon icon="mdi-bullhorn-variant-outline" class=""></v-icon> เพิ่มประกาศ  
                        </p>
                    </v-btn>
                    <v-btn 
                        @click="annoLimitDialog = true"
                        class="h-full less:w-full sm:w-full md:w-auto" 
                        color="pink" size="large" >
                        <p class="text-md" >
                            <v-icon icon="mdi-table-column" class=""></v-icon> จำนวนที่แสดง  
                        </p>
                    </v-btn>
                    <v-btn
                        @click="annoExampleDialog = true , getExampleAnnoList();"
                        class="h-full less:w-full sm:w-full md:w-auto" 
                        color="pink" size="large" >
                        <p class="text-md" >
                            <v-icon icon="mdi-open-in-app" class=""></v-icon> ตัวอย่าง  
                        </p>
                    </v-btn>
                </div>
            </div>
            <div class=" px-4">
                <p class="text-lg"> จำนวนรายการ : {{ totalAnnoList }}</p>
            </div>
            <v-divider class="border-opacity-75"></v-divider>
            <div class="w-full h-auto flex flex-col gap-2 py-2 pr-2" v-if="annoListStatus === 'load_data_succ'">
                <div class="h-full flex less:flex-col sm:flex-row justify-center items-start group border-2 
                border-gray-400 rounded-md hover:border-pink-400" v-for="(item,i) in annoList" :key="item.anno_id"          >
                    <div class="less:w-full min-w-[170px] sm:w-[170px] h-[200px] flex justify-center items-center">
                        <img v-if="item.anno_image"
                        class="less:w-full min-w-[160px] sm:w-[160px] less:h-full sm:h-[190px] object-cover sm:rounded-md"
                        :src="defaultImgPath+item.anno_image" alt="">
                    </div>
                    <div class="w-full h-[200px] flex flex-col text-lg pl-6 pr-3 py-2 group-hover:text-pink-500 duration-50 ">
                        <div class="w-full h-full ">
                            <p class="line-clamp-3">
                                {{  i+1 }}. {{ item.anno_name }}
                            </p>
                            <p class="text-gray-600 text-lg mt-2">
                                โพสต์วันที่ : {{  item.anno_date }}
                            </p>
                            <p class="text-gray-600 text-lg ">
                                โดย : {{  item.anno_author }}
                            </p>
                        </div>
                        <div class="w-full h-full flex flex-row gap-2 justify-end items-end mt-2  ">
                            <div class="md:mr-2 h-fit">
                                <v-switch
                                    @click="switchAnnoPin(item.anno_id,item.anno_pin,item.anno_name)"
                                    v-model="item.anno_pin"
                                    class="h-full"
                                    density="compact"
                                    inset
                                    hide-details
                                    color="green">
                                </v-switch>
                                <v-tooltip location="top" activator="parent">
                                    ปักหมุดการมองเห็น
                                </v-tooltip>
                            </div>
                            <v-btn
                                @click="setData(item,i)"
                                class="less:w-1/3 md:w-[120px] min-w-min"
                                color="primary"
                            >   
                                แก้ไข
                            </v-btn>
                            <v-btn 
                                class="less:w-1/3 md:w-[120px] min-w-min"
                                @click="deleteAnno(item.anno_id,item.anno_name,item.anno_image)"
                                color="red">ลบ
                            </v-btn>
                                
                        </div>
                    </div>
                </div>
            </div>
            <pageDataStatus v-else :data-status="annoListStatus"></pageDataStatus>
            <v-divider class="border-opacity-75"></v-divider>
            
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

    <!-- add position -->
    <v-dialog
        persistent
        v-model="annoLimitDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    จำนวนประกาศ
                    <div @click="annoLimitDialog = false"
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                <!-- <div class="w-full pl-7 mb-1 mt-3" v-if="errMessageAddPosition === 'name_exist'">
                    <p class="text-red-500 text-[13px]"> มีชื่อตำแหน่งนี้แล้ว กรุณาป้อนชื่อที่ไม่ซ้ำกัน </p>
                </div> -->
                <div class="w-full px-6 pb-4">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="annoLimit"
                            label="จำนวนประกาศ"
                            variant="outlined"
                            type="number"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="green" size="xl" tex 
                            :loading="btnLoading"
                            @click="updateAnnoLimit()" 
                            class="้px-3 w-[100px]">
                                <p class="text-xl">บันทึก</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- add new annocement -->
    <v-dialog
        persistent
        v-model="addNewAnnoDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มประกาศ
                </div>

                <div class="w-full px-6 pb-4 mt-3">
                    <v-file-input
                        accept="image/*"
                        label="*ภาพประกาศ"
                        v-model="annoFile"
                        prepend-inner-icon="mdi-image"
                        :rules="[
                            () => errMsgFileChcek === 'valid' || 'กรุณาใส่ภาพ'
                        ]"
                        show-size
                        name="anno_image"
                        hide-details="auto"
                        variant="outlined"
                        prepend-icon=""
                    ></v-file-input>
                    <v-text-field
                        label="*ชื่อประกาศ"
                        class="mt-3"
                        v-model="annoName"
                        :rules="[
                            () => errMsgAnnoName === 'valid' || 'กรุณาใส่ชื่อระบุประกาศ'
                        ]"
                        hide-details="auto"
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>

                </div>
                <div class="flex w-full flex-row justify-center items-center gap-2">
                    <v-btn class="w-[100px]" color="red"
                    @click="annoFile=addNewAnnoDialog=false ,undefined , annoName=''" >
                        ยกเลิก
                    </v-btn>
                    <v-btn class="w-[100px]" color="green" @click="addNewAnno()"
                    :loading="btnLoading" :disabled="errMsgAnnoName !== 'valid' || errMsgFileChcek !== 'valid'">
                        เพิ่ม
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- update annocement -->
    <v-dialog
        persistent
        v-model="updateAnnoDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    แก้ไข
                </div>

                <div class="w-full px-6 pb-4 mt-3">
                    <v-file-input
                        accept="image/*"
                        label="ภาพประกาศ"
                        v-model="annoFile"
                        prepend-inner-icon="mdi-image"
                        show-size
                        name="anno_image"
                        hide-details="auto"
                        variant="outlined"
                        prepend-icon=""
                    ></v-file-input>
                    <v-text-field
                        label="*ชื่อประกาศ"
                        class="mt-3"
                        v-model="annoName"
                        :rules="[
                            () => errMsgAnnoName === 'valid' || 'กรุณาใส่ชื่อระบุประกาศ'
                        ]"
                        hide-details="auto"
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>

                </div>
                <div class="flex w-full flex-row justify-center items-center gap-2">
                    <v-btn class="w-[100px]" color="red"
                    @click="annoFile=updateAnnoDialog=false , annoFile=undefined , annoName=''" >
                        ยกเลิก
                    </v-btn>
                    <v-btn class="w-[100px]" color="primary" @click="updateAnno()"
                    :loading="btnLoading" :disabled="errMsgAnnoName !== 'valid' ">
                        บันทึก
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- example  -->
    <v-dialog
        v-model="annoExampleDialog"
        width="800"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="relative w-full h-auto">
                <div class="sticky w-full h-full top-0 right-0 z-20 bg-white">
                    <div class="relative w-full text-center py-6 text-2xl text-pink-500 flex justify-center items-center">
                        <div class="less:text-lg md:text-3xl xl:text-4xl">
                            📢 ประกาศจากทางโรงเรียน
                        </div>
                        <div class="absolute top-0 right-0 h-20 w-20 text-pink-500 text-3xl flex 
                        justify-center items-center cursor-pointer hover:text-pink-300"
                        @click="annoExampleDialog = !annoExampleDialog">
                            <v-icon icon="mdi-close"></v-icon>
                        </div>
                    </div>

                    <v-divider></v-divider>
                </div>
                <div class="w-full flex flex-col px-2">
                    <div class="w-full " v-for="item of exampleAnnoList">
                        <div class=" w-full h-full md:px-8">
                            <img :src="defaultImgPath+(item as any).anno_image" alt="" 
                            class="my-2 px-2 rounded-lg w-full scale-100 hover:scale-[1.01] duration-500">
                        </div>
                      
                    <v-divider></v-divider>
                    </div>

                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
