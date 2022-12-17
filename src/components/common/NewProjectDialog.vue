<script setup lang="ts">
import {ref , reactive , onMounted} from 'vue'
import apiRPTS from '../../services/api/apiRPTS_check';
import MsgAlert from '../../services/msgAlert';
const _api = new apiRPTS()
const _msg = new MsgAlert()

const userId = ref('')
const userRoles = ref()

const projectNameTH = ref()
const projectNameEN = ref()
const projectDetail = ref()

onMounted(()=>{
    userId.value = JSON.parse(localStorage.getItem('credential')!).userId
    userRoles.value = JSON.parse(localStorage.getItem('credential')!).userRoles
})



function createNewProject(){
    let data = reactive({
        createdBy: userId.value,
        userRoles: userRoles.value,
        projectNameTH: projectNameTH.value,
        projectNameEN: projectNameEN.value,
        projectDetail: projectDetail.value
    })
    _api.createNewProject(data).then((res)=>{
        if(res.data.status){
            _msg.succ(res.data.msg,1.5)
            setTimeout(() => {
                emit('create-success',false)
                projectNameTH.value = ''
                projectNameEN.value = ''
                projectDetail.value= ''
            }, 1500);
        }else{
            _msg.err('someting wrong !')
        }
    })
}

function close() {
    emit('create-cancel',false)
    projectNameTH.value = ''
    projectNameEN.value = ''
    projectDetail.value= ''
}

const props = defineProps<{
    isDialogOpen: boolean
    data? : any
}>()

const emit = defineEmits<{
    (event: 'create-success' ,size:boolean):void
    (event: 'create-cancel' ,size:boolean):void
}>()

</script>

<template>
    <v-dialog v-model="props.isDialogOpen" hidden-overlay width="600">
        <v-card height="100%">
            <v-card-title class="p-6 bg-blue-500  text-white text-center">
                <span class="text-2xl"> Create Project  </span>
            </v-card-title>

            <v-card-text>
                <form action="" @submit.prevent="createNewProject">
                    <div class="flex flex-col w-full h-full">
                        <v-text-field
                            v-model="projectNameTH"
                            label="Project Name TH"
                            prepend-icon="mdi-rename-box"
                            requied>
                        </v-text-field>
                        <v-text-field
                            v-model="projectNameEN"
                            label="Project Name EN"
                            prepend-icon="mdi-"
                            requied>
                        </v-text-field>
                        <v-textarea
                            v-model="projectDetail"
                            label="Proect Detail"
                            prepend-icon="mdi-card-text-outline"
                            requied>
                        </v-textarea>
                        <v-file-input
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Pick an Project Image"
                            prepend-icon="mdi-file-image"
                            label="Project Image"
                        ></v-file-input>
                    </div>
                    <!-- <div class="mt-3 flex w-full justify-center items-center">
                        <button
                            @click="close"
                            class="mr-3 py-2 px-3 text-center text-white w-40 bg-red-500 hover:bg-red-700 rounded-full cursor-pointer">
                            Cancel
                        </button>
                        <button
                            @click=""
                            type="submit"
                            class="py-2 px-3 text-center text-white w-40 bg-green-500 hover:bg-green-700 rounded-full cursor-pointer">
                            Create
                        </button>
                    </div> -->
                </form>
            </v-card-text>
            <v-card-actions>
                <div class="flex w-full justify-center items-center">
                    <v-btn color="error" @click="close" variant="outlined">
                        cancel
                    </v-btn>
                    <v-btn color="green" @click="createNewProject" variant="outlined">
                        Create
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
