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
          title: 'เกี่ยวกับ',
          disabled: true,
          href: '/about',
        },
      ])
</script>
<template>

    <NampongNavBar class="shadow-xl"></NampongNavBar>
    <v-divider></v-divider>
    <div class="flex flex-col w-full h-full bg-pink-900 justify-center items-center">
        <div class="w-full h-full">
            <div class="w-full h-full flex justify-center items-center  bg-white text-xl">
                <div class="w-[1000px] h-full ">
                    <p class="text-xl">  
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


                    <div class="px-24 mt-6">
                        <img class="w-full h-[350px] rounded-xl object-cover" src="https://scontent.fbkk8-4.fna.fbcdn.net/v/t39.30808-6/305080963_598372432080694_4418128457966245529_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFlOlKISoxHGEtEixh8iTsL2guWTnFxDrraC5ZOcXEOuqMwwrQM3XDAmLl7JQb4DyifrYDNnDqKHA_-RkhnYVW5&_nc_ohc=BByGHk94WisAX915pDs&_nc_ht=scontent.fbkk8-4.fna&oh=00_AfDX7hKxRnx6tOKLf5HDFQ3YCJYs2qbqiDBcT1-TLTR9RA&oe=6568747D" alt="">
                        <p class="mt-2">
                            โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
                            สังกัดฝ่ายบริหารการศึกษา สำนักปลัดเทศบาล  เทศบาลตำบลน้ำพอง
                            ตั้งอยู่ เลขที่ 29 หมู่ 15 ตำบลน้ำพอง อำเภอน้ำพอง จังหวัดขอนแก่น 40310    มีเนื้อที่ 21 ไร่ 17 ตารางวา เขตบริการคือหมู่บ้านในเขตเทศบาลตำบลน้ำพอง
                        </p>
                    </div>

                    <div class="w-full h-auto px-2 pb-10 mt-6">
                        <div class="py-4 ">
                            ประวัติความเป็นมา
                        </div>
                        <v-divider></v-divider>
                        <v-timeline align="start" side="end" truncate-line="end">
                            <v-timeline-item dot-color="pink">
                                <template v-slot:opposite>
                                    2456
                                </template>
                                <div>
                                    <p class="">
                                        ก่อตั้งเมื่อปีพุทธศักราช 2456 ที่วัดพุทธิโสยาราม (วัดท่าน้ำพองในปัจจุบัน) บ้านน้ำพอง ตำบลน้ำพอง อำเภอน้ำพอง จังหวัดขอนแก่น เป็นโรงเรียนประจำอำเภอน้ำพอง โดยมีพระภิกษุบุญมี แสงภา เจ้าคณะอำเภอน้ำพองในขณะนั้น เป็นครูผู้สอนและครูใหญ่คนแรก มีนายเคน ช่วยยา เป็นครูน้อย ทำหน้าที่สอนโดยไม่มีเงินเดือนหรือค่าตอบแทน เมื่อปีพุทธศักราช 2456 อำเภอน้ำพองได้จับจองที่ดินสาธารณะเป็นกรรมสิทธิ์ของโรงเรียน จำนวน 131 ไร่ 2 งาน ต่อมาได้แบ่งให้หน่วยงานต่าง ๆ ดังนี้
                                    </p>
                                    <ul class="pl-16 my-4">
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
     
</template>