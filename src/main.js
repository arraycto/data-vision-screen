import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DataV from 'data-vision-libs'
import VECharts from 'vue-echarts'
import 'echarts' // 为了方便echarts全部引入，在实际中应按需引入

createApp(App)
  .use(store)
  .use(router)
  .use(DataV)
  .component('v-chart', VECharts)
  .mount('#app')
