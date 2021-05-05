<template>
  <div class="total-device">
    <div class="total-device-left">
      <v-chart :option="option"></v-chart>
    </div>
    <div class="total-device-right">
      <div class="title-wrapper">
        <div class="left">
          <div class="title">外卖登录设备</div>
          <div class="sub-title">Distribution of Internet devices</div>
        </div>
        <div class="right">
          <div class="age">
            <count-to
              :startVal="startNum"
              :endVal="num"
              :duration="1000"
            />
            <span class="age-unit">台</span>
          </div>
        </div>
      </div>
      <div class="average-data-wrapper">
        <div class="average-data" v-for="(item, index) in refData" :key="index">
          <div class="average-data-value">
            <count-to
              :startVal="item.startValue"
              :endVal="item.value"
              :duration="1000"
            />
          </div>
          <div class="average-data-axis">
            <div class="point" :style="{background: item.color}" />
            <div class="text">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

const color = ['rgb(176,207,120)', 'rgb(157,195,91)', 'rgb(131,167,72)']

export default {
  name: 'TotalDevice',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const startNum = ref(0)
    const num = ref(0)
    const refData = ref([])
    const option = ref({})

    watch(() => props.data, (newData) => {
      updateData(newData)
    }, {
      deep: true
    })

    const updateData = (newData) => {
      startNum.value = num.value
      num.value = parseInt(newData.totalDevices)
      if (refData.value.length > 0) {
        refData.value = newData.devices.map((item, index) => ({
          startValue: refData.value[index].value,
          value: item.value,
          name: item.key,
          color: color[index]
        }))
      } else {
        refData.value = newData.devices.map((item, index) => ({
          startValue: 0,
          value: item.value,
          name: item.key,
          color: color[index]
        }))
      }
      updateChart()
    }

    const updateChart = () => {
      option.value = {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            selectedMode: 'single',
            selectedOffset: 10,
            clockwise: true,
            center: ['50%', '50%'],
            color,
            emphasis: {
              itemStyle: {
                color: 'rgb(140,251,182)'
              }
            },
            startAngle: 0,
            animation: true,
            data: refData.value,
            roseType: 'radius',
            label: { show: false }
          }
        ]
      }
    }

    return {
      startNum,
      num,
      refData,
      option
    }
  }
}
</script>

<style lang="scss" scoped>
.total-device{
  width: 100%;
  height: 100%;
  display: flex;
  background: rgb(43, 44, 46);
  justify-content: space-between;
  padding: 20px 40px 20px 0;
  box-sizing: border-box;

  .total-device-left{
    width: 30%;
    height: 100%;
  }

  .total-device-right{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 10px 20px 0;

    .title-wrapper {
      display: flex;
      align-items: center;

      .left {
        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          margin-top: 10px;
        }
      }

      .right {
        flex: 1;
        font-weight: bold;
        text-align: right;

        .age {
          font-size: 56px;

          .age-unit {
            font-size: 20px;
            display: inline-block;
            margin-left: 5px;
          }
        }
      }
    }

    .average-data-wrapper {
      display: flex;

      .average-data {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bolder;

        .average-data-value {
          width: 100%;
        }

        .average-data-axis {
          display: flex;
          align-items: center;
          width: 100%;
          margin-top: 5px;

          .point {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }

          .text {
            margin-left: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }

}
</style>
