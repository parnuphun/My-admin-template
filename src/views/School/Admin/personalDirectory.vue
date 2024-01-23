<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref , reactive, onMounted , watch} from 'vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import {personCategory,personPosition ,personDirectoryResponse ,dataStatus , credential , personDirectoryTableTree} from '../../../store/Interface'

const _api = new apiNamphong()
const _msg = new MsgAlert()
const dataCategoryStatus = ref<dataStatus>('no_data')
const dataPositionStatus = ref<dataStatus>('no_data')
const dataPersonListStatus = ref<dataStatus>('no_data')

const credential = ref<credential>()

const btnLoading = ref(false)

onMounted(()=>{
    document.title = 'ทำเนียบบุคลากร'

    credential.value = JSON.parse(localStorage.getItem('Credential')||'')
    getAllPersonCategoryList()
    getAllPersonPositionList()
    getPersonDirectoryTableTree()
    getAllpersonListLength()
    getAllpersonList()
})

function getAllData(){
    if(searchValue.searchText === ''){
        // no value in seachValue the get common data
        getAllpersonListLength()
        getAllPersonCategoryList()
        getPersonDirectoryTableTree()
        getAllPersonPositionList()
        getAllpersonList()
    }else{
        // triger seachValue for seaching next after change category id       
        searchValue.searchTriger = !searchValue.searchTriger
    }
}


function findIndexCategory(){
    let cagegoryIndex = personCategory.value!.findIndex(obj => obj.pd_category_id === selectedPersonCategory.value);
    let categoryName = personCategory.value![cagegoryIndex].pd_category_name
    return categoryName
}

function findIndexPosition(position_id?:number){
    let positionIndex
    if(position_id){
        positionIndex = personPosition.value!.findIndex(obj => obj.pd_position_id === position_id);
    }else{
        positionIndex = personPosition.value!.findIndex(obj => obj.pd_position_id === selectedAddNewPersonPosition.value);
    }
    let positionName = personPosition.value![positionIndex].pd_position_name
    return positionName
}

const errMessageAddPosition = ref<'no_action' | 'name_exist'>('no_action')
const personCategory = ref<Array<personCategory>>([])
const selectedPersonCategory = ref<any>(1)
const personPosition = ref<Array<personPosition>>([])
const personDirectoryResponse = ref<Array<personDirectoryResponse>>()

function getAllPersonCategoryList(){
    dataCategoryStatus.value = 'loading_data'
    _api.getAllPersonCategoryList().then((res)=>{
        if(res.data.status_code === 200){
            if(res.data.position_category.length <= 0 ){
                dataCategoryStatus.value = 'no_data'
                personCategory.value = []
            }else{
                dataCategoryStatus.value = 'load_data_succ'
                personCategory.value = res.data.position_category
            }
        }else{
            dataCategoryStatus.value = 'err_data'
        }
    }).catch((err)=>{
        dataCategoryStatus.value = 'network_err'
    })
}

function getAllPersonPositionList(){
    dataPositionStatus.value = 'loading_data'
    _api.getAllPersonPositionList({category_id:selectedPersonCategory.value}).then((res) => {
        if(res.data.status_code === 200){
            if(res.data.person_position.length <= 0){
                dataPositionStatus.value = 'no_data'
                personPosition.value = []
            }else{
                dataPositionStatus.value = 'load_data_succ'
                personPosition.value = res.data.person_position
            }
        }else{
            dataPositionStatus.value = 'err_data'
        }
    }).catch(()=>{
        dataPositionStatus.value = 'network_err'
    })
}

const personList = ref<Array<personDirectoryResponse>>()
const personBaseImageUrl = ref()

function getAllpersonListLength(){
    _api.getAllpersonListLength({person_category_id:selectedPersonCategory.value}).then((res)=>{
        totalPerson.value = res.data.data_length
        totalPage.value = Math.ceil(totalPerson.value / sizeSelected.value)      
    })
}

function getAllpersonList(){
    dataPersonListStatus.value = 'loading_data'
    _api.getAllpersonList({limit:sizeSelected.value,start_item:startItem.value,person_category_id:selectedPersonCategory.value}).then((res)=>{         
        if(res.data.status_code === 200){
            if(res.data.person_data.length === 0){
                dataPersonListStatus.value = 'no_data'
            }else if(res.data.person_data.length >= 1){
                dataPersonListStatus.value = 'load_data_succ'
                personList.value = res.data.person_data
                for(let i = 0 ; i < personList.value!.length ; i++){
                    personList.value![i].pd_position_name = findIndexPosition(personList.value![i].pd_position_id)
                }
                console.log(personList.value);
                
            }            
            personBaseImageUrl.value = res.data.img_url
        }else{
            dataPersonListStatus.value = 'err_data'
        }
    }).catch((err)=>{
        dataPersonListStatus.value = 'network_err'
    })
}

const positionDrawer = ref(false)
const personTableTreeDrawer = ref(true)
const positionDialogAdd = ref(false)


const positionName = ref()
function addPosition(){  
    btnLoading.value = true      
    let cagegoryIndex = personCategory.value!.findIndex(obj => obj.pd_category_id === selectedPersonCategory.value);
    let categoryName = personCategory.value![cagegoryIndex].pd_category_name

    _api.addPosition({position_name:positionName.value , position_category_id:selectedPersonCategory.value,
    position_category_name:categoryName , credential_admin_fullname:credential.value!.user_fullname}).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,icon:'success',progressbar:true,timer:3})
            errMessageAddPosition.value = 'no_action'
            positionName.value = ''
            getAllData()
        }else if(res.data.status_code === 409){
            errMessageAddPosition.value = 'name_exist'
        }else{
            errMessageAddPosition.value = 'no_action'
            _msg.toast_msg({title:res.data.msg,icon:'error',progressbar:true,timer:3})
        }
        btnLoading.value = false
    }).catch(()=>{
        errMessageAddPosition.value = 'no_action'
        _msg.toast_msg({title:'เครือข่ายมีปัญหา',icon:'error',progressbar:true,timer:3})
        btnLoading.value = false
    })
}

const renamePostionDialog = ref()
const positionObject = ref<personPosition>()
 
function renamePosition(){
    btnLoading.value = true
    _api.renamePosition({
        position_id : positionObject.value!.pd_position_id,
        position_name : positionName.value,
        position_old_name : positionObject.value!.pd_position_name,
        credential_admin_fullname :  credential.value!.user_fullname,
        position_category_id : positionObject.value!.pd_category_id
    }).then((res)=>{
        if(res.data.status_code === 200){
            errMessageAddPosition.value = 'no_action'
            _msg.toast_msg({title:res.data.msg,progressbar:true,timer:3,icon:'success'})
            getAllPersonPositionList();
        }else if(res.data.status_code === 200){
            errMessageAddPosition.value = 'name_exist'
         }else{
            errMessageAddPosition.value = 'no_action'
            _msg.toast_msg({title:res.data.msg,progressbar:true,timer:6,icon:'error'})
        }
        btnLoading.value = false
    }).catch(()=>{
        btnLoading.value = false
        _msg.toast_msg({title:'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้',progressbar:true,timer:20,icon:'error'})
    })
}

function deletePosition(){
    let categoryname = findIndexCategory()
    _msg.confirm(`คุณต้องการลบตำแหน่ง ${positionObject.value!.pd_position_name} ใช่ไหม`).then((isConfirmed)=>{
        if(isConfirmed){
            _api.deletePosition({
                position_id : positionObject.value!.pd_position_id,
                position_name : positionName.value,
                credential_admin_fullname : credential.value!.user_fullname,
                position_category_name : categoryname}
            ).then((res)=>{
                if(res.data.status_code === 200){
                    _msg.toast_msg({title:res.data.msg,progressbar:true,timer:3,icon:'success'})
                    getAllPersonPositionList();
                    getPersonDirectoryTableTree();
                    positionName.value = ''
                    renamePostionDialog.value = false 
                }else{
                    _msg.toast_msg({title:res.data.msg,progressbar:true,timer:6,icon:'error'})

                }
            }).catch(()=>{
                _msg.toast_msg({title:'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้',progressbar:true,timer:20,icon:'error'})
            })
        }
    })
}

watch(selectedPersonCategory ,()=>{
    if(personDetail.value !== undefined){ // when update dialog open just set position id from person detail
        selectedAddNewPersonPosition.value = personDetail.value!.pd_position_id
    }

    // reset selected position if no one postition in category or if have just set the first one 
    if(personPosition.value.length === 0){ // equa 0 it mean no position data 
        selectedAddNewPersonPosition.value = null
    }else if(personPosition.value.length >= 1){ // just set one 
        selectedAddNewPersonPosition.value = null
    }    

    // reset pagination when category change 
    pagination.value = 1

    getAllData()
})

const addNewPersonDialog = ref()
const selectedAddNewPersonPosition = ref<any>(null)
const errMsgSelectPosition = ref<'no_position_select' | 'position_selected'>('no_position_select')

const personImageFile = ref<Array<File>>()
const personName = ref()
const errMsgCheckPersonName = ref<'no_value' | 'value_exist'>('no_value')
const personPhone = ref()
const personEmail = ref()
const personDesc = ref()

function addPerson(){
    let formData = new FormData()
    
    if(personImageFile.value?.length === 0 || personImageFile.value === undefined || personImageFile.value === null){
        formData.append('person_image','no_image_upload')  // รูปภาพ -1
    }else{
        formData.append('person_image',personImageFile.value[0])
    }
    
    formData.append('person_name',personName.value) // ชื่อบุคลากร -2
    formData.append('person_phone',personPhone.value) // เบอร์ -3
    formData.append('person_email',personEmail.value) // เมล -4
    formData.append('person_desc',personDesc.value) // เพิ่มเติม -5
    formData.append('credential_admin_fullname',credential.value!.user_fullname) // แอดมินผู้เพิ่ม -6
 
        
    formData.append('person_position_id',selectedAddNewPersonPosition.value) // ตำแหน่ง id -7
    formData.append('person_position_name',findIndexPosition())  // ชื่อตำแหน่ง -8
    formData.append('person_category_id',selectedPersonCategory.value) // หมวเหมู่ id -9 
    formData.append('person_category_name',findIndexCategory())  // ชื่อหมวหมู่ -10

    btnLoading.value = true
    _api.addPerson(formData).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,progressbar:true,icon:'success',timer:1})
            clearPersonData(false)
            getAllData()
        }else{
            _msg.toast_msg({title:res.data.msg,progressbar:true,icon:'error',timer:20})
        }
        btnLoading.value = false
    }).catch((err)=>{
        btnLoading.value = false
        _msg.toast_msg({title:'เกิดความผิดพลาดในระบบ ไม่สามารถเพิ่มบุคลากรในระบบได้',progressbar:true,icon:'error',timer:20})
    })
}

function clearPersonData(closeDialog?:boolean){
    personImageFile.value = undefined
    personName.value = ''
    selectedAddNewPersonPosition.value = null
    personPhone.value = '',
    personEmail.value = '',
    personDesc.value = ''

    if(closeDialog === false){
        return
    }else{
        addNewPersonDialog.value = false // close dialog
    }
}

const updatePersonDialog = ref(false)
const personDetail = ref<personDirectoryResponse>()
function updatePersonSetData(itemData:personDirectoryResponse){
    personDetail.value = itemData
    personName.value =  personDetail.value!.pd_person_name
    selectedPersonCategory.value = personDetail.value!.pd_category_id
    personPhone.value = personDetail.value!.pd_person_phone 
    personEmail.value =  personDetail.value!.pd_person_email
    personDesc.value = personDetail.value!.pd_person_descript
    selectedAddNewPersonPosition.value = personDetail.value!.pd_position_id
    updatePersonDialog.value = true // open dialog
    
}

function updatePerson(){
    let formData = new FormData()
    
    if(personImageFile.value?.length === 0 || personImageFile.value === undefined || personImageFile.value === null){
        formData.append('person_image','no_image_upload')  // รูปภาพ -1
    }else{
        formData.append('person_image',personImageFile.value[0])
    }
    formData.append('person_image_old',personDetail.value!.pd_person_image) // ภาพของบุคลากรภาพเก่า -11
    formData.append('person_id',String(personDetail.value!.pd_person_id)) // ไอดีบุคลากรที่จะแก้ไข -12
    formData.append('person_name',personName.value) // ชื่อบุคลากร -2
    formData.append('person_name_old',personDetail.value!.pd_person_name) // ส่งชื่อเดิมเพื่อ stamp เวลา -13
    formData.append('person_phone',personPhone.value) // เบอร์ -3
    formData.append('person_email',personEmail.value) // เมล -4
    formData.append('person_desc',personDesc.value) // เพิ่มเติม -5
    formData.append('credential_admin_fullname',credential.value!.user_fullname) // แอดมินผู้เพิ่ม -6
    formData.append('person_position_id',selectedAddNewPersonPosition.value) // ตำแหน่ง id -7
    formData.append('person_position_name',findIndexPosition())  // ชื่อตำแหน่ง -8
    formData.append('person_category_id',selectedPersonCategory.value) // หมวเหมู่ id -9 
    formData.append('person_category_name',findIndexCategory())  // ชื่อหมวหมู่ -10

    btnLoading.value = true 
    _api.updatePerson(formData).then((res)=>{
        if(res.data.status_code === 200){
            _msg.toast_msg({title:res.data.msg,progressbar:true,icon:"success",timer:3})
            getAllData()
        }else{
            _msg.toast_msg({title:res.data.msg,progressbar:true,icon:"error",timer:6})
        }
        btnLoading.value = false 
    }).catch(()=>{
        btnLoading.value = false 
        _msg.toast_msg({title:'เกิดความผิดพลาดในระบบ',progressbar:true,icon:"error",timer:20})
    })
}

function deletePerson(itemData:personDirectoryResponse){
    _msg.confirm(`คุณต้องการจะลบ ${itemData.pd_person_name} ใช่ไหม`).then((isConfirmed)=>{
        if(isConfirmed){
            _api.deletePerson({person_id:itemData.pd_person_id,person_name:itemData.pd_person_name,person_image:itemData.pd_person_image,
                credential_admin_fullname:credential.value!.user_fullname})
            .then((res)=>{
                if(res.data.status_code === 200){
                    // getAllpersonList()
                    let personIndex = personList.value!.findIndex(obj => obj.pd_person_id === itemData.pd_person_id);
                    if (personIndex !== -1) {
                        personList.value!.splice(personIndex, 1);
                        totalPerson.value = totalPerson.value - 1 
                        totalPage.value = Math.ceil(totalPerson.value / sizeSelected.value)
                        getPersonDirectoryTableTree();
                    }                    
                    _msg.toast_msg({title:res.data.msg,progressbar:true,icon:"success",timer:3})
                    
                }else{
                    _msg.toast_msg({title:res.data.msg,progressbar:true,icon:"error",timer:6})
                }
            })
        }
    })
}

watch(selectedAddNewPersonPosition ,()=>{    
    if(selectedAddNewPersonPosition.value === '' || selectedAddNewPersonPosition.value === null || selectedAddNewPersonPosition.value === undefined){
        errMsgSelectPosition.value = 'no_position_select'
    }else{
        errMsgSelectPosition.value = 'position_selected'
    }
})

watch(personName, ()=>{
    if(personName.value.trim() === '' || personName.value === null || personName.value === undefined){
        errMsgCheckPersonName.value = 'no_value'
    }else{
        errMsgCheckPersonName.value = 'value_exist'
    }
})

watch(positionDrawer,()=>{
    if(personTableTreeDrawer.value === true){
        personTableTreeDrawer.value = false
        positionDrawer.value = true
    }    
})

watch(personTableTreeDrawer,()=>{
    if(positionDrawer.value === true){
        positionDrawer.value = false
        personTableTreeDrawer.value = true
    }
})



 // pagination 
const totalPage = ref()  
const totalPerson = ref()
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

const timeoutId = ref()
watch(searchValue , ()=>{
    clearTimeout(timeoutId.value)
    timeoutId.value = setTimeout(() => {        
        if(searchValue.searchText.trim() === ''){
            getAllData()
        }else{        
            dataPersonListStatus.value ='loading_data'
            _api.searchPersons({
                search_keyword:searchValue.searchText,
                start_item:startItem.value,
                limit:sizeSelected.value,
                person_category_id:selectedPersonCategory.value})
            .then((res)=>{
                totalPerson.value = res.data.person_data_length
                personList.value = res.data.person_data
                totalPage.value = Math.ceil(totalPerson.value / sizeSelected.value)       
                if(res.data.status_code === 200){
                    if(personList.value!.length >= 1){
                        dataPersonListStatus.value = 'load_data_succ'
                    }else if(personList.value!.length <= 0){
                        dataPersonListStatus.value = 'no_data'
                    }else{
                        dataPersonListStatus.value = 'err_data'
                    }
                }else{
                    dataPersonListStatus.value = 'err_data'
                }
            }).catch((err)=>{
                dataPersonListStatus.value = 'network_err'
            })
        }
    }, 500);
})

 
const personsList = ref<personDirectoryTableTree>()
const personsDataTable = ref()
const personsBaseImageurl = ref()
function getPersonDirectoryTableTree(){
    // console.log('check current tabs or category => ',categoryNo.value);
    _api.getPersonDirectoryTableTree({category_id:selectedPersonCategory.value}).then((res)=>{        
        personsList.value = res.data.person_data  
        personsDataTable.value = res.data.person_data_table 
        
        // console.log('person list on previws data => ',personsList.value);
        // console.log('person data table list => ',personsDataTable.value);
        // console.log('persons Base Image url=> ',personsBaseImageurl.value);
    })
}



</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col h-full ">
            <div class="w-full flex flex-wrap">
                <div class="w-full flex flex-wrap">
                    <div class="less:w-full p-1 flex flex-wrap justify-end">
                        <div class="less:w-full md:w-full p-1 gap-2 flex less:flex-col sm:flex-row ">
                            <div class="less:w-full md:w-full">
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
                            <div class="less:w-full md:w-1/2" v-if="positionDrawer === false">
                                <v-select
                                    v-model="selectedPersonCategory"
                                    label="ประเภท"
                                    :items="personCategory"
                                    item-title="pd_category_name"
                                    item-value="pd_category_id"
                                    hide-details
                                    density="comfortable"
                                    variant="outlined"
                                >
                                </v-select>
                            </div>
                        </div>
                    </div>
                    <div class="less:w-full p-1 flex less:flex-wrap sm:flex-row md:flex-row gap-2 less:justify-center md:justify-start items-center">
                        <v-btn class="h-full less:w-full sm:w-full md:w-auto"  @click="addNewPersonDialog = true"
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-account-plus" class=""></v-icon> เพิ่มบุคลากร  
                            </p>
                        </v-btn>
                        <v-btn 
                            @click="positionDrawer = !positionDrawer"
                            class="h-full less:w-full sm:w-full md:w-auto" 
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-card-account-details-outline" class=""></v-icon> ตำแหน่ง
                            </p>
                        </v-btn>
                        <v-btn 
                            @click="personTableTreeDrawer = !personTableTreeDrawer"
                            class="h-full less:w-full sm:w-full md:w-auto" 
                            color="pink" size="large" >
                            <p class="text-md" >
                                <v-icon icon="mdi-family-tree" class=""></v-icon> ทำเนียบ
                            </p>
                        </v-btn>
                    </div>
                   
                </div>
            </div>
            <div class=" px-4">
               <p class="text-lg"> จำนวนรายการ : {{ totalPerson }}</p>
            </div>
            <v-divider class="border-opacity-75"></v-divider>

            <div clsas="w-full flex flex-col" v-if="dataPersonListStatus === 'load_data_succ'">
                <div v-if="dataPersonListStatus === 'load_data_succ'" class="w-full flex flex-col ">
                    <div v-for="(item,i) in personList" :key="item.pd_person_id"
                    class="w-full h-full p-2" >
                        <div class="w-full h-full p-2 border-2 flex flex-row items-center justify-start
                        shadow-md hover:shadow-xl duration-200 hover:shadow-pink-200 "> 
                            <div class="w-fit min-w-fit py-1 border-2">
                                <img v-if="item.pd_person_image === 'no_image_upload'" 
                                src="/images/avartars/default_avatar.png" class="w-[100px]" alt="">
                                
                                <img v-else :src="personBaseImageUrl+item.pd_person_image" 
                                    class="object-fill w-[100px]"
                                    alt="person_image">
                            </div>
                            <div class="w-full h-full flex flex-row justify-between pl-6">
                                <div class="w-full h-full flex flex-col justify-start items-start pt-2">
                                    <p class="line-clamp-1">
                                        ชื่อ : {{ item.pd_person_name }}
                                    </p>
                                    <p class="text-gray-600 line-clamp-1">
                                        ตำแหน่ง : {{ item.pd_position_name }}
                                    </p>
                                    <p class="text-gray-600 line-clamp-1">
                                        เบอร์โทร : {{ item.pd_person_phone }}
                                    </p>
                                    <p class="text-gray-600 line-clamp-1">
                                        อีเมล : {{ item.pd_person_email }}
                                    </p>
                                </div>
                                <div class="w-fit h-full justify-center items-center flex flex-col gap-2">
                                    <v-btn @click="updatePersonSetData(item)"
                                    color="" class="w-[80px]" >
                                        ข้อมูล
                                    </v-btn>
                                    <v-btn @click="deletePerson(item)"
                                    color="red" class="w-[80px]">
                                        ลบ
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full h-full flex flex-col justify-center items-center" v-else-if="dataPersonListStatus === 'no_data'">
                <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                    <img src="/images/illustrations/No data.svg" 
                    class="h-full w-full" alt="">
                </div>
                <p class="text-xl text-pink-600"> ไม่มีข้อมูลในระบบ</p>
            </div>
            <div class="w-full h-full flex flex-col justify-center items-center" v-else-if="dataPersonListStatus === 'loading_data'">
                <div class="h-full flex flex-col items-center justify-center">
                    <v-progress-circular indeterminate color="pink" :size="90" :width="12"></v-progress-circular>
                    <p class="text-xl mt-2 text-pink-600"> กำลังโหลดข้อมูลกรุณารอสักครู่...</p>
                </div>
            </div>
            <div class="w-full h-full flex flex-col justify-center items-center" v-else-if="dataPersonListStatus === 'err_data'">
                <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                    <img src="/images/illustrations/No data-amico.svg" 
                    class="h-full w-full" alt="">
                </div>
                <p class="text-xl text-pink-600"> เกิดข้อผิดพลาดในการรับข้อมูล</p>
            </div>
            <div class="w-full h-full flex flex-col justify-center items-center" v-else-if="dataPersonListStatus === 'network_err'">
                <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                    <img src="/images/illustrations/500 Internal Server Error-amico.svg" 
                    class="h-full w-full" alt="">
                </div>
                <p class="text-xl text-pink-600"> ไม่สามารถติดต่อกันเซิร์ฟเวอร์ได้</p>
            </div>

            <v-divider class="border-opacity-75"></v-divider>
            
            <div class="w-full flex justify-end mt-3 pr-12">
                <div class="w-[100px]">
                    <v-select
                        :items="size"
                        v-model="sizeSelected"
                        variant="outlined"
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
 
        <!-- table tree -->
        <v-navigation-drawer :disable-resize-watcher="false" :width="550" location="right" v-model="personTableTreeDrawer">
            <div class="w-full h-full flex flex-col px-2 pt-3">
                <div class="w-full h-auto flex flex-row justify-start text-4xl text-gray-500">
                    <v-icon 
                        class=" hover:text-gray-400 cursor-pointer duration-300 " 
                        icon="mdi-chevron-right" 
                        @click="personTableTreeDrawer = false ">
                    </v-icon>
                    <div class="-ml-14 w-full flex justify-center items-center">
                        <p class="text-[20px]">
                            ทำเนียบบุคลากร
                        </p>
                    </div>
                </div>
                <v-divider class="border-opacity-100" thickness="2px"></v-divider>
                <div class="w-full h-full bg-white overflow-auto">
                    <div class="w-full h-full">
                        <div class="w-full pt-3">
                            <div class=" h-full w-full flex flex-col justify-center items-center pr-2" 
                                v-for="position in personsList">
                                <div class="relative w-full text-center text-lg py-4 flex flex-row justify-center 
                                       border-2 rounded-md border-pink-300 mb-3 ">
                                    <p class="" >
                                        {{(position as any).position_name}} 
                                    </p>
                                    <div class="absolute right-3 top-1">
                                        <v-btn 
                                            color="pink-lighten-1"
                                            icon="mdi-plus"
                                            @click="addNewPersonDialog = true  , 
                                            selectedAddNewPersonPosition = (position as any).position_id ">   
                                            <v-tooltip location="top" activator="parent">
                                                เพิ่มบุคลากร
                                            </v-tooltip>
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
        
                                <!-- <div v-if="(position as any).persons && (position as any).persons.length <= 0"
                                class="w-full h-full flex flex-wrap justify-center items-start gap-10 pb-4">
                                    <div class="w-[120px] h-[150px] shadow-md flex justify-center items-center
                                    hover:shadow-lg bg-pink-50 hover:shadow-pink-200 cursor-pointer" 
                                    @click="addNewPersonDialog = true  , selectedAddNewPersonPosition = (position as any).position_id ">
                                        <p class="text-gray-600">เพิ่มบุคลากร</p>
                                    </div>
                                </div>-->
                                <div  class="w-full h-full flex flex-wrap justify-center items-start gap-5 pb-4 ">   
                                    <div class="relative w-[150px] h-auto flex flex-wrap justify-center cursor-pointer
                                    duration-200 hover:scale-[1.02]"  
                                    @click="updatePersonSetData(item)"
                                    v-for="item in (position as any).persons">
                                        <div class="w-[120px] h-[150px] border-2 rounded-md">
                                            <img v-if="item.pd_person_image !== 'no_image_upload'" class="object-cover  w-full  h-full rounded-md " 
                                            :src="personBaseImageUrl+item.pd_person_image" alt="">
                                            <img v-else class="object-cover  w-full  h-full rounded-md " 
                                            src="/images/avartars/default_avatar.png" alt="">
                                        </div>
                                        <div class="w-full text-center text-sm mt-2">
                                            <p class="text-md">{{ item.pd_person_name }}</p>
                                            <p class="text-sm text-gray-600">{{ item.pd_person_phone }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-navigation-drawer>

        <!-- position -->
        <v-navigation-drawer  :disable-resize-watcher="false" 
        :width="350" location="right" v-model="positionDrawer">
            <div class="w-full h-full flex flex-col px-2 pt-6">
                <div class="w-full px-2 flex flex-row gap-1">
                    <v-select
                        v-model="selectedPersonCategory"
                        label="ประเภท"
                        :items="personCategory"
                        item-title="pd_category_name"
                        item-value="pd_category_id"
                        hide-details
                        density="comfortable"
                        variant="outlined"
                    >
                    </v-select>
  
                    <v-btn @click="positionDialogAdd = true" color="green" icon="mdi-plus">
                        <v-tooltip location="top" activator="parent">
                            เพิ่มตำแหน่ง
                        </v-tooltip>
                        <v-icon icon="mdi-plus"></v-icon>
                    </v-btn>

                </div>
                <div class="w-full flex flex-col mt-2 gap-2 px-2 pb-2" v-if="dataPositionStatus === 'load_data_succ'">
                    <div v-for="item in personPosition" :key="item.pd_position_id"  
                    @click="positionObject = item , positionName = item.pd_position_name , renamePostionDialog = true"
                        class="w-full flex flex-row gap-1 border-2 border-pink-200 p-3 rounded-md
                        hover:bg-[#EC407A] hover:text-white cursor-pointer duration-100 hover:border-pink-50">
                        <div class="w-full flex items-center"  >
                            <p>{{ item.pd_position_name }}</p>
                        </div>
                        <v-tooltip activator="parent" location="bottom end" >
                            แก้ไข
                        </v-tooltip>
                    </div>
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="dataPositionStatus === 'no_data'">
                    <img src="/images/illustrations/No data.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="dataPositionStatus === 'err_data'">
                    <img src="/images/illustrations/500 Internal Server Error-cuate.svg" alt="">
                </div>
                <div class="w-full h-full flex justify-center items-center" v-else-if="dataPositionStatus === 'loading_data'">
                    <v-progress-circular indeterminate color="pink" :size="90" :width="12"></v-progress-circular>
                </div>
            </div>
        </v-navigation-drawer>
    </AdminNavigationBar>


    <!-- add position -->
    <v-dialog
        persistent
        v-model="positionDialogAdd"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มตำแหน่ง
                    <div @click="positionDialogAdd = false , errMessageAddPosition = 'no_action' , positionName = ''" 
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                <div class="w-full pl-7 mb-1 mt-3" v-if="errMessageAddPosition === 'name_exist'">
                    <p class="text-red-500 text-[13px]"> มีชื่อตำแหน่งนี้แล้ว กรุณาป้อนชื่อที่ไม่ซ้ำกัน </p>
                </div>
                <div class="w-full px-6 pb-4">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="positionName"
                            label="ป้อนชื่อตำแหน่ง"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="green" size="xl" tex 
                            :disabled="!!!positionName"
                            :loading="btnLoading"
                            @click="addPosition()" 
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
        v-model="renamePostionDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    แก้ไข
                    <div @click="renamePostionDialog = false , positionName = ''"
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>

                <div class="w-full px-6 pb-4 mt-3">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="positionName"
                            label="ป้อนชื่อตำแหน่ง"
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                        ></v-text-field>
                        <v-btn color="primary" size="xl" tex 
                            :disabled="!!!positionName"
                            :loading="btnLoading"
                            @click="renamePosition()" 
                            class="้px-3 w-[80px]">
                                <p class="text-xl">แก้ไข</p>
                        </v-btn>
                        <v-btn color="red" size="xl" tex 
                            @click="deletePosition()"
                            class="้px-3 w-[80px]">
                                <p class="text-xl">ลบ</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- add person -->
    <v-dialog
        persistent
        v-model="addNewPersonDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มบุคลากร
                </div>

                <div class="w-full px-6 pb-4 mt-3">
                    <v-file-input
                        v-model="personImageFile"
                        accept="image/*"
                        label="ภาพประจำตัว"
                        show-size
                        name="person_image"
                        hide-details
                        variant="outlined"
                        prepend-icon=""
                    ></v-file-input>
                    <v-text-field
                        label="*ชื่อบุคลากร"
                        v-model="personName"
                        class="mt-3"
                        hide-details="auto"
                        :rules="[
                            ()=> !!personName || 'กรุณากรอกชื่อบุคลากร'
                        ]"
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="personPhone"
                        label="เบอร์โทร"
                        class="mt-3"
                        hide-details
                        variant="outlined"
                        maxlength="10"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="personEmail"
                        label="อีเมล"
                        class="mt-3"
                        hide-details
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-select
                        v-model="selectedPersonCategory"
                        label="หมวดหมู่บุคลากร"
                        :items="personCategory"
                        class="mt-3"
                        item-title="pd_category_name"
                        item-value="pd_category_id"
                        hide-details
                        density="comfortable"
                        variant="outlined"
                    >
                    </v-select>
                    <div class="w-full flex flex-row justif-center items-start gap-2 mt-3"> 
                        <v-autocomplete
                            v-model="selectedAddNewPersonPosition"
                            :items="personPosition"
                            label="*ตำแหน่ง"
                            class=" w-full"
                            item-title="pd_position_name"
                            :rules="[
                                ()=> errMsgSelectPosition === 'position_selected' || 'กรุณาเลือกตำแหน่งก่อน'
                            ]"
                            item-value="pd_position_id"
                            hide-details="auto"
                            density="comfortable"
                            variant="outlined"
                        ></v-autocomplete>
                        <v-btn @click="positionDialogAdd = true"
                         class="mb-1" color="" size="large">  
                            เพิ่มตำแหน่ง
                        </v-btn>
                    </div>
                    <v-textarea 
                        v-model="personDesc"
                        label="เพิ่มเติม"
                        class="mt-3"
                        hide-details
                        variant="outlined"
                        bg-color=""
                    ></v-textarea >
                </div>
                <div class="flex w-full flex-row justify-center items-center gap-2">
                    <v-btn class="w-[100px]" color="red"
                    @click="clearPersonData()" >
                        ยกเลิก
                    </v-btn>
                    <v-btn class="w-[100px]" color="green" @click="addPerson()"
                    :disabled="errMsgSelectPosition === 'no_position_select' || !!!personName"
                    :loading="btnLoading">
                        เพิ่มบุคลากร
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
    
    <!-- update person -->
    <v-dialog
        persistent
        v-model="updatePersonDialog"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    เพิ่มบุคลากร
                </div>

                <div class="w-full px-6 pb-4 mt-3">
                    <v-file-input
                        v-model="personImageFile"
                        accept="image/*"
                        label="ภาพประจำตัว"
                        show-size
                        name="person_image"
                        hide-details
                        variant="outlined"
                        prepend-icon=""
                    ></v-file-input>
                    <v-text-field
                        label="*ชื่อบุคลากร"
                        v-model="personName"
                        class="mt-3"
                        hide-details="auto"
                        :rules="[
                            ()=> !!personName || 'กรุณากรอกชื่อบุคลากร'
                        ]"
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="personPhone"
                        label="เบอร์โทร"
                        class="mt-3"
                        hide-details
                        variant="outlined"
                        maxlength="10"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="personEmail"
                        label="อีเมล"
                        class="mt-3"
                        hide-details
                        variant="outlined"
                        bg-color=""
                        required
                    ></v-text-field>
                    <v-select
                        v-model="selectedPersonCategory"
                        label="หมวดหมู่บุคลากร"
                        :items="personCategory"
                        class="mt-3"
                        item-title="pd_category_name"
                        item-value="pd_category_id"
                        hide-details
                        density="comfortable"
                        variant="outlined"
                    >
                    </v-select>
                    <div class="w-full flex flex-row justif-center items-start gap-2 mt-3"> 
                        <v-autocomplete
                            v-model="selectedAddNewPersonPosition"
                            :items="personPosition"
                            label="*ตำแหน่ง"
                            class=" w-full"
                            item-title="pd_position_name"
                            :rules="[
                                ()=> errMsgSelectPosition === 'position_selected' || 'กรุณาเลือกตำแหน่งก่อน'
                            ]"
                            item-value="pd_position_id"
                            hide-details="auto"
                            density="comfortable"
                            variant="outlined"
                        ></v-autocomplete>
                        <v-btn @click="positionDialogAdd = true"
                         class="mb-1" color="" size="large">  
                            เพิ่มตำแหน่ง
                        </v-btn>
                    </div>
                    <v-textarea 
                        v-model="personDesc"
                        label="เพิ่มเติม"
                        class="mt-3"
                        hide-details
                        variant="outlined"
                        bg-color=""
                    ></v-textarea >
                </div>
                <div class="flex w-full flex-row justify-center items-center gap-2">
                    <v-btn class="w-[100px]" color="red"
                    @click="updatePersonDialog = false , personDetail = undefined , clearPersonData()" >
                        ยกเลิก
                    </v-btn>
                    <v-btn class="w-[100px]" color="green" @click="updatePerson()"
                    :disabled="errMsgSelectPosition === 'no_position_select' || !!!personName"
                    :loading="btnLoading">
                        บันทึก
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>

</template>