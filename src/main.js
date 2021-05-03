import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DataV from 'data-vision-libs'
import ECharts from 'vue-echarts'

createApp(App)
  .use(store)
  .use(router)
  .use(DataV)
  .component('v-chart', ECharts)
  .mount('#app')
