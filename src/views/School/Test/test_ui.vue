<script lang="ts" setup>
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import '@vueup/vue-quill/dist/vue-quill.core.css';


import { ref } from 'vue';

const quillValue = ref()

const toolbar = [
                [{ 'header': [] }],
                ['bold', 'italic', 'underline','strike',{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['image','link','video'],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
            ]

function check(){
    console.log(quillValue);
}
</script>

<template>
    <AdminNavigationBar>
                <div class="w-full flex flex-row h-full">
            <div class="w-1/2 h-full px-6 flex flex-col gap-6">

                <div class="ql-container">
                    <div class="ql-editor">
                        <div v-html="quillValue"></div>
                    </div>
                </div>
                 
                <div>
                    {{ quillValue }}
                </div>
               
            </div>
            <div class="w-1/2 h-full" >
 
                <div class="w-full h-full border-2 mt-2">
                    <QuillEditor 
                        theme="snow"
                        contentType="html" 
                        v-model:content="quillValue"
                        placeholder="ป้อนเนื้อหาที่นี่"
                        :toolbar="toolbar"
                    />
                </div>
            </div>
        </div>
    </AdminNavigationBar>

</template>

<style>
 
</style>