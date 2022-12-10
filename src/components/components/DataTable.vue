<script setup lang="ts">
import { onMounted } from 'vue';

    export interface Column {
        key: string,
        label?: string
    }

    interface Data {
        [key: string ]:any
    }

    const props = defineProps<{
        columns: Column[],
        data: Data[]
    }>()

    onMounted(()=>{

    })

</script>

<template>


    <table class="">
        <thead class="bg-cyan-200 text-black">
            <tr>
                <th class="py-2 px-3 first:rounded-tl-xl last:rounded-tr-xl"
                    v-for="column of props.columns" :key="column.key">
                    {{column.label}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item , i ) of props.data" :key="i">
                <td class="px-3 py-1"
                    v-for="column of props.columns" :key="column.key" >
                    {{ item[column.key] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
