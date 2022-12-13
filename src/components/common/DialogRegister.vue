<script setup lang="ts">
import {ref} from 'vue'

    const props = defineProps<{
        isDialogOpen: boolean
    }>()

    const emit = defineEmits<{
        (event: 'register-success' , size:boolean):void
    }>()

    // function closeDialog(){
    //     emit('close-dialog',false)
    // }

</script>

<template>
    <v-dialog v-model="props.isDialogOpen"  width="600" height="100%">
        <v-card height="100%">
            <v-card-text>
                Dialog test
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="emit('register-success',false)"><span class="text-xl">บันทึกข้อมูล</span></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
