<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';


</script>

<template>
    <AdminNavigationBar>
        <div class="w-full flex flex-wrap bg-red-500 gap-1 ">
            <div class="w-full bg-green-50 flex justify-end h-96 items-end">
                <div class="w-10 h-10 bg-red-500 m-3"></div>
            </div>
            <div class="w-1/3 bg-green-50 ">
                <v-card
                    class="mx-auto"
                    width="400"
                    prepend-icon="mdi-home"
                >
                    <template v-slot:title>
                    This is a title
                    </template>

                    <v-card-text>
                    This is content
                    </v-card-text>
                </v-card>
            </div>
            <div class="w-1/3 bg-green-50 ">
                <v-card
                    class="mx-auto"
                    width="400"
                    prepend-icon="mdi-home"
                >
                    <template v-slot:title>
                    This is a title
                    </template>

                    <v-card-text>
                    This is content
                    </v-card-text>
                </v-card>
            </div>
        </div>

    </AdminNavigationBar>
</template>