<script setup lang="ts">
import { onMounted , watch , ref} from 'vue';
import { useRouter } from 'vue-router';
import RegisterDialog from '../../components/common/RegisterDialog.vue';
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';

const _api = new apiRPTS()
const _msg = new MsgAlert()

const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')
const rememberMe = ref<boolean>(false)

const isDialogOpen = ref<boolean>(false)
const oldData = ref<any>('')


function login(){
    _api.login(username.value,password.value,rememberMe.value).then((res)=>{
        const ResponsData = res.data

        // login success
        if(ResponsData.status === true && ResponsData.isFirstTime === false){

            const newCredentialData = {
                userRoles: ResponsData.credentialData.USER_ROLES,
                userAvatar: ResponsData.credentialData.User_Avatar,
                userEmail: ResponsData.credentialData.User_Email,
                userFname: ResponsData.credentialData.User_Fname,
                userLname: ResponsData.credentialData.User_Lname,
                userRmutiId: ResponsData.credentialData.User_Rmuti_Id,
                userId: ResponsData.credentialData.User_Id,
                Authorization : `Bearer ${ResponsData.credentialData.User_Token}`
            }

            _msg.succ(ResponsData.msg,2)

            storeCredentialData(newCredentialData)
            setTimeout(()=>{
                router.push('/')
            },1000)
        // first login
        }else if(ResponsData.status === true && ResponsData.isFirstTime === true){
            _msg.confirm(ResponsData.msg,'warning',false,'ไปยังหน้าลงทะเบียน').then((isConfirmed)=>{
                oldData.value = ResponsData.data

                // หน้าสมัครจะขึ้นก็ต่อเมื่อ isDialogOpen === true
                if(isConfirmed === true){
                    isDialogOpen.value = true
                }
            })
        // login error
        }else if(ResponsData.status === false && ResponsData.isFirstTime === false){
            _msg.err(ResponsData.msg)
        }
    })
}

// After component emit value
function registerSuccess(data:Boolean){
    isDialogOpen.value = Boolean(data)
    login()
}

function storeCredentialData(credentialData:any){
    localStorage.setItem('credential',JSON.stringify(credentialData))
}


</script>
<template>
    <div class="w-full h-screen flex items-center justify-center bg-gray-100">
        <div class="w-96 py-10 px-6 bg-white border-2 border-gray-400 border-solid rounded text-center">
            <div class="h-full w-full">
                <v-form @submit.prevent="login" class="h-full text-left">
                    <div class="h-full">
                        <div class="text-center mb-10">
                            <span class="text-3xl text-center"> Login </span>
                        </div>
                        <div class="">
                            <v-text-field
                                prepend-inner-icon="mdi-account"
                                v-model="username"
                                label="Username"

                                required
                            ></v-text-field>

                        </div>
                        <div class="mb-10">
                            <v-text-field
                                prepend-inner-icon="mdi-lock"
                                v-model="password"
                                label="Password"
                                type="password"
                                required
                            ></v-text-field>
                            <v-checkbox label="remember me" color="blue" class="-mt-6" v-model="rememberMe" ></v-checkbox>

                            <div class="flex justify-between items-center">
                                <span
                                    class="ml-1 text-blue-500 hover:text-blue-600 cursor-pointer"
                                    @click="router.push('/testBackend/forgotPassword')">
                                    forgot password ?
                                </span>
                            </div>
                        </div>
                        <div class="flex justify-center items-end mb-3">
                            <v-btn
                                type="submit"
                                class="w-32"
                                color="primary">
                                Login
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </div>
        </div>
    </div>

    <RegisterDialog
            persistent
            v-model:isDialogOpen="isDialogOpen"
            v-model:data="oldData"
            @register-success="registerSuccess">
    </RegisterDialog>


</template>
