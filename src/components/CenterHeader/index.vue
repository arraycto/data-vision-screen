<template>
  <div class="center-header">
    <div class="left-wrapper">
      <div class="item-wrapper" v-for="(item, index) in headerData" :key="index">
        <div class="left">
          <img :src="item.img" :alt="item.title">
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="sub-title">{{item.subTitle}}</div>
          <div class="total">
            <count-to
              :start-val="item.startVal"
              :end-val="item.endVal"
              :duration="1000"
              separator=","
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="item-wrapper" v-for="(item,index) in projectData" :key="index">
        <div class="img">
          <img :src="item.img" alt="item.title">
        </div>
        <div class="project-text">{{item.title}}</div>
        <div class="project-value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'CenterHeader',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const headerData = ref([])
    const projectData = ref([])

    watch(() => props.data, (newProps, oldProps) => {
      headerData.value = [
        {
          title: '今日销售额',
          subTitle: 'Today\'s Sales Amount',
          startVal: (oldProps && oldProps.salesToday) || 0,
          endVal: newProps.salesToday,
          img: 'https://www.youbaobao.xyz/datav-res/money.png'
        }, {
          title: '今日订单量',
          subTitle: 'Today\'s Total Orders',
          startVal: (oldProps && oldProps.orderToday) || 0,
          endVal: newProps.orderToday,
          img: 'https://www.youbaobao.xyz/datav-res/order.png'
        }, {
          title: '今日交易用户数',
          subTitle: 'Today\'s Payed Users',
          startVal: (oldProps && oldProps.orderUser) || 0,
          endVal: newProps.orderUser,
          img: 'https://www.youbaobao.xyz/datav-res/member.png'
        }, {
          title: '今日新增用户数',
          subTitle: 'Today\'s New Users',
          startVal: (oldProps && oldProps.userToday) || 0,
          endVal: newProps.userToday,
          img: 'https://www.youbaobao.xyz/datav-res/follow.png'
        }
      ]
      projectData.value = [
        {
          title: '转化率',
          value: `${props.data.covertRate}%`,
          img: 'https://www.youbaobao.xyz/datav-res/success.png'
        }, {
          title: '退单率',
          value: `${props.data.returnRate}%`,
          img: 'https://www.youbaobao.xyz/datav-res/failed.png'
        }
      ]
    })

    return {
      headerData,
      projectData
    }
  }
}
</script>

<style lang="scss" scoped>
.center-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgb(66, 68, 70);
  padding: 0 40px;
  box-sizing: border-box;

  .left-wrapper {
    display: flex;

    .item-wrapper {
      flex: 1;
      display: flex;

      .left {
        width: 185px;
        height: 185px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-color: rgb(131, 167, 72);
        border-radius: 50%;

        img{
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 40px;
        width: 410px;

        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          letter-spacing: 1px;
          margin-top: 10px;
        }

        .total {
          font-size: 56px;
          font-weight: bolder;
          letter-spacing: 2px;
          margin-top: 10px;
        }
      }

    }
  }

  .right-wrapper {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item-wrapper{
      flex: 1;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .img {
        display: inline-block;
        width: 90px;
        height: 90px;

        img{
          height: 100%;
          width: 100%;
        }
      }

      .project-text {
        font-size: 18px;
      }

      .project-value {
        font-size: 28px;
        font-weight: 700;
        margin-top: 5px;
      }

    }
  }
}

</style>
