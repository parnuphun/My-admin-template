<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import { onMounted , watch , ref ,toRaw } from 'vue'
import DataTable , {Column} from '../../components/common/DataTable.vue';
import moment from 'moment'
import apiRPTS from '../../services/api/apiRPTS';

const api = new apiRPTS()

interface TableOption{
    columns: Column[],
    data: any[],
    total: number,
    loading : boolean,
    editColumn? : boolean,
    image? : boolean
}

const FakerData = ref<TableOption>({
    columns : [
        { key: 'fullName' , label: 'ชื่อเต็ม' , class: "text-left w-96"},
        { key: 'firstName' , label: 'ชื่อจริง' , class: "text-left" },
        { key: 'lastName' , label: 'นามสกุล' , class: "text-left"},
        { key: 'age' , label: 'อายุ' , class: "text-center truncate"},
        { key: 'birthDate' , label: 'วันเกิด' , class: "text-center truncate"},
        { key: 'avatar' , label: 'รูป' , class: "text-center truncate"},
    ],
    data: [],
    total: 0,
    loading: true
})

const PrismaData = ref<TableOption>({
    columns : [
        {key: 'id' , label: 'รหัส'},
        {key: 'username' , label: 'ผู้ใช้งาน'},
        {key: 'fname' , label: 'ชื่อจริง'},
        {key: 'lname' , label: 'นามสกุล'},
    ],
    data: [],
    total: 0 ,
    loading: true
})

const page = ref(1)
const perPage = ref(10)

async function getUser() {
    FakerData.value.loading = true
    await api.testDataTable(page.value,perPage.value).then((res)=>{
        const startDate = moment()
        const data = res.data as {usersData: any , total: number}
        FakerData.value.data = data.usersData.map((name:any)=>{
            name.fullName = `${name.firstName} ${name.lastName}`
            name.age = startDate.diff(name.birthDate,'years') + ' ปี'
            name.birthDate = moment(name.birthDate).add(543,'years').format('DD/MM/YYYY')
            return name
        })
        FakerData.value.total = data.total
    })
    FakerData.value.loading = false
}

onMounted(()=>{
    getUser()
})
watch(page,getUser)
watch(perPage,getUser)

</script>

<template>
    <AdminNavigationBar>
        <div class="mb-3 text-center">
            <span class="text-3xl"> Faker Data </span> <hr class="my-3">
            <DataTable
                v-bind="FakerData"
                v-model:per-page="perPage"
                v-model:page="page">
            </DataTable>
        </div>
    </AdminNavigationBar>
</template>
