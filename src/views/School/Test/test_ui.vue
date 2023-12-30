<script lang="ts" setup>
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';

</script>

<template>
    <AdminNavigationBar>
                <!-- <div class="w-full flex flex-row">
            <div class="w-1/2 h-full px-6 flex flex-col gap-6">
                <div v-html="quillValue" class="border-2 border-red-500"></div>
                 <div class="border-2 border-red-500">
                    {{ quillValue }}
                 </div>
            </div>
            <div class="w-1/2 h-full" >
                <v-btn @click="check()">
                    ok
                </v-btn>
            
                <QuillEditor 
                    theme="snow" 
                    contentType="html" 
                    v-model:content="quillValue"
                    toolbar="minimal"
                />
            </div>
        </div> -->
    </AdminNavigationBar>

</template>