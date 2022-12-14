<script setup lang="ts">
import { onMounted, reactive, ref , watch } from 'vue';
import { navigationMenu  } from '../../plugin/navigationData'
import { useRouter , useRoute} from 'vue-router';
import { webSetting , layOutTheme } from '../../store/theme/themeData'
import { isRail } from '../../store/settingData'

    const isOpenMenu = ref(false)
    const isDrawer = ref(true)
    // theme
    const rentTheme = ref('dark')
    let setting : webSetting = reactive({
        theme : 'light'
    })

    onMounted(()=>{
        // set default setting
        if(!localStorage.getItem('setting')){
            localStorage.setItem('setting',JSON.stringify(setting))
        }else{
            setting = JSON.parse(String(localStorage.getItem('setting')))
            rentTheme.value = setting.theme
        }
    })

    function changeTheme(theme:layOutTheme){
        setting.theme = theme
        rentTheme.value = setting.theme
        console.log(setting.theme);
        localStorage.setItem('setting',JSON.stringify(setting))
    }

    //route
    const routes_useRouter = useRouter()
    const currentPath = useRoute()

    function getCurrentPath(url:string){
        routes_useRouter.push(url)
    }


</script>

<template>
    <VThemeProvider :theme="rentTheme">
        <VApp >
            <!-- nav bar -->
            <v-app-bar :elevation="2" color="">
                <!-- toggle sidebar -->
                <v-app-bar-nav-icon  @click.stop="isRail = !isRail"></v-app-bar-nav-icon>

                <!-- content in nav -->
                <div class="w-full mr-6 flex flex-row items-center">

                    <v-app-bar-title color=""> ระบบติดตามความก้าวหน้างานวิจัย </v-app-bar-title>

                    <!-- message box -->
                    <v-menu :close-on-content-click="false" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props" class="mr-3">
                                <v-badge content="6" color="red">
                                    <v-icon>mdi-bell-outline</v-icon>
                                </v-badge>
                            </v-btn>
                        </template>

                        <v-card min-width="400">
                            <v-divider></v-divider>
                            <v-list density="compact">
                                <v-list-item
                                    title="กล่องข้อความ"
                                >
                                </v-list-item>
                                <v-divider></v-divider>

                                <v-list height="200">
                                    <v-list-item
                                        width="400"
                                        title="เสนอโครงการติดตามงานวิจัย"
                                        subtitle="โครงงานที่เสนอไปได้รับการตอบกลับแล้ว"
                                    >
                                        <template v-slot:prepend>
                                            <v-avatar color="red">
                                                <v-icon color="white">mdi-text-box-remove</v-icon>
                                            </v-avatar>
                                        </template>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item
                                        width="400"
                                        title="ผลประเมินการสอบ"
                                        subtitle="ผลการสอบโครงการในวันที่ 7 มกราคม 2566"
                                    >
                                        <template v-slot:prepend>
                                            <v-avatar color="green">
                                                <v-icon color="white">mdi-text-box-check</v-icon>
                                            </v-avatar>
                                        </template>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item
                                        width="400"
                                        title="มีวันที่กำหนดการสอบโครงการแล้ว"
                                        subtitle="กำหนดสอบวันที่ 7 มกราคม 2566"
                                    >
                                        <template v-slot:prepend>
                                            <v-avatar color="orange">
                                                <v-icon color="white">mdi-calendar-badge</v-icon>
                                            </v-avatar>
                                        </template>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item
                                        width="400"
                                        title="ถึงกำหนดวันสอบโครงการแล้ว"
                                        subtitle="โครงการ ระบบติดตามความก้าวหน้างานวิจัย"
                                    >
                                        <template v-slot:prepend>
                                            <v-avatar color="orange">
                                                <v-icon color="white">mdi-calendar-alert-outline</v-icon>
                                            </v-avatar>
                                        </template>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item
                                        width="400"
                                        title="เอกสารได้รับการตอบกลับจากอาจารย์ที่ปรึกษาแล้ว"
                                        subtitle="กำหนดสอบวันที่ 7 มกราคม 2566"
                                    >
                                        <template v-slot:prepend>
                                            <v-avatar color="green">
                                                <v-icon color="white">mdi-text-box-check</v-icon>
                                            </v-avatar>
                                        </template>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item
                                        width="400"
                                        title="มีโหัวข้อโครงการที่เสนอเข้ามาใหม่"
                                        subtitle="หัวข้อโครงการระบบติดตามความก้าวหน้างานวิจัย"
                                    >
                                        <template v-slot:prepend>
                                            <v-avatar color="orange">
                                                <v-icon color="white">mdi-account-arrow-right</v-icon>
                                            </v-avatar>
                                        </template>
                                    </v-list-item>
                                </v-list>
                            </v-list>
                        </v-card>
                    </v-menu>

                    <!-- user profile -->
                    <v-menu :close-on-content-click="false" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn  v-bind="props" icon >
                                <v-avatar
                                    color="brown"
                                    size=""
                                    >
                                    <span class="text-h5 p-1">ภน</span>
                                </v-avatar>
                            </v-btn>
                        </template>

                        <v-card min-width="300">
                            <v-list>
                            <v-list-item
                                prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                                title="ภานุพันธ์ นามวงษ์"
                                subtitle="นักศึกษา , ผู้พัฒนา"
                            >
                                <template v-slot:append>
                                <v-btn
                                    variant="text"
                                    icon="mdi-login"
                                ></v-btn>
                                </template>
                            </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                        </v-card>
                    </v-menu>



                    <!-- theme mode button switch -->
                    <!-- <v-btn-toggle
                        variant="outlined"
                        divided>
                        <v-btn
                            icon="mdi-brightness-5"
                            @click="changeTheme('light')"
                            :active="rentTheme === 'light'">
                        </v-btn>
                        <v-btn
                            icon="mdi-brightness-2"
                            @click="changeTheme('dark')"
                            :active="rentTheme === 'dark'">
                        </v-btn>
                    </v-btn-toggle> -->
                </div>
            </v-app-bar>

            <!-- side bar -->
            <v-navigation-drawer
                v-model="isRail"
                color=""
                :elevation="2"
                >
                <!-- <div class="w-full h-16 mb-3 flex justify-center items-center text-white text-center bg-orange-500 shadow-lg">
                    <p class="text-3xl">LOGO</p>
                </div> -->

                <!-- menu list -->
                <v-list class="" nav >
                    <div nav v-for="navItem of navigationMenu">
                        <v-list-item
                            :title="navItem.title"
                            @click="getCurrentPath(navItem.link)"
                            density="comfortable"
                            :value="navItem.id"
                            class="text-md my-1"
                            active-color=""
                            :prepend-icon="'mdi-'+navItem.icon"
                            :active="currentPath.path === navItem.link || (navItem.link === '/dashBoard' && currentPath.path === '/')"
                            rounded="">
                            <!-- <v-icon :icon="'mdi-'+navItem.icon" start></v-icon>{{navItem.title}} -->
                        </v-list-item>
                    </div>
                </v-list>
            </v-navigation-drawer>

            <!-- Content here !!! -->
            <VMain>
                <div class="p-3 w-full h-full">
                    <slot></slot>
                </div>
            </VMain>
        </VApp>
    </VThemeProvider>
</template>
