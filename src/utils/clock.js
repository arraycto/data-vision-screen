import { ref, onMounted, onUnmounted } from 'vue'

const formatDate = (v) => {
  let m = v.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = v.getDate()
  d = d < 10 ? '0' + d : d
  return v.getFullYear() + '-' + m + '-' + d
}

const formatTime = (v) => {
  let h = v.getHours()
  h = h < 10 ? '0' + h : h
  let m = v.getMinutes()
  m = m < 10 ? '0' + m : m
  let s = v.getSeconds()
  s = s < 10 ? '0' + s : s
  return h + ':' + m + ':' + s
}

export function useClock () {
  let task
  let now = new Date()
  const date = ref(formatDate(now))
  const time = ref(formatTime(now))

  onMounted(() => {
    task = setInterval(() => {
      now = new Date()
      date.value = formatDate(now)
      time.value = formatTime(now)
    }, 1000)
  })

  onUnmounted(() => {
    task && clearInterval(task)
  })

  return {
    date, time
  }
}
