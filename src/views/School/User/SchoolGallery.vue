<script setup lang="ts">
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import { ref , onMounted , watch } from 'vue';
import { useRouter } from 'vue-router';
import { activityImageResonse} from '../../../store/Interface'
import apiNamphong from '../../../services/api/api_namphong'

const _api = new apiNamphong()
const baseImagePath = ref()
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
        title: 'ภาพกิจกรรม',
        disabled: true,
        href: '/gallery',
    },
])

onMounted(()=>{
    document.title = 'ภาพกิจกรรม'
    getlength()
    getdata()
})

const totalList = ref()
function getlength(){
    _api.getActivityImageLengthClient().then((res)=>{
        if(res.data.status_code === 200){
            totalList.value = res.data.data_length
            totalPage.value = Math.ceil(totalList.value / sizeSelected.value)        
        }
    })
}

const activityImageList = ref<Array<activityImageResonse>>()
function getdata(){
    _api.getActivityImageListClient({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.status_code === 200){
            activityImageList.value = res.data.data_list
            baseImagePath.value = res.data.base_image_path
        }
    })
}

// open link
function openLink(url:string){
    window.open(url, '_blank')
}

// pagination 
const totalPage = ref()  
const size = ref([30,50,100]) // 
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
    getdata()
})

// detect sizeSelected
watch(sizeSelected,()=>{
    pagination.value = 1 // reset
    changePage()
    getdata()
})
</script>

<template>
    <div class="flex flex-col w-full relative min-h-screen">
        <NampongNavBar></NampongNavBar>
        <v-divider></v-divider>
        <div class="flex flex-col w-full h-full min-h-screen bg-pink-50 justify-start items-center">
            <div class="w-full h-full">
                <div class="w-full h-full flex justify-center items-center  text-xl">
                    <div class="w-[1000px] h-full bg-white">
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
                        <div class="flex flex-wrap">
                            <div class="w-full h-full flex flex-wrap justify-start items-center p-4">
                                <div v-for="item in activityImageList" class="relative group p-1
                                xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-full less:w-full 
                                xl:h-[300px] lg:h-[250px] md:h-[250px] less:h-[250px] 
                                cursur-pointer" @click="openLink(item.activity_image_link)">
                                    <img class="object-cover w-full h-full duration-500
                                                group-hover:brightness-50 cursor-pointer" 
                                    :src="baseImagePath+item.activity_image_cover" alt="">
                                    <div class="absolute w-full h-full p-3 text-white  top-0 flex justify-start items-end cursor-pointer
                                                scale-100 group-hover:scale-[1.01] duration-500 opacity-0 group-hover:opacity-100">
                                        <p class="line-clamp-3 text-lg">
                                        {{ item.activity_image_name }} 
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- grid masonry -->
                            <!-- <div class="p-5 md:p-10">
                                <div class="columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
                                    <img v-for="item of imageGallery" :src="item.url" alt="" />
                                </div>
                            </div> -->
                        </div>
                        <v-divider class="border-opacity-100"></v-divider>
                        <div class="mt-2 mb-4 w-full py-3">
                            <v-pagination
                                :length="totalPage"
                                v-model="pagination"
                                :total-visible="3"
                            ></v-pagination>
                        </div>
                    </div>
                </div>      
            </div>
        </div>
    </div>
    <NampongFooter class="mt-auto"></NampongFooter>
</template>