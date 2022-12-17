<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import NewProjectDialog from '../../components/common/NewProjectDialog.vue';
import ProjectDetail from '../../components/common/ProjectDetail.vue';
import { onMounted ,ref ,watch} from 'vue';
import MsgAlert from '../../services/msgAlert';
import apiRPTS from '../../services/api/apiRPTS_check';

const _msg = new MsgAlert()
const _api = new apiRPTS()

const isDialogNewProject = ref(false)
const isDialogProjectDetail = ref(false)
const projectList = ref()

onMounted(()=>{
    getProjectList()
})

async function getProjectList(){
    let data = {
        userId: JSON.parse(localStorage.getItem('credential')!).userId
    }
    await _api.myProjectList(data).then((res)=>{
        projectList.value = res.data.projectList
        console.log(projectList.value);
    })
}

watch(isDialogNewProject,()=>{
    if(isDialogNewProject.value === false){
        getProjectList()
    }
})
</script>

<template>
    <AdminNavigationBar>
        <v-btn color="primary" @click="isDialogNewProject = true"> Create Project</v-btn>
        <v-table>
            <thead>
                <tr>
                    <th class="text-center">#</th>
                    <th>Name TH</th>
                    <th>Name EN</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Edit</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="(project , i) of projectList" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td class="text-left">{{ project.Project_Name_TH }}</td>
                    <td class="text-left">{{ project.Project_Name_EN }}</td>
                    <td>{{ project.PROJECT_STATUS_ID.Project_Status_Name }}</td>
                    <td class="w-60">

                        <div class="flex flex-wrap justify-center">
                            <v-btn class="mr-1" color="info"  @click="isDialogProjectDetail = true">
                                Detail
                            </v-btn>
                            <v-btn class="ml-1" color="red">
                                Delete
                            </v-btn>
                        </div>
                    </td>

                </tr>
            </tbody>
        </v-table>
        <ProjectDetail
                persistent
                v-model:isDialogOpen="isDialogProjectDetail"
                @detail-close="()=>{ isDialogProjectDetail = false }"
                @detail-update="()=>{ isDialogProjectDetail = false }"
                >
        </ProjectDetail>
    </AdminNavigationBar>


    <NewProjectDialog
        persistent
        v-model:isDialogOpen="isDialogNewProject"
        @create-cancel="()=>{ isDialogNewProject = false }"
        @create-success="()=>{ isDialogNewProject = false }"
    >
    </NewProjectDialog>
</template>
