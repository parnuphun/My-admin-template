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
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=xwh050ZLQVsAX-GeRqj&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDNiAqp43Mk3pmgdttaTHbl8lCkwaGfYFlDMzoIsrhqUg&oe=6570DB1F'
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
                        <div class="w-full h-auto flex flex-wrap justify-start items-start">
                            <div class="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 less:w-full h-auto p-4 flex flex-col group cursor-pointer" v-for="news of newRelase">
                                <div class="w-full h-[200px] flex flex-col  ">
                                    <img class="w-full h-full object-cover group-hover:brightness-50 duration-500" 
                                    :src="(news as any).src" alt=""> 
                                </div>
                                <div class="w-full h-full flex flex-col justify-start items-start">
                                    <p class="px-2 text-xl line-clamp-1 mt-3 group-hover:text-pink-500 duration-500">
                                        {{ (news as any).title }}
                                    </p>
                                </div>
                                <div class="w-full h-full flex justify-start">
                                    <p class="px-2 text-sm line-clamp-1 text-gray-400  group-hover:text-pink-500 duration-500">
                                        {{ (news as any).date }}
                                    </p>
                                </div>
                                <div class="w-full h-[80px]">
                                    <p v-if="(news as any).description != ''" 
                                    class="px-2 text-sm line-clamp-3 mt-3 group-hover:text-pink-500 duration-500">
                                        {{ (news as any).description }}
                                    </p>
                                    <p v-else
                                    class="px-2 text-sm text-gray-400 line-clamp-3 mt-3 group-hover:text-pink-500 duration-500">
                                        ไม่มีคำอธิบาย
                                    </p>
                                </div>
                                <div class="px-2 w-full text-white bg-pink-400 hover:bg-pink-500 p-3 text-center mt-3 cursor-pointer duration-500">
                                    อ่านเพิ่มเติม
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
    </div>
</template>