<template>
  <div class="home">
    <!-- 页面加载 -->
    <IconLoading v-if="!ready">
      <h2 class="loading-text">Loading...</h2>
    </IconLoading>
    <!-- 页面内容-->
    <Container v-else :options="options">
      <header class="header">
        <TopHeader/>
      </header>
      <div class="separator">
      </div>
      <main class="main">
        <div class="left">
          <div class="left1">
            <TotalUser
              :today-user="userData.userToday"
              :growth-last-day="parseFloat(userData.userGrowthLastDay) || 0"
              :growth-last-month="parseFloat(userData.userGrowthLastMonth) || 0"
            />
          </div>
          <div class="left2">
            <AverageAge
              :data="ageData"
              :avg-age="parseFloat(userData.averageAge) || 0"
            />
          </div>
          <div class="left3">
            <TotalDevice
              :data="deviceData"
            />
          </div>
          <div class="left4">
            <TotalGender
              :data="userData.gender"
            />
          </div>
          <div class="left5">
            <LineChart :data="userData.rider"/>
          </div>
          <div class="left6">
            <BarChart :data="userData.category"/>
          </div>
        </div>
        <div class="right">
          <div class="right-top1">
            <CenterHeader :data="userData"/>
          </div>
          <div class="right-top2">
            <TransformCategory :data="category1" :handler="handler"/>
          </div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left1">
                <OrderMap :data="mapData"/>
              </div>
              <div class="right-left2">
                <TransformCategory :data="category2" :handler="handler"/>
              </div>
              <div class="right-left3">
                <RealtimeOrder :data="realTimeOrder" />
              </div>
              <div class="right-left4">
                <ScheduleView />
              </div>
            </div>
            <div class="right-right">
              <div class="right-right1">
                <PlanList :data="userData.areaSales"/>
              </div>
              <div class="right-right2">
                <ActivateUser :data="userData.areaTop"/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
import screenData from '@/views/screenData'
import TopHeader from '@/components/TopHeader'
import TotalUser from '@/components/TotalUser'
import AverageAge from '@/components/AverageAge'
import TotalDevice from '@/components/TotalDevice'
import TotalGender from '@/components/TotalGender'
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import CenterHeader from '@/components/CenterHeader'
import TransformCategory from '@/components/TransformCategory'
import PlanList from '@/components/PlanList'
import ActivateUser from '@/components/ActivateUser'
import RealtimeOrder from '@/components/RealtimeOrder'
import ScheduleView from '@/components/ScheduleView'
import OrderMap from '@/components/OrderMap'

export default {
  name: 'Home',
  components: { TopHeader, TotalUser, AverageAge, TotalDevice, TotalGender, LineChart, BarChart, CenterHeader, TransformCategory, PlanList, ActivateUser, RealtimeOrder, ScheduleView, OrderMap },
  setup () {
    // 页面配置
    const options = reactive({
      width: 3840,
      height: 2160
    })
    // 页面数据 - 业务逻辑和组件代码分离
    const context = getCurrentInstance().ctx
    const { ready, mapData, userData, ageData, deviceData, realTimeOrder, scheduleViewData } = screenData(context, { once: false })

    const category1 = [
      {
        name: 'ALL',
        key: 'all'
      }, {
        name: '北京',
        key: 'beijing'
      }, {
        name: '上海',
        key: 'shanghai'
      }, {
        name: '深圳',
        key: 'shenzhen'
      }, {
        name: '杭州',
        key: 'hangzhou'
      }, {
        name: '南京',
        key: 'nanjing'
      }, {
        name: '武汉',
        key: 'wuhan'
      }
    ]
    const category2 = [
      {
        name: '订单量',
        key: 'order'
      }, {
        name: '销售额',
        key: 'sale'
      }, {
        name: '用户数',
        key: 'user'
      }, {
        name: '退单量',
        key: 'return'
      }
    ]

    const handler = (key) => {
      // console.log('正在点击：', key)
    }

    return {
      options,
      ready,
      mapData,
      userData,
      ageData,
      deviceData,
      realTimeOrder,
      scheduleViewData,
      category1,
      category2,
      handler
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background: rgb(29, 29, 29);
  color: #fff;
  font-size: 48px;

  .loading-text{
    font-size: 24px;
  }

  #container {
    display: flex;
    flex-direction: column;

    .header {
      height: 167px;
    }

    .separator {
      height: 10px;
      width: 100%;
      background: #5c5859;
    }

    .main {
      flex: 1;
      display: flex;

      .left {
        flex: 0 0 860px;
        display: flex;
        flex-direction: column;
        width: 860px;
        height: 100%;
        margin: 0 10px;
        box-sizing: border-box;
        background: #3c3d40;;
        justify-content: space-between;

        .left1, .left2, .left3, .left4, .left5, .left6 {
          //margin-bottom: 20px;
        }

        .left1 {
          height: 300px;
        }

        .left2 {
          height: 320px;
        }

        .left3 {
          height: 280px;
        }

        .left4 {
          height: 230px;
        }

        .left5 {
          height: 360px;
        }

        .left6 {
          height: 360px;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0 10px;
        max-width: 2960px;
        overflow: hidden;

        .right-top1 {
          height: 206px;
          margin-bottom: 20px;
        }

        .right-top2 {
          height: 48px;
          margin-bottom: 20px;
        }

        .right-bottom {
          flex: 1;
          display: flex;

          .right-left {
            display: flex;
            flex-direction: column;
            width: 1917px;

            .right-left1 {
              height: 999px;
            }

            .right-left2 {
              height: 80px;
              padding-top: 20px;
              box-sizing: border-box;
            }

            .right-left3 {
              height: 350px;
              margin-top: 10px;
            }

            .right-left4 {
              height: 220px;
              margin-top: 10px;
            }
          }

          .right-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 10px;

            .right-right1 {
              width: 100%;
              height: 999px;
              padding-right: 10px;
              box-sizing: border-box;
            }

            .right-right2 {
              width: 100%;
              height: 670px;
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
