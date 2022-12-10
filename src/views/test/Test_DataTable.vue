<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import { onMounted , ref ,toRaw } from 'vue'
import DataTable , {Column} from '../../components/components/DataTable.vue';
import moment from 'moment'
import apiRPTS from '../../services/apiRPTS';

const api = new apiRPTS()

const columns : Column[] = [
    { key: 'fullName' , label: 'ชื่อเต็ม'},
    { key: 'firstName' , label: 'ชื่อจริง'},
    { key: 'lastName' , label: 'นามสกุล'},
    { key: 'birthDate' , label: 'อายุ'}
]
const data = ref([])

onMounted(async ()=>{

    await api.testDataTable().then((res)=>{
        data.value = res.data.map((name:any)=>{
            name.fullName = `${name.firstName} ${name.lastName}`
            name.birthDate = moment(name.birthDate).format('LL')
            return name
        })
    })


})

</script>

<template>
    <AdminNavigationBar>
        <DataTable :columns="columns" :data="data"></DataTable>
    </AdminNavigationBar>
</template>
