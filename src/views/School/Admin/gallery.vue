<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref, onMounted } from 'vue'
import {activityImageResonse} from '../../../store/Interface'
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
 
const _api = new apiNamphong()
const _msg = new MsgAlert()

const addNewDialog = ref(false)


onMounted(()=>{
    document.title = 'ภาพกิจกรรม'
    getActivityImage()
})

// get activity image list 
const activityImagesList = ref<Array<activityImageResonse>>()
const imageDefaultPath = ref() 
function getActivityImage(){
    _api.getActivityImage().then((res)=>{
        activityImagesList.value = res.data.activityImageData
        imageDefaultPath.value = res.data.fileUrl        
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
    
    _api.addNewActivityImage(formData).then((res)=>{
        if(res.data.statusCode === 200) _msg.toast_msg({title:res.data.msg,timer:3,icon:'success',progressbar:true})
        else _msg.toast_msg({title:res.data.msg,timer:5,icon:'error',progressbar:true})
        getActivityImage();
        activityImageName.value=''
        activityImageLink.value=''
        activityImageFile.value=null

    })
}

//delete activity image 
function deleteActivityImage(id:number,image:string){
    _msg.confirm('ต้องการลบภาพกิจกรรมใข่หรือไม่').then((isConfirm)=>{
        if(isConfirm){
            _api.deleteActivityImage({activity_image_id:id,activity_image_cover_delete:image}).then((res)=>{
                if(res.data.statusCode === 200 )_msg.toast_msg({title:res.data.msg,timer:3,icon:'success',progressbar:true})
                else _msg.toast_msg({title:res.data.msg,timer:5,icon:'error',progressbar:true})
                getActivityImage();
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
                        <div class="flex h-full items-start justify-center ">
                            <v-btn class="h-full" color="pink" size="large" @click="addNewDialog = true">
                                <p class="text- -500 text-md" >
                                    <v-icon  icon="mdi-image-plus"></v-icon> เพิ่มรูปภาพ
                                </p>
                            </v-btn>
                        </div>
                    </div>
                    <div class="w-fit">
                        <v-pagination density="comfortable" :length="4"></v-pagination>
                    </div>
                </div>
                <!-- table -->
                <div class="bg-white w-full h-full pb-4 border-b-2 ">
                    <v-table class="h-[90%] overflow-y-scroll" fixed-header>
                        <thead>
                            <tr>
                                <th class="text-left w-10">
                                    #
                                </th>
                                <th class="text-center w-[370px]">
                                    รูปภาพ
                                </th>
                                <th class="text-left w-auto">
                                    ชื่อ
                                </th>
                                <th class="text-center w-40 ">
                                    วันที่
                                </th>
                                <th class="text-center w-44">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover:bg-gray-100"
                                v-for="(item , i) in activityImagesList"
                                :key="item.activity_image_id"
                            >
                                <td> {{ i+1 }} </td>
                                <td class="py-2">
                                    <img class="h-[200px] w-[350px] object-cover scale-100 hover:scale-[1.03]
                                    rounded-lg duration-300 cursor-pointer"
                                    @click="lightBox(imageDefaultPath+item.activity_image_cover)"
                                    :src="imageDefaultPath+item.activity_image_cover" alt="">
                                </td>
                                <td class="text-left"> {{ item.activity_image_name }} </td>
                                <td class="text-center"> {{ item.activity_image_date }} </td>
                                
                                <td>
                                    <div class="w-fit flex flex-row justify-end items-center gap-1">
                                        <v-btn @click="openAlbum(item.activity_image_link)">
                                            <p class="text-yellow-600">
                                                <v-icon icon="mdi-link-variant"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn >
                                            <p class="text-blue-500">
                                                <v-icon icon="mdi-pencil"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn @click="deleteActivityImage(item.activity_image_id , item.activity_image_cover)">
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
</template>
