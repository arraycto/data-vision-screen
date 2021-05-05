<template>
  <div class="top-header">
    <div class="left">
      <img class="logo" src="https://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/54149aa06f26afcf26f42d66c999ee8b.png" alt="">
      <div class="logo-text">
        <h2 class="cn-text">外卖业务数据大盘</h2>
        <h3 class="en-text">Delivery Overview of Business Data</h3>
      </div>
    </div>
    <div class="right">
      <img class="right-logo" src="https://img.alicdn.com/tfs/TB1Kbzuq.z1gK0jSZLeXXb9kVXa-600-500.png" alt="">
      <div class="date">{{date}}</div>
      <div class="time">{{time}}</div>
    </div>
  </div>
</template>

<script>
import { useClock } from '@/utils/clock'

export default {
  name: 'TopHeader',
  setup () {
    const { date, time } = useClock()

    return {
      date,
      time
    }
  }
}
</script>

<style lang="scss" scoped>
.top-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 64px;
  box-sizing: border-box;
}
.left {
  display: flex;
  align-items: center;

  .logo {
    width: 395px;
    height: 99px;
  }
  .logo-text {
    margin-left: 40px;

    .cn-text {
      color: rgb(255, 255, 255);
      font-weight: bold;
      font-size: 60px;
      letter-spacing: 2px;
      margin: 0;
    }

    .en-text {
      color: rgb(255, 255, 255);
      font-size: 35px;
      letter-spacing: 1px;
      margin: 0;
    }
  }
}
.right {
  display: flex;
  align-items: center;
  .right-logo{
    width: 363px;
    height: 150px;
  }
  .date {
    width: 330px;
    text-align: right;
    font-size: 52px;
    color: rgb(255, 255, 255);
    font-weight: 500;
  }

  .time {
    width: 220px;
    font-size: 52px;
    color: rgb(197, 251, 121);
    font-weight: 500;
    margin-left: 30px;
  }

}
</style>
