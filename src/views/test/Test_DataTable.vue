<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import { onMounted , watch , ref ,toRaw } from 'vue'
import DataTable , {Column} from '../../components/components/DataTable.vue';
import moment from 'moment'
import apiRPTS from '../../services/apiRPTS';
import { reactive } from 'vue';

const api = new apiRPTS()

interface TableOption{
    columns: Column[],
    data: any[],
    total: number,
    loading : boolean
}

const tableOption = reactive<TableOption>({
    columns : [
    { key: 'fullName' , label: 'ชื่อเต็ม' , class: "text-left w-96"},
    { key: 'firstName' , label: 'ชื่อจริง' , class: "text-left" },
    { key: 'lastName' , label: 'นามสกุล' , class: "text-left"},
    { key: 'age' , label: 'อายุ' , class: "text-center truncate"},
    { key: 'birthDate' , label: 'วันเกิด' , class: "text-center truncate"},
 ],
    data: [],
    total: 0,
    loading: true
})

const loading = ref(true)
const page = ref(1)
const perPage = ref(10)

async function getUser() {

    tableOption.loading = true

    await api.testDataTable(page.value,perPage.value).then((res)=>{
        const startDate = moment()
        const data = res.data as {usersData: any , total:number}
        tableOption.data = data.usersData.map((name:any)=>{
            name.fullName = `${name.firstName} ${name.lastName}`
            name.age = startDate.diff(name.birthDate,'years') + ' ปี'
            name.birthDate = moment(name.birthDate).add(543,'years').format('DD/MM/YYYY')
            return name
        })
        tableOption.total = data.total
    })

    tableOption.loading = false
}

onMounted(getUser)
watch(page,getUser)
watch(perPage,getUser)

</script>

<template>
    <AdminNavigationBar>
        <DataTable
            v-bind="tableOption"
            v-model:per-page="perPage"
            v-model:page="page">

        </DataTable>


        <button @click=""></button>
    </AdminNavigationBar>
</template>
