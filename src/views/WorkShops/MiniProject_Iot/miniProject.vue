<script setup lang="ts">
import Card_Topic_Simple from '../../../components/common/Cards/Card_Topic_Simple.vue';
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import PageServerErr500 from '../../Common/ErrorPage/PageServerErr500.vue';
import PageLoading from '../../Common/ErrorPage/PageLoading.vue';
import {ref , onMounted} from 'vue';
import API_MINI_IOT from '../../../services/api/apiMiniProject_Iot';
//temp chart
import Vchart from 'vue-echarts';
import { use } from 'echarts/core'
import { TooltipComponent, LegendComponent ,GridComponent } from 'echarts/components';
import { PieChart , BarChart , LineChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import MsgAlert from '../../../services/msgAlert';

const _api_iot = new API_MINI_IOT()
const _msg = new MsgAlert()

const isLoading = ref(true)
const isErr = ref(false)

const topTemp = ref<string>()
const topHumidity = ref<string>()
let dhtDate:string[] = []
let dhtTemp:number[] = []
let dhtHumidity:number[] = []
const ledStatus = ref()

async function getTempAndHumidityData(){
    isLoading.value = true
    await _api_iot.getTempAndHumidityData().then((res)=>{
        isLoading.value = false
        if(res.data.status){
            isErr.value = false
            topTemp.value =  String(res.data.topTemp);
            topHumidity.value = String(res.data.topHumidity);
            dhtDate = res.data.date
            dhtTemp = res.data.temp
            dhtHumidity = res.data.humidity
            ledStatus.value = res.data.ledStatus

            // push data to graph
            option.value.series[0].data = dhtTemp
            option.value.series[1].data = dhtHumidity
            option.value.xAxis.data = dhtDate
        }
    }).catch(()=>{
        isLoading.value = false
        isErr.value = true
        _msg.toast_msg({
            title:'เซิร์ฟเวอร์ไม่ตอบสนอง',
            icon:'error',
            msg:'กรุณาตรวจสอบการเชื่อมต่อกับเซิร์ฟเวอร์',
            timer:5,
            width:'auto',
            progressbar: true
        })
    })
}

onMounted(async ()=>{
    await getTempAndHumidityData()
})
//temp chart
use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    GridComponent,
    BarChart,
    LineChart,
])

const option = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['อุณหภูมิ', 'ความชื้น']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: dhtDate,
    axisLabel: {
        show: true,
        interval: 0,
        rotate: 45,
    }
  },
  yAxis: {
    type: 'value',
    data:['อุณหภูมิ', 'ความชื้น']
  },
  series: [
    {
      name: 'อุณหภูมิ',
      type: 'line',
      stack: 'Total',
      data: dhtTemp
    },
    {
      name: 'ความชื้น',
      type: 'line',
      stack: 'Total',
      data: dhtHumidity
    },
  ]
});

function toggleBtn(value:boolean){
    let status:number
    if(value){
        status = 1
    }else{
        status = 0
    }

    _api_iot.updateLedStatus(status).then((res)=>{
        if(res.data.status){
            // getTempAndHumidityData()
            ledStatus.value = status
            _msg.toast_msg({title:(status === 1)?'On !':'Off !',icon:'success'})
        }else{
            _msg.default_msg({title:'มีบางอย่างผิดพลาด',icon:'error'})
        }
    })
}

</script>

<template>
    <AdminNavigationBar>
        <div v-if="isLoading" class="w-full pt-64">
            <PageLoading></PageLoading>
        </div>
        <div v-else-if="(isLoading===false && isErr === true)" class="w-full">
            <PageServerErr500></PageServerErr500>
        </div>
        <div v-else-if="(isLoading===false && isErr === false)" class="w-full">
            <div class="w-full flex justify-start items-center gap-2
                        MB:flex-wrap
                        ">
                <!-- is Connected  -->
                <!-- <div class="
                        MB:flex-1
                        TL:w-max
                        ">
                    <Card_Topic_Simple
                        card_width=""
                        :card_status="false"
                        :card_status_value="['ONLINE','OFFLINE']"
                        icon="mdi-power-plug"
                        title="เซิร์ฟเวอร์"

                    >
                    </Card_Topic_Simple>
                </div> -->
                <!-- is LED on  -->
                <div class="
                        MB:flex-1
                        LT:w-max
                        ">
                    <Card_Topic_Simple
                        icon="mdi-alarm-light-outline"
                        title="หลอดไฟ"
                        :card_status_value="['ปิด','เปิด']"
                        :card_status="(ledStatus === 1)? true : false"
                        :button_toggle="true"
                        @toggle-btn="(value:boolean)=> toggleBtn(value)"
                    >
                    </Card_Topic_Simple>
                </div>
                <!-- Temperature -->
                <div class="
                        MB:flex-1">
                    <Card_Topic_Simple
                        icon="mdi-temperature-celsius"
                        :value="topTemp"
                        icon_color="orange"
                        title="อุณหภูมิห้อง (° C)">
                    </Card_Topic_Simple>
                </div>
                <!-- Humidity -->
                <div class="
                        MB:flex-1">
                    <Card_Topic_Simple
                        icon="mdi-water"
                        icon_color="blue"
                        :value="topHumidity"
                        title="ความชื้น (%)">
                    </Card_Topic_Simple>
                </div>
                <!-- Door -->
                <!-- <div class="
                    MB:flex-1
                ">
                    <Card_Topic_Simple
                        icon="mdi-door"
                        icon_color="black"
                        :button_group="['สแกนคิวอาร์โค้ด','กรอกรหัส']"
                        :button_group_colors="['primary','info']"
                        :button_group_type="['dialog','dialog']"
                        :button_group_id="['qrCode','password']"
                        title="ประตู">
                    </Card_Topic_Simple>
                </div> -->
            </div>
            <div class="w-full mt-2">
                <v-card
                    class="w-full h-full"
                    color="">
                    <template v-slot:title>
                        <div class="text-center font-bold text-2xl my-3">
                            กราฟแสดงอุณหภูมิและความชื้น
                        </div>
                    </template>
                    <v-card-text>
                        <div class="w-full h-96 flex items-center justify-center"
                            style="height:340px; min-width:254.4px;">
                            <div class="w-full h-96">
                                <Vchart :option="option"></Vchart>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
        </div>

    </AdminNavigationBar>
</template>
