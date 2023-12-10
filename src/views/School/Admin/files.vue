<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref} from 'vue'
const fileUploadDialog = ref(false)
const fileRenameDialog = ref(false)
const fileName = ref()
const fileUpload = ref()

function addNewFile(){

}

function fileRenam(fileid:number){

}

interface filesResponse {
    file_id : number,
    file_name : string,
    file_type : string,
    file_size : string,
    file_date : string,
    file_pin : boolean,
}

const files = ref<Array<filesResponse>>([
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdalse name file fil e sasd fil asdl asdSdalse name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)sssssssssssss_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : true
    },
    {
        file_id : 1,
        file_name : 'file name file fil e sasd fil asdl asdSdals;dkSADK:ASDKL:)_(*(^%))',
        file_type : 'pdf',
        file_size : '20KB',
        file_date : '19 พฤษภาคม 2566',
        file_pin : false
    },
    ])
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
                            <v-btn class="h-full" color="pink" size="large" @click="fileUploadDialog = !fileUploadDialog">
                                <p class="text-md" >
                                    <v-icon  icon="mdi-file"></v-icon>     เพิ่มไฟล์
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
                    <v-table class="h-[88%] overflow-y-scroll" fixed-header>
                        <thead>
                            <tr>
                                <th class="text-left w-10">
                                    #
                                </th>
                                <th class="text-left w-auto">
                                    ชื่อ
                                </th>
                                <th class="text-center w-32">
                                    ขนาดไฟล์
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
                                <td>
                                    <p class="line-clamp-1">
                                        {{ item.file_name }}
                                    </p>
                                </td>
                                <td class="text-center"> {{ item.file_size }} </td>
                                <td class="text-center"> {{ item.file_date }} </td>
                                <td class="flex justify-center">
                                    <div class="w-fit flex justify-center items-center gap-1">
                                        <v-switch
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
                                        <v-btn>
                                            <p class="text-yellow-500">
                                                <v-icon icon="mdi-eye"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn>
                                            <p class="text-green-500">
                                                <v-icon icon="mdi-download"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn @click="fileRenameDialog = !fileRenameDialog , fileRenam(item.file_id)">
                                            <p class="text-blue-500">
                                                <v-icon icon="mdi-pencil"></v-icon>
                                            </p>
                                        </v-btn>
                                        <v-btn>
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

    <!-- edit person -->
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
                                accept="image/*"
                                placeholder="เลือกภาพประจำตัว"
                                label="เลือกไฟล์"
                                v-model="fileUpload"
                                class=""
                                show-size
                                name="person_image"
                                hide-details
                                variant="outlined"
                                prepend-icon=""
                            ></v-file-input>
                            <v-text-field
                                v-model="fileName"
                                label="ชื่อไฟล์"
                                class="mt-2"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <div class="w-full mt-6 flex justify-center items-center gap-2">
                                <v-btn color="red"
                                    @click="fileUploadDialog = !fileUploadDialog" >
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="green" type="submit"
                                > เพิ่ม </v-btn>
                            </div>
                        </v-form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
