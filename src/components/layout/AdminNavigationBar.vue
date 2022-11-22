<script setup lang="ts">
import { ref } from 'vue';
import { navigationMenu  } from '../../components/navigation/navigationData'

    const drawer = ref(true)
    const isDark = ref(false)

    function routes(){

    }
</script>

<template>
    <VThemeProvider :theme="isDark ? 'dark' : 'light'">
        <VApp >
            <VNavigationDrawer color="primeOne" v-model="drawer" :elevation="2" >

                <div class="w-full text-center mt-5">
                    <p class="text-6xl"> Logo </p>
                </div>
                <div class="w-full py-3 px-6 text-sm">
                    เมนู
                </div>

                <v-list density="compact" class="px-3" >

                    <v-list-item
                        v-for="navItem of navigationMenu"
                        :prepend-icon="'mdi-'+navItem.icon"
                        title="" :value="navItem.id"
                        class="text-md my-1">
                        <RouterLink  :to="navItem.link">
                            <div class="w-full h-full">
                                {{ navItem.title }}
                            </div>
                        </RouterLink>
                    </v-list-item>

                </v-list>

            </VNavigationDrawer>

            <VAppBar :elevation="2" color="">
                <v-app-bar-nav-icon  @click.stop="drawer = !drawer"> หุบ </v-app-bar-nav-icon>
                <div class="w-full mr-6 flex flex-row justify-end">
                    <div class="w-auto mt-6">
                        <v-switch class="" v-model="isDark" :label="isDark ? 'มืด' : 'สว่าง'"></v-switch>
                    </div>
                </div>
            </VAppBar>

            <VMain>
                <div class="p-3 w-full h-full">
                    <slot></slot>
                </div>
            </VMain>
        </VApp>
    </VThemeProvider>
</template>
