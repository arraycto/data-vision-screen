<template>
  <div class="activate-user">
    <div class="title">地区商家销售排行</div>
    <div class="list-wrapper">
      <div class="list-inner" v-for="(item,index) in currentData" :key="index">
        <div class="list-title">{{item.title}}</div>
        <div class="list-separator-wrapper">
          <div class="list-separator" />
        </div>
        <div class="chart-wrapper">
          <div class="img-wrapper">
            <img :src="item.img" alt="">
          </div>
          <v-chart :option="item.chartOption"/>
        </div>
        <div class="scroll-list-wrapper">
          <BasicScroll :config="item.scrollData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref, onUnmounted } from 'vue'
import BasicScroll from '@/components/BasicScroll'

export default {
  name: 'ActivateUser',
  components: {
    BasicScroll
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const flag = ref(false) // 为方便调试，只监听一次watch更新
    let currentIndex = 0
    const allData = ref([]) // 存储所有数据
    const currentData = ref([])
    const step = 3 // 显示数量
    let task
    const imgList = [
      'https://img.alicdn.com/tfs/TB1Z171qebviK0jSZFNXXaApXXa-30-29.png',
      'https://img.alicdn.com/tfs/TB1b8Tzq7T2gK0jSZFkXXcIQFXa-28-24.png',
      'https://img.alicdn.com/tfs/TB12MbzqYY1gK0jSZTEXXXDQVXa-28-30.png'
    ]

    const handleData = () => {
      updateData()
      task = setInterval(() => {
        updateIndex()
        updateData()
      }, 4000)
    }

    const updateIndex = () => {
      if (currentIndex >= allData.value.length - step) {
        currentIndex = 0
      } else {
        currentIndex++
      }
    }

    const updateData = () => {
      const tempData = allData.value.slice(currentIndex, currentIndex + step)
      const temp = []
      for (let i = 0; i < tempData.length; i++) {
        // 处理chartOption
        const num = Math.abs(Number(tempData[i].rate.replace('%', '')))
        const chartOption = {
          color: ['rgb(210, 244, 148)', 'rgb(79, 79, 79)'],
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          },
          title: {
            text: tempData[i].rate,
            left: 'center',
            top: '60%',
            textStyle: {
              color: 'rgb(210, 244, 148)',
              fontSize: 18,
              align: 'center'
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['70%', '90%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: num,
                  name: '活跃用户'
                },
                {
                  value: 100 - num,
                  name: '非活跃用户'
                }
              ]
            }
          ]
        }

        // 处理scrollData
        const rowData = []
        const aligns = []
        const shopData = tempData[i].shop
        for (let j = 0; j < shopData.length; j++) {
          rowData[j] = []
          aligns[j] = 'center'
          for (let k = 0; k < 3; k++) {
            let text = ''
            switch (k) {
              case 0:
                text = shopData[j].shop
                break
              case 1:
                text = shopData[j].order
                break
              case 2:
                text = shopData[j].sales
                break
              default:
            }
            if (k === 2) {
              rowData[j].push(`<div style="color:rgb(178,209,126)">${text}</div>`)
            } else {
              rowData[j].push(`<div style="color:rgb(255,255,255)">${text}</div>`)
            }
          }
        }
        const scrollData = {
          headerData: ['商家', '订单数', '销售额'],
          indexFlag: false,
          rowData, // 表格数据
          aligns, // 表格排序
          rowNum: 4, // 显示行数
          oddRowBGC: 'rgb(40, 40, 40)', // 奇数背景色
          evenRowBGC: 'rgb(55, 55, 55)', // 偶数背景色
          rowFontSize: 22 // 表格文字大小
        }

        temp.push({
          title: tempData[i].city,
          img: imgList[i],
          chartOption,
          scrollData
        })
      }
      currentData.value = temp
    }

    onUnmounted(() => task && clearInterval(task))

    watch(() => props.data, (newValue) => {
      if (flag.value) return
      allData.value = newValue
      handleData()
      flag.value = true
    }, {
      deep: true
    })

    return {
      currentData
    }
  }
}
</script>

<style lang="scss" scoped>
.activate-user {
  width: 100%;
  height: 100%;
  background: rgb(55, 55, 55);
  padding: 20px 40px;
  box-sizing: border-box;

  .title {
    font-size: 36px;
  }

  .list-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 560px;
    margin-top: 20px;

    .list-inner {
      flex: 0 0 32%;
      width: 30%;
      background: rgb(45, 45, 45);
    }

    .list-title {
      font-size: 24px;
      padding: 10px 20px;
      box-sizing: border-box;
    }

    .list-separator-wrapper {
      position: relative;
      height: 30px;
      background: rgb(93, 93, 93);

      .list-separator {
        position: absolute;
        top: 7.5px;
        right: 15px;
        width: 15px;
        height: 15px;
        background: rgb(50, 50, 50);
      }
    }

    .chart-wrapper {
      width: 100%;
      height: 200px;
      margin-top: 20px;
      position: relative;

      .img-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;

        img {
          width: 42px;
          height: 42px;
          margin-top: 60px;
        }
      }
    }

    .category-wrapper{
      margin-top: 20px;
    }

    .scroll-list-wrapper{
      margin-top: 20px;
      height: 230px;
    }
  }
}
</style>
