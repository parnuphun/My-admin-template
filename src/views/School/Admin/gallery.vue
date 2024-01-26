<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import pageDataStatus from '../../../components/layout/School/pageDataStatus.vue';
import { ref, onMounted ,watch} from 'vue'
import {activityImageResonse} from '../../../store/Interface'
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import { dataStatus , credential} from '../../../store/Interface';
import { reactive } from 'vue';

const _api = new apiNamphong()
const _msg = new MsgAlert()

const addNewDialog = ref(false)
const editDialog = ref(false)
const imagelistSatatus = ref<dataStatus>('no_data')

const credential = ref<credential>()
onMounted(()=>{
    document.title = 'รูปภาพกิจกรรม'
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    getAllData()
})

function getAllData(){
    if(searchValue.searchText === ''){
        // no value in seachValue the get common data
        getActivityLength();
        getActivityImage();
    }else{
        // triger seachValue for seaching next after change category id       
        searchValue.searchTriger = !searchValue.searchTriger
    }
}

const totalData = ref()
function getActivityLength(){
    _api.getActivityLength().then((res)=>{
        totalData.value = res.data.data_length
        totalPage.value = Math.ceil(totalData.value / sizeSelected.value)        
    })
}

// get activity image list 
const activityImagesList = ref<Array<activityImageResonse>>()
const imageDefaultPath = ref() 
function getActivityImage(){
    imagelistSatatus.value = 'loading_data'
    _api.getActivityImage({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.statusCode === 200 ){
            activityImagesList.value = res.data.activityImageData
            imageDefaultPath.value = res.data.fileUrl   
                 
            if(activityImagesList.value!.length > 0 ){
                imagelistSatatus.value = 'load_data_succ'
            }else{
                imagelistSatatus.value = 'no_data'
            }
        }else{
            imagelistSatatus.value = 'err_data'
        }
    }).catch(()=>{
         imagelistSatatus.value = 'network_err'
    })
}


// add new activity image
const activityImageName = ref()
const activityImageFile = ref()
const activityImageLink = ref()
function addNewActivityImage(){
    const formData = new FormData()
    formData.append('activity_image_name', activityImageName.value)
    formData.append('activity_image_link', activityImageLink.value)
    formData.append('activity_image_cover', activityImageFile.value[0])
    formData.append('credential_admin_fullname',credential.value!.user_fullname)
    
    _api.addNewActivityImage(formData).then((res)=>{
        if(res.data.status_code === 200) _msg.toast_msg({title:res.data.msg,timer:3,icon:'success',progressbar:true})
        else _msg.toast_msg({title:res.data.msg,timer:20,icon:'error',progressbar:true})
        getAllData();
        activityImageName.value=''
        activityImageLink.value=''
        activityImageFile.value=null
    })
}
//edit dialog 
const itemEdit = ref<activityImageResonse>()
function setData(item:activityImageResonse){
    itemEdit.value = item 
    activityImageName.value = item.activity_image_name // use activityImageName is a oldname temporary
    editDialog.value = true
}
function updateActivity(){
    const formData = new FormData()
    if(activityImageFile.value === null || activityImageFile.value === undefined){
        formData.append('activity_image_cover', 'no_image_upload') 
    }else{
        formData.append('activity_image_cover', activityImageFile.value[0])
    }
    formData.append('activity_image_name', itemEdit.value!.activity_image_name)
    formData.append('activity_image_old_name', activityImageName.value)
    formData.append('activity_image_old_image_cover', itemEdit.value!.activity_image_cover)
    formData.append('activity_image_id', String(itemEdit.value!.activity_image_id))
    formData.append('activity_image_link', itemEdit.value!.activity_image_link)
    formData.append('credential_admin_fullname',credential.value!.user_fullname)
    _msg.confirm('ต้องการบันทึกข้อมูลใช่ไหม').then((isConfirm)=>{     
        if(isConfirm){
            _api.updateActivity(formData).then((res)=>{
                if(res.data.status_code === 200 )_msg.toast_msg({title:res.data.msg,timer:3,icon:'success',progressbar:true})
                else _msg.toast_msg({title:res.data.msg,timer:20,icon:'error',progressbar:true})
                getAllData();
            })
        }
    })
}

//delete activity image 
function deleteActivityImage(id:number,image:string,name:string){
    _msg.confirm('ต้องการลบภาพกิจกรรมใช่ไหม').then((isConfirm)=>{
        if(isConfirm){
            _api.deleteActivityImage({
                activity_image_id:id,
                activity_image_cover_delete:image,
                credential_admin_fullname:credential.value!.user_fullname,
                activity_image_name:name
            }).then((res)=>{
                if(res.data.status_code === 200 )_msg.toast_msg({title:res.data.msg,timer:3,icon:'success',progressbar:true})
                else _msg.toast_msg({title:res.data.msg,timer:20,icon:'error',progressbar:true})
                getAllData();
            })
        }
    })
}



// open link
function openAlbum(url:string){
    window.open(url, '_blank')
}

function lightBox(url:string){
    _msg.lightBox(url,'900')
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
    getAllData()
})

// detect sizeSelected
watch(sizeSelected,()=>{
    pagination.value = 1 // reset
    changePage()
    getAllData()
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
        pagination.value = 1 // reset
        if(searchValue.searchText.trim() === ''){
            getAllData();
        }else{
            imagelistSatatus.value = 'loading_data'
            _api.searchActivityImage({search_keyword:searchValue.searchText,start_item:startItem.value,limit:sizeSelected.value}).then((res)=>{
                if(res.data.status_code === 200){                    
                    totalData.value = res.data.data_length
                    activityImagesList.value = res.data.data_list
                    totalPage.value = Math.ceil(totalData.value / sizeSelected.value)
                    
                      
                    if(activityImagesList.value!.length > 0 ){
                    imagelistSatatus.value = 'load_data_succ'
                    }else{
                        imagelistSatatus.value = 'no_data'
                    }
                }else{
                    imagelistSatatus.value = 'err_data'
                }
            }).catch((err)=>{
                    imagelistSatatus.value = 'network_err'
            })
        }
    },300)
})

</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col h-full ">
            <div class="w-full flex flex-wrap">
                <div class="w-full p-1 flex flex-col justify-start items-center gap-2">
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
                    <div class="w-full flex less:flex-wrap md:flex-row gap-2">
                        <v-btn
                            @click="addNewDialog = true" 
                            class=" h-full less:w-full sm:w-full md:w-auto"
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-image-plus-outline" class=""></v-icon> เพิ่มภาพกิจกรรม  
                            </p>
                        </v-btn>
                        <!-- <v-btn class="h-full less:w-full sm:w-full md:w-auto"
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-bullhorn-variant" class=""></v-icon> เพิ่มประกาศ  
                            </p>
                        </v-btn> -->
 
                    </div>
                </div>
            </div>
            <div class=" px-4">
               <p class="text-lg"> จำนวนรายการ : {{ totalData }}</p>
            </div>
            <v-divider class="border-opacity-100"></v-divider>
            <div class="flex flex-col gap-2 py-2 pr-2">
                <div class="w-full h-full flex flex-col gap-4 py-2 pr-2" v-if="imagelistSatatus === 'load_data_succ'">
                    <div class="flex less:flex-col sm:flex-row justify-center items-start group border-2 
                    border-gray-400 hover:border-pink-400 rounded-md shadow-md hover:shadow-lg hover:shadow-pink-200 duration-200" 
                    v-for="(item , i) in activityImagesList" :key="item.activity_image_id"
                    
                    >
                        <div class="less:w-full min-w-[300px] sm:w-[300px] h-[200px]">
                            <img v-if="item.activity_image_cover"
                            class="less:w-full min-w-[300px] sm:w-[300px] h-[200px] object-cover"
                            :src="imageDefaultPath+item.activity_image_cover" alt="">
                       
                        </div>
                        <div class="w-full h-full flex flex-col text-lg pl-6 pr-3 py-2 group-hover:text-pink-500 duration-50">
                            <div class="w-full h-full">
                                <p class="line-clamp-3">
                                    {{ (startItem) + i+1 }}. {{ item.activity_image_name }}
                                </p>
                                <p class="text-gray-600 text-lg mt-2">
                                    โพสต์วันที่ : {{  item.activity_image_date }}
                                </p>
                                <p class="text-gray-600 text-lg ">
                                    โดย : {{  item.activity_image_author }}
                                </p>
                            </div>
                            <div class="w-full h-full flex flex-row gap-2 justify-end items-end mt-2">
                                <v-btn
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="blue"
                                    @click="openAlbum(item.activity_image_link)"
                                >   
                                    ดูภาพกิจกรรม
                                </v-btn>
                                <v-btn
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="primary"
                                    @click="setData(item)"
                                >   
                                    แก้ไข
                                </v-btn>
                                <v-btn
                                    class="less:w-1/3 md:w-[120px] min-w-min"
                                    color="red"
                                    @click="deleteActivityImage(item.activity_image_id,item.activity_image_cover,item.activity_image_name)"
                                >   
                                    ลบ
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
                <pageDataStatus v-else :data-status="imagelistSatatus"></pageDataStatus>
            </div>
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

    <!-- add new file  -->
    <v-dialog
    persistent
    v-model="addNewDialog"
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
                        <v-form @submit.prevent="addNewActivityImage">
                            <v-file-input
                                accept="image/*"
                                placeholder="เลือกภาพกิจกรรม"
                                label="เลือกไฟล์"
                                v-model="activityImageFile"
                                class=""
                                show-size
                                name="activity_image_cover"
                                hide-details
                                variant="outlined"
                                prepend-icon=""
                            ></v-file-input>
                            <v-text-field
                                v-model="activityImageName"
                                label="ชื่อกิจกรรม"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="activityImageLink"
                                label="ลิงค์อัลบัม"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <div class="w-full mt-6 flex justify-center items-center gap-2">
                                <v-btn color="red"
                                     @click="addNewDialog = false , activityImageFile = null , activityImageName = '' , activityImageLink = ''" >
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="green" type="submit" :disabled="!!!activityImageFile || !!!activityImageName || !!!activityImageLink"
                                > เพิ่มรูปภาพกิจกรรม </v-btn>
                            </div>
                        </v-form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- edit file  -->
    <v-dialog
        persistent
        v-model="editDialog"
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
                        <v-form @submit.prevent="updateActivity">
                            <v-file-input
                                accept="image/*"
                                placeholder="เลือกภาพกิจกรรม"
                                label="เลือกไฟล์"
                                v-model="activityImageFile"
                                class=""
                                show-size
                                name="activity_image_cover"
                                hide-details
                                variant="outlined"
                                prepend-icon=""
                            ></v-file-input>
                            <v-text-field
                                v-model="itemEdit!.activity_image_name"
                                label="ชื่อกิจกรรม"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="itemEdit!.activity_image_link"
                                label="ลิงค์อัลบัม"
                                class="mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <div class="w-full mt-6 flex justify-center items-center gap-2">
                                <v-btn color="red"
                                     @click="editDialog = false , activityImageFile = null , activityImageName = ''" >
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="primary" type="submit" :disabled=" !!!itemEdit!.activity_image_name || !!!itemEdit!.activity_image_link"
                                > บันทึก </v-btn>
                            </div>
                        </v-form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
