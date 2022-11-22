<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { navigationMenu  } from '../../components/navigation/navigationData'
import { useRouter , useRoute} from 'vue-router';

    type layoutTheme = 'dark' | 'light'
    interface webSetting {
        theme : layoutTheme
    }

    let setting : webSetting = {
        theme : 'light'
    }



    const drawer = ref(true)
    const isDark = ref(false)
    const routes_useRouter = useRouter()
    const currentPath = useRoute()

    onMounted(()=>{
        if(!localStorage.getItem('setting')){
            localStorage.setItem('setting',JSON.stringify(setting))
        }else{
            setting = JSON.parse(String(localStorage.getItem('setting')))
            if(setting.theme === 'dark'){
                isDark.value = true
            }else if(setting.theme === 'light'){
                isDark.value = false
            }
        }
    })

    function routes(url:string){
        routes_useRouter.push(url)
    }

    function changeTheme(){
        if(isDark.value === true){
            setting.theme = 'light'
         }else{
            setting.theme = 'dark'
        }
        console.log('bf c',setting.theme);

        localStorage.setItem('setting',JSON.stringify(setting))
        console.log('at c',setting.theme);
    }


</script>

<template>
    <VThemeProvider :theme="isDark ? 'dark' : 'light'">
        <VApp >
            <VNavigationDrawer color="primeOne" v-model="drawer" :elevation="2" >

                <div class="w-full text-center mt-5 mb-3">
                    <p class="text-6xl"> Logo </p>
                </div>

                <v-list density="compact" class="" >
                    <v-list-subheader class="">เมนู</v-list-subheader>
                    <v-list-item
                        v-for="navItem of navigationMenu"
                        @click="routes(navItem.link)"
                        :prepend-icon="'mdi-'+navItem.icon"
                        :value="navItem.id"
                        :title="navItem.title"
                        class="text-md -m-0"
                        active-color="primary"
                        :active="currentPath.path === navItem.link"
                        >
                    </v-list-item>
                </v-list>


            </VNavigationDrawer>

            <VAppBar :elevation="2" color="">
                <v-app-bar-nav-icon  @click.stop="drawer = !drawer"> หุบ </v-app-bar-nav-icon>
                <div class="w-full mr-6 flex flex-row justify-end">
                    <div class="w-auto mt-6">
                        <v-switch
                            v-model="isDark"
                            :label="isDark ? 'มืด' : 'สว่าง'"
                            @click="changeTheme">
                        </v-switch>
                    </div>
                </div>
            </VAppBar>

            <VMain>
                <div class="p-3 w-full h-full">
                    <slot></slot>
                </div>
            </VMain>
        </VApp>
    </VThemeProvider>
</template>
