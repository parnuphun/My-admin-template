<script setup lang="ts">
import { onMounted, reactive, ref , toRaw } from 'vue';
import { navigationMenu  } from '../../plugin/navigationData'
import { useRouter , useRoute} from 'vue-router';
import { webSetting , layOutTheme } from '../../store/theme/themeData'


    const drawer = ref(true)

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
            <VNavigationDrawer color="" v-model="drawer" :elevation="2" >

                <div class="w-full text-center mt-5 mb-3">
                    <p class="text-6xl"> Logo </p>
                </div>

                <!-- menu list -->
                <v-list density="compact" class="px-5" >
                    <v-list-subheader>เมนู</v-list-subheader>
                    <div class="" v-for="navItem of navigationMenu">
                        <v-list-item
                            @click="getCurrentPath(navItem.link)"
                            density="comfortable"
                            :value="navItem.id"
                            class="text-md my-1"
                            active-color=""
                            :active="currentPath.path === navItem.link || (navItem.link === '/dashBoard' && currentPath.path === '/')"
                            rounded="xl">
                            <v-icon :icon="'mdi-'+navItem.icon" start></v-icon>{{navItem.title}}
                        </v-list-item>
                    </div>
                </v-list>

            </VNavigationDrawer>

            <!-- nav bar -->
            <VAppBar :elevation="2" color="">
                <!-- toggle sidebar -->
                <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <!-- theme mode -->
                <div class="w-full mr-6 flex flex-row justify-end">

                    <!-- theme mode button switch -->
                    <v-btn-toggle
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
                    </v-btn-toggle>

                    <!-- theme mode toggle switch  -->
                    <!-- <div class="w-auto mt-6">
                        <v-switch
                            v-model="isDark"
                            @click="changeTheme">
                        </v-switch>
                    </div>
                    <div class="ml-3 mt-1 flex justify-center items-center">
                        <v-icon v-if="isDark" icon='mdi-weather-night'></v-icon>
                        <v-icon v-if="!isDark" size="large" icon='mdi-weather-sunny'></v-icon>
                    </div> -->
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
