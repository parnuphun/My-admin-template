<script setup lang="ts">
import { onMounted, reactive, ref , toRaw } from 'vue';
import { navigationMenu  } from '../../store/navigation/navigationData'
import { useRouter , useRoute} from 'vue-router';
import { webSetting } from '../../store/theme/themeData'


    const drawer = ref(true)


    // theme
    const isDark = ref(false)
    let setting : webSetting = reactive({
        theme : 'light'
    })

    onMounted(()=>{
        console.log( setting.theme);
        // set default setting
        if(!localStorage.getItem('setting')){
            localStorage.setItem('setting',JSON.stringify(setting))
        }else{
            // get setting in localStorage
            setting = JSON.parse(String(localStorage.getItem('setting')))
            if(setting.theme === 'dark'){
                isDark.value = true
            }else if(setting.theme === 'light'){
                isDark.value = false
            }
        }
    })

    function changeTheme(){
        if(isDark.value === true){
            setting.theme = 'light'
         }else{
            setting.theme = 'dark'
        }
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
    <VThemeProvider :theme="isDark ? 'dark' : 'light'">
        <VApp >
            <!-- side bar -->
            <VNavigationDrawer color="primeOne" v-model="drawer" :elevation="2" >

                <div class="w-full text-center mt-5 mb-3">
                    <p class="text-6xl"> Logo </p>
                </div>

                <!-- menu list -->
                <v-list density="compact" class="px-5" >
                    <v-list-subheader class="">เมนู</v-list-subheader>
                    <v-list-item
                        v-for="navItem of navigationMenu"
                        @click="getCurrentPath(navItem.link)"
                        :prepend-icon="'mdi-'+navItem.icon"
                        :value="navItem.id"
                        :title="navItem.title"
                        class="text-md my-1"
                        active-color="primary"
                        :active="currentPath.path === navItem.link || (navItem.link === '/dashBoard' && currentPath.path === '/')"
                        rounded=""
                        >
                    </v-list-item>
                </v-list>
            </VNavigationDrawer>

            <!-- nav bar -->
            <VAppBar :elevation="2" color="">
                <!-- toggle sidebar -->
                <v-app-bar-nav-icon  @click.stop="drawer = !drawer"> หุบ </v-app-bar-nav-icon>

                <!-- theme mode -->
                <div class="w-full mr-6 flex flex-row justify-end">
                    <div class="w-auto mt-6">
                        <v-switch
                            v-model="isDark"
                            :label="isDark ? 'Dark' : 'Light'"
                            @click="changeTheme">
                        </v-switch>
                    </div>
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
