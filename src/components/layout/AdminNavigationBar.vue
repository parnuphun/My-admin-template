<script setup lang="ts">
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { navigationMenu, NavigationItem, SubNavigationItem } from '../../plugin/routeData';
import { useRouter, useRoute } from 'vue-router';
import { webSetting, layOutTheme } from '../../store/theme/themeData'
import { isRail } from '../../store/GlobalData'
import MsgAlert from '../../services/msgAlert';
// import { checkPermission , Permission } from "../../services/auth"
import {credential ,adminResponse, userRule} from '../../store/Interface'
import apiNamphong from '../../services/api/api_namphong';

const _msg = new MsgAlert()
const _api = new apiNamphong()

const isOpenMenu = ref(false)
const isDrawer = ref(true)
const isAlert = ref(false)
const listOpend = ref<Array<string>>([''])
const editDialog = ref(false)
const btnLoading = ref(false)
// theme
const rentTheme = ref('dark')
let setting: webSetting = reactive({
    theme: 'light'
})

const credential = ref<credential>()
const credential_id = ref()
const credential_rule = ref()

const admin_image = ref()
const base_image_path = ref()
const admin_fullname = ref()
const admin_email = ref()
const admin_rule = ref()
onMounted(() => {
    credential.value = JSON.parse(localStorage.getItem('Credential')!)
    admin_image.value = credential.value!.user_image
    base_image_path.value = credential.value!.user_base_image_path
    credential_id.value = credential.value!.user_id
    credential_rule.value = credential.value!.user_rule

    admin_fullname.value = credential.value!.user_fullname
    admin_email.value = credential.value!.user_email
    admin_rule.value = credential.value!.user_rule
    isGroupOpen()
})

function changeTheme(theme: layOutTheme) {
    setting.theme = theme
    rentTheme.value = setting.theme
    localStorage.setItem('setting', JSON.stringify(setting))
}

//route
const router = useRouter()
const currentPath = useRoute()

function getCurrentPath(url: string) {
    router.push(url)
}

function logout() {
    _msg.confirm('คุณต้องการจากระบบใช่ไหม ?', 'question').then((isConfirmed) => {
        if (isConfirmed) {
            // _msg.default_msg({ title: 'ออกจากระบบแล้ว', timer: 1, progressbar: true })
            _msg.toast_msg({ title: 'ออกจากระบบแล้ว', icon:'success'})
            localStorage.removeItem('Credential')
            setTimeout(() => {
                router.push('/login')
            }, 500);
        }
    })
}

const isFullScreen = ref(false)
function fullscreen() {
    const doc = document.documentElement as HTMLHtmlElement;
    if (isFullScreen.value === false) {
        doc.requestFullscreen();
        isFullScreen.value = true
    } else {
        document.exitFullscreen();
        isFullScreen.value = false
    }
}

watch(isAlert, () => {
    if (isAlert.value) {
        setTimeout(() => {
            isAlert.value = false
        }, 5000);
    }
})

const props = defineProps<{
    isLoadingProgressBar?: boolean
    image?:string
    name?:string
    email?:string
}>()

watch(props,()=>{
    // console.log('props image => ',props.image);
})

function isAdmin(): boolean {
    console.log('isAdmin fucntion ');

    const credentialData = JSON.parse(localStorage.getItem('credential')!)
    const roles: Array<string> = credentialData.userRoles
    console.log('before return isAdmin fucntion ');

    return roles.some(role => role === 'ผู้ดูแลระบบ');
}

function isGroupOpen() {
    for (let i = 0; i <= navigationMenu.length; i++) {
        if (navigationMenu[i] && navigationMenu[i].childs) {
            let listGroup: any = navigationMenu[i].childs
            for (let j = 0; j < navigationMenu[i].childs!.length; j++) {
                if (currentPath.path === listGroup[j].link) {
                    listOpend.value.length = 0
                    listOpend.value.push(String(navigationMenu[i].id))
                }
            }
        }
    }
}
 
 function navbarAccess(item:NavigationItem){
    if(item.permission === 'admin' && admin_rule.value === 'admin'){
        return true
    }else if(item.permission === 'user' && admin_rule.value === 'admin'){
        return true 
    }else if(item.permission === 'admin' && admin_rule.value === 'user'){
        return false 
    }else{
        return true
    }
 }



const imageFileUpload = ref<Array<File>>()
const userDetail = ref()
const admin_role = ref<Array<{title:string,value:string}>>([
    {
        title:'ผู้ใช้งาน',
        value:'user'
    },
    {
        title:'ผู้ดูแลระบบ',
        value:'admin'
    }
])
const selectedRule = ref<'admin'|'user'>('user') // 
const addNewUsername = ref()
const addNewFirstName = ref()
const addNewLastName = ref()
const addNewEmail = ref()
const addNewPhone = ref()
const addNewAddress = ref()
type msgValidate = 'invalid' | 'valid' | 'no_data'
const errMsgPassword = ref<msgValidate>('no_data')
const errMsgConfirmPassword =ref<msgValidate>('no_data')
const errMsgUsername = ref<msgValidate>('no_data')
const errMsgFirstName = ref<msgValidate>('no_data')
const errMsgLastName = ref<msgValidate>('no_data')
const errMsgEmail = ref<msgValidate>('no_data')
const errMsgPhone = ref<msgValidate>('no_data')


function setDataAccount(){
    _api.getAccountDetail({user_id:credential_id.value}).then((res)=>{
        if(res.data.status_code === 200){
            userDetail.value = res.data.account_data[0] as adminResponse
            addNewUsername.value = userDetail.value.user_username
            addNewFirstName.value = userDetail.value.user_firstname
            addNewLastName.value = userDetail.value.user_lastname
            addNewEmail.value = userDetail.value.user_email
            addNewAddress.value = userDetail.value.user_address
            addNewPhone.value = userDetail.value.user_phone
            selectedRule.value = userDetail.value.user_rule
            editDialog.value = true
        }
    })
}

function updateAdmin(){
    const formData = new FormData()
    
    if(imageFileUpload.value !== null && imageFileUpload.value !== undefined && imageFileUpload.value.length !== 0){ // iamge -1
        formData.append('admin_image',imageFileUpload.value[0])
    }else{
        formData.append('admin_image','no_image_upload')
    }    

    formData.append('admin_image_old',userDetail.value!.user_image) // old image -2
    formData.append('admin_username',addNewUsername.value) // username -3
    formData.append('admin_username_old',userDetail.value!.user_username) // username -4
    formData.append('admin_firstname',addNewFirstName.value) // firstname - 5
    formData.append('admin_lastname',addNewLastName.value) // lastname -6
    formData.append('admin_email',addNewEmail.value) // email -7
    formData.append('admin_phone',addNewPhone.value) // phone -8
    formData.append('admin_address',addNewAddress.value) // address -9
    formData.append('admin_rule',selectedRule.value) // rule -10
    formData.append('credential_admin_fullname',credential.value!.user_fullname) // credential admin fullname - 11 
    formData.append('admin_id',String(userDetail.value!.user_id))

    _msg.confirm('คุณต้องการบันทึกข้อมูลใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            btnLoading.value = true
            _api.updateAdmin(formData).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,progressbar:true,timer:3,icon:'success'})
                    userDetail.value!.user_image = res.data.new_image
                    userDetail.value!.user_firstname = addNewFirstName.value
                    userDetail.value!.user_lastname = addNewLastName.value
                    userDetail.value!.user_address = addNewAddress.value
                    userDetail.value!.user_email = addNewEmail.value
                    userDetail.value!.user_phone = addNewPhone.value
                    userDetail.value!.user_rule = selectedRule.value
                    // update image to local storage
                    if(credential_id.value === userDetail.value?.user_id){
                        // credential_image.value = res.data.new_image
                        // credential_name.value = userDetail.value!.user_firstname +' '+userDetail.value!.user_lastname
                        // credential_email.value = userDetail.value!.user_email
                        credential.value!.user_image = res.data.new_image
                        credential.value!.user_fullname = userDetail.value!.user_firstname +' '+userDetail.value!.user_lastname
                        credential.value!.user_email = userDetail.value!.user_email
                        localStorage.setItem('Credential', JSON.stringify(credential.value));
                    }

                    admin_fullname.value = `${addNewFirstName.value} ${addNewLastName.value}`
                    admin_email.value = addNewEmail.value
                    admin_image.value = res.data.new_image
                }else{
                    _msg.toast_msg({title:res.data.msg,progressbar:true,timer:10,icon:'error'})
                }
                btnLoading.value= false 
            }).catch((err)=>{
                _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',progressbar:true,timer:10,icon:'error'})
                btnLoading.value= false 
            })
        }
    })
}

// clear form
function clearData(formType: 'add_form' | 'update_form' | 'reset_password'){
    if(formType === 'add_form'){
        imageFileUpload.value = []
        addNewUsername.value = ''
        addNewPassword.value = ''
        addNewFirstName.value = '' 
        addNewLastName.value = ''
        addNewPhone.value = ''
        addNewEmail.value = ''
        addNewAddress.value = ''
        // addNewAdminDialog.value = false
    }else if(formType === 'reset_password'){
        resetPasswordDialog.value =false
    }else if(formType === 'update_form'){
        imageFileUpload.value = []
        addNewUsername.value = ''
        addNewPassword.value = ''
        addNewFirstName.value = '' 
        addNewLastName.value = ''
        addNewPhone.value = ''
        addNewEmail.value = ''
        addNewAddress.value = ''
        selectedRule.value = 'user'
        // updateAdminDialog.value = false
        editDialog.value=false
    }
    // defaultPassword.value = false
    addNewPassword.value = ''
    confirmAddNewPassword.value = ''

    errMsgPassword.value = 'no_data'
    errMsgConfirmPassword.value = 'no_data'
    errMsgUsername.value = 'no_data'
    errMsgFirstName.value = 'no_data'
    errMsgLastName.value = 'no_data'
    errMsgEmail.value = 'no_data'
    errMsgPhone.value = 'no_data'
}

// detect username 
watch(addNewUsername, ()=>{    
    if(addNewUsername.value === ''){
        errMsgUsername.value = 'no_data'     
    }else if(addNewUsername.value.length >= 6 && /^[a-zA-Z0-9]*$/.test(addNewUsername.value) ){
        errMsgUsername.value = 'valid'
    }else{
        errMsgUsername.value = 'invalid'
    }    
})

// detect first name 
watch(addNewFirstName, ()=>{
    if(addNewFirstName.value === ''){
        errMsgFirstName.value = 'no_data'
    }else if(!!!addNewFirstName.value){
        errMsgFirstName.value = 'invalid'
    }else{
        errMsgFirstName.value = 'valid'
    }
})

// detect last name 
watch(addNewLastName, ()=>{
    if(addNewLastName.value === ''){
        errMsgLastName.value = 'no_data'
    }else if(!!!addNewLastName.value){
        errMsgLastName.value = 'invalid'
    }else{
        errMsgLastName.value = 'valid'
    }
})

// detect email
watch(addNewEmail, ()=> {
    var emailValidate =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(addNewEmail.value === ''){
        errMsgEmail.value = 'no_data'
    }else if(emailValidate.test(addNewEmail.value)){
        errMsgEmail.value = 'valid'
    }else{
        errMsgEmail.value = 'invalid'
    }
})

//detect validate phone
watch(addNewPhone, ()=>{
    if(addNewPhone.value === ''){
        errMsgPhone.value = 'no_data'
    }else if(addNewPhone.value.length === 10 && /^\d+$/.test(addNewPhone.value)){
        errMsgPhone.value = 'valid'
    }else{
        errMsgPhone.value = 'invalid'
    }
})

const resetPasswordDialog = ref(false)
const addNewPassword = ref()
const confirmAddNewPassword = ref()

// reset password 
function resetPassword(){
    _msg.confirm('หากเปลี่ยนรหัสผ่านแล้วจะไม่สามารกลับไปใช้รหัสผ่านเดิมได้ ตกลงหรือไม่').then((isConfirmed)=>{
        if(isConfirmed){
            _api.resetPassword({
                password:addNewPassword.value,
                user_id:userDetail.value!.user_id,
                user_username:`${userDetail.value!.user_firstname} ${userDetail.value!.user_lastname}`,
                credential_admin_fullname:credential.value!.user_fullname,
                credential_admin_id:credential.value!.user_id
            }).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
                    clearData('reset_password')
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:20})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'ไม่สามารถดำเนินการได้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้พัฒนาระบบ',icon:'error',progressbar:true,timer:20})

            })
        }
    })
}

// detect validate password 
watch(addNewPassword ,()=>{    
    if(addNewPassword.value === ''){
        errMsgPassword.value = 'no_data'        
    }else if(addNewPassword.value.length >= 6 && /^[a-zA-Z0-9]*$/.test(addNewPassword.value)){
        errMsgPassword.value = 'valid'
    }else{
        errMsgPassword.value = 'invalid'
    }

    if(confirmAddNewPassword.value === addNewPassword.value){        
        errMsgConfirmPassword.value = 'valid'
    }else{
        errMsgConfirmPassword.value = 'invalid'
    }
})

// detect validate confirmpassword
watch(confirmAddNewPassword,()=>{
    if(confirmAddNewPassword.value === ''){
        errMsgConfirmPassword.value = 'no_data'
    }else if(confirmAddNewPassword.value !== addNewPassword.value){
        errMsgConfirmPassword.value = 'invalid'
    }else{
        errMsgConfirmPassword.value = 'valid'
    }

})

</script>

<template>
    <VThemeProvider>
        <VApp>
            <div class="h-screen bg-white">
                <!-- nav bar -->
                <v-app-bar :elevation="2" class="h-[65px] max-h-[65px] min-h-[65px] bg-pink">
                    <!-- toggle sidebar -->
                    <v-app-bar-nav-icon @click.stop="isRail = !isRail"></v-app-bar-nav-icon>

                    <!-- content in nav -->
                    <div class="w-full mr-6 flex flex-row items-center">
                        <v-app-bar-title color=""> 
                            <p class="w-[150px]">โรงเรียนเทศบาลน้ำพองภูริพัฒน์</p> 
                        </v-app-bar-title>

                        <!-- <v-btn icon class="" @click="fullscreen">
                            <v-icon size="x-large" v-if="isFullScreen">mdi-fullscreen-exit</v-icon>
                            <v-icon size="x-large" v-else="isFullScreen">mdi-fullscreen</v-icon>
                        </v-btn> -->

                        <!-- user profile -->
                        <v-menu :close-on-content-click="false" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon>
                                    <!-- icon -->
                                    <v-icon size="large">mdi-login</v-icon>
                                </v-btn>
                            </template>

                            <v-card min-width="auto">
                                <v-list line="three">
                                    <v-list-item @click="logout()">
                                        <template v-slot:append>
                                            ออกจากระบบ <v-icon class="ml-4"></v-icon>
                                        </template>
                                    </v-list-item>
                                    <!-- <v-list-item :title="`${credentialData.userFname} ${credentialData.userLname}`"
                                        :subtitle="credentialData.userRoles.toString()">
                                        <template v-slot:prepend>
                                            <v-avatar size="x-large">
                                                <v-img :src="credentialData.userAvatar" alt="user avatar"></v-img>
                                            </v-avatar>
                                        </template>

                                        <template v-slot:append>
                                            <v-btn @click="logout()" variant="text" icon="mdi-login"></v-btn>
                                        </template>
                                    </v-list-item> -->
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
                <v-navigation-drawer v-model="isRail" :elevation="2">
                    <!-- menu list -->
                    <v-list class="mt-2">
                        <v-list-item
                        >
                            <div class="w-full flex flex-row items-center">
                                <div class="rounded-full border-2 border-green-500">
                                    <!-- no image upload -->
                                    <img class="object-cover w-[50px] h-[50px] min-w-[50px] rounded-full" 
                                    v-if="admin_image === 'no_image_upload'"
                                    src="/images/avartars/default_avatar.png" > 
                                    <!-- iamge from admin page -->
                                    <img class="object-cover w-[50px] h-[50px] min-w-[50px] rounded-full" 
                                    v-else-if="props.image"
                                    :src="base_image_path + props.image"  >
                                    <!-- image from localstorage -->
                                    <img class="object-cover w-[50px] h-[50px] min-w-[50px] rounded-full" 
                                    v-else
                                    :src="base_image_path + admin_image " >
                                </div>
                                <div class="w-full h-full justify-center items-start flex flex-col pl-2 line-clamp-1">
                                    <div class="w-full ">
                                        <p class="line-clamp-1" v-if="props.name">{{ props.name }}</p>
                                        <p class="line-clamp-1" v-else >{{ admin_fullname }}</p>

                                    </div>
                                    <div class="w-full text-[12px]">
                                        <p class="line-clamp-1 text-gray-500 " v-if="props.email">{{  props.email}}</p>
                                        <p class="line-clamp-1 text-gray-500 " v-else>{{ admin_email }}</p>
                                    </div>
                                    <v-tooltip activator="parent" location="right" >
                                        <div class="w-full ">
                                            <p class="line-clamp-1" v-if="props.name">{{ props.name }}</p>
                                            <p class="line-clamp-1" v-else >{{ admin_fullname }}</p>

                                        </div>
                                        <div class="w-full text-[12px]">
                                            <p class="line-clamp-1 " v-if="props.email">{{  props.email}}</p>
                                            <p class="line-clamp-1 " v-else>{{ admin_email }}</p>
                                        </div>
                                    </v-tooltip>
                                </div>
                            </div>
                            <v-btn class="w-full mt-2" density="comfortable" color="green" @click="setDataAccount()">
                                แก้ไขข้อมูลส่วนตัว
                            </v-btn>
                            <!-- <v-btn class="w-full mt-2" density="comfortable" color="red"  @click="logout()">
                                ออกจากระบบ
                            </v-btn> -->
                        </v-list-item>
                    </v-list>
                    <v-divider class="border-opacity-100"></v-divider>
                    <v-list class="" nav :opened="listOpend">
                        <div v-for="navItem of navigationMenu">
                            <!-- v-if=" checkPermission(navItem.permission) || isAdmin() " -->
                            <!-- v-if="!navItem.childs -->
                            <v-list-item 
                                v-if="navbarAccess(navItem)" 
                                :title="navItem.title" 
                                :subtitle="navItem.subtitle"
                                @click="getCurrentPath(navItem.link!)" 
                                density="comfortable" 
                                :value="navItem.id"
                                class="text-md my-1" 
                                active-color="" 
                                :prepend-icon="navItem.icon"
                                :active="currentPath.path === navItem.link || (navItem.link === '/dashBoard' && currentPath.path === '/')"
                                rounded="" 
                                color="pink">
                                <!-- <v-icon :icon="navItem.icon" start></v-icon>{{navItem.title}} -->
                            </v-list-item>
                            <!-- <v-list-item 
                                v-else-if="!navItem.childs" 
                                :title="navItem.title" 
                                :subtitle="navItem.subtitle"
                                @click="getCurrentPath(navItem.link!)" 
                                density="comfortable" 
                                :value="navItem.id"
                                class="text-md my-1" 
                                active-color="" 
                                :prepend-icon="navItem.icon"
                                :active="currentPath.path === navItem.link || (navItem.link === '/dashBoard' && currentPath.path === '/')"
                                rounded="" 
                                color="pink">
                            </v-list-item>
                            <v-list-group v-else :value="navItem.id">
                                <template v-slot:activator="{ props }">
                                    <v-list-item v-bind="props" :title="navItem.title" :subtitle="navItem.subtitle"
                                        @click="" density="comfortable" :value="navItem.id" class="text-md my-1"
                                        active-color="" :prepend-icon="navItem.icon"></v-list-item>
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
                            </v-list-group> -->
                        </div>
                    </v-list>
                </v-navigation-drawer>


                <!-- Content here !!! -->
                <VMain class="h-full">
                    <v-container fluid class="h-full">
                        <div class="w-full h-full overflow-auto ">
                            <slot></slot>
                        </div>
                    </v-container>
                </VMain>
            </div>
        </VApp>
    </VThemeProvider>

    <!-- update admin  -->
    <v-dialog
    persistent
    v-model="editDialog"
    width="600"
    transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     แก้ไขผู้ใช้งาน
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full">
                            <v-file-input
                                accept="image/*"
                                v-model="imageFileUpload"
                                placeholder="เปลี่ยนภาพประจำตัว"
                                label="เปลี่ยนภาพประจำตัว"
                                class=""
                                name="admin_image"
                                hide-details="auto"
                                variant="outlined"
                                prepend-icon="mdi-camera"
                            ></v-file-input>
                        </div>
                        <div class="w-full">
                            <v-text-field
                                label="*ชื่อผู้ใช้งาน"
                                v-model="addNewUsername"
                                :rules="[
                                    ()=> errMsgUsername === 'valid' || 'กรุณากรอกชื่อผู้ใช้งานอย่างน้อย 6 ตัวอักษรและเป็นภาษาอังกฤษ'
                                ]"
                                class="mt-3"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </div>   
                        <div class="w-full flex flex-row gap-4">
                            <div class="w-1/2">
                                <v-text-field
                                    label="*ชื่อจริง"
                                    v-model="addNewFirstName"
                                    :rules="[
                                        () => errMsgFirstName === 'valid' || 'กรุณากรอกชื่อจริง'
                                    ]"
                                    class="mt-3"
                                    variant="outlined"
                                    hide-details="auto"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="w-1/2">
                                <v-text-field
                                    v-model="addNewLastName"
                                    :rules="[
                                        ()=> errMsgLastName === 'valid' || 'กรุณากรอกนามสกุล'
                                    ]"
                                    label="*นามสกุล"
                                    class="mt-3"
                                    variant="outlined"
                                    hide-details="auto"
                                    required
                                ></v-text-field>
                            </div>
                        </div>
                        <div class="w-full">
                            <v-text-field
                            label="*อีเมล"
                            v-model="addNewEmail"
                            :rules="[
                                () => errMsgEmail === 'valid' || 'กรุณากรอก Email ให้ถูกต้อง'
                            ]"
                            class="mt-3"
                            variant="outlined"
                            hide-details="auto"
                            required
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-text-field
                            label="เบอร์โทร"
                            v-model="addNewPhone"
                            :rules="[
                                ()=> errMsgPhone === 'valid' || 'กรุณากรอกเบอร์โทรให้ถูกต้อง และเป็นตัวเลข'
                            ]"
                            class="mt-3"
                            variant="outlined"
                            hide-details="auto"
                            maxlength="10"
                            required
                            ></v-text-field>
                        </div>
                        <div class="w-full">
                            <v-textarea 
                                label="ที่อยู่"
                                class="mt-3"
                                hide-details
                                v-model="addNewAddress"
                                variant="outlined"
                                bg-color=""
                            ></v-textarea >
                        </div>
                    </div>
                    <v-btn 
                        @click="resetPasswordDialog =! resetPasswordDialog"
                        color="grey" 
                        class="w-full mt-2">
                        <v-icon class="mr-3">mdi-lock</v-icon>
                        เปลี่ยนรหัสผ่าน
                    </v-btn>
                </div>

                <div class="w-full flex mt-4 justify-end px-6 gap-4">
                    <v-btn color="red" @click="clearData('update_form')">
                        <span>ยกเลิก</span>                        
                    </v-btn>
                    <v-btn color="primary"  
                        @click="updateAdmin()"
                        :loading="btnLoading"
                        :disabled="
                            errMsgUsername !== 'valid' ||
                            errMsgFirstName !== 'valid' ||  
                            errMsgLastName !== 'valid' || 
                            errMsgEmail !== 'valid' || 
                            errMsgPhone !== 'valid'"
                    >
                        บันทึก
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>

      <!-- reset password -->
      <v-dialog
        persistent
        v-model="resetPasswordDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                        เปลี่ยนรหัสผ่าน
                </div>
                <div class="w-full pb-4 px-4">
                    <v-text-field
                        label="รหัสผ่าน"
                        class="mt-4"
                        v-model="addNewPassword"
                        type="password"
                        autocomplete="current-password"
                        :rules="[
                            ()=> errMsgPassword === 'valid' || 'กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษรและเป็นภาษาอังกฤษ'
                        ]"
                        hide-details="auto"
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-text-field
                        label="ยืนยันรหัสผ่าน"
                        class="mt-4"
                        v-model="confirmAddNewPassword"
                        :rules="[
                                ()=> errMsgConfirmPassword === 'valid' || 'กรุณากรอกรหัสผ่านให้ตรงกัน'
                        ]"
                        type="password"
                        autocomplete="current-password"
                        hide-details="auto"
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                </div>
                <div class="w-full flex justify-end px-6 gap-4">
                    <v-btn color="red" @click="clearData('reset_password')">
                        ยกเลิก
                    </v-btn>
                    <v-btn color="green" 
                    :disabled="!!!addNewPassword || !!!confirmAddNewPassword || errMsgConfirmPassword !== 'valid'"
                    @click="resetPassword()">
                        เปลี่ยนรหัสผ่าน
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<style>
.toast-enter-from {
    opacity: 0;
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
    opacity: 0;
    transform: translate(600px)
}

.toast-leave-active {
    transition: all 0.3s ease-in-out;
}
</style>
