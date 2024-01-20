<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import pageDataStatus from '../../../components/layout/School/pageDataStatus.vue';
import { ref, onMounted ,watch ,reactive} from 'vue'

onMounted(()=>{
    document.title = 'หลักสูตร'
})
</script>

<template>
    <AdminNavigationBar>
        หลักสูตร
    </AdminNavigationBar>
</template>