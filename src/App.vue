<script setup lang="ts">

</script>

<template>
    <RouterView> </RouterView>
</template>

<style>
    /* Customize the button positions */
    .swal2-confirm {
      order: 1; /* Set the order property to -1 to move it to the left */
    }

    .swal2-cancel {
      order: -1; /* Set the order property to 1 to move it to the right */
    }


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
