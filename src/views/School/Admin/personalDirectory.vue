<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref , reactive, onMounted , watch} from 'vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import {imageValidate} from '../../../services/validationRules'

const _api = new apiNamphong()
const _msg = new MsgAlert()

const tab = ref()
const categoryNo = ref<number>(1)
const positionDialogAdd = ref(false)
const positionDialogEdit = ref(false)
const personDialogAdd = ref(false)
const personDialogEdit = ref(false)
const selectedPosition = ref()
type managementState = 'nothing' | 'deleteposition' | 'editposition' | 'addposition'
const managementStatus = ref<managementState>('nothing')

const positionName = ref<string>('') // for add new position and rename 
const positionid = ref<number>() // for rename 

interface positionData {
    pd_position_id : number
    pd_position_name : string 
    pd_position_order : number
}
const positionList = ref<Array<positionData>>() // all position list

onMounted(()=>{
    // categoryNo.value = 1
    getAllPositionList()
    getPersonDirectoryOne() // บุคลากรทั่วไป

})
 
// check tab values
watch(tab , ()=>{
    managementStatus.value = 'nothing'
    if(tab.value === 'one') {
        categoryNo.value = 1
    }
    else if(tab.value === 'two') {
        categoryNo.value = 2
    }
    else if(tab.value === 'three'){
        categoryNo.value = 3
    } 
    getPersonDirectoryOne()
    getAllPositionList()

})

/////////////////////////////////////////////////////////////////////////////////////////////////
// Position 
/////////////////////////////////////////////////////////////////////////////////////////////////

// get position list and set select position
function getAllPositionList(){
    _api.getAllPositionList({category_id:categoryNo.value}).then((res)=>{
        positionList.value = res.data.positionData    
        // set select position after change tabs or managaged
        if(positionList.value?.length === 0){
            selectedPosition.value = null
        }else{
            if(managementStatus.value === 'nothing') {                
                selectedPosition.value = positionList.value![0].pd_position_id
            }else if(managementStatus.value === 'editposition') {
                return
            }else if(managementStatus.value === 'deleteposition') {
                selectedPosition.value = positionList.value![positionList.value!.length-1]?.pd_position_id
            }else if(managementStatus.value === 'addposition') {
                selectedPosition.value = positionList.value![positionList.value!.length-1]?.pd_position_id
            }  
        }

    })
}

// add new position
function addPosition(){
    if(positionName.value.trim() == '') return _msg.toast_msg({title:'กรุณากรอกข้อมูลให้ถูกต้อง',timer:5,icon:'error',progressbar:true})

    _api.addPosition({position_name:positionName.value,position_category:categoryNo.value}).then(async (res)=>{
        if(res.data.status){
            _msg.toast_msg({title:res.data.msg,timer:5,icon:'success',progressbar:true})
            getAllPositionList()
            getPersonDirectoryOne()
            positionName.value='';
            managementStatus.value = 'addposition'
        }else{
            _msg.default_msg({title:res.data.msg,timer:2,icon:'error'})
        }
    })
}

// delete position
function deletePosition(position_id:number , position_name:string){
     _msg.confirm(`คุณต้องการลบ ${position_name} ใช่หรือไม่ ?`).then((isConfirmed)=>{
        if(isConfirmed){

            // for (let i = 0; i < (personsList.value as any).length; i++) {
            //     console.log(i);
  
            // }
            
            
            _api.deletePosition({position_id:position_id}).then((res)=>{
                if(res.data.status){
                    _msg.toast_msg({title:'ลบสำเร็จ',timer:5,icon:'success',progressbar:true})
                    getAllPositionList()
                    getPersonDirectoryOne()   
                    managementStatus.value = 'deleteposition'                 
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:5,icon:'error',progressbar:true})
                }
            })
        }
    })
}

// rename position 
// set position name before rename 
watch(positionDialogEdit,()=>{ 
    let nameinarr = positionList.value?.
    filter((item)=>item.pd_position_id === selectedPosition.value).
    map((item)=> item.pd_position_name)
    positionName.value = nameinarr![0] as string
    managementStatus.value = 'editposition'
    if(positionDialogEdit.value === false) positionName.value = '' // set positionName to default prevent add new name useage
})
function RenamePosition(){
    _msg.confirm(`คุณต้องการเปลี่ยนชื่อใช่ไหม?`).then((isConfirmed)=>{
        if(isConfirmed){            
            if(positionName.value.trim() == '') return _msg.toast_msg({title:'กรุณากรอกข้อมูลให้ถูกต้อง',timer:5,icon:'error',progressbar:true})
            
            _api.RenamePosition({position_id:(selectedPosition.value as number) , position_name:positionName.value}).then((res)=>{
                if(res.data.status){
                    _msg.toast_msg({title:res.data.msg,timer:5,icon:'success',progressbar:true})
                    getAllPositionList()
                    getPersonDirectoryOne()
                }else{
                    _msg.toast_msg({title:res.data.msg,timer:5,icon:'error',progressbar:true})
                }
            })
        }
    })
}


/////////////////////////////////////////////////////////////////////////////////////////////////
// Persons Data
/////////////////////////////////////////////////////////////////////////////////////////////////
// get person from position 
interface PersonsPreviewsData {
  personsData: Array<object>;
}
const personsList = ref<PersonsPreviewsData>()
const personsDataTable = ref()
const personsBaseImageurl = ref()
function getPersonDirectoryOne(){
    // console.log('check current tabs or category => ',categoryNo.value);
    personsList.value = {personsData: []} as PersonsPreviewsData
    _api.getPersonDirectoryOne({category_id:categoryNo.value}).then((res)=>{        
        personsList.value = res.data.personsData as PersonsPreviewsData // previews
        personsDataTable.value = res.data.personsDataTable 
        personsBaseImageurl.value = res.data.personsBaseImageURL
        // console.log('person list on previws data => ',personsList.value);
        // console.log('person data table list => ',personsDataTable.value);
        // console.log('persons Base Image url=> ',personsBaseImageurl.value);
    })
}

// validate image
const _imgValid = [(v:any)=>imageValidate(v)]
const personName =ref()
const personDescript =ref()
const personImage = ref()
// add new person
function addNewPerson(){
    const formData = new FormData()
    if(personDescript.value === undefined) personDescript.value = ''
    formData.append('person_name',personName.value)
    formData.append('person_desc',personDescript.value)
    formData.append('person_image',personImage.value[0])
    formData.append('person_category_id',String(categoryNo.value))
    formData.append('person_position_id',selectedPosition.value)


    _api.addPerson(formData).then((res)=>{
        if(res.data.status) _msg.toast_msg({title:res.data.msg,timer:3,icon:'success'})
        else _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
        personDescript.value = ''
        personName.value = ''
        personImage.value = null
        getPersonDirectoryOne()
     })
}
// add new person dialog for check position first
function addNewPersonDialog(selectedPositionFromPreview?:number){
    if(selectedPositionFromPreview) selectedPosition.value = selectedPositionFromPreview
    if(positionList.value!.length === 0){
        _msg.default_msg({title:'กรุณาเพิ่มตำแหน่งก่อน',icon:'warning',confirmBtn:true,confirmText:'ตกลง'})
    }else{
        personDialogAdd.value = !personDialogAdd.value
    }
 }
// delete person
function deletePerson(id:number,img:string){
    _msg.confirm(`คุณต้องการลบบุคลากรใช่หรือไม่ ?`).then((isConfirmed)=>{
        if(isConfirmed){
            _api.deletePerson({person_id:id,person_image:img}).then((res)=>{
                if(res.data.status) _msg.toast_msg({title:res.data.msg,timer:3,icon:'success'})
                else _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
                getPersonDirectoryOne()
            })
        }
    })
}
// edit person dialog before update for get data to dialog
const changeSelectedPosition = ref()
const personOldImage = ref()
const personOldImageName = ref()
const persondEditid =ref()
function editPersonDialog(old_image:string,person_id:number,name:string,desc:string,position_id:number,position_name:string){
    personDialogEdit.value = !personDialogEdit.value // open dialog
    changeSelectedPosition.value = position_id
    persondEditid.value = person_id
    personOldImage.value = personsBaseImageurl.value + old_image
    personOldImageName.value = old_image
    personName.value = name
    personDescript.value = desc
}
// update person
function updatePersonData(){
    const formData = new FormData()
    if(personDescript.value === undefined) personDescript.value = ''
    formData.append('person_id',persondEditid.value) // person_id
    formData.append('person_name',personName.value) // person_name
    formData.append('person_desc',personDescript.value) // person_desc

    if(personImage.value === undefined || personImage.value === null){  // person_new_image 
        formData.append('person_image','no_image_update') 
    }else{
        formData.append('person_image',personImage.value[0])
    }

    formData.append('person_position_id',changeSelectedPosition.value) // person_position_id
    formData.append('person_old_image',personOldImageName.value) // person_position_id    
    _api.editPerson(formData).then( async (res)=>{
        if(res.data.status) _msg.toast_msg({title:res.data.msg,timer:3,icon:'success'})
        else _msg.toast_msg({title:res.data.msg,timer:3,icon:'error'})
        getPersonDirectoryOne();
        personImage.value = null
        personOldImage.value = res.data.image
    })
}
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col w-full h-full ">
            <div class="w-full h-full flex flex-wrap ">
                <!-- Manage -->
                <div class="w-1/2 h-full overflow-auto border-2 border-gray-300">
                    <v-card class="h-full" color="">
                        <!-- Add delete edit -->
                        <div class="w-full py-2">
                            <div class="w-full h-auto flex flex-row justify-between">
                                <div class="w-full px-2 flex flex-col gap-2" >
                                    <!-- Select Position -->
                                    <div class="w-full">
                                        <v-select
                                            label="เลือกตำแหน่ง"
                                            density="default"
                                            :items="positionList"
                                            item-title="pd_position_name"
                                            item-value="pd_position_id"
                                            v-model="selectedPosition"
                                            variant="outlined"
                                            no-data-text="ไม่มีตำแหน่งในระบบ กรุณาเพิ่มตำแหน่งก่อน"
                                            validate-on="blur"
                                            placeholder="กรุณาเลือกตำแหน่ง"
                                            hide-details 
                                        >
                                        </v-select>
                                    </div>
                                    <div class="w-full flex flex-row justify-between">
                                        <div class="w-full flex flex-row justify-start  gap-2">
                                            <!-- rename position -->
                                            <v-btn class="group w-auto" color=""
                                            @click="positionDialogEdit = !positionDialogEdit">
                                                <p class="group-hover:text-blue-500">
                                                    <v-icon icon="mdi-pencil"> </v-icon> เปลี่ยนชื่อ
                                                </p>
                                            </v-btn>
                                            <!-- add new position -->
                                            <v-btn class="group w-auto" color=""
                                            @click="positionDialogAdd = !positionDialogAdd">
                                                <p class="group-hover:text-green-600">
                                                    <v-icon icon="mdi-plus"> </v-icon> เพิ่มตำแหน่ง
                                                </p>
                                            </v-btn>
                                            <!-- delete position -->
                                            <v-btn class="group w-fit" color="" 
                                            @click="deletePosition(selectedPosition,positionName)">
                                            <p class="group-hover:text-red-600">
                                                <v-icon icon="mdi-delete"> </v-icon> ลบ
                                            </p>
                                            </v-btn>
                                        </div>
                                        <!-- add new person -->
                                        <v-btn class="group w-fit" color="" 
                                        @click="addNewPersonDialog()">
                                            <p class="group-hover:text-green-600">
                                                <v-icon icon="mdi-account-plus" class="mr-2"> </v-icon> เพิ่มบุคลากร
                                            </p>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- tabs -->
                        <div class="px-2">
                            <v-tabs
                                v-model="tab"
                                fixed-tabs
                                color="pink"
                                class=" border-t-[0.4px] border-gray-200"
                            >                                
                                <v-tab value="one">บุคลากรโรงเรียน</v-tab>
                                <v-tab value="two">คณะกรรมการศึกษาขั้นพื้นฐาน</v-tab>
                                <v-tab value="three">คณะกรรมการนักเรียน</v-tab>
                            </v-tabs>
                        </div>

                        <v-card-text class="h-full" >
                            <v-window v-model="tab" class="h-[88%]">
                                <v-window-item value="one" class="h-full" >
                                    <div class="h-full w-full flex flex-col ">
                                        <!-- table -->
                                        <div class="w-full h-full overflow-hidden -mt-4">
                                            <v-table 
                                                color="pink"
                                                fixed-header
                                                class="h-full overflow-auto"
                                            >
                                                <thead >
                                                    <tr class="bg-red-500">
                                                        <th class="text-left">
                                                        # 
                                                        </th>
                                                        <th class="text-left">
                                                        ภาพ 
                                                        </th>
                                                        <th class="text-left">
                                                        ชื่อ
                                                        </th>
                                                        <th class="text-center w-fit">
                                                        จัดการ
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="hover:bg-gray-200 w-full"
                                                        v-for="(item , i) in personsDataTable"
                                                        :key="item.name"
                                                    >
                                                        <td class="w-10">{{ i+1 }}</td>
                                                        <td class="w-24 min-w-[90px] py-2">
                                                            <div class="flex w-full h-full justify-start">
                                                                <img class="w-14 h-14 object-cover rounded-lg" 
                                                                :src="personsBaseImageurl+item.pd_person_image" alt="">    
                                                            </div>
                                                        </td>
                                                        <td class="w-full h-full">
                                                            <div class="w-auto h-full flex items-center ">
                                                                <p class="line-clamp-1">
                                                                    {{ item.pd_person_name }} 
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="w-full flex flex-row gap-2 justify-center">
                                                                <div @click="editPersonDialog(
                                                                    item.pd_person_image,
                                                                    item.pd_person_id,
                                                                    item.pd_person_name,
                                                                    item.pd_person_descript,
                                                                    item.pd_position_id,
                                                                    item.pd_position_name,
                                                                )"
                                                                class="scale-[1.1] hover:scale-[1.5] duration-300 hover:text-blue-600 cursor-pointer">
                                                                    <v-icon icon="mdi-account-edit"></v-icon>
                                                                </div>
                                                                <div @click="deletePerson(item.pd_person_id,item.pd_person_image)" 
                                                                class="scale-[1.1] hover:scale-[1.5] duration-300 hover:text-red-600 cursor-pointer">
                                                                    <v-icon icon="mdi-delete"></v-icon>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </div>
                                    </div>
                                </v-window-item>
                                
                                <v-window-item value="two" class="h-full">
                                    <div class="h-full w-full flex flex-col ">
                                        <!-- table -->
                                        <div class="w-full h-full overflow-hidden -mt-4">
                                            <v-table 
                                                color="pink"
                                                fixed-header
                                                class="h-full overflow-auto"
                                            >
                                                <thead >
                                                    <tr class="bg-red-500">
                                                        <th class="text-left">
                                                        # 
                                                        </th>
                                                        <th class="text-left">
                                                        ภาพ 
                                                        </th>
                                                        <th class="text-left">
                                                        ชื่อ
                                                        </th>
                                                        <th class="text-center w-fit">
                                                        จัดการ
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="hover:bg-gray-200 w-full"
                                                        v-for="(item , i) in personsDataTable"
                                                        :key="item.name"
                                                    >
                                                        <td class="w-10">{{ i+1 }}</td>
                                                        <td class="w-24 min-w-[90px] py-2">
                                                            <div class="flex w-full h-full justify-start">
                                                                <img class="w-14 h-14 object-cover rounded-lg" 
                                                                :src="personsBaseImageurl+item.pd_person_image" alt="">    
                                                            </div>
                                                        </td>
                                                        <td class="w-full h-full">
                                                            <div class="w-auto h-full flex items-center ">
                                                                <p class="line-clamp-1">
                                                                    {{ item.pd_person_name }} 
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="w-full flex flex-row gap-2 justify-center">
                                                                <div @click="editPersonDialog(
                                                                    item.pd_person_image,
                                                                    item.pd_person_id,
                                                                    item.pd_person_name,
                                                                    item.pd_person_descript,
                                                                    item.pd_position_id,
                                                                    item.pd_position_name,
                                                                )"
                                                                class="scale-[1.1] hover:scale-[1.5] duration-300 hover:text-blue-600 cursor-pointer">
                                                                    <v-icon icon="mdi-account-edit"></v-icon>
                                                                </div>
                                                                <div @click="deletePerson(item.pd_person_id,item.pd_person_image)" 
                                                                class="scale-[1.1] hover:scale-[1.5] duration-300 hover:text-red-600 cursor-pointer">
                                                                    <v-icon icon="mdi-delete"></v-icon>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </div>
                                    </div>
                                </v-window-item>

                                <v-window-item value="three" class="h-full">
                                    <div class="h-full w-full flex flex-col ">
                                        <!-- table -->
                                        <div class="w-full h-full overflow-hidden -mt-4">
                                            <v-table 
                                                color="pink"
                                                fixed-header
                                                class="h-full overflow-auto"
                                            >
                                                <thead >
                                                    <tr class="bg-red-500">
                                                        <th class="text-left">
                                                        # 
                                                        </th>
                                                        <th class="text-left">
                                                        ภาพ 
                                                        </th>
                                                        <th class="text-left">
                                                        ชื่อ
                                                        </th>
                                                        <th class="text-center w-fit">
                                                        จัดการ
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="hover:bg-gray-200 w-full"
                                                        v-for="(item , i) in personsDataTable"
                                                        :key="item.name"
                                                    >
                                                        <td class="w-10">{{ i+1 }}</td>
                                                        <td class="w-24 min-w-[90px] py-2">
                                                            <div class="flex w-full h-full justify-start">
                                                                <img class="w-14 h-14 object-cover rounded-lg" 
                                                                :src="personsBaseImageurl+item.pd_person_image" alt="">    
                                                            </div>
                                                        </td>
                                                        <td class="w-full h-full">
                                                            <div class="w-auto h-full flex items-center ">
                                                                <p class="line-clamp-1">
                                                                    {{ item.pd_person_name }} 
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="w-full flex flex-row gap-2 justify-center">
                                                                <div @click="editPersonDialog(
                                                                    item.pd_person_image,
                                                                    item.pd_person_id,
                                                                    item.pd_person_name,
                                                                    item.pd_person_descript,
                                                                    item.pd_position_id,
                                                                    item.pd_position_name,
                                                                )"
                                                                class="scale-[1.1] hover:scale-[1.5] duration-300 hover:text-blue-600 cursor-pointer">
                                                                    <v-icon icon="mdi-account-edit"></v-icon>
                                                                </div>
                                                                <div @click="deletePerson(item.pd_person_id,item.pd_person_image)" 
                                                                class="scale-[1.1] hover:scale-[1.5] duration-300 hover:text-red-600 cursor-pointer">
                                                                    <v-icon icon="mdi-delete"></v-icon>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </div>
                                    </div>
                                </v-window-item>
                            </v-window>
                        </v-card-text>
                    </v-card>
                </div>

                <!-- Preview -->
                <div class="w-1/2 h-full bg-red-100 overflow-auto border-l-0 border-2 border-gray-300">
                    <div class="w-full bg-white h-full">
                        <v-card class="w-full h-full" color="">
                            <div class="w-full text-md h-[65px] flex justify-center items-center shadow-xl border-b-[0.5px] border-gray-400 ">
                                ตัวอย่าง
                            </div>
                            <div class="w-full h-full p-4 bg-white overflow-auto">
                                <div class="w-full h-full">
                                    <div class="w-full pb-20">
                                        <div class="h-full w-full flex flex-col justify-center items-center" 
                                            v-for="position in personsList">
                                            <div class="w-full text-center text-lg py-4 flex flex-row justify-center 
                                            border-[1px] border-gray-400 mb-3">
                                                <p class=" " >
                                                    {{(position as any).position_name}} 
                                                </p>
                                            </div>
                    
                                            <div v-if="(position as any).persons && (position as any).persons.length <= 0"
                                            class="w-full h-full flex flex-wrap justify-center items-start gap-10 pb-4">
                                                <div class="w-[120px] h-[150px] border-2 border-gray-400 rounded-lg 
                                                        hover:bg-gray-200 border-dashed mt-4 flex justify-center items-center cursor-pointer
                                                        hover:text-lg duration-300" 
                                                @click="addNewPersonDialog((position as any).position_id)">
                                                    <p>เพิ่มข้อมูล</p>
                                                </div>
                                            </div>                     
                                            <div v-else class="w-full h-full flex flex-wrap justify-center items-start gap-10 pb-4">   
                                                <div class="relative w-[150px] h-auto flex flex-wrap justify-center" 
                                                    v-for="person of (position as any).persons">
                                                    <div class="w-[120px] h-[150px] rounded-lg">
                                                        <img class="object-cover rounded-lg w-full  h-full " 
                                                        :src="personsBaseImageurl+person.pd_person_image" alt="">
                                                    </div>
          
                                                    <div class="absolute top-0 -right-3 flex flex-col">
                                                    <div  @click="editPersonDialog(
                                                                    person.pd_person_image,
                                                                    person.pd_person_id,
                                                                    person.pd_person_name,
                                                                    person.pd_person_descript,
                                                                    person.pd_position_id,
                                                                    person.pd_position_name,
                                                                )"
                                                         class="text-blue-500 hover:text-blue-600 cursor-pointer scale-100 hover:scale-[1.4] duration-300">
                                                            <v-icon icon="mdi-account-edit"></v-icon>
                                                        </div>
                                                        <div class="text-red-500 hover:text-red-600 cursor-pointer scale-100 hover:scale-[1.4] duration-300"
                                                        @click="deletePerson(person.pd_person_id,person.pd_person_image)" >
                                                            <v-icon icon="mdi-delete"></v-icon>
                                                        </div>
                                                    </div>
                                                    <div class="w-full text-center text-sm mt-2">
                                                        <p>{{ person.pd_person_name }}</p>
                                                        <p class="text-sm">{{ person.pd_person_descript }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </div>
                </div>
            </div>
        </div>


        

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
                    <div @click="positionDialogAdd = !positionDialogAdd"
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full px-6 pb-4">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="positionName"
                            label="ป้อนชื่อตำแหน่งที่ต้องการ"
                            variant="outlined"
                            :hide-details="true"
                        ></v-text-field>
                        <v-btn color="green" size="xl" tex 
                            :disabled="positionName.trim() === ''"
                            @click="addPosition()" 
                            class="้px-3 w-[100px]">
                                <p class="text-xl">เพิ่ม</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- rename position -->
    <v-dialog
        persistent
        v-model="positionDialogEdit"
        width="600"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    แก้ไขชื่อตำแหน่ง
                    <div @click="positionDialogEdit = !positionDialogEdit"
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full px-6 pb-4">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field
                            v-model="positionName"
                            :hide-details="true"
                            label="ป้อนชื่อตำแหน่งที่ต้องการ"
                            variant="outlined"
                        ></v-text-field>
                        <v-btn color="blue" size="xl" tex 
                            :disabled="positionName.trim() === ''"
                            @click="RenamePosition()" 
                            class="้px-3 w-[100px]">
                                <p class="text-xl">แก้ไข</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- add new person -->
    <v-dialog
        persistent
        v-model="personDialogAdd"
        width="550"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     เพิ่มบุคลากรในทำเนียบ
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <v-form @submit.prevent="addNewPerson">
                            <v-file-input
                                :rules="_imgValid"
                                accept="image/*"
                                placeholder="เลือกภาพประจำตัว"
                                label="ภาพประจำตัว"
                                v-model="personImage"
                                class="mt-6"
                                name="person_image"
                                hide-details
                                variant="outlined"
                                prepend-icon=""
                            ></v-file-input>
                            <v-text-field
                                v-model="personName"
                                label="ชื่อเต็ม"
                                class="mt-2"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="personDescript"
                                label="เพิ่มเติม"
                                class="mt-2"
                                hide-details
                                variant="outlined"
                            ></v-text-field>
                            <v-select
                                label="เลือกตำแหน่ง"
                                :items="positionList"
                                class="mt-2"
                                item-title="pd_position_name"
                                item-value="pd_position_id"
                                v-model="selectedPosition"
                                hide-details
                                variant="outlined"
                            >
                            </v-select>
                            <div class="w-full mt-6 flex justify-center items-center gap-2">
                                <v-btn color="red" @click="personDialogAdd = !personDialogAdd , personImage = null">
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="green" type="submit" :disabled=" !!!personImage  || !!!personName " > ตกลง </v-btn>
                            </div>  
                        </v-form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <!-- edit person -->
    <v-dialog
        persistent
        v-model="personDialogEdit"
        width="550"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-xl mt-3 relative">
                     แก้ไขบุคลากร
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-col gap-2 w-full">
                        <div class="w-full flex justify-center items-center">
                            <div class="w-[150px] h-[200px] rounded-lg ">
                                <img class="object-cover rounded-lg w-full  h-full " 
                                :src="personOldImage" alt="">
                            </div>
                        </div>
                        <v-form @submit.prevent="updatePersonData">
                            <v-file-input
                                accept="image/*"
                                placeholder="เลือกภาพประจำตัว"
                                label="เปลี่ยนภาพประจำตัว"
                                v-model="personImage"
                                class=""
                                name="person_image"
                                hide-details
                                variant="outlined"
                                prepend-icon=""
                            ></v-file-input>
                            <v-text-field
                                v-model="personName"
                                label="ชื่อเต็ม"
                                class="mt-2"
                                hide-details
                                variant="outlined"
                                bg-color=""
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="personDescript"
                                label="เพิ่มเติม"
                                class="mt-2"
                                hide-details
                                variant="outlined"
                            ></v-text-field>
                            <v-select
                                label="เลือกตำแหน่ง"
                                :items="positionList"
                                class="mt-2"
                                item-title="pd_position_name"
                                item-value="pd_position_id"
                                v-model="changeSelectedPosition"
                                hide-details
                                variant="outlined"
                            >
                            </v-select>
                            <div class="w-full mt-6 flex justify-center items-center gap-2">
                                <v-btn color="red" 
                                    @click="personDialogEdit = false , personName = '' , personDescript = '' , personImage = null">
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="blue" type="submit" :disabled="!!!personName"
                                > บันทึก </v-btn>
                            </div>  
                        </v-form>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>