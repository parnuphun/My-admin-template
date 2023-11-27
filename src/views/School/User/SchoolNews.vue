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
        title: 'ข่าวสาร',
        disabled: true,
        href: '/about',
    },
])

const newRelase = ref<Array<Object>>([        
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/404925905_840352024549399_2114780980272238387_n.jpg?stp=dst-jpg_p843x403&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFJfNTo9TIX-gDGzJ_N4MlF1BGHi-ciH6fUEYeL5yIfp-YqYzW-Tevo_ZwWKkbN2DlJPakENcGsAbl4AbfTa2Q3&_nc_ohc=xtiN3kZCCr8AX9X7JRC&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCNqvYHL-266EOE1Lra8K5bsmaMAEzsd3F-Rud-zQPTYg&oe=6566C825',
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/401074028_833968698521065_2274648922490442338_n.jpg?stp=dst-jpg_p843x403&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGn74tnpkhYYeu1tHnzLuzyFodigpZMPP0Wh2KClkw8_bmpQjoIEWrEwfMES6gw7U76XOC6YFa0DVNi_cGDPxvu&_nc_ohc=OtA_fAHBrZMAX8PyEbK&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCiqVoTchopArIoDA72Ww6XS_KNjO3NQg3BmPjZEFP-Gw&oe=65668E19'
        },
        {
            title:'ประกาศเปิดเทอมภาคเรียนที่ 2 ',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/397895158_828144389103496_8407568675394802648_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGytcZnZEaG-Zfph2-fdjEYKXjb7Ipxro4peNvsinGujp7RWXblvutW0NHY5UAnMrHMn4PLt1Tf4rZuUXoFyIic&_nc_ohc=jMNpx-3t6XAAX_k3oP6&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUCrKRqKdgDu_4V5b2HjKuN5ypZSMZj7Tn2qJYAQgY7g&oe=6566DCDB'
        },
        {
            title:'ผู้อำนวยการสถานศึกษาเชี่ยวชาญ ในโอกาสที่ย้ายมาดำรงตำแหน่ง ผู้อำนวยการสถานศึกษา ',
            date:'26 พฤศจิกายน 2566',
            description:`วันที่ ๗ ตุลาคม ๒๕๖๖
ผู้บริหารเทศบาลตำบลน้ำพอง คณะกรรมการสถานศึกษาขั้นพื้นฐาน ครู บุคลากรทางการศึกษา นักเรียนและผู้ปกครองโรงเรียนเทศบาลน้ำพองภูริพัฒน์ ให้การต้อนรับ และแสดงความยินดีกับ นายเทพนคร  นามวงษ์  ตำแหน่ง ผู้อำนวยการสถานศึกษา วิทยฐานะ ผู้อำนวยการสถานศึกษาเชี่ยวชาญ ในโอกาสที่ย้ายมาดำรงตำแหน่ง ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#โรงเรียนเทศบาลน้ำพองภูริพัฒน์
#สังกัดเทศบาลตำบลน้ำพอง`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/386512026_814531057131496_4379709893718073259_n.jpg?stp=dst-jpg_p600x600&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGv5fSTIQ54eHWDi37U7tqyOMTBeYEG1Es4xMF5gQbUS0Xp7C3p1qXTtUy87sJ-2nlzjK4y9NRO_391faZCxdPv&_nc_ohc=egrJejoJ0ocAX-m-Dtv&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDHRIsY3YDIyjXAAEMKM7_bfUqWDhWrKjXu-LmbDSpacA&oe=65676CB7'
        },
        {
            title:'กิจกรรมประชุมผู้ปกครองประจำภาคเรียนที่ ๑ ปีการศึกษา ๒๕๖๖  ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เรียนเชิญผู้ปกครองนักเรียนร่วมกิจกรรมประชุมผู้ปกครองประจำภาคเรียนที่ ๑ ปีการศึกษา ๒๕๖๖ ในวันที่ ๒๕ มิถุนายน ๒๕๖๖ ณโรงเรียนเทศบาลน้ำพองภูริพัฒน์  เวลา ๐๙.๐๐ น. - ๑๒.๐๐ น.
ขอความกรุณาผู้ปกครองนำใบเสร็จรับเงินมารับค่าเครื่องแบบนักเรียน และค่าอุปกรณ์การเรียนดังนี้
🌟ระดับอนุบาล
           ✳️ค่าเครื่องแบบนักเรียน 325 บาท
           ✳️ค่าอุปกรณ์การเรียน 145 บาท
🌟ระดับประถมศึกษา 
           ✳️ค่าเครื่องแบบนักเรียน 400 บาท
           ✳️ค่าอุปกรณ์การเรียน    220 บาท
และนำสำเนาบัตรประจำตัวประชาชนของผู้ปกครองและของนักเรียนมาด้วยนะครับ`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/356219678_757258679525401_7384937705460787692_n.jpg?stp=dst-jpg_p843x403&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFkVrVYM4dgRCQ8u2sjZASuPYY8TsyazCQ9hjxOzJrMJHmcQK1Qx45CsromLr0bLxOZKWSJ28vItZQh9r2jlCXV&_nc_ohc=oHrVx3P4CCgAX8akGy6&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCVk6oVjDeS6Wpu4-yLE3HKccTSDUB82Yp4y5Jodb6ttQ&oe=65672E53'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        }
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
                    
                    <div class="w-full h-auto flex flex-wrap gap-8 justify-center items-center pt-4" >
                        <div v-for="item of newRelase"
                            class="w-[300px] h-[380px] bg-white rounded-md flex flex-col shadow-xl
                            scale-100 hover:scale-[1.01] duration-500 group cursor-pointer">
                            <div class="w-full h-[200px] group-hover:brightness-[0.5] duration-500" >
                                <img
                                class="object-cover w-full h-full rounded-t-md" 
                                :src="(item as any).src" alt="image">
                            </div>
                            <div class="w-full p-3">
                                <p class="line-clamp-1 text-lg">{{ (item as any).title }}</p>
                            </div>
                            <div class="w-full px-2">
                                <p class="text-sm text-gray-400">{{ (item as any).date }}</p>
                            </div>
                            <div class="w-full h-full p-3">
                                <p class="text-sm line-clamp-3 " v-if="(item as any).description !== ''">
                                    {{ (item as any).description }}
                                </p>
                                <p class="text-sm line-clamp-3 text-gray-400" v-else>
                                    -- ไม่มีคำอธิบายเพิ่มเติม --
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2 mb-4 w-full py-3">
                        <v-pagination
                            :length="4"
                            rounded="circle"
                        ></v-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <NampongFooter></NampongFooter>
</template>