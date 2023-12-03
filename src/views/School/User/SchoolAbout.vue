<script setup lang="ts">
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import { ref } from 'vue';

const breadcrumb = ref<Array<object>>([
    {
        title: 'หน้าแรก',
        disabled: false,
        href: '/',
    },
    {
        title: 'เกี่ยวกับเรา',
        disabled: true,
        href: '/about',
    },
])
</script>
<template>
    <div class="flex flex-col w-full relative">        
        <NampongNavBar class=""></NampongNavBar>
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
                        <div class="md:px-16 lg:px-20 sm:px-10 less:px-2 xl:px-20 mt-6 mb-4">
                            <img class="w-full h-[350px] rounded-xl object-cover" src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/305080963_598372432080694_4418128457966245529_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFlOlKISoxHGEtEixh8iTsL2guWTnFxDrraC5ZOcXEOuqMwwrQM3XDAmLl7JQb4DyifrYDNnDqKHA_-RkhnYVW5&_nc_ohc=DR01omil4wYAX9ACQku&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDt0VLhEKWVk8YnEJflp0iVe2j9WnlvJxpWVLZDe_W9Ig&oe=65705D7D" alt="">
                            <p class="mt-2">
                                โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
                                สังกัดฝ่ายบริหารการศึกษา สำนักปลัดเทศบาล  เทศบาลตำบลน้ำพอง
                                ตั้งอยู่ เลขที่ 29 หมู่ 15 ตำบลน้ำพอง อำเภอน้ำพอง จังหวัดขอนแก่น 40310    มีเนื้อที่ 21 ไร่ 17 ตารางวา เขตบริการคือหมู่บ้านในเขตเทศบาลตำบลน้ำพอง
                            </p>
                        </div>
    
                        <div class="w-full h-auto ">
                            <div class="py-4 text-2xl pl-4 border-l-8 border-pink-500 ">
                                วิสัยทัศ
                            </div>
                            <v-divider></v-divider>
                            <div class="less:text-md md:text-xl xl:text-2xl text-center flex justify-center items-center w-full h-full py-10 
                            md:px-16 lg:px-20 sm:px-10 less:px-2 xl:px-20">
                                "โรงเรียนเป็นแปล่งเรียนรู้เชิงนิเวศ นักเรียนและครูร่วมกันเรียนรู้ ร่วมพัฒนาอย่างมีสุข ภายใต้การบริหารจัดการแบบมีส่วนร่วมโดยใช้โรงเรียนเป็นมาตรฐาน"
                            </div>
                        </div>
                        <div class="w-full h-auto pb-10 mt-6">
                            <div class="py-4 text-2xl pl-4 border-l-8 border-pink-500 ">
                                พันธกิจ
                            </div>
                            <v-divider></v-divider>
                            <div class="w-full h-auto py-3 md:px-16 lg:px-20 sm:px-10 less:px-2 xl:px-20 mt-4">
                                <div class="w-full relative mb-4">
                                    <div class="absolute w-10 h-10 flex justify-center items-center rounded-full 
                                    text-white text-xl -top-2 -left-2 border-2 border-pink-400 bg-pink-500">
                                        1
                                    </div>
                                    <div class="w-full h-auto py-4 pl-12 border-4 border-pink-500 rounded-xl pr-4">
                                        ผู้บริหารมีทักษะการบริหารที่เป็นระบบ มีภาวะผู้น้าทางวิชาการ มีคุณธรรม จริยธรรมและเป็นแบบอย่างที่ดี
                                    </div>
                                </div>
                                <div class="w-full relative mb-4">
                                    <div class="absolute w-10 h-10 flex justify-center items-center rounded-full 
                                    text-white text-xl -top-2 -left-2 border-2 border-pink-400 bg-pink-500">
                                        2
                                    </div>
                                    <div class="w-full h-auto py-4 pl-12 border-4 border-pink-500 rounded-xl pr-4">
                                        ครูมีสมรรถนะของครูผู้สอนในศตวรรษที่ 21 พัฒนาตนเอง พัฒนาวิชาชีพ 
                                        พัฒนานักเรียนและโรงเรียน ส่งเสริมการเรียนรู้เพื่อสร้างแรงบันดาลใจให้นักเรียน
                                        เป็นนวัตกร
                                    </div>
                                </div>
                                <div class="w-full relative mb-4">
                                    <div class="absolute w-10 h-10 flex justify-center items-center rounded-full 
                                    text-white text-xl -top-2 -left-2 border-2 border-pink-400 bg-pink-500">
                                        3
                                    </div>
                                    <div class="w-full h-auto py-4 pl-12 border-4 border-pink-500 rounded-xl pr-4">
                                        นักเรียนมีทักษะการเรียนรู้และนวัตกรรม ได้รับการพัฒนาทักษะการคิดขั นสูง
                                        คิดแก้ปัญหา คิดสร้างสรรค์ มีทักษะสารสนเทศ เทคโนโลยี มีทักษะชีวิต 
                                        ทักษะอาชีพ และมีคุณลักษณะอันพึงประสงค์
                                    </div>
                                </div>
                                <div class="w-full relative mb-4">
                                    <div class="absolute w-10 h-10 flex justify-center items-center rounded-full 
                                    text-white text-xl -top-2 -left-2 border-2 border-pink-400 bg-pink-500">
                                        4
                                    </div>
                                    <div class="w-full h-auto py-4 pl-12 border-4 border-pink-500 rounded-xl pr-4">
                                        ต้นสังกัดสนับสนุนงบประมาณ วัสดุ อุปกรณ์ ส่งเสริมและเข้ามามีส่วนร่วม 
                                        ในการพัฒนาผู้บริหาร ครูและบุคลากร
                                    </div>
                                </div>
                                <div class="w-full relative mb-4">
                                    <div class="absolute w-10 h-10 flex justify-center items-center rounded-full 
                                    text-white text-xl -top-2 -left-2 border-2 border-pink-400 bg-pink-500">
                                        5
                                    </div>
                                    <div class="w-full h-auto py-4 pl-12 border-4 border-pink-500 rounded-xl pr-4">
                                        ชุมชนและผู้ปกครองเข้ามามีส่วนร่วมในการจัดการเรียนรู้ ชุมชนเป็นแหล่งเรียนรู้ที่ดี
                                        ส้าหรับนักเรียน                                 
                                    </div>
                                </div>
                                <div class="w-full relative mb-4">
                                    <div class="absolute w-10 h-10 flex justify-center items-center rounded-full 
                                    text-white text-xl -top-2 -left-2 border-2 border-pink-400 bg-pink-500">
                                        6
                                    </div>
                                    <div class="w-full h-auto py-4 pl-12 border-4 border-pink-500 rounded-xl pr-4">
                                        มีการสร้างเครือข่าย ร่วมแลกเปลี่ยนเรียนรู้ ปรึกษาหารือ วางแผน มีการพัฒนาการ
                                        ท้างานร่วมกัน                             
                                    </div>
                                </div>
    
                            </div>
                        </div>
    
                        <div class="w-full h-auto pb-10">
                            <div class="py-4 text-2xl pl-4 border-l-8 border-pink-500 ">
                                ประวัติความเป็นมา
                            </div>
                            <v-divider></v-divider>
                            <v-timeline align="start" side="end" truncate-line="end" class="px-2">
                                <v-timeline-item dot-color="pink">
                                    <template v-slot:opposite>
                                        2456
                                    </template>
                                    <div>
                                        <p class="">
                                            ก่อตั้งเมื่อปีพุทธศักราช 2456 ที่วัดพุทธิโสยาราม (วัดท่าน้ำพองในปัจจุบัน) บ้านน้ำพอง ตำบลน้ำพอง อำเภอน้ำพอง จังหวัดขอนแก่น เป็นโรงเรียนประจำอำเภอน้ำพอง โดยมีพระภิกษุบุญมี แสงภา เจ้าคณะอำเภอน้ำพองในขณะนั้น เป็นครูผู้สอนและครูใหญ่คนแรก มีนายเคน ช่วยยา เป็นครูน้อย ทำหน้าที่สอนโดยไม่มีเงินเดือนหรือค่าตอบแทน เมื่อปีพุทธศักราช 2456 อำเภอน้ำพองได้จับจองที่ดินสาธารณะเป็นกรรมสิทธิ์ของโรงเรียน จำนวน 131 ไร่ 2 งาน ต่อมาได้แบ่งให้หน่วยงานต่าง ๆ ดังนี้
                                        </p>
                                        <ul class="xl:pl-16 my-4">
                                            <li>1. กรมชลประทานเพื่อจัดสร้างเขื่อนชลประทานหนองหวาย</li>
                                            <li>2. สำนักงานเทศบาลตำบลน้ำพอง</li>
                                            <li>3. ห้องสมุดประชาชนเฉลิมราชกุมารี อำเภอน้ำพอง</li>
                                            <li>4. สำนักงานเขตพื้นที่การศึกษาประถมศึกษาขอนแก่น เขต 4</li>
                                        </ul>
                                        <p>
                                            จึงเหลือเนื้อที่ของโรงเรียนเพียง 21 ไร่ 17 ตารางวา และได้ก่อสร้างอาคารเรียนถาวรแบบ ตึก ก. มี 5 ห้องเรียน ตามแบบของกระทรวงศึกษาธิการ                                            
                                        </p>
                                    </div>
                                    </v-timeline-item>
                                <v-timeline-item dot-color="pink">
                                    <template v-slot:opposite>
                                        2471
                                    </template>
                                    <div>
                                        <p>
                                            แล้วเสร็จเมื่อปีพุทธศักราช 2471 โดยได้รับพระราชทานชื่อโรงเรียนจากเจ้าฟ้าบริพัฒน์สุขุมพันธ์ กรมหลวงนครสวรรค์วรพินิจ พระราชโอรสในพระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว ชื่อ โรงเรียนประจำอำเภอน้ำพอง (น้ำพองภูริพัฒน์)                                        
                                        </p>
                                    </div>
                                </v-timeline-item>
                                <v-timeline-item dot-color="pink">
                                    <template v-slot:opposite>
                                        2480 
                                    </template>
                                    <div>
                                        <p>
                                            ปีพุทธศักราช 2480 ทางราชการได้เปลี่ยนชื่อใหม่เป็น โรงเรียนประชาบาลตำบลน้ำพอง (น้ำพองภูริพัฒน์)
                                        </p>
                                    </div>
                                </v-timeline-item>
                                <v-timeline-item dot-color="pink">
                                    <template v-slot:opposite>
                                        2512 
                                    </template>
                                    <div>
                                        <p>
                                            ปีพุทธศักราช 2512 มูลนิธิการศึกษามิตรภาพไทย - อเมริกา ได้จัดสร้างอาคารเรียนให้ 1 หลัง ปัจจุบันได้รื้อถอนแล้ว และเปลี่ยนชื่อดรงเรียนเป็น โรงเรียนน้ำพองภูริพัฒน์ มิตรภาพ 94 เปิดสอนชั้นประถมศึกษาปีที่ 1 ถึง 7
                                        </p>
                                    </div>
                                </v-timeline-item>
                                <v-timeline-item dot-color="pink">
                                    <template v-slot:opposite>
                                        2552 
                                    </template>
                                    <div>
                                        <p>
                                            วันที่ 31 มีนาคม พุทธศักราช 2552 โรงเรียนได้ถ่ายโอนจากสังกัดสำนักงานเขตพื้นที่การศึกษาขอนแก่น เขต 4 สำนักงานาคณะกรรมการการศึกษาขั้นพื้นฐาน กระทรวงศึกษาธิการ ไปสังกัดเทศบาลตำบลน้ำพอง กรมส่งเสริมการปกครองท้องถิ่น กระทรวงมหาดไทย และเปลี่ยนชื่อโรงเรียนเป็น โรงเรียนเทศบาลน้ำพองภูริพัฒน์
                                        </p>
                                    </div>
                                </v-timeline-item>
                                <v-timeline-item dot-color="pink">
                                    <template v-slot:opposite>
                                        ปัจจุบัน 
                                    </template>
                                    <div>
                                        <p>
                                            ปัจจุบันโรงเรียนเทศบาลน้ำพองภูริพัฒน์ จัดการเรียนการสอนในระดับอนุบาล ถึงชั้นประถมศึกษาปึที่ 6
                                        </p>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NampongFooter></NampongFooter>
    </div>
     
</template>