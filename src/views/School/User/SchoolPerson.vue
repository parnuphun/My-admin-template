<script setup lang="ts">
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import { ref } from 'vue';

const breadcrumb = ref<Array<object>>([
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
    <div class="flex flex-col w-full relative">
        <NampongNavBar></NampongNavBar>
        <v-divider></v-divider>
        <div class="flex flex-col w-full h-full bg-pink-50 justify-center items-center">
            <div class="w-full h-full">
                <div class="w-full h-full flex justify-center items-center  text-xl">
                    <div class="w-[1000px] h-full bg-white">
                        <p class="text-xl py-4 border-l-8 border-pink-500 ">  
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
                        <v-divider></v-divider>
                        <div class="w-full flex flex-wrap justify-center items-center">
                            <div class="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full less:w-full h-full  p-8 
                            hover:bg-pink-400 duration-500 
                            hover:text-white cursor-pointer flex justify-center items-center shadow-md">
                                บุคลากรโรงเรียน
                            </div>
                            <div class="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full less:w-full h-full  p-8 
                            hover:bg-pink-400 duration-500 
                            hover:text-white cursor-pointer flex justify-center items-center shadow-md">
                                คณะกรรมการนักเรียน
                            </div>
                            <div class="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full less:w-full h-full  p-8 
                            hover:bg-pink-400 duration-500 
                            hover:text-white cursor-pointer flex justify-center items-center shadow-md">
                                คณะกรรมการศึกษาขั้นพื้นฐาน
                            </div>
                        </div>
                        <div class=" h-auto w-full flex flex-col justify-center items-center" v-for="position of persons_position">
                            <div class="w-full text-center text-2xl border-4 border-pink-300 py-4 bg-pink-100">
                                {{(position as any).title_position}}
                            </div>
    
                            <div class="w-full h-full flex flex-wrap justify-center items-center gap-10
                                border-x-4 border-pink-300 pb-10">                        
                                <div class="w-[200px] h-[330px] flex flex-wrap mt-2" v-for="person of (position as any).persons">
                                    <img class="object-cover rounded-lg w-[200px] h-[250px]" 
                                    src="https://as2.ftcdn.net/v2/jpg/02/48/78/23/1000_F_248782375_WjBW5Bh0PSRQH9qflJ5wzsBJKVfX2OAP.jpg" alt="">
                                    <div class="w-full text-center text-md mt-2">
                                        <p>{{ person.name }}</p>
                                        <p class="text-lg">{{ person.discript }}</p>
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