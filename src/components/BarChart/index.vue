<template>
  <div class="bar-chart">
    <div class="title-wrapper">
      <div class="left">
        <div class="title">当前热卖品类</div>
        <div class="sub-title">Hot Categories</div>
      </div>
      <div class="right">
        <div class="sub-title">最后更新时间：{{date}} {{time}}</div>
      </div>
    </div>
    <div class="chart-wrapper">
      <v-chart :option="option"></v-chart>
    </div>
  </div>
</template>

<script>
import { useClock } from '@/utils/clock'
import { onUnmounted, ref, watch } from 'vue'

const colors = ['rgb(209,248,138)', 'rgba(65,65,65,.5)']

export default {
  name: 'BarChart',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const { date, time } = useClock()
    const option = ref({})

    let task
    let current = 0

    watch(() => props.data, () => {
      task && clearInterval(task)
      updateChart()
      task = setInterval(() => {
        updateChart()
      }, 4000)
    }, {
      deep: true
    })

    onUnmounted(() => {
      task && clearInterval(task)
    })

    const updateChart = () => {
      const { data1, data2 } = props.data
      const sourceData = []
      if (current === 0) {
        data1.axisX.forEach((axis, index) => {
          sourceData.push([axis, data1.data1[index], data1.data2[index]])
        })
      } else {
        data2.axisX.forEach((axis, index) => {
          sourceData.push([axis, data2.data1[index], data2.data2[index]])
        })
      }
      option.value = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: colors,
        grid: {
          left: 20,
          right: 0,
          bottom: 30,
          top: 20
        },
        dataset: {
          source: [
            ['指标', '国内', '海外'],
            ...sourceData
          ]
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: 'rgb(124,136,146)'
            }
          },
          axisLabel: {
            color: 'rgb(98,105,113)',
            fontSize: 16
          },
          axisTick: { show: false }
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: 'rgb(98,105,113)',
            fontSize: 16
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: 'rgb(124,136,146)'
            }
          }
        },
        series: [
          {
            type: 'bar',
            stack: 'total',
            barWidth: 40
          },
          {
            type: 'bar',
            stack: 'total'
          }
        ]
      }
      current = current === 0 ? 1 : 0
    }

    return {
      date,
      time,
      option
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-chart{
  width: 100%;
  height: 100%;
  background: rgb(43, 44, 46);
  padding: 20px 40px;
  box-sizing: border-box;

  .title-wrapper {
    display: flex;

    .right {
      flex: 1;
      text-align: right;
    }

    .title {
      font-size: 32px;
    }

    .sub-title {
      font-size: 16px;
      margin-top: 10px;
    }
  }

  .chart-wrapper{
    height: 250px;
    width: 100%;
  }
}
</style>
