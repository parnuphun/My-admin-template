<script setup lang="ts">
import { onMounted } from 'vue';

    export interface Column {
        key: string,
        label?: string,
        class?:string
    }

    interface Data {
        [key: string ]:any
    }

    const props = defineProps<{
        columns: Column[],
        data: Data[],
        total: number,
        loading?:boolean,
        perPage: number,
        page: number,
        sizes?: number[],
    }>()

    const emit = defineEmits<{
        (event: 'update:per-page' , size:number):void
        (event: 'update:page' , size:number):void
    }>()

    function onChangePage(number:number){
        const nextNumber = props.page + number
        if(nextNumber <= 0){
            return
        }
        emit('update:page',nextNumber )
    }
</script>

<template>


    <table class="rounded-xl shadow-xl w-full">
        <thead class="bg-cyan-200 text-black">
            <tr>
                <th :class="column.class"
                    class="py-2 px-3 first:rounded-tl-xl last:rounded-tr-xl"
                    v-for="column of props.columns" :key="column.key">
                    {{column.label}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="props.loading">
                <td :colspan="props.columns.length"
                    class="bg-white w-full text-center py-1"> Loading... </td>
            </tr>
            <tr v-else v-for="(item , i ) of props.data" :key="i"
                class="even:bg-slate-100">
                <td class="py-2 px-3" :class="column.class"
                    v-for="column of props.columns" :key="column.key" >
                    {{ item[column.key] }}
                </td>
            </tr>
        </tbody>
    </table>

    <div class="flex mt-3 justify-between items-center">
        <div class="space-x-3">
            <button
                @click="onChangePage(-1)"
                class="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition focus:ring focus:ring-blue-300">
                Previos
            </button>
            <button
                @click="onChangePage(+1)"
                class="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition focus:ring focus:ring-blue-300">
                Next
            </button>
            <span> Current Page {{ props.page }}</span>
        </div>
        <div class="space-x-2">
            <span>
                {{ props.perPage * (props.page - 1 ) }} - {{ props.perPage * props.page }} รายการ จาก {{ props.total }} รายการ
            </span>

            <select
                @input="emit('update:per-page', +($event.target as HTMLSelectElement).value)"
                class="border-2 border-solid text-center px-3 rounded-lg">
                <option :value="size" v-for="(size,i) of props.sizes || [5,10,15,25,50,100]" :selected="props.perPage === size">
                    {{ size }}
                </option>
            </select>
        </div>
    </div>

</template>
