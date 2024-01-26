<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref , reactive, onMounted , watch} from 'vue';
import apiNamphong from '../../../services/api/api_namphong';
import MsgAlert from '../../../services/msgAlert';
import {credential} from '../../../store/Interface' 
import { useRouter } from 'vue-router';

import axiosAuth from '../../../services/auth'

const _api = new apiNamphong()
const _msg = new MsgAlert()
const credential = ref()
const router = useRouter()

const res_data = ref<any>()
onMounted(()=>{
    axiosAuth.post('http://localhost:3001/test_check_token').then((res)=>{
        console.log('RESPONSE IN FUNCTION : ',res.data);
        res_data.value = res.data 
    })
})
</script>

<template>
    <AdminNavigationBar>
        <div class="">

        </div>
    </AdminNavigationBar>
</template>