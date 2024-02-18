<script setup lang="ts">
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import { ref , onMounted , watch } from 'vue';
import { fileClientResponse} from '../../../store/Interface'
import apiNamphong from '../../../services/api/api_namphong'
import MsgAlert from '../../../services/msgAlert';

const _api = new apiNamphong()
const _msg = new MsgAlert()
interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    href: string;
}

// preview file 
function previewsFile(file_id:number , file_name_upload:string, ){
    _api.previewFileClient({file_id:file_id,file_name_upload:file_name_upload}).then((res)=>{
        console.log(res.data,'<=== res data');
                
        if(res.data.status) window.open(res.data.file_url, '_blank')
        else _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
    })
}

const breadcrumb = ref<BreadcrumbItem[]>([
    {
        title: 'หน้าแรก',
        disabled: false,
        href: '/',
    },
    {
        title: 'เอกสาร',
        disabled: true,
        href: '/files',
    },
])

onMounted(()=>{
    document.title = 'เอกสาร'
    getAllfilsClient()
})

const fileList = ref<Array<fileClientResponse>>()
function getAllfilsClient(){
    _api.getAllfilsClient().then((res)=>{
        if(res.data.status_code === 200){
            fileList.value = res.data.data_list
        }
    })
}

</script>

<template>
    <div class="flex flex-col w-full relative min-h-screen">
        <NampongNavBar></NampongNavBar>
        <v-divider class="border-opacity-100"></v-divider>
        <div class="flex flex-col w-full h-full min-h-screen bg-pink-50 justify-start items-center">
            <div class="w-full h-full">
                <div class="w-full h-full flex justify-center items-center  text-xl">
                    <div class="w-[1200px] h-full bg-white">
                        <p class="text-xl py-2 border-l-8 border-pink-500 ">  
                            <v-breadcrumbs :items="breadcrumb">
                                <template v-slot:title="{ item }">
                                    <div v-if="item.disabled === true">
                                        <p class="text-gray-500">
                                            {{ item.title }}
                                        </p>
                                    </div>
                                    <div v-else>
                                        <p class="">
                                            {{ item.title }}
                                        </p>
                                    </div>
                                </template>
                            </v-breadcrumbs>
                        </p>
                        <v-divider class="border-opacity-100"></v-divider>
                        <div class="w-full min-h-screen">
                            <div class="w-full flex flex-col gap-2 pb-4">
                                <div class="w-full"  v-for="category in fileList">
                                    <div class="w-full"  v-if="category.files_list.length > 0">
                                        <p class="text-xl pt-4 less:px-1 md:px-4">  
                                            {{category.category_name}}
                                        </p>
                                        <div class="w-full flex flex-col gap-1 px-2 pt-2">
                                            <div v-for="(file, i) in category.files_list"
                                            class="w-full flex flex-row justify-between text-[16px] border-2 border-gray-300 py-3
                                            hover:border-pink-400 hover:text-pink-400 cursor-pointer less:px-1 md:px-4 rounded-md" 
                                            @click="previewsFile(file.file_id,file.file_name_upload)">
                                                <div class="w-full line-clamp-1 pr-2">
                                                   {{ i+1 }}. {{ file.file_name }}
                                                </div>
                                                <div class="w-fit min-w-max">
                                                    {{ file.file_size }}
                                                </div>
                                            </div>
                                            <!-- <div class=" border-2 rounded-md w-full p-4 cursor-pointer
                                            hover:border-pink-400 hover:text-pink-400 hover:bg-gray-50"  
                                            v-for="file in category.files_list">
                                                <p class="text-sm ">{{ file.file_name }}</p>
                                                <p class="text-gray-600 text-[14px]">
                                                    วันที่ : {{ file.file_date }} ,
                                                    ชนิด : {{ file.file_type }} ,
                                                    ขนาด : {{ file.file_size }}</p>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NampongFooter></NampongFooter>
    </div>
</template>