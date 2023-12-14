<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import {ref , watch} from 'vue'

const tab = ref()

watch(tab , ()=>{
    if(tab.value === 'two'){

    }
    else if(tab.value === 'three'){

    }
})

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

const position = ref([    
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
          {
            name: 'Frozen Yogurt',
            url: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            position: 'ผู้อำนวยการ'
          },
        ])
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col w-full h-full ">
            <div class="w-full h-full flex flex-wrap ">

                <!-- Manage -->
                <div class="w-1/2 h-full overflow-auto border-2 border-gray-300">
                    <v-card class="h-full" color="">
                        <v-tabs
                            v-model="tab"
                            fixed-tabs
                            bg-color=""
                        >                                
                            <v-tab value="one">บุคลากรโรงเรียน</v-tab>
                            <v-tab value="two">คณะกรรมการศึกษาขั้นพื้นฐาน</v-tab>
                            <v-tab value="three">คณะกรรมการนักเรียน</v-tab>
                        </v-tabs>

                        <v-card-text class="h-full" >
                            <v-window v-model="tab" class="h-[96%]">
                                <v-window-item value="one" class="h-full" color="primary" >
                                    <div class="h-full w-full flex flex-col ">
                                        <!-- menu -->
                                        <div class="w-full h-auto flex flex-row justify-between">
                                            <div class="w-full px-2 flex flex-row gap-2" >
                                                <div class="w-full">
                                                    <v-select
                                                        label="Select Your position"
                                                        density="compact"
                                                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                                    ></v-select>
                                                </div>
                                                <div class="w-fit flex flex-row gap-1">
                                                    <v-btn class="w-fit" color="blue">
                                                        <v-icon icon="mdi-pencil"> </v-icon> 
                                                    </v-btn>
                                                    <v-btn class="w-fit" color="green">
                                                        <v-icon icon="mdi-plus"> </v-icon> 
                                                    </v-btn>
                                                    <v-btn class="w-fit" color="red">
                                                        <v-icon icon="mdi-delete"> </v-icon> 
                                                    </v-btn>
                                                </div>
                                            </div>
                                            <div class="w-fit">
                                                <div class="w-full flex justify-end">
                                                    <v-btn  color="green">
                                                        <v-icon icon="mdi-account"> </v-icon> เพิ่มบุคลากร
                                                    </v-btn>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- table -->
                                        <div class="w-full h-full overflow-hidden">
                                            <v-table 
                                                fixed-header
                                                class="h-full overflow-auto"
                                            >
                                                <thead >
                                                    <tr>
                                                        <th class="text-left">
                                                        ภาพ 
                                                        </th>
                                                        <th class="text-left">
                                                        ชื่อ
                                                        </th>
                                                        <th class="text-left">
                                                        ตำแหน่ง
                                                        </th>
                                                        <th class="text-center">
                                                        จัดการ
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        v-for="(item , i) in position"
                                                        :key="item.name"
                                                    >
                                                        <td>
                                                            <img class="w-10 h-10 object-cover" 
                                                            :src="item.url" alt="">    
                                                        </td>
                                                        <td>{{ i+1 }}. {{ item.name }}</td>
                                                        <td>{{ item. position}}</td>
                                                        <td>
                                                            <div class="w-full flex flex-row gap-2 justify-center">
                                                                <div class="text-blue-500 hover:text-blue-600 cursor-pointer">
                                                                    <v-icon icon="mdi-pencil"></v-icon>
                                                                </div>
                                                                <div class="text-green-500 hover:text-green-600 cursor-pointer">
                                                                    <v-icon icon="mdi-folder-move-outline"></v-icon>
                                                                </div>
                                                                <div class="text-red-500 hover:text-red-600 cursor-pointer">
                                                                    <v-icon icon="mdi-delete"></v-icon>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </div>
                                    </div>
                                </v-window-item>
                                
                                <v-window-item value="two">
                                    คณะกรรมการศึกษาขั้นพื้นฐาน
                                </v-window-item>

                                <v-window-item value="three">
                                    คณะกรรมการนักเรียน
                                </v-window-item>
                            </v-window>
                        </v-card-text>
                    </v-card>
                </div>

                <!-- Preview -->
                <div class="w-1/2 h-full bg-red-100 overflow-auto border-l-0 border-2 border-gray-300">
                    <div class="w-full bg-white h-full">
                        <v-card class="w-full h-full" color="">
                            <div class="w-full text-md h-[47px] flex justify-center items-center shadow-xl">
                                <v-icon icon="mdi-eye" class="mr-3"> </v-icon> ตัวอย่าง
                            </div>
                            <div class="w-full h-full p-4 bg-gray-50 overflow-auto">
                                <div class="w-full h-full">
                                    <div class="w-full ">
                                        <div class="h-full w-full flex flex-col justify-center items-center" 
                                        v-for="position of persons_position">
                                            <div class="w-full text-center text-lg py-4 flex flex-row justify-center">
                                                <p class="underline">
                                                    {{(position as any).title_position}} 
                                                </p>
                                            </div>
                    
                                            <div class="w-full h-full flex flex-wrap justify-center items-center gap-10 pb-10">                        
                                                <div class="relative w-[150px] h-[200px] flex flex-wrap justify-center mt-2" v-for="person of (position as any).persons">
                                                    <img class="object-cover rounded-lg w-[100px] h-[150px]" 
                                                    src="https://as2.ftcdn.net/v2/jpg/02/48/78/23/1000_F_248782375_WjBW5Bh0PSRQH9qflJ5wzsBJKVfX2OAP.jpg" alt="">
                                                    
                                                    <div class="absolute top-0 right-0 flex flex-col">
                                                        <div class="text-blue-500 hover:text-blue-600 cursor-pointer">
                                                            <v-icon icon="mdi-pencil"></v-icon>
                                                        </div>
                                                        <div class="text-red-500 hover:text-red-600 cursor-pointer">
                                                            <v-icon icon="mdi-delete"></v-icon>
                                                        </div>
                                                    </div>
                                                    <div class="w-full text-center text-sm mt-2">
                                                        <p>{{ person.name }}</p>
                                                        <p class="text-sm">{{ person.discript }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </div>
                </div>
            </div>
        </div>
    </AdminNavigationBar>
</template>