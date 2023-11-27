<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref } from 'vue';

const itemsPerPage = ref(5)

</script>

<template>
    <AdminNavigationBar>
        Dashboard
    </AdminNavigationBar>
</template>