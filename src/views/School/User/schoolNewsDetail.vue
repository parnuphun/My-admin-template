<script setup lang="ts">
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import { ref , onMounted} from 'vue';
import { useRouter , useRoute} from 'vue-router';
import apiNamphong from '../../../services/api/api_namphong'
import { newsResponse } from '../../../store/Interface';

const router = useRouter()
const route = useRoute()

const _api = new apiNamphong()

interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    href: string;
}

 
const breadcrumb = ref<BreadcrumbItem[]>()
const content = ref()
const title = ref()
const date = ref()
const category = ref()
const author = ref()
onMounted(()=>{
    _api.clientGetNewsContent({news_id:Number(route.params.id)}).then((res)=>{
        if(res.data.status_code = 200){
            let data = ref<newsResponse>(res.data.contents)
            date.value = data.value.news_date
            
            category.value = data.value.news_category_name
            author.value = data.value.news_author
            content.value = data.value.news_contents
            title.value = data.value.news_topic
            document.title = title.value
            breadcrumb.value = [
                {
                    title: 'หน้าแรก',
                    disabled: false,
                    href: '/',
                },
                {
                    title: 'ข่าวสาร',
                    disabled: false,
                    href: '/news',
                },
                {
                    title: `${title.value}`,
                    disabled: true,
                    href: `/`,
                },
            ]
        }
    })
    
})



 
</script>

<template>
 
    <div class="h-full">
        <div class="flex flex-col w-full h-full relative ">        
            <NampongNavBar></NampongNavBar>
            <v-divider class="border-opacity-100"></v-divider>
            <div class="flex flex-col w-full h-full bg-pink-50 justify-center items-center">
                <div class="w-full h-full">
                    <div class="w-full h-full flex justify-center items-center  text-xl">
                        <div class="w-[1200px] h-full bg-white ">
                            <p class="text-xl h-full py-2 border-l-8 border-pink-500 flex items-center ">  
                                <v-breadcrumbs :items="breadcrumb">
                                    <template v-slot:title="{ item }">
                                        <div v-if="item.disabled === true">
                                            <p class="line-clamp-1  text-gray-500">
                                                {{ item.title }}
                                            </p>
                                        </div>
                                        <div v-else>
                                            <p class="min-w-max">
                                                {{ item.title }}
                                            </p>
                                        </div>
                                    </template>
                                </v-breadcrumbs>
                            </p>
                            <v-divider class="border-opacity-100"></v-divider>
                            <div class="w-full min-h-screen h-full flex flex-column justify-start items-start">
                                <div class="w-full bg-pink-900 text-white">
                                    <div class="w-full text-3xl flex justify-center items-center py-6 px-4  -white">
                                        {{ title }}
                                    </div>
                                    <div class="flex flex-wrap less:justify-start sm:justify-end mb-1 gap-2 px-4  -gray-100 mt-4 text-sm" >
                                        <v-icon>mdi-calendar</v-icon> วันที่ : {{ date }} 
                                        <v-icon>mdi-account</v-icon> โดย : {{ author }} 
                                        <v-icon>mdi-tag</v-icon>หมวดหมู่ : {{ category }}
                                    </div>
                                    <div class="w-full border-[1.5px] border-gray-300"> 
                                    </div>
                                </div>
    
                                <div class="ql-container mt-4 pb-6 px-4 w-full flex justify-center ">
                                    <div class="ql-editor">
                                        <div v-html="content"></div>
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