<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import { MsgAlert } from '../../services/msgAlert'

const alert = new MsgAlert()
    function Success(){
        alert.successMsg()
    }

</script>

<template>
    <AdminNavigationBar>
        <div @click="Success"
            class="w-24 text-white bg-green-500 hover:bg-green-700 rounded-lg p-3 cursor-pointer">
                Success !
        </div>
    </AdminNavigationBar>
</template>

