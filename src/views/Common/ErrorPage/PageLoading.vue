<script setup lang="ts">


</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">

        <v-progress-circular
            color="primary"
            indeterminate
            :size="128"
            :width="12"
        ></v-progress-circular>
        <p class="text-3xl font-bold mt-3 text-indigo-700">
            Loading...
        </p>
    </div>
</template>
