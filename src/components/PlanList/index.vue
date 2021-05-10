<template>
  <div class="plan-list">
    <div class="title">区域销售大盘环比分析</div>
    <div class="content">
      <BasicScroll :config="config"></BasicScroll>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import BasicScroll from '@/components/BasicScroll'

export default {
  name: 'PlanList',
  components: { BasicScroll },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const config = ref({})
    const flag = ref(false) // 只监听一次变化

    watch(() => props.data, (newValue) => {
      if (flag.value) return
      const rowData = []
      const aligns = []
      const rowIndexContent = []
      const oddIndexContent = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/></div>'
      const evenIndexContent = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><div style="width:15px;height:15px;background:rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/></div>'
      for (let i = 0; i < newValue.length; i++) {
        aligns[i] = 'center'
        rowIndexContent[i] = i % 2 === 0 ? evenIndexContent : oddIndexContent
        rowData[i] = []
        for (let j = 0; j < 5; j++) {
          let text = ''
          switch (j) {
            case 0:
              text = props.data[i].order
              break
            case 1:
              text = props.data[i].shop
              break
            case 2:
              text = props.data[i].rider
              break
            case 3:
              text = props.data[i].newShop
              break
            case 4:
              text = props.data[i].avgOrder
              break
            default:
          }
          if (j === 1 || j === 3) {
            rowData[i].push(`<div style="color:rgb(178,209,126)">${text}</div>`)
          } else {
            rowData[i].push(`<div style="color:rgb(255,255,255)">${text}</div>`)
          }
        }
      }
      config.value = {
        headerData: ['城市订单量', '店铺数', '接单骑手人数', '新店铺数量', '人均订单量'],
        rowData,
        aligns,
        headerIndexContent: '',
        rowIndexContent,
        indexFlag: true,
        rowNum: 12,
        moveNum: 1,
        commonBGC: '#282828',
        headerBGC: 'rgb(90, 90, 90)', // 表头背景色
        headerHeight: 55, // 表头高度
        headerFontSize: 24, // 表头文字大小
        oddRowBGC: 'rgb(40, 40, 40)', // 奇数背景色
        evenRowBGC: 'rgb(55, 55, 55)', // 偶数背景色
        rowFontSize: 24 // 表格文字大小
      }
      flag.value = true
    }, {
      deep: true
    })

    return {
      config
    }
  }
}
</script>

<style lang="scss" scoped>
.plan-list{
  width: 100%;
  height: 100%;
  background: rgb(55, 55, 55);
  padding: 20px 40px;
  box-sizing: border-box;

  .title {
    font-size: 36px;
  }

  .content {
    width: 100%;
    height: 880px;
    margin-top: 20px;
    padding: 30px 0;
    box-sizing: border-box;
    background: rgb(40, 40, 40);
  }

}
</style>
