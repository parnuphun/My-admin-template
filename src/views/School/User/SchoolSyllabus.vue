<script setup lang="ts">
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import { ref , onMounted ,watch} from 'vue';
import { syllabusResponse} from '../../../store/Interface'
import apiNamphong from '../../../services/api/api_namphong'
import MsgAlert from '../../../services/msgAlert';

const _api = new apiNamphong()
const _msg = new MsgAlert
const  baseImagePaht = ref()

onMounted(()=>{
    document.title = 'หลักสูตร'
    getSyllabusClient()
})

const classSelected =ref()
const tableSelected =ref()
const crrImg = ref()
const syllabusList = ref<Array<syllabusResponse>>()

 
function getSyllabusClient(){
    _api.getSyllabusClient().then((res)=>{
        if(res.data.status_code === 200){
            syllabusList.value = res.data.data_list
            baseImagePaht.value = res.data.base_image_path   
            tableSelected.value = syllabusList.value![0].syllabus_id
            crrImg.value = syllabusList.value![0].syllabus_name
        }
    })
}

 

watch(classSelected,()=>{
    crrImg.value = ''
    tableSelected.value = ''
    getSyllabusClient()
})

watch(tableSelected,()=>{
    let index = syllabusList.value!.findIndex(obj => obj.syllabus_id === tableSelected.value);
    crrImg.value = syllabusList.value![index].syllabus_image
})
 

interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    href: string;
}

const breadcrumb = ref<BreadcrumbItem[]>([
    {
        title: 'หน้าแรก',
        disabled: false,
        href: '/',
    },
    {
        title: 'ตารางสอน',
        disabled: true,
        href: '/teachingS',
    },
])
 

</script>
<template>
    <div class="flex flex-col w-full relative min-h-screen">
        <NampongNavBar></NampongNavBar>
        <v-divider class="border-opacity-100"></v-divider>
        <div class="flex flex-col w-full h-full min-h-screen bg-pink-50 justify-start items-center">
            <div class="w-full h-full min-h-screen">
                <div class="w-full h-full flex justify-center items-center text-xl">
                    <div class="w-[1200px] h-full min-h-screen bg-white">
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
                        <div class="w-full flex flex-wrap justify-center items-center p-2">
                            <v-select
                                v-model="tableSelected"
                                label="รายการ"
                                :items="syllabusList"
                                item-title="syllabus_name"
                                item-value="syllabus_id"
                                hide-details
                                density="comfortable"
                                variant="outlined"
                            >
                            </v-select>
                        </div>
                        <v-divider class="border-opacity-100"></v-divider>
                        <div class="w-full h-full p-2">
                            <div class="w-full h-full border-2 flex justify-center">
                                <img :src="baseImagePaht+crrImg" alt="">
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
        </div>
    </div>
    <NampongFooter class="mt-auto"></NampongFooter>
</template>