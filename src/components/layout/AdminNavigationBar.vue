<script setup lang="ts">
import { onMounted, reactive, ref , watch ,computed } from 'vue';
import { navigationMenu , NavigationItem  } from '../../plugin/routeData';
import { useRouter , useRoute} from 'vue-router';
import { webSetting , layOutTheme } from '../../store/theme/themeData'
import { isRail } from '../../store/GlobalData'
import MsgAlert from '../../services/msgAlert';
import { checkPermission , Permission } from "../../services/auth"

const _msg = new MsgAlert()
const isOpenMenu = ref(false)
const isDrawer = ref(true)
const credentialData = ref()
const isAlert = ref(false)

// theme
const rentTheme = ref('dark')
let setting : webSetting = reactive({
    theme : 'light'
})

onMounted(()=>{
    credentialData.value = JSON.parse(localStorage.getItem('credential')||'')
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
    const credentialData = JSON.parse(localStorage.getItem('credential')!)
    const roles:Array<string> = credentialData.userRoles

    return roles.some(role => role === 'ผู้ดูแลระบบ');
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

                    <!-- <v-btn icon class="" @click="isAlert = !isAlert" >
                        <v-icon size="x-large" >mdi-message</v-icon>
                     </v-btn> -->

                    <v-btn icon class="" @click="fullscreen">
                        <v-icon size="x-large" v-if="isFullScreen">mdi-fullscreen-exit</v-icon>
                        <v-icon size="x-large" v-else="isFullScreen">mdi-fullscreen</v-icon>
                     </v-btn>

                    <!-- message box -->
                    <v-menu :close-on-content-click="false" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props" class="mr-3">
                                <v-badge content="6" color="red">
                                    <v-icon >mdi-bell-outline</v-icon>
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
                            <v-btn  v-bind="props" icon>
                                <!-- character icon -->
                                <!-- <v-avatar
                                    color="brown"
                                    size=""
                                    >
                                    <span class="text-h5 p-1">ภน</span>
                                </v-avatar> -->
                                <!-- image icon // not work -->
                                <!-- <v-avatar
                                :src="'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg'"
                                    >
                                </v-avatar> -->
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

            <v-progress-linear
                v-if="true"
                indeterminate
                color="primary"
                :class="[props.isLoadingProgressBar === true ? '': 'invisible']"
                class="absolute top-0"
                height="5"
                style="z-index:9999;"
                >
            </v-progress-linear>

            <!-- side bar -->
            <v-navigation-drawer
                v-model="isRail"
                :elevation="2"
            >
                <!-- menu list -->
                <v-list class="" nav >
                    <div nav v-for="navItem of navigationMenu">
                        <v-list-item
                            v-if=" checkPermission(navItem.permission) || isAdmin() "
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
                <v-container fluid>
                    <div class="w-full h-full relative" style="width: 100%;">
                        <div class="fixed" style="z-index:999; width:100%;">
                            <div class="w-full relative flex justify-end -ml-72" style="z-index:999;">
                                <Transition name="toast">
                                    <v-alert
                                        v-model="isAlert"
                                        icon="mdi-message"
                                        type="success"
                                        closable
                                        elevation="6"
                                        :rounded="true"
                                        position="absolute"
                                        class="w-max"
                                        style="z-index:999;"
                                    >
                                        This is My message
                                    </v-alert>
                                </Transition>
                            </div>
                        </div>
                        <slot></slot>
                    </div>
                </v-container>

            </VMain>
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
