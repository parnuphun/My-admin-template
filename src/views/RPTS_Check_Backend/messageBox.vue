<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';


</script>

<template>
    <AdminNavigationBar>
        <v-navigation-drawer
                :elevation="0"
            >
                <div class="w-full pl-4 pr-2 pt-5 flex flex-row justify-start text-sm">กล่องจดหมาย</div>
                <!-- menu list -->
                <v-list class="" nav >
                    <v-list-item
                        title="ทั้งหมด"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-email-multiple</v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="ยังไม่อ่าน"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-email-alert</v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="อ่านแล้ว"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-email-newsletter</v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="ถังขยะ"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-email-off </v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <div class="w-full pl-4 pr-2 pt-5 flex flex-row justify-start text-sm">หมวดหมู่</div>
                <v-list class="" nav >
                    <v-list-item
                        title="ผู้ใช้งาน"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon> mdi-account-badge </v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="โครงการ"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-text-box </v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                    <v-list-item
                        title="กำหนดการ"
                        :active="false"
                        density="comfortable"
                        value="navItem.id"
                        class="text-md my-1"
                        active-color=""
                        >
                        <template v-slot:prepend>
                            <v-icon >mdi-calendar-badge </v-icon>
                        </template>
                        <template v-slot:append>
                            <v-chip
                            class="ma-2"
                            color="primary"
                            >
                            0
                            </v-chip>
                        </template>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        <div class="w-full flex flex-col">
            <div class="w-full flex gap-2">
                <div class="w-full">
                    <v-text-field
                        bg-color="#e5e7eb"
                        placeholder="กรอกชื่อที่ต้องการค้นหา"
                        append-inner-icon="mdi-email-search-outline"
                        density="comfortable">
                    </v-text-field>
                </div>
            </div>
        </div>
        message box
    </AdminNavigationBar>
</template>
