<script setup lang="ts">
import { reactive, ref } from 'vue';
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';

    const date = ref(new Date)

    function checkEvent(event:Event){
        console.log(event);
    }

    let popOverCalenda = reactive({
        label:'test'
    })
</script>
<template>
    <AdminNavigationBar>
        <div class="w-2/3 h-52">
            <v-date-picker
            color="red"
            Popovers=""
            v-model="date"
            is-expanded
        />
        </div>

    </AdminNavigationBar>
</template>

<style scoped>

</style>
