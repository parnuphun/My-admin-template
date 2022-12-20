<script setup lang="ts">

</script>

<template>
    <RouterView> </RouterView>
</template>

<style>
    .swal2-container {
        z-index: 20000 !important;
    }

        /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #a1a1aa;
        border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #71717a;
    }
</style>
