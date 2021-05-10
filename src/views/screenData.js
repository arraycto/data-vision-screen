import { ref, onMounted, onUnmounted } from 'vue'
import { getUserData, getMapData } from '@/api'

export default function (context, { once }) {
  const ready = ref(false) // flag：数据请求是否完毕
  const mapData = ref({}) // 地图数据
  const userData = ref({}) // 其他数据
  const ageData = ref([]) // 年龄数据
  const deviceData = ref({})
  const realTimeOrder = ref({ date: [], data: [] })
  let task // 间隔请求数据任务

  onMounted(() => {
    requestData()
  })

  onUnmounted(() => {
    if (task) {
      clearInterval(task)
    }
  })

  // 请求数据
  const requestData = () => {
    setTimeout(async () => {
      ready.value = true
      mapData.value = await getMapData() // 地图数据
      await getAllData() // 其他数据（处理）
    }, 1000)
    if (!once) {
      task = setInterval(async () => {
        await getAllData()
      }, 8000)
    }
  }

  // 获取数据并处理
  const getAllData = async () => {
    userData.value = await getUserData()
    // 处理 ageData
    userData.value && userData.value.age && userData.value.age.forEach((item, index) => {
      if (ageData.value[index]) {
        ageData.value[index] = {
          startValue: ageData.value[index].value,
          value: item.value,
          axis: item.key
        }
        ageData.value = [...ageData.value]
      } else {
        ageData.value.push({
          startValue: 0,
          value: item.value,
          axis: item.key
        })
      }
    })
    // 处理 deviceData
    deviceData.value = {
      totalDevices: userData.value.totalDevices,
      devices: userData.value.devices
    }
    // 处理 realTimeOrder
    realTimeOrder.value = {
      date: [...realTimeOrder.value.date, getNowTime()],
      data: [...realTimeOrder.value.data, userData.value.realTimeOrder]
    }
  }

  const getNowTime = () => {
    const now = new Date()
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  }

  return {
    ready,
    mapData,
    userData,
    ageData,
    deviceData,
    realTimeOrder
  }
}
