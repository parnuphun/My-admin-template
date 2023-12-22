<script setup lang="ts">
import {ref ,onMounted ,watch} from 'vue'
import {fileCategoryRespone , filesResponse , dataStatus , viewData , credential} from '../../../store/Interface' 
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { reactive } from 'vue';
 
const _api = new apiNamphong()
const _msg = new MsgAlert()
 
const dataStatus = ref<dataStatus>()

const selectedCategory = ref(0) // selected file category , set default = 0 it mean fetch all data
const allCategoryFile = ref<Array<fileCategoryRespone>>()

const buttonLoading = ref(false)
 
const credential = ref<credential>()

// working at first  
onMounted(()=>{
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    
    getFileLength()
    getAllCategoryFile()
    getAllFile()
})

// detect cetegory fetch data
watch(selectedCategory , ()=>{  
    // reset page after change category 
    currentPage.value = 1  // *** maybe err this variable just check it first if pagination got problem
    pagination.value = 1
    changePage()
          
    getFileCheck()
    drawer.value = false
})
  
 // get all category file
function getAllCategoryFile(){
    _api.getAllCategoryFile().then((res)=>{        
        // console.log('data ====>',res.data.file_catefory_data);
        allCategoryFile.value = res.data.file_catefory_data as Array<fileCategoryRespone>
        allCategoryFile.value.unshift({
            file_category_id:0,
            file_category_name:'ทั้งหมด'
        })
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
    }else if(fileUpload.value[0].type  === 'application/msword'){
        return 'doc'
    }else if(fileUpload.value[0].type  === 'application/vnd.ms-excel'){
        return 'xls'
    }else if(fileUpload.value[0].type  === 'text/csv'){
        return 'csv'
    }
}



const fileUploadDialog = ref(false) 
const fileName = ref<string>() // file name for update and addnew form 
const fileUpload = ref<any>() // file 
const fileType = ref<string>() // 'file format ex. pdf doc sxl'
// add new file 
function addNewFile(){
    buttonLoading.value = true

    const formData = new FormData()    
    fileType.value = checkFileType()

    formData.append('file_name',fileName.value!)
    formData.append('file_upload',fileUpload.value[0])
    formData.append('file_type', fileType.value!)
    formData.append('file_category_id', String(fileSelected_DD.value))

    formData.append('credential_admin_fullname',credential.value!.user_fullname)
    
    _api.addNewFile(formData).then((res)=>{
        if(res.data.status === false) _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
        else _msg.toast_msg({title:res.data.msg,timer:3,icon: 'success'})

        buttonLoading.value = false
        fileName.value = ''
        fileUpload.value = null
        fileType.value = ''
        getAllFile()
    }).catch(()=>{
        buttonLoading.value = false
    })
}
// set auto file name 
watch(fileUpload,()=>{
    
    if(fileUpload.value !== null && fileUpload.value !== undefined ){
        // if file name is unvariable and add file first just set filename = file.filename 
        if(fileName.value === '' || fileName.value === undefined || fileName.value === null ){            
            fileName.value = fileUpload.value[0]!.name.replace(/\.[^/.]+$/, "") // remove file extention
        }
    }
})

// delete file
function deleteFile(file_id:number,file_name_upload:string,file_name:string){
    _msg.confirm('คุณต้องการจะลบไฟล์ใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteFile({
                file_id:file_id,
                file_name_upload:file_name_upload,
                credential_admin_fullname:credential.value!.user_fullname,
                file_name:file_name
            })
            .then((res)=>{
                if(res.data.status) _msg.toast_msg({title:res.data.msg,timer:1,progressbar:true,icon:'success'})
                else _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'error'})
                getFileCheck()

                // reset variable after deleted 
                fileName_DD.value =  ''
                fileid_DD.value =  ''
                fileNameUpload_DD.value =  ''
                fileFormat_DD.value =  ''
                fileDate_DD.value =  ''
                filePin_DD.value =  ''
                fileSize_DD.value =  ''
                drawer.value = false
            })
        }
    })
}

// switch pin 
function fileSwitchPin(file_id:number , file_pin_status:boolean , file_name:string){
    _api.fileSwitchPin({
        file_id:file_id,
        file_pin_status:file_pin_status,
        credential_admin_fullname:credential.value!.user_fullname,
        file_name:file_name})
    .then((res)=>{
        if(res.data.statusCode === 200){
            _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'success'})
            getFileCheck();
        }else{
            _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'error'})
        } 
    })    
}

// download file 
function downloadFile(file_id:number , file_name_upload:string,new_file_name:string){
    // now i cant use downloadfile in pdf format then will auto open new tab in chrom 
    // use api preview fils temporary
    _api.previewFile({file_id:file_id,file_name_upload:file_name_upload}).then((res)=>{
        var downloadLink = document.createElement('a');
        downloadLink.href = res.data.file_url;
        downloadLink.download = new_file_name ;  
        downloadLink.click();
    })
}

// preview file 
function previewsFile(file_id:number , file_name_upload:string, ){
    console.log(file_name_upload,'<=== file name upload');
    _api.previewFile({file_id:file_id,file_name_upload:file_name_upload}).then((res)=>{
        console.log(res.data,'<=== res data');
                
        if(res.data.status) window.open(res.data.file_url, '_blank')
        else _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
    })
}

// edit file
function editFile(){    
    buttonLoading.value = true 
    console.log('new ',fileName.value);
    console.log('old ',oldFileName_DD.value);
    
    const formData = new FormData()
    // case no file update
    if(fileUpload.value === undefined || fileUpload.value === null){
        // if no new file then send old file format
        // fileType.value = fileFormat_DD.value 
        formData.append('file_upload','no_file_upload')
    }else{
        fileFormat_DD.value = checkFileType() // if new upload get new file format
        formData.append('file_upload',fileUpload.value[0]) 
    }
    formData.append('file_id',fileid_DD.value!)
    formData.append('file_name',fileName.value!)
    formData.append('file_name_upload',fileNameUpload_DD.value!)
    formData.append('file_type', fileFormat_DD.value!)
    formData.append('file_category_id', String(fileSelected_DD.value))    
    formData.append('file_old_name', oldFileName_DD.value)    
    formData.append('credential_admin_fullname',credential.value!.user_fullname)

    _api.editFile(formData).then((res)=>{
        if(res.data.status_code === 200){ 
            _msg.toast_msg({title:res.data.msg,timer:3,icon: 'success'}) 
            fileNameUpload_DD.value = res.data.new_file_name
        }else {
            _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
        }
        // set file name to dd drawer for update new name and then reset for reuse in add new form 
        fileName_DD.value = fileName.value         
        fileUpload.value = null
        fileType.value = ''
        buttonLoading.value = false 
        getFileCheck()
    }).catch(()=>{
        buttonLoading.value = false 
    })
}

const fileEditDialog = ref(false)
// set data in form update from drawer detail (_DD)
function settingEditFileName(file_id:number,file_name:string , file_category_id:string,file_name_upload:string,file_type:string){
    fileSelected_DD.value = Number(file_category_id) // category selected 
    fileid_DD.value = file_id    
    fileNameUpload_DD.value = file_name_upload
    fileName_DD.value = file_name // use in drawer data detail 
    fileName.value = file_name // use in form 'add new and edit '
    fileFormat_DD.value = file_type
    fileEditDialog.value = true
}

// send data to drawer detail
const fileName_DD = ref()
const oldFileName_DD = ref() // check for update time stamp if file name change
const fileid_DD = ref()
const fileNameUpload_DD = ref()
const fileFormat_DD = ref()
const fileDate_DD = ref()
const filePin_DD = ref()
const fileSelected_DD = ref<any>(1) // set 1 for set default file category add new form
const fileSize_DD = ref() // show in drawwer detail only 

function fileDetailDrawer(item:filesResponse){
    fileSelected_DD.value = item.file_category_id
    oldFileName_DD.value = item.file_name
    fileName_DD.value = item.file_name
    fileid_DD.value = item.file_id
    fileNameUpload_DD.value = item.file_name_upload
    fileFormat_DD.value = item.file_type
    fileDate_DD.value = item.file_date
    filePin_DD.value = item.file_pin
    fileSize_DD.value = item.file_size
    drawer.value = true
}

const drawer = ref(false)
const drawerAlignment = ref('justify-start') // not use now , this is css assign 
watch(drawer,()=>{
    if(drawer.value === false) drawerAlignment.value = 'justify-start'
    else drawerAlignment.value = 'justify-start'
})

// search 
const searchValue = reactive({
    searchText:'',
    searchTriger:false // triger 
})

watch(searchValue , ()=>{
    if(searchValue.searchText.trim() === ''){
        getFileLength();        
        getAllFile();
    }else{
        dataStatus.value = 'loading_data'
        _api.searchFile({search_keyword:searchValue.searchText,selected_category:selectedCategory.value,start_item:startItem.value,limit:sizeSelected.value})
            .then((res)=>{
            if(res.data.statusCode === 200){
                files.value = res.data.search_data as Array<filesResponse> 
                if(files.value.length === 0){
                    dataStatus.value = 'no_data'
                }else if(files.value.length >= 1){
                    dataStatus.value = 'load_data_succ'   
                }else{
                    dataStatus.value = 'network_err'
                }
                // set total page after search
                totalFiles.value = res.data.data_length                    
                totalPage.value = Math.ceil(res.data.data_length/sizeSelected.value)           
            }else{
                _msg.toast_msg({title:res.data.msg,timer:6,icon:'error',progressbar:true})
                dataStatus.value = 'load_data_succ'
            }
        })
    }
})

const files = ref<Array<filesResponse>>()
// get total file length 
function getFileLength(){
    _api.getFileLength({selected_category:selectedCategory.value}).then((res)=>{
        totalFiles.value = res.data.file_length
        totalPage.value = Math.ceil(res.data.file_length/sizeSelected.value)
    })
}
// get all file 
function getAllFile(){
    dataStatus.value = 'loading_data'
    _api.getAllFiles({selected_category:selectedCategory.value,start_item:startItem.value,limit:sizeSelected.value}).then((res)=>{
        if(res.data.status_code === 200){
            files.value = res.data.files_data as Array<filesResponse>
            if(files.value.length === 0){
                dataStatus.value = 'no_data'
            }else if(files.value.length >= 1){
                dataStatus.value = 'load_data_succ'                
            }
        }else{
            dataStatus.value = 'err_data'
        }
    }).catch(()=>{
        dataStatus.value = 'network_err'
    })
}

// pagination 
const totalPage = ref()  
const totalFiles = ref() 
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
    getFileCheck()
})

// detect size select
watch(sizeSelected,()=>{
    changePage()
    getFileCheck()
})

const viewData = ref<viewData>('detail')
// detect viewData 
watch(viewData , ()=>{
    console.log(viewData.value);
})

// check search trigger before fetch all data
function getFileCheck(){    
    if(searchValue.searchText === ''){
        // no value in seachValue the get common data
        getFileLength()
        getAllFile()
    }else{
        // triger seachValue for seaching next after change category id       
        searchValue.searchTriger = !searchValue.searchTriger
    }
}
</script>

<template>
    
    <AdminNavigationBar>
        <div class="w-full h-full flex flex-col gap-1">
            <div class="w-full flex flex-wrap">
                <div class="md:w-1/2 less:w-full p-1 flex gap-2 less:justify-between md:justify-start items-center">
                    <v-btn class="h-full less:w-1/2 sm:w-auto" 
                        color="pink" size="large" @click="fileUploadDialog = !fileUploadDialog">
                        <p class="text-md" >
                            <v-icon  icon="mdi-file-plus"></v-icon> เพิ่มไฟล์  
                        </p>
                    </v-btn>
                    <div class="h-full less:w-1/2 sm:w-auto flex justify-end items-center" >
                        <v-btn-toggle   
                            color="pink" 
                            v-model="viewData" 
                            mandatory
                            variant="outlined" 
                            size="large">
                            <v-btn value="detail">
                                <v-icon>mdi-grid</v-icon>
                            </v-btn>
    
                            <v-btn value="table">
                                <v-icon>mdi-table</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                 </div>
                <div class="md:w-1/2 less:w-full p-1 flex flex-wrap justify-end">
                    <div class="less:w-full md:w-1/2 p-1">
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
                    <div class="less:w-full md:w-1/2 p-1">
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
            </div>
            <div class=" px-4">
               <p class="text-lg"> จำนวนรายการ : {{ totalFiles }}</p>
            </div>
            <v-divider class="border-opacity-100"></v-divider>
            <div class="w-full flex flex-col justify-start " v-if="dataStatus === 'load_data_succ'">
                <div class="w-full flex flex-wrap " v-if="viewData === 'detail'">
                    <div v-for="(item , i) in files" :key="item.file_name"
                    class="less:w-1/3 sm:w-1/5 md:w-1/6  p-2">
                        <div @click="fileDetailDrawer(item)"
                        class="w-full flex flex-col justify-between items-baseline rounded-md hover:shadow-xl 
                        cursor-pointer shadow-md hover:shadow-pink-100 border-2 duration-300" >
                            <div class="w-full h-[120px] flex justify-center p-2">
                                <img v-if="item.file_type === 'docx'"
                                    src="/images/icon/file_extention_docx.png"
                                    class="object-fit h-full" 
                                    alt="file_format_icon">
                                <img v-else-if="item.file_type === 'doc'"
                                    src="/images/icon/file_extention_doc.png"
                                    class="object-fit h-full" 
                                    alt="file_format_icon">
                                <img v-else-if="item.file_type === 'xlsx'"
                                    src="/images/icon/file_extention_xlsx.png"
                                    class="object-fit h-full" 
                                    alt="file_format_icon">
                                <img v-else-if="item.file_type === 'xls'"
                                    src="/images/icon/file_extention_xls.png"
                                    class="object-fit h-full" 
                                    alt="file_format_icon">
                                <img v-else-if="item.file_type === 'csv'"
                                    src="/images/icon/file_extention_csv.png"
                                    class="object-fit h-full" 
                                    alt="file_format_icon">
                                <img v-else-if="item.file_type === 'pdf'"
                                    src="/images/icon/file_extention_pdf.png"
                                    class="object-fit h-full" 
                                    alt="file_format_icon">
                                <img v-else-if="item.file_type === 'ppt'"
                                    src="/images/icon/file_extention_ppt.png"
                                    class="object-fit h-full" 
                                    alt="file_format_icon">
                            </div>
                            <div class="w-full">
                                <v-divider class="border-opacity-100"></v-divider> 
                            </div>
                            <div class="w-full px-2 mt-2">
                                <p class="text-[14px] line-clamp-2"> {{startItem+(i+1)}}. {{ item.file_name }}</p>
                            </div>
                            <div class="w-full px-2 mb-2">
                                <p class="text-[13px] text-gray-500 line-clamp-1"> {{ item.file_size }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full" v-if="viewData === 'table'">
                    <v-table>
                        <thead>
                            <tr class="">
                                <th class="text-left w-[20px]"> # </th>
                                <th class="text-center w-[100px]"> ประเภท </th>
                                <th class="text-left"> ชื่อไฟล์ </th>
                                <th class="text-center w-[30px] "> ขนาด </th>
                                <th class="text-center w-[100px]"> ปักหมุด </th>
                                <th class="text-center w-[200px] "> วันที่อัพโหลด </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item , i) in files" :key="item.file_id" 
                        class=" hover:bg-gray-200 cursor-pointer duration-100"
                        @click="fileDetailDrawer(item)">
                            <td>{{startItem+(i+1)}}.</td>
                            <td>
                                <div class="less:w-[100px] md:w-full h-[70px] flex justify-center p-2">
                                    <img v-if="item.file_type === 'docx'"
                                        src="/images/icon/file_extention_docx.png"
                                        class="object-fit h-full" 
                                        alt="file_format_icon">
                                    <img v-if="item.file_type === 'doc'"
                                        src="/images/icon/file_extention_doc.png"
                                        class="object-fit h-full" 
                                        alt="file_format_icon">
                                    <img v-if="item.file_type === 'xlsx'"
                                        src="/images/icon/file_extention_xlsx.png"
                                        class="object-fit h-full" 
                                        alt="file_format_icon">
                                    <img v-if="item.file_type === 'xls'"
                                        src="/images/icon/file_extention_xls.png"
                                        class="object-fit h-full" 
                                        alt="file_format_icon">
                                    <img v-if="item.file_type === 'csv'"
                                        src="/images/icon/file_extention_csv.png"
                                        class="object-fit h-full" 
                                        alt="file_format_icon">
                                    <img v-if="item.file_type === 'pdf'"
                                        src="/images/icon/file_extention_pdf.png"
                                        class="object-fit h-full" 
                                        alt="file_format_icon">
                                </div>
                            </td>
                            <td>{{ item.file_name }}</td>
                            <td class="text-center">{{ item.file_size }}</td>
                            <td class="text-center">
                                <v-icon v-if="item.file_pin === true"
                                class="text-red-500" size="large">mdi-pin</v-icon>
                                <v-icon v-if="item.file_pin === false"
                                class="" size="large">mdi-pin-off</v-icon>
                            </td>
                            <td class="text-center ">{{ item.file_date }}</td>
                        </tr>
                        </tbody>
                    </v-table>
                </div>
                <div class="w-full my-2">
                    <v-divider class="border-opacity-100"></v-divider> 
                </div> 
            </div>

            <div v-else-if="dataStatus === 'loading_data'" class="w-full h-full flex justify-center items-center">
                <div class=" flex flex-col items-center">
                    <v-progress-circular indeterminate color="pink" :size="90" :width="12"></v-progress-circular>
                    <p class="text-xl mt-2 text-pink-600"> กำลังโหลดข้อมูลกรุณารอสักครู่...</p>
                </div>
            </div>
            <div v-else-if="dataStatus === 'no_data'" class="w-full h-full flex justify-center items-center">
                <div class=" flex flex-col items-center">
                    <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                        <img src="/images/illustrations/No data.svg" 
                        class="h-full w-full" alt="">
                    </div>
                    <p class="text-xl text-pink-600"> ไม่มีข้อมูลในระบบ</p>
                </div>
            </div>
            <div v-else-if="dataStatus === 'err_data'" class="w-full h-full flex justify-center items-center">
                <div class=" flex flex-col items-center">
                    <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                        <img src="/images/illustrations/No data-amico.svg" 
                        class="h-full w-full" alt="">
                    </div>
                    <p class="text-xl text-pink-600"> เกิดข้อผิดพลาดในการรับข้อมูล</p>
                </div>
            </div>
            <div v-else-if="dataStatus === 'network_err'" class="w-full h-full flex justify-center items-center">
                <div class=" flex flex-col items-center">
                    <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                        <img src="/images/illustrations/500 Internal Server Error-amico.svg" 
                        class="h-full w-full" alt="">
                    </div>
                    <p class="text-xl text-pink-600"> ไม่สามารถติดต่อกันเซิร์ฟเวอร์ได้ </p>
                </div>
            </div>
            <div class="w-full flex justify-end">
                <div class="w-[100px]">
                    <v-selection>
                        <v-select
                            :items="size"
                            variant="outlined"
                            v-model="sizeSelected"
                            hide-details="auto"
                        ></v-select>
                    </v-selection>
                </div>
                <div class="sm:w-fit">
                    <v-pagination 
                        :length="totalPage"
                        v-model="pagination"
                        :total-visible="3">
                    </v-pagination>
                </div>
            </div>
        </div>
        
        <v-navigation-drawer :disable-resize-watcher="true" :width="350" location="right" v-model="drawer">
            <div class="w-full h-full flex flex-col px-2 ">
                <div class="w-full h-auto flex flex-row justify-start text-4xl text-gray-500" >
                    <v-icon 
                        class=" hover:text-gray-400 cursor-pointer duration-300" 
                        icon="mdi-chevron-right" 
                        @click="drawer = false ">
                    </v-icon>
                </div>
                <div class="w-full mb-3">
                    <div class="px-2 w-full h-[180px] flex justify-center items-center">
                        <img v-if="fileFormat_DD === 'docx'"
                            src="/images/icon/file_extention_docx.png"
                            class="object-fit h-full" 
                            alt="file_format_icon">
                        <img v-if="fileFormat_DD === 'doc'"
                            src="/images/icon/file_extention_doc.png"
                            class="object-fit h-full" 
                            alt="file_format_icon">
                        <img v-if="fileFormat_DD === 'xlsx'"
                            src="/images/icon/file_extention_xlsx.png"
                            class="object-fit h-full" 
                            alt="file_format_icon">
                        <img v-if="fileFormat_DD === 'xls'"
                            src="/images/icon/file_extention_xls.png"
                            class="object-fit h-full" 
                            alt="file_format_icon">
                        <img v-if="fileFormat_DD === 'csv'"
                            src="/images/icon/file_extention_csv.png"
                            class="object-fit h-full" 
                            alt="file_format_icon">
                        <img v-if="fileFormat_DD === 'pdf'"
                            src="/images/icon/file_extention_pdf.png"
                            class="object-fit h-full" 
                            alt="file_format_icon">
                        
                    </div>
                    <v-divider thickness="2" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md line-clamp-4"> 
                        ชื่อไฟล์ : {{ fileName_DD }}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md"> 
                        วันที่ : {{fileDate_DD}}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md"> 
                        ประเภท : {{fileFormat_DD}}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <p class="text-md"> 
                        ขนาดไฟล์ : {{fileSize_DD}}
                    </p>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full pl-3 pb-3">
                    <div class="w-fit flex justify-center items-center gap-1">
                        <p class="text-md "> 
                        ปักหมุด :
                        </p>
                        <v-switch
                            @click="fileSwitchPin(fileid_DD,filePin_DD,fileName_DD)"
                            v-model="filePin_DD"
                            class="pl-3"
                            density="compact"
                            inset
                            hide-details
                            color="green">
                        </v-switch>
                    </div>
                    <v-divider thickness="" class="border-opacity-100 mt-3" ></v-divider>
                </div>
                <div class="w-full flex flex-col gap-1 pb-2">
                    <v-btn 
                        color="blue"    
                        class="w-full" 
                        v-if="fileFormat_DD === 'pdf'"
                        @click="previewsFile(fileid_DD,fileNameUpload_DD)"    
                    >
                        เปิด
                    </v-btn>
                    <v-btn 
                        color="blue" 
                        class="w-full"
                        v-if="fileFormat_DD !== 'pdf'"
                        @click="downloadFile(fileid_DD,fileNameUpload_DD,fileName_DD)"
                        >
                        ดาวน์โหลด
                    </v-btn>
                    <v-btn 
                        color="primary" 
                        class="w-full"
                        @click="settingEditFileName(
                            fileid_DD,
                            fileName_DD,
                            fileSelected_DD,
                            fileNameUpload_DD,
                            fileFormat_DD)"
                    >
                        แก้ไข
                    </v-btn>
                    <v-btn @click="deleteFile(fileid_DD,fileNameUpload_DD,fileName_DD)" color="red" class="w-full">ลบ</v-btn>
                </div>
            </div>
        </v-navigation-drawer>

    </AdminNavigationBar>

    <!-- add new file  -->
    <v-dialog
        persistent
        v-model="fileUploadDialog"
        width="550"
        class="rounded-none"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2 rounded-none" >
            <div class="flex flex-col w-full  ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     อัพโหลดไฟล์
                </div>
                <div class="w-full px-6 mt-3">
                    <div class="flex flex-col gap-2 w-full">
                        <v-form @submit.prevent="addNewFile">
                            <v-file-input
                                accept=".docx , .doc , .pdf , .xlsx , .xls , .csv "
                                placeholder=""
                                label="เลือกไฟล์"
                                v-model="fileUpload"
                                class=""
                                persistent-clear
                                hide-details="auto"
                                show-size
                                name="file_upload"
                                variant="outlined"
                                hint=""
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
                                v-model="fileSelected_DD"
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
                                    @click="fileUploadDialog = !fileUploadDialog , fileUpload = null , fileName = '' , fileSelected_DD = 1" >
                                    ยกเลิก
                                </v-btn>
                                <v-btn 
                                    color="green" 
                                    type="submit" 
                                    :disabled="!!!fileName || !!!fileUpload || fileSelected_DD === 0 || !!!fileSelected_DD "
                                    :loading="buttonLoading"
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
                                accept=".docx , .doc , .pdf , .xlsx , .xls , .csv  "
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
                                v-model="fileSelected_DD"
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
                                    @click="fileEditDialog = false , fileUpload = null , fileName = '' " >
                                    ยกเลิก
                                </v-btn>
                                <v-btn 
                                    color="blue" 
                                    type="submit" 
                                    :loading="buttonLoading"
                                    :disabled="!!!fileName_DD "
                                > บันทึก </v-btn>
                            </div>
                        </v-form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
