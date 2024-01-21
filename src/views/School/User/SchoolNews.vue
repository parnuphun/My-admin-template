<script setup lang="ts">
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import { ref , onMounted , watch } from 'vue';
import { useRouter } from 'vue-router';
import { newsResponse} from '../../../store/Interface'
import apiNamphong from '../../../services/api/api_namphong'

const _api = new apiNamphong()


interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    href: string;
}

onMounted(()=>{
    document.title = 'ข่าวสาร'
    getNewsLengthClient()
    getNewsList()
})

const router = useRouter()
const breadcrumb = ref<BreadcrumbItem[]>([
    {
        title: 'หน้าแรก',
        disabled: false,
        href: '/',
    },
    {
        title: 'ข่าวสาร',
        disabled: true,
        href: '/about',
    },
])

const totalList = ref()
function getNewsLengthClient(){
    _api.getNewsLengthClient().then((res)=>{
        if(res.data.status_code === 200){
            totalList.value = res.data.data_length
            totalPage.value = Math.ceil(totalList.value / sizeSelected.value)        
        }
    })
}

const newsList = ref<Array<newsResponse>>()
const baseImagePath = ref()
function getNewsList(){
    _api.getNewsListClient({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.status_code === 200){
            newsList.value = res.data.news_data_list
            baseImagePath.value = res.data.base_image_path
        }
    })
}

function getCurrentPath(url:string){
    router.push(url)
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
    getNewsList()
})

// detect sizeSelected
watch(sizeSelected,()=>{
    pagination.value = 1 // reset
    changePage()
    getNewsList()
})
</script>

<template>
    <div class="flex flex-col w-full relative">        
        <NampongNavBar></NampongNavBar>
        <v-divider></v-divider>
        <div class="flex flex-col w-full h-full bg-pink-50 justify-center items-center">
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
                        <div class="w-full h-auto flex flex-wrap justify-start items-start">
                            <div class="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-1/2 less:w-1/2 h-auto xl:p-4 flex flex-col 
                            group  cursor-pointer less:px-2" 
                            v-for="item in newsList"  @click="getCurrentPath(`/news/${item.news_id}`)">
                                <div class="w-full less:w-full less:h-[200px] xl:h-[200px] flex flex-col">
                                    <img class="w-full h-full object-cover group-hover:brightness-50 duration-500" 
                                    v-if="item.news_cover_image !== 'no_image_upload'"
                                    :src="baseImagePath + item.news_cover_image" alt=""> 
                                    <img v-else class="w-full h-full object-cover group-hover:brightness-50 duration-500" 
                                    src="/images/namphong_default_cover_image.jpg" alt=""> 
                                </div>
                                <div class="w-full flex flex-col justify-start items-start min-h-[100px] max-h-[100px]">
                                    <p class="px-2 text-xl line-clamp-3 mt-3 group-hover:text-pink-500 duration-500">
                                        {{ item.news_topic }}
                                    </p>
                                </div>
                                <div class="w-full h-full flex justify-start">
                                    <p class="px-2 text-sm line-clamp-1 text-gray-400  group-hover:text-pink-500 duration-500">
                                        {{ item.news_date }}
                                    </p>
                                </div>
                                <div class="px-2 w-full mb-4 text-white bg-pink-400 hover:bg-pink-500 p-3 text-center mt-3 cursor-pointer duration-500">
                                    อ่านเพิ่มเติม
                                </div>
                            </div>
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
         
        <NampongFooter></NampongFooter>
    </div>
</template>