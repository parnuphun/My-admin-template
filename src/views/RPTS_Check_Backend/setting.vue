<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import Account from './Account.vue'
import {ref } from 'vue'

const isLoadingProgressBar = ref(false)
</script>

<template>
    <AdminNavigationBar :is-loading-progress-bar="isLoadingProgressBar">
        <v-navigation-drawer :elevation="0">
            <!-- <div class="w-full pl-4 pr-2 pt-5 flex flex-row justify-start text-sm"></div> -->
            <!-- menu list -->
            <v-list class="" nav lines="two">
                <v-list-item
                    title="ข้อมูลส่วนตัว"
                    :active="false"
                    density="comfortable"
                    value=""
                    class="text-lg my-1"
                    active-color=""
                    subtitle="จัดการ แก้ไข ข้อมูลเบื้องต้นของผู้ใช้งาน"
                    prepend-icon="mdi-card-account-details"
                    >
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item
                    title="การแจ้งเตือน"
                    :active="false"
                    density="comfortable"
                    value=""
                    class="text-lg my-1"
                    active-color=""
                    subtitle="ตั้งค่ารูปแบบการแจ้งเตือน "
                    prepend-icon="mdi-bell"
                >
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item
                    title="ภาพประกอบ"
                    :active="false"
                    density="comfortable"
                    value=""
                    class="text-lg my-1"
                    active-color=""
                    subtitle="เพิ่ม ลบ ภาพประกอบเว็บไซต์ "
                    prepend-icon="mdi-image"
                >
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
        </v-navigation-drawer>
        <Account
            @loading-progress-bar="(value:boolean)=>{ isLoadingProgressBar = value}"
        >
        </Account>
    </AdminNavigationBar>
</template>
