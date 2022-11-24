<script setup lang="ts">
import { reactive, ref } from 'vue';
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
    left: 'center'
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
      label: {
        show: false,
        position: 'center'
      },
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
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
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
        <div class="w-ful flex flex-row gap-2">
            <div class="w-1/3 h-full bg-white rounded-2xl">
                <v-card
                    class="w-full h-36"
                    color="success">
                    <template v-slot:title>
                        <div class="text-center">
                            จำนวนแบบฟอร์มทั้งหมด
                        </div>
                    </template>
                    <v-card-text>
                    This is content
                    </v-card-text>
                </v-card>
            </div>
            <div class="w-1/3 h-full bg-white rounded-2xl">
                <v-card
                    class="w-full h-36"
                    color="primary">
                    <template v-slot:title>
                        <div class="text-center">
                            จำนวนแบบฟอร์มทั้งหมด
                        </div>
                    </template>
                    <v-card-text>
                    This is content
                    </v-card-text>
                </v-card>
            </div>
            <div class="w-1/3 h-full bg-white rounded-2xl">
                <v-card
                    class="w-full h-36"
                    color="error">
                    <template v-slot:title>
                        <div class="text-center">
                            จำนวนแบบฟอร์มทั้งหมด
                        </div>
                    </template>
                    <v-card-text>
                    This is content
                    </v-card-text>
                </v-card>
            </div>
        </div>

        <div class="flex flex-row gap-2 mt-3">
            <div class="w-2/3">
                <v-date-picker
                    color="pink"
                    v-model="dateOnRange"
                    is-expanded
                    is-range
                />
            </div>
            <div class="w-1/3">
                <v-card
                    class="w-full h-full"
                    color="white">
                    <template v-slot:title>
                        <div class="text-center">
                            แบบฟอร์มที่กำลังเปิด
                        </div>
                    </template>
                    <v-card-text>

                    </v-card-text>
                </v-card>
            </div>
        </div>


        <div class="flex flex-row gap-2 mt-3 w-full">
            <div class="w-1/2">
                <v-card
                    class="w-full h-full"
                    color="white">
                    <template v-slot:title>
                        <div class="text-center">
                            กราฟ 1
                        </div>
                    </template>
                    <v-card-text>
                        <div class="w-full h-96 flex items-center justify-center" style="height:340px;">
                            <div class="w-full h-96">
                                <Vchart :option="option"></Vchart>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </div>

            <div class="w-1/2">
                <v-card
                    class="w-full h-full"
                    color="white">
                    <template v-slot:title>
                        <div class="text-center">
                            กราฟ 2
                        </div>
                    </template>
                    <v-card-text>
                        <div class="w-full h-96 flex items-center justify-center" style="height:340px;">
                            <div class="w-full h-96">
                                <Vchart :option="option2"></Vchart>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
        </div>


    </AdminNavigationBar>
</template>
