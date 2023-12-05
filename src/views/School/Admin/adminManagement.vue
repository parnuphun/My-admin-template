<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import {ref} from 'vue'

const dialog = ref(false)
</script>

<template>
    <AdminNavigationBar>
        ผู้ดูแลระบบ
        <v-btn @click="dialog = !dialog" color="pink">
            Dialog
        </v-btn>
    </AdminNavigationBar>


    <v-dialog
        v-model="dialog"
        width="800"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <!-- content -->
            <div class="flex flex-col w-full ">
                <div class="w-full py-3 flex justify-center text-2xl mt-3 relative">
                    dialog exampleeee
                    <div @click="dialog = !dialog"
                    class="top-2 right-2 absolute h-10 w-10 text-red-500 hover:text-red-600 cursor-pointer text-2xl">
                        <v-icon icon="mdi-close"></v-icon>
                    </div>
                </div>
                <div class="w-full px-6">
                    <div class="flex flex-row gap-2 w-full">
                        <v-text-field

                            label="somthing"
                        ></v-text-field>
                        <div  class="้px-3 w-[100px] ">
                            <div class="w-full h-[55px] rounded-lg text-xl
                            bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center cursor-pointer">
                                ok
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
