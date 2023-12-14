<script setup lang="ts">
import {ref ,onMounted ,watch} from 'vue'
import {fileCategoryRespone , filesResponse} from '../../../store/Interface' 
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
 
const _api = new apiNamphong()
const _msg = new MsgAlert()
 
const selectedCategory = ref(1) // selected file category 
const allCategoryFile = ref<Array<fileCategoryRespone>>()
// working at first  
onMounted(()=>{
    getAllCategoryFile()
    getAllFile()
})

// detect cetegory fetch data
watch(selectedCategory , ()=>{    
    getAllFile()
})
  
 // get all category file
function getAllCategoryFile(){
    _api.getAllCategoryFile().then((res)=>{        
        // console.log('data ====>',res.data.file_catefory_data);
        allCategoryFile.value = res.data.file_catefory_data as Array<fileCategoryRespone>
    })
}

const files = ref<Array<filesResponse>>()
// get all file 
function getAllFile(){
    _api.getAllFiles({selected_category:selectedCategory.value}).then((res)=>{
        files.value = res.data.fileData as Array<filesResponse>
    })
}

// check file type
function checkFileType(){
    if(fileUpload.value[0].type === 'application/pdf'){
        return 'pdf'
    }else if(fileUpload.value[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        return 'docx'
    }else if(fileUpload.value[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        return 'xlsx'
    }
}


const fileUploadDialog = ref(false) 
const fileName = ref<string>() // file name 
const fileUpload = ref<any>() // file 
const fileType = ref<string>() // ''
// add new file 
function addNewFile(){
    const formData = new FormData()    
    fileType.value = checkFileType()

    formData.append('file_name',fileName.value!)
    formData.append('file_upload',fileUpload.value[0])
    formData.append('file_type', fileType.value!)
    formData.append('file_category_id', String(selectedCategory.value))

    _api.addNewFile(formData).then((res)=>{
        if(res.data.status === false) _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
        else _msg.toast_msg({title:res.data.msg,timer:3,icon: 'success'})
        fileName.value = ''
        fileUpload.value = null
        fileType.value = ''
        getAllFile()
    })
}
// set auto file name 
watch(fileUpload,()=>{
    if(fileUpload.value !== null && fileUpload.value !== undefined ){
        if(fileName.value === '' || fileName.value === undefined || fileName.value === null ){
            fileName.value = fileUpload.value[0]!.name
        }
    }
})


// delete file
function deleteFile(file_id:number,file_name_upload:string){
    _msg.confirm('คุณต้องการจะลบไฟล์ใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteFile({file_id:file_id,file_name_upload:file_name_upload}).then((res)=>{
                if(res.data.status) _msg.toast_msg({title:res.data.msg,timer:3,icon:'success'})
                else _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
                getAllFile()
            })
        }
    })
}

// switch pin 
function fileSwitchPin(file_id:number , file_pin_status:boolean){
    _api.fileSwitchPin({file_id:file_id,file_pin_status:file_pin_status}).then((res)=>{
        if(res.data.status) _msg.toast_msg({title:res.data.msg,timer:3,icon:'success'})
        else _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
    })    
}

// download file 
function downloadFile(file_id:number , file_name_upload:string,new_file_name:string){
    _api.previewFile({file_id:file_id,file_name_upload:file_name_upload}).then((res)=>{
        var downloadLink = document.createElement('a');
        downloadLink.href = res.data.file_url;
        downloadLink.download = new_file_name ;  
        downloadLink.click();
    })
}

// preview file 
function previewsFile(file_id:number , file_name_upload:string,new_File_name:string){
    _api.previewFile({file_id:file_id,file_name_upload:file_name_upload}).then((res)=>{
        if(res.data.status) window.open(res.data.file_url, '_blank')
        else _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
    })
}

// set varaible before open edit dialog
const fileEditDialog = ref(false)
const editSelectedCategory = ref()
const editFileid = ref()
const editFileUploadName = ref()
const editFileType = ref() // store old type file

 function settingEditFileName(file_id:number,file_name:string , file_category_id:string,file_name_upload:string,file_type:string){
    editSelectedCategory.value = file_category_id
    editFileid.value = file_id
    editFileUploadName.value = file_name_upload
    fileName.value = file_name
    editFileType.value = file_type
    fileEditDialog.value = true
}
// edit file
function editFile(){
    console.log(fileUpload.value);
    
    const formData = new FormData()    
    formData.append('file_id',editFileid.value!)
    formData.append('file_name',fileName.value!)
    formData.append('file_name_upload',editFileUploadName.value!)
    // fix case no file update
    if(fileUpload.value === undefined || fileUpload.value === null){
        fileType.value = editFileType.value // send old file type
        formData.append('file_upload','no_file_upload')
    }else{
        fileType.value = checkFileType() // get new file type
        formData.append('file_upload',fileUpload.value[0]) 
    }
    formData.append('file_type', fileType.value!)
    formData.append('file_category_id', String(editSelectedCategory.value))

    _api.editFile(formData).then((res)=>{
        if(res.data.status === false) _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
        else _msg.toast_msg({title:res.data.msg,timer:3,icon: 'success'})
        fileName.value = '',
        fileUpload.value = null
        fileType.value = ''
        getAllFile()
    })
}


</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col w-full h-full border-gray-300 border-2 ">
            <div class="w-full h-full flex flex-col overflow-hidden">
                <div class="w-full h-[75px] min-[75px]: border-b-2 border-gray-300 bg-white
                 flex justify-between items-center px-2 py-3">

                 <div class="w-full h-full flex flex-row justify-start items-center gap-2">
                        <div class="w-2/3 ">
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
                        <div class="w-1/3">
                            <v-select
                                v-model="selectedCategory"
                                label="ประเภท"
                                :items="allCategoryFile"
                                class=""
                                item-title="file_category_name"
                                item-value="file_category_id"
                                hide-details
                                density="comfortable"
                                variant="outlined"
                            >
                            </v-select>
                        </div>
                        <div class="flex h-full items-start justify-center gap-1 ">
                            <v-btn class="h-full" color="green" size="large" @click="fileUploadDialog = !fileUploadDialog">
                                <p class="text-md" >
                                    <v-icon  icon="mdi-file-plus"></v-icon>      
                                </p>
                            </v-btn>
                            <!-- <v-btn class="h-full" color="blue" size="large">
                                <p class="text-md" >
                                    <v-icon  icon="mdi-pencil"></v-icon>      
                                </p>
                            </v-btn>
                            <v-btn class="h-full" color="red" size="large">
                                <p class="text-md" >
                                    <v-icon  icon="mdi-delete"></v-icon>      
                                </p>
                            </v-btn> -->
                        </div>
                    </div>
                    <div class="w-fit">
                        <v-pagination density="comfortable" :length="4"></v-pagination>
                    </div>
                </div>
                <!-- table -->
                <div class="bg-white w-full h-full pb-4 border-b-2 ">
                    <v-table class="h-[91%] overflow-y-scroll" fixed-header>
                        <thead>
                            <tr>
                                <th class="text-left w-10">
                                    #
                                </th>
                                <th class="text-left w-20">
                                    ประเภท
                                </th>
                                <th class="text-left w-auto">
                                    ชื่อ
                                </th>
                                <th class="text-center w-40 ">
                                    วันที่
                                </th>
                                <th class="text-center w-20 ">
                                    ปักหมุด
                                </th>
                                <th class="text-center w-44">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover:bg-gray-100"
                                v-for="(item , i) in files"
                                :key="item.file_name"
                            >
                                <td> {{ i+1 }} </td>
                                <td class="text-center text-xl "> 
                                    <v-icon v-if="item.file_type === 'docx'" icon="mdi-file-word-box" color="blue" ></v-icon> 
                                    <v-icon v-else-if="item.file_type === 'pdf'" icon="mdi-file-pdf-box" color="red" ></v-icon> 
                                    <v-icon v-else-if="item.file_type === 'xlsx'" icon="mdi-file-xml-box" color="green" ></v-icon> 
                                </td>
                                <td>
                                    <p class="line-clamp-1">
                                        {{ item.file_name }}
                                    </p>
                                </td>
                                 <td class="text-center"> {{ item.file_date }} </td>
                                <td class="flex justify-center">
                                    <div class="w-fit flex justify-center items-center gap-1">
                                        <v-switch
                                            @click="fileSwitchPin(item.file_id,item.file_pin)"
                                            v-model="item.file_pin"
                                            density="compact"
                                            inset
                                            hide-details
                                            color="green">
                                        </v-switch>
                                    </div>
                                </td>
                                <td>
                                    <div class="w-fit flex flex-row justify-end items-center gap-1">
                                        <v-btn v-if="item.file_type === 'pdf'"
                                        @click="previewsFile(item.file_id,item.file_name_upload,item.file_name)">
                                            <p class="text-yellow-600">
                                                <v-icon icon="mdi-eye"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn v-if="item.file_type === 'docx' || item.file_type === 'xlsx'"
                                        @click="downloadFile(item.file_id,item.file_name_upload,item.file_name)">
                                            <p class="text-green-600">
                                                <v-icon icon="mdi-download"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn @click="settingEditFileName(
                                            item.file_id,
                                            item.file_name,
                                            item.file_category_id,
                                            item.file_name_upload,
                                            item.file_type)">
                                            <p class="text-blue-500">
                                                <v-icon icon="mdi-pencil"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn @click="deleteFile(item.file_id,item.file_name_upload)">
                                            <p class="text-red-500">
                                                <v-icon icon="mdi-delete"></v-icon>
                                            </p>
                                        </v-btn>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                 </div>

            </div>
        </div>
    </AdminNavigationBar>

    <!-- add new file  -->
    <v-dialog
        persistent
        v-model="fileUploadDialog"
        width="550"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     อัพโหลดไฟล์
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <v-form @submit.prevent="addNewFile">
                            <v-file-input
                                accept=".docx , .pdf , .xlsx"
                                placeholder="เลือกภาพประจำตัว"
                                label="เลือกไฟล์"
                                v-model="fileUpload"
                                class=""
                                show-size
                                name="file_upload"
                                hide-details
                                variant="outlined"
                                prepend-icon=""
                            ></v-file-input>
                            <v-text-field
                                v-model="fileName"
                                label="ชื่อไฟล์"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-select
                                v-model="selectedCategory"
                                label="ประเภท"
                                :items="allCategoryFile"
                                class="mt-3"
                                item-title="file_category_name"
                                item-value="file_category_id"
                                hide-details
                                density="comfortable"
                                variant="outlined"
                            >
                            </v-select>
                            <div class="w-full mt-6 flex justify-center items-center gap-2">
                                <v-btn color="red"
                                    @click="fileUploadDialog = !fileUploadDialog , fileUpload = null , fileName = ''" >
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="green" type="submit" :disabled="!!!fileName || !!!fileUpload "
                                > อัพโหลดไฟล์ </v-btn>
                            </div>
                        </v-form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- edit file -->
    <v-dialog
        persistent
        v-model="fileEditDialog"
        width="550"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     แก้ไขไฟล์
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <v-form @submit.prevent="editFile">
                            <v-file-input
                                accept=".docx , .pdf , .xlsx"
                                placeholder="เลือกภาพประจำตัว"
                                label="เลือกไฟล์"
                                v-model="fileUpload"
                                show-size
                                name="file_upload"
                                hide-details
                                variant="outlined"
                                prepend-icon=""
                            ></v-file-input>
                            <v-text-field
                                v-model="fileName"
                                label="ชื่อไฟล์"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-select
                                v-model="editSelectedCategory"
                                label="ประเภท"
                                :items="allCategoryFile"
                                class="mt-3"
                                item-title="file_category_name"
                                item-value="file_category_id"
                                hide-details
                                density="comfortable"
                                variant="outlined"
                            >
                            </v-select>
                            <div class="w-full mt-6 flex justify-center items-center gap-2">
                                <v-btn color="red"
                                    @click="fileEditDialog = false , fileUpload = null , fileName = ''" >
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="blue" type="submit" :disabled="!!!fileName "
                                > บันทึก </v-btn>
                            </div>
                        </v-form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
