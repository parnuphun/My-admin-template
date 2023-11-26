<script setup lang="ts">
    import ListMenuBar from './ListMenuBar.vue';
</script>

<template>
    <VThemeProvider>
        <!-- Banner -->
        <div class="relative flex h-[140px] w-full justify-center items-cente">
            <div class="w-[1200px] h-full flex"> 
                <!-- logo -->
                <div class=" h-full w-[500px] min-w-min flex flex-row justify-center items-center bg-white">
                    <div class="h-[140px] w-[140px] flex justify-center items-center">
                        <img src="../../../../public/iamges/logo/logo_โรงเรียนเทศบาลน้ำพองภูริพัฒน์-removebg-preview.png" 
                            class="object-contain h-28 w-28">
                    </div>
                    <div class="h-full w-full min-w-min flex flex-col justify-center items-start pl-1">
                        <p class="LT:text-3xl TL:text-2xl MB:text-2xl "> โรงเรียนเทศบาลน้ำพองภูริพัฒน์ </p>
                        <p class="LT:text-2xl TL:text-xl MB:text-xl text-pink-500">ตำบลน้ำพอง จังหวัดขอนแก่น</p>
                    </div>
                </div>
            </div>

            <div class="absolute top-0 bg-pink-200 h-[140px] w-full -z-40 flex flex-row">
                <div class="relative bg-white h-full"></div>
                <div class="relative w-full bg-white -mt-3 h-full">
                    <Vue3Marquee class="">
                        <img height="300" width="300" class="object-fill" src="https://scontent.fbkk9-2.fna.fbcdn.net/v/t39.30808-6/402036530_837763171474951_4913158062763141975_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEkZlxnrNcc4SCc54rtsNxEOdDD2ihkcjE50MPaKGRyMSSpD58aqagevTdmjHuF8t2l05nGcsf6mIOtZGaIElHD&_nc_ohc=SbjxjvPA5FwAX8XY15T&_nc_ht=scontent.fbkk9-2.fna&oh=00_AfCgFE2T1L9MWt4C1Hwe5xI3IfjRauqd8PIyXyce7XfIdw&oe=6561B854" />
                        <img height="300" width="300" class="object-fill" src="https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.30808-6/357046603_760172159234053_344405825477498984_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHZrFGOR0tCqRajoNM8wt14M2Sfair1m6IzZJ9qKvWbonBX40S3Nu_keRO1jq-Hl4c-Z6agMSUqA6MmQpMuj5p2&_nc_ohc=4IjbfzR7Ht0AX80Ar8j&_nc_ht=scontent.fbkk12-3.fna&oh=00_AfAEPrpD8qKu96gJX8raPlp1N0FaYJhyCYnUmvJAZn-FiQ&oe=65613EA7" />
                        <img height="300" width="300" class="object-fill" src="https://scontent.fbkk9-2.fna.fbcdn.net/v/t39.30808-6/402090273_837790654805536_6351590619883052725_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG1KeFSnP9PgPbyyUNL6Kk56Y6rUcKZmO7pjqtRwpmY7luec-RsGNjm1uRZczmy3qw0tQyyw_hzq9JGQ8N7jTwB&_nc_ohc=YVWSf6LYQTIAX9LKep4&_nc_ht=scontent.fbkk9-2.fna&oh=00_AfBtMt6hJbIurUUt3sI_E-S0bsBF97tTWmEyt0XU9909Og&oe=6561D2E9" />
                        <img height="300" width="300" class="object-fill" src="https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/357409626_760801949171074_1967038367096623631_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHtKFILVRXtvayoJGh8OYSTqpRSDqLhO1iqlFIOouE7WOL5zwPNJFGr1BJqnFdD1-XpF63jsVmFwY2DC0hEGuzX&_nc_ohc=GNNB9UYZhoYAX_3ejyg&_nc_ht=scontent.fbkk12-1.fna&oh=00_AfCclHG2BPNnnz1-FmICqpg3tUA23ybeHYU-vvCzKCm32g&oe=6560782A" />
                        <img height="300" width="300" class="object-fill" src="https://scontent.fbkk8-2.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=d-2H4mu5RgkAX_ayg4P&_nc_ht=scontent.fbkk8-2.fna&oh=00_AfCw5E3XrJFxEe6y3YCvnvgI9uWm1jO69bpvO516Ol4ySA&oe=656121C1" />
                        <img height="300" width="300" class="object-fill" src="https://scontent.fbkk12-4.fna.fbcdn.net/v/t39.30808-6/324439941_702264214620598_4454263446789942189_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHPfcvjVrTbA_-jA9YPbe3-7nNqNq1MHmPuc2o2rUweY5X5Udpv5oc1yezy_Pf2MJ-0fOHliHQXKhuDxZf4bpzl&_nc_ohc=-RYPv2wyjTQAX9q4DhP&_nc_ht=scontent.fbkk12-4.fna&oh=00_AfDWXzxOcaoX6a_V0VZngiFO9f-netnQ2aXiB2CghIpjpw&oe=65617D47" />
                    </Vue3Marquee>
                    <div class="absolute w-full h-full bg-gradient-to-r from-white via-white z-50 top-3 right-0"></div>
                </div>
            </div>
        </div>

        <ListMenuBar></ListMenuBar>

        <!-- content -->
        <div class="flex w-full justify-center bg-pink-100 pt-4">
            <div class="flex flex-row h-[auto] p-2 w-[1200px]">
                <!-- menu -->
                <div class="flex flex-col w-auto p-1 rounded-lg bg-white">
                    <div class=" w-full h-auto mb-1" >
                        <img src="../../../../public/iamges/menubar/menu_pink.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/1.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/2.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/3.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/4.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/5.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/6.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/9.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/7.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/8.png" class="rounded-md"  alt="">
                    </div>
                    <div class=" w-full h-auto mb-1 cursor-pointer rounded-xl scale-100  hover:scale-[1.05] hover:z-50 transition delay-50 duration-500 ease-in-out " >
                        <img src="../../../../public/iamges/menubar/เทศบาลน้ำพอง.png" class="rounded-md"  alt="">
                    </div>
                    <iframe class="mb-2" src="https://calendar.google.com/calendar/embed?height=300&wkst=1&bgcolor=%23f9a8d4&ctz=Asia%2FBangkok&title=%E0%B8%9B%E0%B8%8F%E0%B8%B4%E0%B8%97%E0%B8%B4%E0%B8%99%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%9E%E0%B8%AD%E0%B8%87%E0%B8%A0%E0%B8%B9%E0%B8%A3%E0%B8%B4%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B9%8C&showDate=1&showTitle=1&showTabs=0&showTz=0&showCalendars=1&showPrint=0&src=cGFybnVwaHVuNTU1NUBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=a2t0ZWNoLmFjLnRoX2NsYXNzcm9vbTVmODY1NzVlQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=a2t0ZWNoLmFjLnRoX2NsYXNzcm9vbTJkMGIxZDBkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=a2t0ZWNoLmFjLnRoX2NsYXNzcm9vbTBhZTU3NGJjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=dGgudGgjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTA0NTU5Mzc2NjM2MzU4NjQwODA2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=a2t0ZWNoLmFjLnRoX2NsYXNzcm9vbTIzNGUzMGE1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%237986CB&color=%237986CB&color=%23263238&color=%23202124&color=%23a52714&color=%237986CB&color=%23a52714&color=%23004d40" style="border:solid 1px #777" width="300" height="300" frameborder="0" scrolling="no"></iframe>
                    <iframe class="mb-2" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpuripatschool2560%2F%3Flocale%3Dth_TH&tabs=timeline&width=300&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="300" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </div>
                <!-- main content -->
                <div class="flex w-5/6 px-2 rounded-lg">
                    <slot></slot>
                </div>
            </div>
        </div>

        <!-- footer -->
        <div class="flex flex-row w-full h-[50px] sticky top-[100vh] bg-pink-900 text-white justify-center items-center">
            <div class="">โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ตั้งอยู่ เลขที่ 29 หมู่ 15 ตำบลน้ำพอง อำเภอน้ำพอง จังหวัดขอนแก่น 40310 </div>
        </div>
    </VThemeProvider>
</template>