<script setup lang="ts">
import { onMounted, reactive, ref , watch ,computed } from 'vue';
import { navigationMenu , NavigationItem , SubNavigationItem } from '../../plugin/routeData';
import { useRouter , useRoute} from 'vue-router';
import { webSetting , layOutTheme } from '../../store/theme/themeData'
import { isRail } from '../../store/GlobalData'
import MsgAlert from '../../services/msgAlert';
// import { checkPermission , Permission } from "../../services/auth"

const _msg = new MsgAlert()
const isOpenMenu = ref(false)
const isDrawer = ref(true)
const credentialData = ref()
const isAlert = ref(false)
const listOpend =ref<Array<string>>([''])
// theme
const rentTheme = ref('dark')
let setting : webSetting = reactive({
    theme : 'light'
})

onMounted(()=>{
    isGroupOpen()
    // credentialData.value = JSON.parse(localStorage.getItem('credential')||'')
})

function changeTheme(theme:layOutTheme){
    setting.theme = theme
    rentTheme.value = setting.theme
    localStorage.setItem('setting',JSON.stringify(setting))
}

//route
const router = useRouter()
const currentPath = useRoute()

function getCurrentPath(url:string){
    router.push(url)
}

function logout(){
    _msg.confirm('คุณต้องการจากระบบใช่ไหม ?','question').then((isConfirmed)=>{
        if(isConfirmed){
            _msg.default_msg({title:'ออกจากระบบแล้ว',timer:1,progressbar:true})
            localStorage.removeItem('credential')
            setTimeout(() => {
                router.push('/testBackend/login')
            }, 1500);
        }
    })
}

const isFullScreen = ref(false)
function fullscreen(){
    const doc = document.documentElement as HTMLHtmlElement;
    if(isFullScreen.value === false){
        doc.requestFullscreen();
        isFullScreen.value = true
    }else{
        document.exitFullscreen();
        isFullScreen.value = false
    }
}

watch(isAlert,()=>{
    if(isAlert.value) {
        setTimeout(() => {
            isAlert.value = false
        }, 5000);
    }
})

const props = defineProps<{
    isLoadingProgressBar?:boolean
}>()

function isAdmin():boolean{
    console.log('isAdmin fucntion ');

    const credentialData = JSON.parse(localStorage.getItem('credential')!)
    const roles:Array<string> = credentialData.userRoles
    console.log('before return isAdmin fucntion ');

    return roles.some(role => role === 'ผู้ดูแลระบบ');
}

function isGroupOpen() {
    for(let i = 0 ; i <= navigationMenu.length ; i++){
        if(navigationMenu[i] && navigationMenu[i].childs){
            let listGroup:any = navigationMenu[i].childs
            for(let j = 0 ; j < navigationMenu[i].childs!.length ; j++ ){
                if(currentPath.path === listGroup[j].link){
                    listOpend.value.length = 0
                    listOpend.value.push(String(navigationMenu[i].id))
                }
            }
        }
    }
}
</script>

<template>
    <VThemeProvider>
        <VApp >
            <div class="h-screen bg-gray-100">
                <!-- nav bar -->
                <v-app-bar :elevation="2" class="h-[65px] max-h-[65px] min-h-[65px]">
                    <!-- toggle sidebar -->
                    <v-app-bar-nav-icon  @click.stop="isRail = !isRail"></v-app-bar-nav-icon>

                    <!-- content in nav -->
                    <div class="w-full mr-6 flex flex-row items-center">
                        <v-app-bar-title color=""> ระบบหลังบ้านโรงเรียนเทศบาลน้ำพองภูริพัฒน์ </v-app-bar-title>

                        <v-btn icon class="" @click="fullscreen">
                            <v-icon size="x-large" v-if="isFullScreen">mdi-fullscreen-exit</v-icon>
                            <v-icon size="x-large" v-else="isFullScreen">mdi-fullscreen</v-icon>
                        </v-btn>

                        <!-- user profile -->
                        <v-menu :close-on-content-click="false" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn  v-bind="props" icon>
                                    <!-- icon -->
                                    <v-icon size="large">mdi-account-circle-outline</v-icon>
                                </v-btn>
                            </template>

                            <v-card min-width="300">
                                <v-list line="three">
                                    <v-list-item
                                        :title="`${credentialData.userFname} ${credentialData.userLname}`"
                                        :subtitle="credentialData.userRoles.toString()"
                                    >
                                        <template v-slot:prepend>
                                            <v-avatar size="x-large">
                                                <v-img
                                                    :src="credentialData.userAvatar"
                                                    alt="user avatar"
                                                ></v-img>
                                            </v-avatar>
                                        </template>

                                        <template v-slot:append>
                                            <v-btn
                                                @click="logout()"
                                                variant="text"
                                                icon="mdi-login"
                                            ></v-btn>
                                        </template>
                                    </v-list-item>
                                </v-list>
                                <v-divider></v-divider>
                            </v-card>
                        </v-menu>
                    </div>
                </v-app-bar>

                <!-- <v-progress-linear
                    v-if="true"
                    indeterminate
                    color="primary"
                    :class="[props.isLoadingProgressBar === true ? '': 'invisible']"
                    class="absolute top-0"
                    height="5"
                    style="z-index:9999;"
                    >
                </v-progress-linear> -->

                <!-- side bar -->
                <v-navigation-drawer
                    v-model="isRail"
                    :elevation="2"
                >
                    <!-- menu list -->
                    <v-list class="" nav :opened="listOpend" >
                        <div v-for="navItem of navigationMenu">
                            <!-- v-if=" checkPermission(navItem.permission) || isAdmin() " -->
                            <v-list-item
                                v-if="!navItem.childs"
                                :title="navItem.title"
                                :subtitle="navItem.subtitle"
                                @click="getCurrentPath(navItem.link!)"
                                density="comfortable"
                                :value="navItem.id"
                                class="text-md my-1"
                                active-color=""
                                :prepend-icon="navItem.icon"
                                :active="currentPath.path === navItem.link || (navItem.link === '/dashBoard' && currentPath.path === '/')"
                                rounded="">
                                <!-- <v-icon :icon="navItem.icon" start></v-icon>{{navItem.title}} -->
                            </v-list-item>
                            <v-list-group v-else :value="navItem.id">
                                <template v-slot:activator="{props}">
                                    <v-list-item
                                        v-bind="props"
                                        :title="navItem.title"
                                        :subtitle="navItem.subtitle"
                                        @click=""
                                        density="comfortable"
                                        :value="navItem.id"
                                        class="text-md my-1"
                                        active-color=""
                                        :prepend-icon="navItem.icon"
                                    ></v-list-item>
                                </template>
                                <div v-for="SubNavItem of navItem.childs">
                                    <v-list-item
                                        :title="SubNavItem.title"
                                        :subtitle="SubNavItem.subtitle"
                                        @click="getCurrentPath(SubNavItem.link!)"
                                        density="comfortable"
                                        :value="SubNavItem.id"
                                        class="text-md my-1"
                                        active-color=""
                                        :active="currentPath.path === SubNavItem.link || (SubNavItem.link === '/dashBoard' && currentPath.path === '/')"
                                        rounded="">
                                        <template v-slot:prepend v-if="SubNavItem.icon">
                                            <v-icon :icon="String(SubNavItem.icon)" class="-ml-11"></v-icon>
                                        </template>
                                    </v-list-item>
                                </div>
                            </v-list-group>
                        </div>
                    </v-list>
                </v-navigation-drawer>

                
                <!-- Content here !!! -->
                <VMain class="h-full">
                    <v-container fluid class="h-full">
                        <div class="w-full h-full overflow-auto ">
                            <slot ></slot>
                        </div>
                    </v-container>
                </VMain>
            </div>
        </VApp>
    </VThemeProvider>
</template>

<style>
    .toast-enter-from {
        opacity: 0 ;
        transform: translateX(600px)
    }
    .toast-enter-to {
        opacity: 1;
        transform: translateY(0);
    }
    .toast-enter-active {
        transition: all 0.5s ease-in-out;
    }

    .toast-leave-from {
        opacity: 1;
        transform: translateY(0);
    }
    .toast-leave-to {
        opacity: 0 ;
        transform: translate(600px)

    }
    .toast-leave-active {
        transition: all 0.3s ease-in-out;
    }
</style>
