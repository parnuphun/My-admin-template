<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref, onMounted , reactive , watch} from 'vue';
import MsgAlert from '../../../services/msgAlert';
import apiNamphong from '../../../services/api/api_namphong';
import {credential , newsCategoryResponse , dataStatus ,newsResponse} from '../../../store/Interface'
import {QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const _msg = new MsgAlert();
const _api = new apiNamphong()
const btnLoading = ref(false)

const credential = ref<credential>()

onMounted(()=>{
    credential.value = JSON.parse(localStorage.getItem('Credential')!)
    getAllData()
})

async function getAllData(){
    if(searchValue.searchText === ''){
        // no value in seachValue the get common data
        await getAllNewsCategory()
        await getAllNewsLength()
        await getAllNewsList()
    }else{
        // triger seachValue for seaching next after change category id       
        searchValue.searchTriger = !searchValue.searchTriger
    }
}


const totalNews = ref()
const newsList =ref<Array<newsResponse>>()
const newsListStatus = ref<dataStatus>()
const baseImage = ref()

// get all news length 
async function getAllNewsLength(){
    _api.getAllNewsLength().then((res)=>{
        totalNews.value = res.data.news_data_length
        totalPage.value = Math.ceil(totalNews.value / sizeSelected.value)         
    })
}

// get news list 
async function getAllNewsList(){
    newsListStatus.value = 'loading_data'
    _api.getAllNewsList({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
        if(res.data.status_code === 200){
            newsList.value = res.data.news_data
            baseImage.value = res.data.base_image
            if(newsList.value!.length >= 1){
                newsListStatus.value = 'load_data_succ'             
            }else if(newsList.value!.length <= 0){
                newsListStatus.value = 'no_data'
            }else{
                newsListStatus.value = 'err_data'
            }
        }else{
            newsListStatus.value = 'err_data'
        }
    }).catch((err)=>{
        newsListStatus.value = 'network_err'
    })
}

const addNewsCategoryDialog = ref(false)
const renameNewsCategoryDialog = ref(false)
const newsCategoryDrawer = ref(false)
const addNewsDrawer = ref(false)
const editNewDrawer = ref(false)
const newsCategoryName = ref()
const errMsgNewsCategory = ref<'name_exist' | 'no_action'>('no_action')
const newsCategoryList = ref<Array<newsCategoryResponse>>()
const newsCategoryListStatus = ref<dataStatus>()

// get category
async function getAllNewsCategory(){
    newsCategoryListStatus.value = 'loading_data'
    _api.getAllNewsCategory().then((res)=>{
        if(res.data.status_code === 200){
            newsCategoryList.value = res.data.news_category_data
            if(newsCategoryList.value!.length >= 1){
                newsCategoryListStatus.value = 'load_data_succ'
            }else if(newsCategoryList.value!.length <= 0){
                newsCategoryListStatus.value = 'no_data'
            }else{
                newsCategoryListStatus.value = 'err_data'
            }
        }else{
            newsCategoryListStatus.value = 'err_data'
        }
    }).catch((err)=>{
        newsCategoryListStatus.value = 'network_err'
    })
}

// add category 
function addNewsCategory(){
    btnLoading.value = true
    _api.addNewsCategory({news_category_name:newsCategoryName.value,credential_admin_fullname:credential.value!.user_fullname})
    .then((res)=>{
        if(res.data.status_code === 409){
            errMsgNewsCategory.value = 'name_exist'
        }else if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'success'})
            getAllNewsCategory()
            errMsgNewsCategory.value = 'no_action'
            newsCategoryName.value = ''
        }else{
            _msg.toast_msg({title:res.data.msg,timer:10,progressbar:true,icon:'error'})
        }
        btnLoading.value = false
    }).catch((err)=>{
        btnLoading.value = false
        _msg.toast_msg({title:'เกิดความผิดพลาดในระบบ กรุณาติดต่อผู้ดูแลระบบ',timer:20,progressbar:true,icon:'error'})

    })
}
 
// update category 
const oldNewsCategoryName = ref()
const newsCategoryId = ref()
function setupUpdateNewsCategory(name:string,id:number){
    oldNewsCategoryName.value = name 
    newsCategoryName.value = name
    newsCategoryId.value = id
    renameNewsCategoryDialog.value = true
}
function updateNewsCategory(){
    _msg.confirm('คุณต้องการจะเปลี่ยนชื่อหมวดหมู่ใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.updateNewsCategory({
                    news_category_id:newsCategoryId.value,
                    news_category_name:newsCategoryName.value,
                    news_category_name_old:oldNewsCategoryName.value,
                    credential_admin_fullname:credential.value!.user_fullname}
            ).then((res)=>{
                if(res.data.status_code === 409){
                    errMsgNewsCategory.value = 'name_exist'
                }else if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'success'})
                    errMsgNewsCategory.value = 'no_action'
                    getAllNewsCategory()
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:10,progressbar:true,icon:'error'})
                }
                btnLoading.value = false
            }).catch((err)=>{
                btnLoading.value = false
                _msg.toast_msg({title:'เกิดความผิดพลาดในระบบ กรุณาติดต่อผู้ดูแลระบบ',timer:20,progressbar:true,icon:'error'})
            })
        }
    })
} 

// delete category 
function deleteNewsCategory(){
    _msg.confirm('คุณต้องการจะลบใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteNewsCategory({
                news_category_id : newsCategoryId.value,
                news_category_name : newsCategoryName.value,
                credential_admin_fullname:credential.value!.user_fullname
            }).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'success'})
                    renameNewsCategoryDialog.value = false 
                    newsCategoryName.value = ''
                    getAllNewsCategory()
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:10,progressbar:true,icon:'error'})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดความผิดพลาดในระบบ กรุณาติดต่อผู้ดูแลระบบ',timer:20,progressbar:true,icon:'error'})
            })
        }
    })
}

// detect drawer 
watch(newsCategoryDrawer,()=>{
    if(newsCategoryDrawer.value === true){
        if(addNewsDrawer.value === true){
            addNewsDrawer.value = false
        }
        if(editNewDrawer.value === true){
            editNewDrawer.value = false
        }
    }
}) 

watch(addNewsDrawer ,()=>{
    if(addNewsDrawer.value === true){
        if(editNewDrawer.value === true){
            editNewDrawer.value = false
        }
        if(newsCategoryDrawer.value === true){
            newsCategoryDrawer.value = false 
        }
    }
})

watch(editNewDrawer,()=>{
    if(editNewDrawer.value === true){
        if(addNewsDrawer.value === true){
            addNewsDrawer.value = false
        }
        if(newsCategoryDrawer.value === true){
            newsCategoryDrawer.value = false 
        }
    }
})


// add news
const newsTopic = ref()
const newsContent = ref() // quill
const quillToolbar = [
                [{ 'header': [] }],
                ['bold', 'italic', 'underline','strike',{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['image','link','video'],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
            ]
const selectedNewsCategory = ref() 
const newsCoverImage = ref<Array<File>>()
function addNews(){
    const formData = new FormData()
    if(newsCoverImage.value !== null && newsCoverImage.value !== undefined && newsCoverImage.value.length !== 0){ // iamge -1
        formData.append('news_cover_image',newsCoverImage.value[0])
    }else{
        formData.append('news_cover_image','no_image_upload')
    }
    formData.append('news_topic',newsTopic.value) // topic -2
    formData.append('news_contents',newsContent.value) // rich text content -3 
    formData.append('news_category',selectedNewsCategory.value) // category id  -4 
    formData.append('credential_admin_fullname',credential.value!.user_fullname) // credential admin fullname -5

     
    btnLoading.value = true
    _api.addNews(formData).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'success'})
            clearData('add_news_drawer')
            getAllData();
            addNewsDrawer.value = false
        }else{
            _msg.toast_msg({title:res.data.msg,timer:10,progressbar:true,icon:'error'})
        }
        btnLoading.value = false 
    }).catch((err)=>{
        btnLoading.value = false 
        _msg.toast_msg({title:'ระบบเกิดความผิดพลาด กรุณาติดต่อผู้ดูแลระบบ',timer:10,progressbar:true,icon:'error'})
    })
}

const newsDetail = ref<newsResponse>()
const newsDetailIndex = ref()
const newsDetailContent = ref()
const newsDetailTopic = ref()
const newsDetailSelectedCategory = ref()
async function setUpNewsDetail(item:newsResponse,index:number,afterUpdate?:boolean){
    newsDetail.value = item
    if(afterUpdate !== true){
        newsDetailContent.value = newsDetail.value.news_contents
        newsDetailTopic.value = newsDetail.value.news_topic
        newsDetailSelectedCategory.value = newsDetail.value!.news_category
    }
    newsDetailIndex.value = index
    editNewDrawer.value = true
}

function updateNews(){
    _msg.confirm('คูณต้องการจะบันทึกข้อมูลใช่ไหม').then((isConfirm)=>{
        if(isConfirm){
            const formData = new FormData()
            if(newsCoverImage.value !== null && newsCoverImage.value !== undefined && newsCoverImage.value.length !== 0){ // iamge -1
                formData.append('news_cover_image',newsCoverImage.value[0])
            }else{
                formData.append('news_cover_image','no_image_upload')
            }
            formData.append('news_cover_image_old',newsDetail.value!.news_cover_image) //old image -2 
            formData.append('news_id',String(newsDetail.value!.news_id)) //news id -3 
            formData.append('news_topic',newsDetailTopic.value) // topic -4
            formData.append('news_topic_old',newsDetail.value!.news_topic) // topic old -5
            formData.append('news_contents',newsDetailContent.value) // rich text content -6
            formData.append('news_category',newsDetailSelectedCategory.value) // category id  -7
            formData.append('credential_admin_fullname',credential.value!.user_fullname) // credential admin fullname -8

            _api.updateNews(formData).then(async (res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
                    await getAllData();
                    
                    await setUpNewsDetail(newsList.value![newsDetailIndex.value] , newsDetailIndex.value , true)
                }else{
                    _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:10})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'ระบบเกิดความผิดพลาด กรุณาติดต่อผู้ดูแลระบบ',icon:'error',progressbar:true,timer:20})
            })
        }
    })
}

function deleteNews(){
    _msg.confirm('คุณต้องการลบโพสต์ใช่ไหม').then((isConfirmed)=>{
        if(isConfirmed){
            _api.deleteNews({
                news_id:newsDetail.value!.news_id,
                news_topic:newsDetail.value!.news_topic,
                news_cover_image:newsDetail.value!.news_cover_image,
                credential_admin_fullname:credential.value!.user_fullname
            }).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,timer:3,progressbar:true,icon:'success'})
                    getAllData();
                    clearData('delete_news_drawer')
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:10,progressbar:true,icon:'error'})
                }
            }).catch((err)=>{
                _msg.toast_msg({title:'เกิดข้อผิดพลาดในระบบ กรุณาติดต่อผู้ดูแลระบบ',timer:10,progressbar:true,icon:'error'})
            })
        }
    })
}

function clearData(formType:'add_news_drawer'|'update_news_drawer' | 'delete_news_drawer'){
    if(formType === 'update_news_drawer' ||formType === 'delete_news_drawer'){
        newsCoverImage.value = undefined
        newsDetail.value = undefined
        newsDetailIndex.value = ''
        newsTopic.value = '' 
        selectedNewsCategory.value = ''
        editNewDrawer.value = false 
    }else if(formType === 'add_news_drawer'){
        newsCoverImage.value = undefined
        newsDetailIndex.value = ''
        newsTopic.value = '' 
        newsContent.value = '<p></p>'
        selectedNewsCategory.value = null
        addNewsDrawer.value = false        
    }  
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
    getAllData()
})

// detect sizeSelected
watch(sizeSelected,()=>{
    pagination.value = 1 // reset
    changePage()
    getAllData()
})

// search 
const searchValue = reactive({
    searchText:'',
    searchTriger:false // triger 
})

const timeoutId = ref() // deboucing
watch(searchValue , ()=>{
    clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(() => {
        if(searchValue.searchText.trim() === ''){
            getAllData()
        }else{
            newsListStatus.value = 'loading_data'
            _api.searchNews({search_keyword:searchValue.searchText,limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{
                if(res.data.status_code === 200){
                    totalNews.value = res.data.news_data_length
                    totalPage.value = Math.ceil(totalNews.value / sizeSelected.value)
                    newsList.value = res.data.news_data
                     
                    if(newsList.value!.length >= 1){
                        newsListStatus.value = 'load_data_succ'                
                    }else if(newsList.value!.length <= 0){
                        newsListStatus.value = 'no_data'
                    }else{
                        newsListStatus.value = 'err_data'
                    }
                }else{
                    newsListStatus.value = 'err_data'
                }
            }).catch((err)=>{
                newsListStatus.value = 'network_err'
            })
        }
    },500)
})


</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col h-full ">
            <div class="w-full flex flex-wrap">
                <div class="w-full p-1 flex flex-col justify-start items-center gap-2">
                    <div class="w-full p-1">
                        <v-text-field
                            label="ค้นหา"
                            v-model="searchValue.searchText"
                            class=""
                            hide-details
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            bg-color=""
                            density="comfortable"
                            required
                        ></v-text-field>
                    </div>
                    <div class="w-full flex less:flex-wrap md:flex-row gap-2">
                        <v-btn
                            @click="addNewsDrawer = true" 
                            class=" h-full less:w-full sm:w-full md:w-auto"
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-newspaper-plus" class=""></v-icon> เพิ่มข่าวสาร  
                            </p>
                        </v-btn>
                        <!-- <v-btn class="h-full less:w-full sm:w-full md:w-auto"
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-bullhorn-variant" class=""></v-icon> เพิ่มประกาศ  
                            </p>
                        </v-btn> -->
                        <v-btn @click="newsCategoryDrawer = !newsCategoryDrawer" 
                        class="h-full less:w-full sm:w-full md:w-auto"
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-tag" class=""></v-icon> หมวดหมู่ข่าวสาร  
                            </p>
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class=" px-4">
               <p class="text-lg"> จำนวนรายการ : {{ totalNews }}</p>
            </div>
            <v-divider class="border-opacity-100"></v-divider>
            <div class="flex flex-col gap-2 py-2 pr-2">
                <div class="w-full h-full flex flex-col gap-2 py-2 pr-2" v-if="newsListStatus === 'load_data_succ'">
                    <div class="flex less:flex-col sm:flex-row justify-center items-center cursor-pointer group border-2 border-pink-400" 
                    v-for="(item , i) in newsList" :key="item.news_id"
                    @click="setUpNewsDetail(item,i)"
                    >
                        <div class="less:w-full sm:w-[300px] h-[200px] bg-red-200"
                            :class="{'min-w-[200px]' : addNewsDrawer === true || editNewDrawer === true ,
                                'min-w-[300px]' : addNewsDrawer === false && editNewDrawer === false  }">
                            
                            <img v-if="item.news_cover_image !== 'no_image_upload'"
                            class="less:w-full sm:w-[300px] h-[200px] object-cover"
                            :class="{'min-w-[200px]' : addNewsDrawer === true || editNewDrawer === true ,
                                'min-w-[300px]' : addNewsDrawer === false && editNewDrawer === false  }"
                            :src="baseImage+item.news_cover_image" alt="">
                            
                            <img v-else
                            class="less:w-full sm:w-[300px] h-[200px] object-cover"
                            :class="{'min-w-[200px]' : addNewsDrawer === true || editNewDrawer === true ,
                                'min-w-[300px]' : addNewsDrawer === false && editNewDrawer === false  }"
                            src="/images/namphong_default_cover_image.jpg" alt="">
                        </div>
                        <div class="w-full text-lg pl-6 pr-3 py-2 group-hover:text-pink-500 duration-50">
                            <p class="line-clamp-3">
                               {{ startItem+ (i+1) }}. {{ item.news_topic }}
                            </p>
                            <p class="text-gray-600 text-lg mt-2">
                                โพสต์วันที่ : {{ item.news_date }}
                            </p>   
                            <p class="text-gray-600 text-lg">
                                โดย : {{ item.news_author }}
                            </p>  
                            <v-chip class="text-xl mt-2">
                                <p class="text-md text-black"> 
                                    {{ item.news_category_name }}
                                </p> 
                            </v-chip>
                        </div>
                    </div>
                </div>
                <div class="w-full h-full flex justify-center items-center gap-2 py-2 pr-2" v-if="newsListStatus === 'no_data'">
                    <div class=" flex flex-col items-center">
                        <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                            <img src="/images/illustrations/No data.svg" 
                            class="h-full w-full" alt="">
                        </div>
                        <p class="text-xl text-pink-600"> ไม่มีข้อมูลในระบบ</p>
                    </div>
                </div>
                <div class="w-full h-full flex justify-center items-center gap-2 py-2 pr-2" v-if="newsListStatus === 'loading_data'">
                    <div class=" flex flex-col items-center">
                        <v-progress-circular indeterminate color="pink" :size="90" :width="12"></v-progress-circular>
                        <p class="text-xl mt-2 text-pink-600"> กำลังโหลดข้อมูลกรุณารอสักครู่...</p>
                    </div>
                </div>
                <div class="w-full h-full flex justify-center items-center gap-2 py-2 pr-2" v-if="newsListStatus === 'err_data'">
                    <div class=" flex flex-col items-center">
                        <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                            <img src="/images/illustrations/No data-amico.svg" 
                            class="h-full w-full" alt="">
                        </div>
                        <p class="text-xl text-pink-600"> เกิดข้อผิดพลาดในการรับข้อมูล</p>
                    </div>
                </div>
                <div class="w-full h-full flex justify-center items-center gap-2 py-2 pr-2" v-if="newsListStatus === 'network_err'">
                    <div class=" flex flex-col items-center">
                        <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                            <img src="/images/illustrations/500 Internal Server Error-amico.svg" 
                            class="h-full w-full" alt="">
                        </div>
                        <p class="text-xl text-pink-600"> ไม่สามารถติดต่อกันเซิร์ฟเวอร์ได้ </p>
                    </div>
                </div>
            </div>
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

        <!-- news category -->
        <v-navigation-drawer  :disable-resize-watcher="true" 
        :width="350" location="right" v-model="newsCategoryDrawer">
            <div class="w-full h-full flex flex-col px-2 pt-6">
                <div class="w-full px-2 flex flex-row gap-1">
                    <v-btn  @click="addNewsCategoryDialog = true" color="green" class="w-full" size="large">
                        <v-icon icon="mdi-plus"></v-icon> เพิ่มหมวดหมู่ข่าวสาร 
                    </v-btn>

                </div>
                <div class="w-full flex flex-col mt-2 gap-2 px-2 pb-2" v-if="newsCategoryListStatus === 'load_data_succ'">
                    <div v-for="item in newsCategoryList" :key="item.news_category_id"
                    @click="setupUpdateNewsCategory(item.news_category_name,item.news_category_id)"
                        class="w-full flex flex-row gap-1 border-2 border-pink-200 p-3 rounded-md
                        hover:bg-[#EC407A] hover:text-white cursor-pointer duration-100 hover:border-pink-50">
                        <div class="w-full flex items-center"  >
                            <p> {{ item.news_category_name }}</p>
                        </div>
                        <v-tooltip activator="parent" location="bottom end" >
                            แก้ไข
                        </v-tooltip>
                    </div>
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="newsCategoryListStatus === 'no_data'">
                    <img src="/images/illustrations/No data.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="newsCategoryListStatus === 'err_data'">
                    <img src="/images/illustrations/500 Internal Server Error-cuate.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="newsCategoryListStatus === 'network_err'">
                    <img src="/images/illustrations/500 Internal Server Error-cuate.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="newsCategoryListStatus === 'loading_data'">
                    <v-progress-circular indeterminate color="pink" :size="90" :width="12"></v-progress-circular>
                </div>
               
            </div>
        </v-navigation-drawer>

        <!-- add news  -->
        <v-navigation-drawer  :disable-resize-watcher="true" 
        :width="650" location="right" v-model="addNewsDrawer" >
            <div class="w-full h-full flex flex-col px-2 justify-start items-center">
                <div class="w-full h-auto flex flex-row justify-start text-4xl text-gray-500" >
                    <v-icon 
                        class=" hover:text-gray-400 cursor-pointer duration-300" 
                        icon="mdi-chevron-right" 
                        @click="addNewsDrawer = false ">
                    </v-icon>
                    <div class="w-full h-full flex justify-center items-center text-xl text-black">
                        เพิ่มข่าวสาร
                    </div>
                </div>
                <v-divider class="border-opacity-100 "></v-divider>
                <div class="w-full h-full flex flex-col gap-2">
                    <div class="w-ful">
                        <v-file-input
                            accept="image/*"
                            label="ภาพหน้าปกกระทู้"
                            v-model="newsCoverImage"
                            density="compact"
                            class="mt-2"
                            name="news_cover_image"
                            hide-details="auto"
                            variant="outlined"
                            prepend-icon="mdi-camera"
                        ></v-file-input>
                    </div>
                    <div class="w-full">
                        <v-text-field
                            label="*ชื่อหัวข้อ"
                            density="compact"
                            v-model="newsTopic"
                            class="mt-2"
                            hide-details
                            variant="outlined"
                            bg-color=""
                            required
                        ></v-text-field>
                    </div>
                    <div class="w-full">
                        <v-select
                            class="mt-2"
                            :items="newsCategoryList"   
                            v-model="selectedNewsCategory"
                            item-title="news_category_name"
                            density="compact"
                            item-value="news_category_id"                         
                            label="*ประเภทข่าวสาร"
                            hide-details="auto"
                            variant="outlined">
                        </v-select>
                    </div>
                    <div class="w-full h-auto mt-2 ">
                        <QuillEditor 
                            theme="snow" 
                            contentType="html" 
                            ref="quill"
                            v-model:content="newsContent"
                            :toolbar="quillToolbar"
                        />
                    </div>
                    <v-divider class="border-opacity-100 mt-24"></v-divider>
                    <div class="w-full flex flex-row justify-center items-center gap-2 pb-2">
                        <v-btn @click="clearData('add_news_drawer')"
                        color="red" class="w-[100px]">ยกเลิก</v-btn>
                        <v-btn 
                            :disabled="!!!newsContent || !!!newsTopic || !!!selectedNewsCategory"
                            :loading="btnLoading"
                            color="green" 
                            class="w-[100px]" 
                            @click="addNews">
                                เพิ่ม
                            </v-btn>
                    </div>
                </div>
            </div>
        </v-navigation-drawer>

        <!-- edit news -->
        <v-navigation-drawer  :disable-resize-watcher="true" 
        :width="650" location="right" v-model="editNewDrawer" >
            <div class="w-full h-full flex flex-col px-2 ">
                <div class="w-full h-auto flex flex-row justify-start text-4xl text-gray-500" >
                    <v-icon 
                        class=" hover:text-gray-400 cursor-pointer duration-300" 
                        icon="mdi-chevron-right" 
                        @click="editNewDrawer = false ">
                    </v-icon>
                    <div class="w-full h-full flex justify-center items-center text-xl text-black">
                        แก้ไขข่าวสาร
                    </div>
                </div>
                <v-divider class="border-opacity-100 "></v-divider>
                <div class="w-full h-full flex flex-col gap-2">
                    <div class="w-ful">
                        <v-file-input
                            accept="image/*"
                            label="ภาพหน้าปกกระทู้"
                            v-model="newsCoverImage"
                            density="compact"
                            class="mt-2"
                            name="news_cover_image"
                            hide-details="auto"
                            variant="outlined"
                            prepend-icon="mdi-camera"
                        ></v-file-input>
                    </div>
                    <div class="w-full">
                        <v-text-field
                            label="*ชื่อหัวข้อ"
                            density="compact"
                            v-model="newsDetailTopic"
                            class="mt-2"
                            hide-details
                            variant="outlined"
                            bg-color=""
                            required
                        ></v-text-field>
                    </div>
                    <div class="w-full">
                        <v-select
                            class="mt-2"
                            :items="newsCategoryList"   
                            v-model="newsDetailSelectedCategory"
                            item-title="news_category_name"
                            density="compact"
                            item-value="news_category_id"                         
                            label="*ประเภทข่าวสาร"
                            hide-details="auto"
                            variant="outlined">
                        </v-select>
                    </div>
                    <div class="w-full h-auto mt-2 ">
                        <QuillEditor 
                            theme="snow" 
                            contentType="html" 
                            v-model:content="newsDetailContent"
                            :toolbar="quillToolbar"
                        />
                    </div>
                    <v-divider class="border-opacity-100 mt-24"></v-divider>
                    <div class="w-full flex flex-row justify-center items-center gap-2 pb-2">
                        <div class="w-1/2">
                            <v-btn @click="deleteNews()"
                            color="red" class="w-[100px]">ลบโพสต์</v-btn>
                        </div>
                        <div class="w-1/2 flex gap-2 flex-row justify-end">
                            <v-btn @click="clearData('update_news_drawer')"
                            color="red" class="w-[100px]">ยกเลิก</v-btn>
                            <v-btn 
                                :disabled="!!!newsDetailContent || !!!newsDetailTopic || !!!newsDetailSelectedCategory"
                                :loading="btnLoading"
                                color="primary" 
                                class="w-[100px]" 
                                @click="updateNews()">
                                 บันทึก
                             </v-btn>
                        </div>
                    </div>
                </div>
            </div>  
        </v-navigation-drawer>
    </AdminNavigationBar>

    <!-- add position -->
    <v-dialog
        persistent
        v-model="addNewsCategoryDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มหมวดหมู่ข่าวสาร
                    <div @click="addNewsCategoryDialog = false , errMsgNewsCategory = 'no_action' , newsCategoryName = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                <div class="w-full pl-7 mb-1 mt-3" v-if="errMsgNewsCategory === 'name_exist'">
                    <p class="text-red-500 text-[13px]"> มีชื่อหมวดหมู่นี้แล้ว กรุณาป้อนชื่อที่ไม่ซ้ำกัน </p>
                </div>
                <div class="w-full px-6 pb-4">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="newsCategoryName"
                            label="ป้อนชื่อหมวดหมู่"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="green" size="xl" tex 
                            :disabled="!!!newsCategoryName"
                            :loading="btnLoading"
                            @click="addNewsCategory()" 
                            class="้px-3 w-[100px]">
                                <p class="text-xl">เพิ่ม</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- rename position  -->
    <v-dialog
        persistent
        v-model="renameNewsCategoryDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    แก้ไข
                    <div @click="renameNewsCategoryDialog = false , errMsgNewsCategory = 'no_action' , newsCategoryName = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                    <div class="w-full px-6 pb-4 ">
                        <div class="w-full mb-1 mt-3" v-if="errMsgNewsCategory === 'name_exist'">
                        <p class="text-red-500 text-[13px]"> มีชื่อหมวดหมู่นี้แล้ว กรุณาป้อนชื่อที่ไม่ซ้ำกัน </p>
                    </div>
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="newsCategoryName"
                            label="ป้อนชื่อตำแหน่ง"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="primary" size="xl" tex 
                            :disabled="!!!newsCategoryName"
                            :loading="btnLoading"
                            @click="updateNewsCategory()" 
                            class="้px-3 w-[80px]">
                                <p class="text-xl">แก้ไข</p>
                        </v-btn>
                        <v-btn color="red" size="xl" tex 
                            @click="deleteNewsCategory()"
                            class="้px-3 w-[80px]">
                                <p class="text-xl">ลบ</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<style>
 
</style>