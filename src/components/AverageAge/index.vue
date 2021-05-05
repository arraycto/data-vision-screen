<template>
  <div class="average-age">
    <div class="title-wrapper">
      <div class="title-left">
        <div class="title">外卖用户年龄分布&平均年龄</div>
        <div class="sub-title">Distribution of Age</div>
      </div>
      <div class="title-right">
        <div class="age">
          <count-to
            :startVal="startAge"
            :endVal="avgAge"
            :duration="1000"
            :decimals="2"
          />
          <span class="age-unit">岁</span>
        </div>
      </div>
    </div>
    <v-chart class="chart" :option="option"></v-chart>
    <div class="average-data-wrapper">
      <div class="average-data" v-for="(item, index) in data" :key="index">
        <div class="average-data-value">
          <count-to
            :startVal="item.startValue"
            :endVal="item.value"
            :duration="1000"
          />
        </div>
        <div class="average-data-axis">
          <div class="point" :style="{background: item.color}" />
          <div class="text">{{item.axis}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

const color = ['rgb(116,166,49)', 'rgb(190,245,99)', 'rgb(202,252,137)', 'rgb(251,253,142)']

export default {
  name: 'AverageAge',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    avgAge: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const startAge = ref(0)
    const option = ref({})

    watch(() => props.avgAge, (nextValue, prevValue) => {
      startAge.value = prevValue
    })
    watch(() => props.data, () => {
      updateChart()
    }, {
      deep: true
    })

    const updateChart = () => {
      const chartData = ['年龄分布']
      const axis = ['指标']
      let max = 0

      props.data.forEach(item => {
        chartData.push(item.value)
        axis.push(item.axis)
        max += item.value
      })

      option.value = {
        color,
        grid: {
          left: 10,
          right: 10,
          top: 20,
          bottom: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontSize: 28,
            color: '#fff'
          },
          padding: 10,
          backgroundColor: '#2b2c2e',
          borderColor: '#2b2c2e'
        },
        dataset: {
          source: [
            axis,
            chartData
          ]
        },
        xAxis: {
          type: 'value',
          max,
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            show: false
            // color: 'rgb(98,105,113)',
            // fontSize: 18
          }
        },
        yAxis: {
          type: 'category',
          show: false
        },
        series: [
          {
            type: 'bar',
            stack: 'total',
            barWidth: 15
          },
          {
            type: 'bar',
            stack: 'total',
            barWidth: 15
          },
          {
            type: 'bar',
            stack: 'total',
            barWidth: 15
          },
          {
            type: 'bar',
            stack: 'total',
            barWidth: 15
          }
        ]
      }
    }

    return {
      startAge,
      option
    }
  }
}
</script>

<style lang="scss" scoped>
.average-age {
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);
  padding: 20px 40px;
  box-sizing: border-box;

  .title-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-left {
      .title {
        font-size: 32px;
      }

      .sub-title {
        font-size: 16px;
        margin-top: 10px;
      }
    }

    .title-right {
      font-weight: bold;

      .age {
        font-size: 68px;

        .age-unit {
          display: inline-block;
          margin-left: 5px;
          font-size: 20px;
        }
      }
    }
  }

  .chart {
    height: 100px;
  }

  .average-data-wrapper{
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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }

      .average-data-axis {
        display: flex;
        align-items: center;
        justify-content: center;
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

</style>
