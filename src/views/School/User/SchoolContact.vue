<script setup lang="ts">
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
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
          title: 'ติดต่อเรา',
          disabled: true,
          href: '/about',
        },
      ])
</script>

<template>
    <div class="flex flex-col w-full relative">
        <NampongNavBar></NampongNavBar>
        <v-divider class="border-opacity-100"></v-divider>
        <div class="flex flex-col w-full h-full bg-pink-50 justify-center items-center">
            <div class="w-full h-full">
                <div class="w-full h-full flex justify-center items-center  text-xl">
                    <div class="w-[1000px] h-full bg-white">
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
                        
                        <div class="w-full h-autp flex flex-col items-center justify-center px-14">
                            <div class="text-2xl text-center flex justify-center items-center w-full h-auto">
                                <div class="flex flex-wrap justify-center items-center w-full">
                                     <div class="w-auto">

                                     </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-auto ">
                            <v-divider class="border-opacity-100"></v-divider>
                            <div class="py-4 text-2xl pl-4 border-l-8 border-pink-500 ">
                                แผนผังโรงเรียน
                            </div>
                            <v-divider class="border-opacity-100"></v-divider>
                            <div class="text-2xl text-center flex justify-center items-center w-full h-auto p-6">
                                <div class="flex flex-col justify-center items-center w-full">
                                    <img src="/images/namphon_mockup/namphong_school_map.png" alt="" class="rounded-sm">
                                </div>
                            </div>
                        </div>

                        <div class="w-full h-auto ">
                            <v-divider class="border-opacity-100"></v-divider>
                            <div class="py-4 text-2xl pl-4 border-l-8 border-pink-500 ">
                                แผนที่
                            </div>
                            <v-divider class="border-opacity-100"></v-divider>
                            <div class="text-2xl text-center flex justify-center items-center w-full h-[500px]">
                                <div class="w-full h-full p-3">
                                    <iframe class="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15283.8701330741!2d102.8032608!3d16.7284717!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312257d8d3dac247%3A0xa51a22cdfef48f19!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4LmA4LiX4Lio4Lia4Liy4Lil4LiZ4LmJ4Liz4Lie4Lit4LiH4Lig4Li54Lij4Li04Lie4Lix4LiS4LiZ4LmM!5e0!3m2!1sth!2sth!4v1700965260491!5m2!1sth!2sth" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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