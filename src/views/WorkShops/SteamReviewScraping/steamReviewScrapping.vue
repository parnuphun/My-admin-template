<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';


</script>

<template>
    <AdminNavigationBar>
        <div class="w-full flex flex-col">
            <div class="w-full flex flex-row gap-3">
                <div class="w-full">
                    <v-text-field
                        placeholder="กรุณากรอก steam review url ที่ต้องการ"
                        bg-color="#e5e7eb"
                        label="Link"
                        density="comfortable"
                        required
                    ></v-text-field>
                </div>
                <div class="min-w-max">
                    <v-btn color="primary" size="large">
                        ดึงข้อมูล
                        <v-icon class="ml-2" icon="mdi-download"></v-icon>
                    </v-btn>
                </div>
                <div class="min-w-max">
                    <v-btn color="success" size="large" >
                        ส่งออกไฟล์ CSV
                        <v-icon class="ml-2" icon="mdi-file-excel"></v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
    </AdminNavigationBar>
</template>
