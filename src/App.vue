<script setup lang="ts">

</script>

<template>
    <RouterView> </RouterView>
</template>

<style>
    /* sweet alert */
    .swal2-container {
        z-index: 20000 !important;
    }

    /* scroll bar */
    /* width */
    ::-webkit-scrollbar {
        width: 8px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #94a3b8;
        border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #64748b;
    }

</style>
