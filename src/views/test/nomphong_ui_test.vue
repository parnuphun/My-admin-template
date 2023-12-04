<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import {ref} from 'vue'

const tab = ref()

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
        <div class="flex flex-col w-full h-auto overflow-scroll">
            <div class="w-full h-full flex flex-wrap ">
                <div class="w-1/2 h-full">
                    <v-card>
                        <v-tabs
                        v-model="tab"
                        fixed-tabs
                        bg-color="">                                
                            <v-tab value="one">บุคลากรโรงเรียน</v-tab>
                            <v-tab value="two">คณะกรรมการศึกษาขั้นพื้นฐาน</v-tab>
                            <v-tab value="three">คณะกรรมการนักเรียน</v-tab>
                        </v-tabs>

                        <v-card-text>
                            <v-window v-model="tab">
                                <!-- บุคลากรโรงเรียน -->
                                <v-window-item value="one">
                                    <v-card>
                                        <div class="w-full h-auto p-2 flex flex-row justify-between">
                                            <div class="w-full px-2 flex flex-row gap-2" >
                                                <div class="w-full">
                                                    <v-select
                                                        label="Select Your position"
                                                        density="compact"
                                                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                                    ></v-select>
                                                </div>
                                                <div class="w-fit">
                                                    <v-btn  color="green">
                                                        <v-icon icon="mdi-plus"> </v-icon> เพิ่มตำแหน่ง
                                                    </v-btn>
                                                </div>
                                            </div>
                                            <div class="w-auto">
                                                <div class="w-full flex justify-end">
                                                    <v-btn  color="green">
                                                        <v-icon icon="mdi-account"> </v-icon> เพิ่ม
                                                    </v-btn>
                                                </div>
                                            </div>
                                        </div>
                                    </v-card>
                                    <v-table>
                                        <thead>
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
                                                v-for="item in position"
                                                :key="item.name"
                                            >
                                                <td>
                                                    <img class="w-10 h-10 object-cover" 
                                                    :src="item.url" alt="">    
                                                </td>
                                                <td>{{ item.name }}</td>
                                                <td>{{ item. position}}</td>
                                                <td>
                                                    <div class="w-full flex flex-row gap-2 justify-center">
                                                        <div class="text-blue-500 hover:text-blue-600 cursor-pointer">
                                                            <v-icon icon="mdi-pencil"></v-icon>
                                                        </div>
                                                        <div class="text-red-500 hover:text-red-600 cursor-pointer">
                                                            <v-icon icon="mdi-delete"></v-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-window-item>

                                <!-- คณะกรรมการศึกษาขั้นพื้นฐาน -->
                                <v-window-item value="two">
                                    คณะกรรมการศึกษาขั้นพื้นฐาน
                                </v-window-item>

                                <!-- คณะกรรมการนักเรียน -->
                                <v-window-item value="three">
                                    คณะกรรมการนักเรียน
                                </v-window-item>
                            </v-window>
                        </v-card-text>
                    </v-card>
                </div>
                <div class="w-1/2 h-full ">
                    <v-card>
                        <v-card>
                            <div class="w-full text-md py-5 flex justify-center">
                                    <v-icon icon="mdi-eye" class="mr-3"> </v-icon> ตัวอย่าง
                            </div>
                        </v-card>
                        <v-card class="h-full overflow-scroll">
                            <div class="flex flex-col h-full w-full">
                                <div class="w-full">
                                    <div class=" h-full w-full flex flex-col justify-center items-center" v-for="position of persons_position">
                                        <div class="w-full text-center text-md border-4 border-pink-300 py-4 bg-pink-100">
                                            {{(position as any).title_position}}
                                        </div>
                
                                        <div class="w-full h-full flex flex-wrap justify-center items-center gap-10
                                            border-x-4 border-pink-300 pb-10">                        
                                            <div class="w-[200px] h-[250px] flex flex-wrap justify-center mt-2" v-for="person of (position as any).persons">
                                                <img class="object-cover rounded-lg w-[150px] h-[200px]" 
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
                        </v-card>
                    </v-card>
                </div>
            </div>
        </div>
    </AdminNavigationBar>
</template>