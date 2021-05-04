import { ref, onMounted, onUnmounted } from 'vue'
import { getUserData, getMapData } from '@/api'

export default function (context, { once }) {
  const ready = ref(false) // flag：数据请求是否完毕
  const mapData = ref({}) // 地图数据
  const userData = ref({}) // 其他数据
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
  }

  return {
    ready,
    mapData,
    userData
  }
}
