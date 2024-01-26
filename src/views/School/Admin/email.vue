<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import pageDataStatus from '../../../components/layout/School/pageDataStatus.vue';
import { ref, onMounted ,watch ,reactive} from 'vue'
import {QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import apiNamphong from '../../../services/api/api_namphong'
import MsgAlert from '../../../services/msgAlert';
import {credential , userEmailResponse , emailListResponse , dataStatus} from '../../../store/Interface' 

const _api = new apiNamphong()
const _msg = new MsgAlert()
const btnLoading = ref(false)
const credential = ref<credential>()

onMounted(()=>{
    document.title = 'อีเมล'
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    getAll();
    
    getEmailList();
})


const emailListDrawer = ref(true)
const addNewEmailDialog = ref(false)
const aleadyEmailDialog = ref(false)
const drawerStatus = ref<'add_new' | 'detail'>('add_new')
const topic = ref()
const content = ref()
const emailSelected = ref<Array<string>>([])
const newEmail =ref()
const quillToolbar = [
            [{ 'header': [] }],
            ['bold', 'italic', 'underline','strike',{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
        ]

const totalList = ref()
const emailList =ref<Array<emailListResponse>>()
const dataStatus = ref<dataStatus>('no_data')
function getEmailSendedLength(){
    _api.getEmailSendedLength().then((res)=>{
        if(res.data.status_code=== 200){
            totalList.value = res.data.data_length
            totalPage.value = Math.ceil(totalList.value / sizeSelected.value)    
        }
    })
}

function getemailSendedList(){
    dataStatus.value = 'loading_data'
    _api.getemailSendedList({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.status_code=== 200){
            emailList.value = res.data.data_list
            if(emailList.value!.length >= 1){
                dataStatus.value ='load_data_succ'
            }else if(emailList.value!.length === 0){
                dataStatus.value ='no_data'
            }else{
                dataStatus.value ='err_data'
            }
        }else{
            dataStatus.value = 'err_data'
        }        
    }).catch((err)=>{
        dataStatus.value = 'network_err'
    })
}

const userEmailList = ref<Array<userEmailResponse>>()
function getEmailList(){
    _api.getEmailList().then((res)=>{
        if(res.data.status_code === 200) {
            userEmailList.value = res.data.data_list
        }
    })
}

function sendEmail(){
    btnLoading.value = true
    _api.sendEmail({topic:topic.value , content:content.value , email:emailSelected.value! , credential_admin_fullname:credential.value!.user_fullname})
    .then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',timer:1.5,progressbar:true})
            getemailSendedList()
        }else{
            _msg.toast_msg({title:res.data.msg,icon:'error',timer:20,progressbar:true})
        }
        btnLoading.value= false
    }).catch((err)=>{
        _msg.toast_msg({title:'error',icon:'error',timer:20,progressbar:true})
        btnLoading.value= false
    })
}

function addNewEmailToList() {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailRegex.test(newEmail.value) === false ){
        _msg.toast_msg({title:'กรุณากรอกอีเมลให้ถูกต้อง',icon:'error',timer:20,progressbar:true})
        return
    }
    emailSelected.value!.push(newEmail.value)
   
    addNewEmailDialog.value = false
}

function setDataBfOpen(item:emailListResponse){
    
    clearDrawerData()
    topic.value = item.email_topic
    content.value = item.email_content
    for(let i=0 ; i < item.email_to.length ; i++){
        emailSelected.value.push(item.email_to[i].email_to_detail)
    }
    emailListDrawer.value = true
}
 
function clearDrawerData(){
    topic.value = ''
    content.value = '<p></p>'
    emailSelected.value.splice(0, emailSelected.value.length);
}

// pagination 
const totalPage = ref()  
const size = ref([25,50,100]) // 
const sizeSelected = ref(size.value[0]) // "LIMIT"
const currentPage = ref(1) // current page
const startItem = ref<number>(0) // first item "OFFSET"
const pagination = ref(1) // v-model v-pagination 

function changePage(){
    currentPage.value = pagination.value
    startItem.value = (currentPage.value -1) * sizeSelected.value 
}

// detect pagination 
watch(pagination,()=>{         
    changePage()
    getAll()
})

// detect sizeSelected
watch(sizeSelected,()=>{
    pagination.value = 1 // reset
    changePage()
    getAll()
})

// get list and length 
function getAll(){
    if(searchValue.searchText === ''){
        // no value in seachValue the get common data
        getEmailSendedLength();
        getemailSendedList();
    }else{
        // triger seachValue for seaching next after change category id       
        searchValue.searchTriger = !searchValue.searchTriger
    }
}

// search 
const searchValue = reactive({
    searchText:'',
    searchTriger:false // triger 
})

const timeoutId = ref()
watch(searchValue , ()=>{
    clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(() => {
        if(searchValue.searchText.trim() === ''){
        getAll();
        }else{
            dataStatus.value ='loading_data'
            _api.searchEmailSended({search_keyword:searchValue.searchText,start_item:startItem.value,limit:sizeSelected.value}).then((res)=>{
                if(res.data.status_code === 200){                    
                    totalList.value = res.data.data_length
                    emailList.value = res.data.data_list
                    totalPage.value = Math.ceil(totalList.value / sizeSelected.value)       
                     
                    if(emailList.value!.length >= 1){
                        dataStatus.value ='load_data_succ'
                    }else if(emailList.value!.length === 0){
                        dataStatus.value ='no_data'
                    }else{
                        dataStatus.value ='err_data'
                    }
                }else{
                    dataStatus.value = 'err_data'
                }  
            }).catch(()=>{
                dataStatus.value = 'network_err'
            })
            
        }
        clearDrawerData()
    },500)
})
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col h-full pr-2">
            <div class="w-full flex flex-wrap ">
                <div class="w-full flex flex-wrap justify-end">
                    <div class="w-full  ">
                        <v-text-field
                            label="ค้นหา"
                            class=""
                            v-model="searchValue.searchText"
                            hide-details
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            bg-color=""
                            density="comfortable"
                            required
                        ></v-text-field>
                    </div>
                </div>
                <div class="w-full flex less:flex-wrap md:flex-row gap-2 mt-2">
                    <v-btn
                        @click="emailListDrawer = true , clearDrawerData() , drawerStatus = 'add_new'" 
                        class=" h-full less:w-full sm:w-full md:w-auto"
                        color="pink" size="large" >
                        <p class="text-md" >
                            <v-icon icon="mdi-email-plus" class=""></v-icon> ส่งอีเมล  
                        </p>
                    </v-btn>
                </div>
            </div>
            <div class=" px-4 mt-1">
               <p class="text-lg"> จำนวนรายการ : {{ totalList }}</p>
            </div>
            <v-divider class="border-opacity-75"></v-divider>

            <div class="w-full py-2 gap-2 flex flex-col" 
            v-if="dataStatus === 'load_data_succ'">
                <div v-for="(item,i) of emailList" :key="item.email_id" @click="setDataBfOpen(item) , drawerStatus = 'detail'" 
                class=" flex flex-col justify-between shadow-md hover:shadow-lg hover:shadow-pink-200 duration-200
                w-full h-fit py-4 px-4 rounded-md border-2 hover:border-pink-400 cursor-pointer">
                    <div class="w-full flex  flex-row justify-between">
                        <div class="w-full line-clamp-3 text-xl ">
                            {{i+1}}. {{ item.email_topic }}
                        </div>
                    </div>
                    <div class="w-full flex justify-start text-sm text-gray-500">
                        {{ item.email_date }}
                    </div>
                    <v-divider class="border-opacity-100 mt-4 mb-2"></v-divider>
                    <div class="w-full flex flex-wrap gap-2"  >
                        <v-chip color="pink" v-for="email in item.email_to">
                            <p class="text-[12px]">
                                {{ email.email_to_detail }}
                            </p>
                        </v-chip>
                     </div>
                </div>
            </div>
     
            <pageDataStatus v-else :data-status="dataStatus"></pageDataStatus>

            <v-divider class="border-opacity-75"></v-divider>
            
            <div class="w-full flex justify-end mt-3 pr-12">
                <div class="w-[100px]">
                    <v-select
                        :items="size"
                        variant="outlined"
                        v-model="sizeSelected"
                        hide-details="auto"
                    ></v-select>
                </div>
                <div class="sm:w-fit">
                    <v-pagination 
                        :length="totalPage"
                        v-model="pagination"
                        :total-visible="3"
                        >
                    </v-pagination>
                </div>
            </div>
        </div>
        
        
        <!-- email drawer -->
        <v-navigation-drawer  :disable-resize-watcher="true" 
        :width="650" location="right" v-model="emailListDrawer" >
            <div class="w-full h-full flex flex-col px-2 ">
                <div class="w-full h-auto flex flex-row justify-start text-4xl text-gray-500" >
                    <v-icon 
                        class=" hover:text-gray-400 cursor-pointer duration-300" 
                        icon="mdi-chevron-right" 
                        @click="emailListDrawer = false , clearDrawerData() , drawerStatus = 'detail'">
                    </v-icon>
                    <div class="w-full h-full flex justify-center items-center text-xl text-black">
                        <p v-if="drawerStatus === 'add_new'">
                            ส่งอีเมล
                        </p>
                        <p v-else>
                            รายละเอียด
                        </p>
                    </div>
                </div>
                <v-divider class="border-opacity-100 "></v-divider>
                <div class="w-full h-full flex flex-col gap-2">
                    <div class="w-full p-1 h-full flex flex-col justify-start items-center gap-2 pb-2">
                        <div class="w-full p-1">
                            <v-text-field
                                v-model="topic"
                                label="หัวข้อ"
                                class=" mt-3"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                        </div>
                        <div class="w-full p-1 flex flex-row gap-2">
                            <v-select
                                v-model="emailSelected"
                                label="รายชื่ออีเมล"
                                multiple
                                persistent-hint
                                :items="emailSelected"
                                chips
                                hide-details
                                variant="outlined"
                            >
                            
                            </v-select>
                        </div>
                        <div class="w-full flex flex-row gap-2 p-1" v-if="drawerStatus === 'add_new'">
                            <v-btn class="w-1/2" color="pink" size="large"
                            @click="addNewEmailDialog=true" prepend-icon="mdi-account-plus-outline">
                                เพิ่มอีเมลใหม่
                            </v-btn>
                            <v-btn class="w-1/2" color="pink" size="large"
                            @click="aleadyEmailDialog=true" prepend-icon="mdi-account-multiple-check-outline">
                                เลือกอีเมลที่มีในระบบ
                            </v-btn>
                        </div>
                        <div class="w-full p-1">
                            <div class="w-full h-auto mt-2 border-2 ">
                                <QuillEditor 
                                    class="min-h-[300px]   "
                                    theme="snow" 
                                    contentType="html" 
                                    ref="quill"
                                    v-model:content="content"
                                    :toolbar="quillToolbar"
                                    :disabled="drawerStatus !== 'add_new'"
                                />
                            </div>
                            <v-divider class="border-opacity-100 "></v-divider>
                        </div>
                        <div class="w-full p-1 pb-4">
                            <v-btn class="w-full" color="green" size="large"
                            @click="sendEmail()" :loading="btnLoading" v-if="drawerStatus === 'add_new'">
                                ส่งอีเมล
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>  
        </v-navigation-drawer>

         
    </AdminNavigationBar>
   
    <!-- add email -->
    <v-dialog
        persistent
        v-model="addNewEmailDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มอีเมลใหม่
                    <div @click="addNewEmailDialog = false , newEmail = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full px-6 pb-4 ">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="newEmail"
                            label="ป้อนอีเมล"
                            variant="outlined"
                            density="comfortable"
                            color="pink"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="green" size="xl" class="้px-3 w-[80px]"
                        @click="addNewEmailToList()">
                            <p class="text-xl">เพิ่ม</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- add email -->
    <v-dialog
        persistent
        v-model="aleadyEmailDialog"
        width="450"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    อีเมลล์ในระบบ
                    <div @click="aleadyEmailDialog = false" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full flex flex-col">
                    <v-list>
                        <v-list-item 
                            v-for="item in userEmailList"
                            class="mb-2"
                        >
                        <div class="flex flex-row">
                            <div class="w-10 flex items-center justify-center top-0">
                                <v-checkbox
                                class="mr-2" 
                                color="pink"
                                v-model="emailSelected"
                                :value="item.email"
                                hide-details
                                ></v-checkbox>
                            </div>
                            <v-avatar size="50px" class="ml-2 mt-1">
                            <img :src="(item.image!=='no_image_upload')?item.image:'/images/avartars/default_avatar.png'" alt="avatar"/>
                            </v-avatar>
                            <v-list-item-title class="ml-3 mt-1">
                                <p>{{ item.name }}</p>
                                <div class="w-[240px]">
                                    <p class="line-clamp-1 text-gray-500 text-sm"> {{ item.email }} </p>
                                </div>
                            </v-list-item-title>
                        </div>
                        <v-divider class="my-1 border-opacity-100"></v-divider>
                    </v-list-item>
                    </v-list>
                </div>
                 
            </div>
        </v-card>
    </v-dialog>
</template>