<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import Vchart from 'vue-echarts';
import { use } from 'echarts/core'
import { TooltipComponent, LegendComponent ,GridComponent } from 'echarts/components';
import { PieChart , BarChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    GridComponent,
    BarChart,
])

const option = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center',
        textStyle: {
            // color : setting.theme === 'dark' ? '#ffffff' : '#000000',
        }
    },
    series: [
        {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
        },
        // specific data label in graph
        label: {
            show: false,
            position: 'center',
        },
        // Popover Label
        emphasis: {
            label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
            }
        },
        labelLine: {
            show: false
        },
        data: [
            { value: 1048, name: 'Example 1' },
            { value: 735, name: 'Example 2' },
            { value: 580, name: 'Example 3' },
            { value: 484, name: 'Example 4' },
            { value: 300, name: 'Example 5' }
        ]
        }
    ]
};
const option2 = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};

const dateOnRange = reactive({
        start:new Date(),
        end:new Date(2022,10,27)
    })

</script>

<template>
        <AdminNavigationBar>
            <v-parallax
                class="mb-3"
                height="300"
                src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
            <div class="w-full h-full flex flex-col justify-center items-center">
                <span class="text-3xl text-white">ระบบติดตามความก้าวหน้างานวิจัย</span>
                <span class="text-lg text-white">มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น</span>
            </div>
            </v-parallax>

            <!-- summary box -->
            <!-- <div class="w-full flex justify-center items-center
                        DT:flex-row
                        LT:flex-row
                        MB:flex-wrap">

                <div class="h-full rounded-2xl
                            DT:w-1/3 DT:pr-2
                            LT:w-1/3 LT:pr-2
                            TL:w-1/2 TL:pr-1 TL:mb-0
                            MB:w-full MB:mt-0 MB:mb-2
                            "
                    style="min-width:254.4px;">
                    <v-card
                        class="w-full h-36"
                        color="">
                        <template v-slot:title>
                            <div class="text-center">
                                Summary Topic 1
                            </div>
                        </template>
                        <v-card-text>

                        </v-card-text>
                    </v-card>
                </div>
                <div class="h-full rounded-2xl
                            DT:w-1/3 DT:mt-0
                            LT:w-1/3 LT:mt-0
                            TL:w-1/2 TL:pl-1
                            MB:w-full MB:mt-0
                            "
                    style="min-width:254.4px;">
                    <v-card
                        class="w-full h-36"
                        color="">
                        <template v-slot:title>
                            <div class="text-center">
                                Summary Topic 2
                            </div>
                        </template>
                        <v-card-text>

                        </v-card-text>
                    </v-card>
                </div>
                <div class="h-full rounded-2xl
                            DT:w-1/3 DT:pl-2 DT:mt-0
                            LT:w-1/3 LT:pl-2 LT:mt-0
                            TL:w-1/2 TL:mt-2
                            MB:w-full MB:mt-2
                            "
                    style="min-width:254.4px;">
                    <v-card
                        class="w-full h-36"
                        color="">
                        <template v-slot:title>
                            <div class="text-center">
                                Summary Topic 3
                            </div>
                        </template>
                        <v-card-text>

                        </v-card-text>
                    </v-card>
                </div>

            </div> -->

            <!-- ASMForm ongoing / calendar -->
            <!-- <div class="flex mt-3
                        DT:flex-row
                        LT:flex-row
                        TL:flex-row
                        MB:flex-col">

                <div class="DT:w-2/3
                            LT:w-2/3
                            TL:w-2/3
                            MB:w-full"
                            style="min-width:254.4px;">
                    <v-date-picker
                        color="blue"
                        v-model="dateOnRange"
                        is-expanded
                        is-range
                    />
                </div>
                <div class="DT:w-1/3 DT:pl-2
                            LT:w-1/3 LT:pl-2
                            TL:w-1/3 TL:pl-2
                            MB:w-full"
                            style="height:270px; min-width:254.4px;">
                    <v-card
                        class="w-full h-full"
                        color="">
                        <template v-slot:title>
                            <div class="text-center">
                                List to do
                            </div>
                        </template>
                        <v-card-text>

                        </v-card-text>
                    </v-card>
                </div>
            </div> -->

            <!-- graph -->
            <!-- <div class="flex gap-2 mt-3 w-full
                        DT:flex-row
                        LT:flex-row
                        TL:flex-col
                        MB:flex-col">

                <div class="DT:w-1/2
                            LT:w-1/2
                            TL:w-full
                            MB:w-full">
                    <v-card
                        class="w-full h-full"
                        color="">
                        <template v-slot:title>
                            <div class="text-center mb-3">
                                Graph 1
                            </div>
                        </template>
                        <v-card-text>
                            <div class="w-full flex items-center justify-center"
                                style="height:340px; min-width:254.4px;">
                                <div class="w-full
                                            DT:h-96
                                            LT:h-96
                                            TL:h-96
                                            MB:h-96">
                                    <Vchart :option="option" theme="light"></Vchart>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>

                <div class="DT:w-1/2
                            LT:w-1/2
                            TL:w-full
                            MB:w-full">
                    <v-card
                        class="w-full h-full"
                        color="">
                        <template v-slot:title>
                            <div class="text-center mb-3">
                                Graph 2
                            </div>
                        </template>
                        <v-card-text>
                            <div class="w-full h-96 flex items-center justify-center"
                                style="height:340px; min-width:254.4px;">
                                <div class="w-full h-96">
                                    <Vchart :option="option2"></Vchart>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
            </div> -->

            <!-- buttom summary -->
            <!-- <div class="w-full flex flex-col mt-3">
                <div class="w-full flex justify-center items-center
                            DT:flex-row
                            LT:flex-row
                            TL:flex-row
                            MB:flex-col">

                    <div class="DT:w-1/3 DT:pr-1
                                LT:w-1/3 LT:pr-1
                                TL:w-1/3 TL:pr-1
                                MB:w-full"
                                style="min-width:254.4px;">
                        <v-card
                            class="w-full h-full"
                            color=""
                            >
                            <template v-slot:title>
                                <div class="flex flex-row justify-between">
                                    <div class="w-1/2">
                                        <v-icon icon="mdi-clipboard-text" start>  </v-icon> 0
                                    </div>
                                    <div class="w-1/2 flex justify-end">
                                        Total 1
                                    </div>
                                </div>
                            </template>
                        </v-card>
                    </div>
                    <div class="DT:w-1/3 DT:pl-1
                                LT:w-1/3 LT:pr-1
                                TL:w-1/3 TL:px-1 TL:mt-0
                                MB:w-full MB:mt-2"
                                style="min-width:254.4px;">
                        <v-card
                            class="w-full h-full"
                            color=""
                            >
                            <template v-slot:title>
                                <div class="flex flex-row justify-between">
                                    <div class="w-1/2">
                                        <v-icon icon="mdi-checkbox-outline" start>  </v-icon> 0
                                    </div>
                                    <div class="w-1/2 flex justify-end">
                                        Total 2
                                    </div>
                                </div>
                            </template>
                        </v-card>
                    </div>
                    <div class="DT:w-1/3 DT:pl-1
                                LT:w-1/3 LT:pr-1
                                TL:w-1/3 TL:pl-1 TL:mt-0
                                MB:w-full  MB:mt-2"
                                style="min-width:254.4px;">
                        <v-card
                            class="w-full h-full"
                            color=""
                            >
                            <template v-slot:title>
                                <div class="flex flex-row justify-between">
                                    <div class="w-1/2">
                                        <v-icon icon="mdi-account-tie" start>  </v-icon> 0
                                    </div>
                                    <div class="w-1/2 flex justify-end">
                                        Total 3
                                    </div>
                                </div>
                            </template>
                        </v-card>
                    </div>
                </div>
            </div> -->
        </AdminNavigationBar>
</template>
