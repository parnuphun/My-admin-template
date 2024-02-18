<script lang="ts" setup>
const props = defineProps<{
    dataStatus: 'no_data' | 'loading_data' | 'err_data' | 'load_data_succ' | 'network_err'
}>()
</script>


<template>
    <div class="w-full h-full flex justify-center items-center gap-2 py-2 pr-2" v-if="props.dataStatus === 'no_data'">
        <div class=" flex flex-col items-center">
            <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                <img src="/images/illustrations/No data.svg" 
                class="h-full w-full" alt="">
            </div>
            <p class="text-xl text-pink-600"> ไม่มีข้อมูลในระบบ</p>
        </div>
    </div>
    <div class="w-full h-full flex justify-center items-center gap-2 py-2 pr-2" v-if="props.dataStatus === 'loading_data'">
        <div class=" flex flex-col items-center">
            <v-progress-circular indeterminate color="pink" :size="90" :width="12"></v-progress-circular>
            <p class="text-xl mt-2 text-pink-600"> กำลังโหลดข้อมูลกรุณารอสักครู่...</p>
        </div>
    </div>
    <div class="w-full h-full flex justify-center items-center gap-2 py-2 pr-2" v-if="props.dataStatus === 'err_data'">
        <div class=" flex flex-col items-center">
            <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                <img src="/images/illustrations/No data-amico.svg" 
                class="h-full w-full" alt="">
            </div>
            <p class="text-xl text-pink-600"> เกิดข้อผิดพลาดในการรับข้อมูล</p>
        </div>
    </div>
    <div class="w-full h-full flex justify-center items-center gap-2 py-2 pr-2" v-if="props.dataStatus === 'network_err'">
        <div class=" flex flex-col items-center">
            <div class="less:w-[250px] less:h-[250px] md:w-[400px] md:h-[400px]">
                <img src="/images/illustrations/500 Internal Server Error-amico.svg" 
                class="h-full w-full" alt="">
            </div>
            <p class="text-xl text-pink-600"> ไม่สามารถติดต่อกับเซิร์ฟเวอร์ได้ </p>
        </div>
    </div>
</template>