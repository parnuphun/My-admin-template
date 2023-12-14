<script setup lang="ts">
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import { ref } from 'vue';


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
            src:'/images/namphon_mockup/news/news01.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news04.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news02.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news03.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news01.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news04.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news02.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news03.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news01.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news04.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news02.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news03.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news01.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news04.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news02.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news03.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news01.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news04.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news02.jpg',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'/images/namphon_mockup/news/news03.jpg',
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