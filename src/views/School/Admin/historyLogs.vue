<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import pageDataStatus from '../../../components/layout/School/pageDataStatus.vue'
import { ref, onMounted ,watch ,reactive } from 'vue'
import apiNamphong from '../../../services/api/api_namphong';
import { historyLogsResponse , dataStatus , credential} from '../../../store/Interface'
import { useRouter } from 'vue-router' ;

const router_s = useRouter();

const _api = new apiNamphong()
const credential = ref<credential>()

onMounted(()=>{
    document.title = 'ประวัติการใช้งาน'
    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    if(credential.value!.user_rule !== 'admin') {
        router_s.push('/admin/annoucement')
    }

    getHistoryLength()
    getHistory()
})

const dataStatus = ref<dataStatus>('no_data')
const historyLogs = ref<Array<historyLogsResponse>>()
const totalHistoryLogs = ref()

function getHistoryLength(){
    _api.getHistoryLength().then((res)=>{
        totalHistoryLogs.value = res.data.history_length
        totalPage.value = Math.ceil(totalHistoryLogs.value / sizeSelected.value)        
    })
}
function getHistory(){
    dataStatus.value = 'loading_data'
    _api.getHistory({limit:sizeSelected.value,start_item:startItem.value}).then((res)=>{        
        if(res.data.status_code === 200){
            historyLogs.value = res.data.history_data
            if(historyLogs.value!.length >= 1){
                dataStatus.value = 'load_data_succ'
            }else if(historyLogs.value!.length === 0){
                dataStatus.value = 'no_data'
            }else{
                dataStatus.value = 'err_data'
            }
        }else{
            dataStatus.value = 'err_data'
        }
    }).catch(()=>{
        dataStatus.value = 'network_err'
    })
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
    getHistoryAndLength()
})

// detect sizeSelected
watch(sizeSelected,()=>{
    pagination.value = 1 // reset
    changePage()
    getHistoryAndLength()
})

// get list and length 
function getHistoryAndLength(){
    if(searchValue.searchText === ''){
        // no value in seachValue the get common data
        getHistoryLength();
        getHistory();
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
        getHistoryLength();
        getHistory();
        }else{
            _api.searchHistory({search_keyword:searchValue.searchText,start_item:startItem.value,limit:sizeSelected.value}).then((res)=>{
                totalHistoryLogs.value = res.data.history_data_search_length
                historyLogs.value = res.data.history_data_search
                totalPage.value = Math.ceil(totalHistoryLogs.value / sizeSelected.value)        
            })
        }
    },500)
})

</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col h-full ">
            <div class="w-full flex flex-wrap">
                <div class="w-full p-1 flex flex-wrap justify-end">
                    <div class="w-full p-1">
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
            </div>
            <div class=" px-4">
               <p class="text-lg"> จำนวนรายการ : {{ totalHistoryLogs }}</p>
            </div>
            <v-divider class="border-opacity-75"></v-divider>

            <div clsas="w-full" v-if="dataStatus === 'load_data_succ'">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-center w-20">#</th>
                            <!-- <th>ผู้ใช้งาน</th> -->
                            <th>รายละเอียด</th>
                            <th class="text-center w-[190px] min-w-[190px]">เวลา</th>
                            <th class="text-center w-24">ฟังก์ชัน</th>
                            <th class="text-center w-24">ประเภท</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item , i ) in historyLogs" :key="item.history_logs_id" >
                            <td class="text-center">{{ (startItem+i)+1 }}</td>
                            <!-- <td>{{ item.history_logs_username }}</td> -->
                            <td class="py-2 min-w-[500px]">{{ item.history_logs_text }}</td>
                            <td class="text-center w-fit">{{ item.history_logs_date }}</td>
                            <td>
                                <div class="flex justify-center items-center">
                                    <v-chip class="w-full" color="" v-if="item.history_logs_fucntion === 'login'">
                                        <v-icon icon="mdi-login" class="mr-2"></v-icon> เข้าใช้งานระบบ
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'file'">
                                        <v-icon icon="mdi-file-outline" class="mr-2"></v-icon> ไฟล์เอกสาร
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'person_directory'">
                                        <v-icon icon="mdi-account-box-multiple-outline" class="mr-2"></v-icon> บุคลากร
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'admin'">
                                        <v-icon icon="mdi-account-outline" class="mr-2"></v-icon> ผู้ดูแลระบบ
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'news'">
                                        <v-icon icon="mdi-newspaper" class="mr-2"></v-icon> ผู้ดูแลระบบ
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'activity_image'">
                                        <v-icon icon="mdi-image-outline" class="mr-2"></v-icon> ภาพกิจกรรม
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'school_setting'">
                                        <v-icon icon="mdi-cog-outline" class="mr-2"></v-icon> ตั้งค่า
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'annocement'">
                                        <v-icon icon="mdi-bullhorn-variant-outline" class="mr-2"></v-icon> ประกาศ
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'teaching_schedule'">
                                        <v-icon icon="mdi-table-clock" class="mr-2"></v-icon> ตารางสอน
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'student_schedule'">
                                        <v-icon icon="mdi-table" class="mr-2"></v-icon> ตารางเรียน
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'syllabus'">
                                        <v-icon icon="mdi-book-outline" class="mr-2"></v-icon> หลักสูตร
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'email'">
                                        <v-icon icon="mdi-email-outline" class="mr-2"></v-icon> อีเมล
                                    </v-chip>
                                    <v-chip class="w-full" color="" v-else-if="item.history_logs_fucntion === 'teacher'">
                                        <v-icon icon="mdi-account-tie-outline" class="mr-2"></v-icon> ครูผู้สอน
                                    </v-chip>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center items-center">
                                    <v-chip class="w-full" color="orange" v-if="item.history_logs_type === 'login'">
                                        <v-icon icon="mdi-login" class="mr-2"></v-icon> เข้าใช้งานระบบ
                                    </v-chip>
                                    <v-chip class="w-full" color="success" v-else-if="item.history_logs_type === 'add'">
                                        <v-icon icon="mdi-plus" class="mr-2"></v-icon> เพิ่มข้อมูล
                                    </v-chip>
                                    <v-chip class="w-full" color="primary" v-else-if="item.history_logs_type === 'update'">
                                        <v-icon icon="mdi-pencil" class="mr-2"></v-icon> แก้ไขข้อมูล
                                    </v-chip>
                                    <v-chip class="w-full" color="red" v-else-if="item.history_logs_type === 'delete'">
                                        <v-icon icon="mdi-delete" class="mr-2"></v-icon> ลบข้อมูล
                                    </v-chip>
                                    <v-chip class="w-full" color="pink" v-else-if="item.history_logs_type === 'email'">
                                        <v-icon icon="mdi-email-arrow-right-outline" class="mr-2"></v-icon> ส่งอีเมล
                                    </v-chip>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
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

    </AdminNavigationBar>
</template>