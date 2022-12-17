<script setup lang="ts">
import {ref , reactive , onMounted} from 'vue'
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
const _api = new apiRPTS()
const _msg = new MsgAlert()


const props = defineProps<{
    isDialogOpen : boolean
    data? : any
}>()

const emit = defineEmits<{
    (event: 'detail-update' ,size:boolean):void
    (event: 'detail-close' ,size:boolean):void
}>()

function close() {
    emit('detail-close',false)
}

</script>

<template>
    <v-dialog v-model="props.isDialogOpen">
        <v-card>
            <v-card-title class="p-6 bg-blue-500  text-white text-center">
                <span class="text-2xl"> Project Detail </span>
            </v-card-title>

            <v-card-text>
            </v-card-text>
            <v-card-actions>
                <div class="flex w-full justify-center items-center">
                    <v-btn color="error" @click="close" variant="outlined">
                        cancel
                    </v-btn>
                    <v-btn color="green" @click="" variant="outlined">
                        Update
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

