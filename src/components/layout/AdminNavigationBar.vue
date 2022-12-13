<script setup lang="ts">
import { onMounted, reactive, ref , watch } from 'vue';
import { navigationMenu  } from '../../plugin/navigationData'
import { useRouter , useRoute} from 'vue-router';
import { webSetting , layOutTheme } from '../../store/theme/themeData'
import { isRail } from '../../store/settingData'
import { useDisplay } from 'vuetify'

    const isDrawer = ref(true)
    const { mobile } = useDisplay ()
    // theme
    const rentTheme = ref('dark')
    let setting : webSetting = reactive({
        theme : 'light'
    })

    onMounted(()=>{
        console.log( setting.theme);
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
            <!-- side bar -->
                <v-navigation-drawer
                color=""
                :rail="isRail"
                expand-on-hover
                :elevation="2"
                >
                <div class="w-full h-16 mb-3 flex justify-center items-center text-white text-center bg-orange-500 shadow-lg">
                    <p class="text-3xl">LOGO</p>
                </div>

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




            <!-- nav bar -->
            <VAppBar :elevation="2" color="">
                <!-- toggle sidebar -->
                <v-app-bar-nav-icon  @click.stop="isRail = !isRail"></v-app-bar-nav-icon>

                <!-- theme mode -->
                <div class="w-full mr-6 flex flex-row justify-end">



                    <v-btn icon class="mr-3">
                        <v-badge content="999" color="error">
                            <v-icon>mdi-bell-outline</v-icon>
                        </v-badge>
                    </v-btn>

                    <v-btn icon>
                        <v-avatar
                            color="brown"
                            size=""
                            >
                            <span class="text-h5 p-1">ภน</span>
                        </v-avatar>
                    </v-btn>
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
            </VAppBar>

            <!-- Content here !!! -->
            <VMain>
                <div class="p-3 w-full h-full">
                    <slot></slot>
                </div>
            </VMain>
        </VApp>
    </VThemeProvider>
</template>
