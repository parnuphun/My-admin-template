<script setup lang="ts">
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import { ref , onMounted ,watch} from 'vue';
import {personDirectoryTableTree , personCategory} from '../../../store/Interface'
import apiNamphong from '../../../services/api/api_namphong'
import MsgAlert from '../../../services/msgAlert';

const _api = new apiNamphong()
const _msg = new MsgAlert
const  baseImagePaht = ref()
const show = ref(false)

onMounted(()=>{
    document.title = 'ทำเนียบบุคลากร'
    getPersonCateListClient()
})

const selectedCategory =ref()
const dataTree = ref<Array<personDirectoryTableTree>>()
const categorList = ref<Array<personCategory>>()



function getPersonTreeclient(){
    _api.getPersonTreeclient({category_id:selectedCategory.value}).then((res)=>{
        if(res.data.status_code === 200){
            dataTree.value = res.data.person_data
            baseImagePaht.value = res.data.base_image_path
        }
    }) 
}

function getPersonCateListClient(){
    _api.getPersonCateListClient().then((res)=>{
        if(res.data.status_code === 200){
            categorList.value = res.data.position_category
            selectedCategory.value = categorList.value![0].pd_category_id  
            getPersonTreeclient()
        }
    })
}

watch(selectedCategory,()=>{
    getPersonTreeclient()
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
        title: 'บุคลากร',
        disabled: true,
        href: '/persons',
    },
])

// ส่งมาเป็น arr_obj
const persons_position = ref<Array<object>>([
    {
        id_position:'',
        title_position:'ผู้อำนวยการสถานศึกษา',
        persons:[{
            image:'',
            name:'นายเทพนคร นามวงษ์',
            discript:'09-6072-8034'
        }]
    },
    {
        id_position:'',
        title_position:'ครู วิทยฐานะชำนาญการพิเศษ',
        persons:[
            {
                image:'',
                name:'นางสุชาดา ลือเรื่อง',
                discript:'',
            },
            {
                image:'',
                name:'นางสาวอรอุมา เสติ',
                discript:'',
            },
        ]
    },
    {
        id_position:'',
        title_position:'ครู วิทยฐานะชำนาญการ',
        persons:[
            {
                image:'',
                name:'นางนารถยา นาหนองตูม',
                discript:'',
            },
            {
                image:'',
                name:'นางสาวเปียทิพย์ อุทัยอัน',
                discript:'',
            },
            {
                image:'',
                name:'นางสาวธนภรณ์ นาอุดม',
                discript:'',
            },
        ]
    },
    {
        id_position:'',
        title_position:'ครู',
        persons:[
            {
                image:'',
                name:'นางสาวปณิตา พุทไธสง',
                discript:'',
            },
            {
                image:'',
                name:'นายนัฐนนท์ เสาระโส',
                discript:'',
            },
            {
                image:'',
                name:'นายจรูญโรจน์ แก้วมาตย์',
                discript:'',
            },
            {
                image:'',
                name:'นายนิธิพันธ์ สิริเขมมะนันท์',
                discript:'',
            },
            {
                image:'',
                name:'นางสาวสุพัตรา ชินไธสงค์',
                discript:'',
            },
        ]
    },
    {
        id_position:'',
        title_position:'ผู้ช่วยเจ้าพนักงานการเงินและบัญชี',
        persons:[
            {
                image:'',
                name:'นางสาวเสาวลักษณ์ พลกุลภักดี',
                discript:'000-963-5252',
            },
        ]
    },
    {
        id_position:'',
        title_position:'ครูจ้างเหมาบริการ',
        persons:[
            {
                image:'',
                name:'นายอรรถพงษ์ ทะวิลา',
                discript:'',
            },
            {
                image:'',
                name:'นางสาวธัญญรัตน์ พรหมจารีย์',
                discript:'',
            },
            {
                image:'',
                name:'นางสาวไอยรา ศาลสกล',
                discript:'',
            },
        ]
    },
    {
        id_position:'',
        title_position:'ครูพี่เลี้ยง',
        persons:[
            {
                image:'',
                name:'นางสาววนิดา แดงงาม',
                discript:'',
            },
        ]
    },
    {
        id_position:'',
        title_position:'ภารโรง',
        persons:[
            {
                image:'',
                name:'นายทวีศักดิ์ ทีคอโงน',
                discript:'',
            },
            {
                image:'',
                name:'นายประยูร ขาวลา',
                discript:'',
            },
        ]
    },
    {
        id_position:'',
        title_position:'พนักงานขับรถ',
        persons:[
            {
                image:'',
                name:'นายบุญมี คุ้มโพธิ์น้อย',
                discript:'',
            },
        ]
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
                                v-model="selectedCategory"
                                label="ประเภท"
                                :items="categorList"
                                item-title="pd_category_name"
                                item-value="pd_category_id"
                                hide-details
                                density="comfortable"
                                variant="outlined"
                            >
                            </v-select>
                        </div>
                        <v-divider class="border-opacity-100"></v-divider>
                        <div class=" h-auto w-full flex flex-col justify-center items-center" v-for="position of dataTree">
                            <div class="w-full text-center text-2xl border-4 border-pink-300 py-4 bg-pink-100">
                                {{position.position_name}}
                            </div>
    
                            <div class="w-full h-full flex flex-wrap justify-center items-start gap-10
                                 border-pink-300 pb-2 pt-2">                        
                                <div class="w-[200px] max-h-min flex flex-col mt-2" v-for="person of position.persons">
                                    <div class="w-[200px] h-full ">
                                        <div class="border-2 w-[200px] h-[250px] rounded-lg relative">
                                            <img class="object-cover rounded-lg w-[200px] h-[250px]" 
                                            :src="baseImagePaht+person.pd_person_image" alt="">
                                            <div class="absolute rounded-md bg-white p-1 bottom-1 right-2">
                                                <v-icon class="text-pink-500">
                                                    mdi-magnify
                                                </v-icon>
                                                <v-tooltip activator="parent" location="bottom end">
                                                    <div v-if="person.pd_person_descript || person.pd_person_phone || person.pd_person_email"
                                                    class="text-left">
                                                        <p class="text-md">อีเมล : {{ person.pd_person_email }}</p>
                                                        <p class="text-md">เบอร์โทร : {{ person.pd_person_phone }}</p>
                                                        <p class="text-md">เพิ่มเติม : {{ person.pd_person_descript }}</p>
                                                    </div>
                                                    <div v-else>
                                                        <p class="text-md">ไม่มีข้อมูล</p>
                                                    </div>
                                                </v-tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full text-center mt-2">
                                        <p class="text-md">{{ person.pd_person_name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
        </div>
    </div>
    <NampongFooter class="mt-auto"></NampongFooter>
</template>