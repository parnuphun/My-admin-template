<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';


</script>

<template>
    <AdminNavigationBar>


        <div class="w-full flex flex-col">
            <div class="flex flex-row">
                <div class="w-1/2 pr-1">
                    <v-text-field
                        prepend-inner-icon="mdi-card-search-outline"
                        label="Project Name TH"
                        bg-color="gray"
                        counter
                        clearable
                    ></v-text-field>
                    <v-text-field
                        label="Project Name EN"
                    ></v-text-field>
                    <v-textarea
                        label="Project Detail"
                    ></v-textarea>
                </div>
                <div class="w-1/2 pl-1">

                </div>
            </div>

            <div>
                <div class="w-full">
                    <v-text-field
                        prepend-icon="mdi-card-search-outline"
                        label="Search"
                    ></v-text-field>
                </div>
                <v-table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                </v-table>
            </div>
        </div>
    </AdminNavigationBar>
</template>

<style scoped>
.v-text-field--outlined fieldset {
    color: red !important;
}
</style>
