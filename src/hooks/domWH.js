import { onMounted, ref } from 'vue'

export default function getDomWH (id) {
  const width = ref(0)
  const height = ref(0)

  onMounted(() => {
    const dom = document.getElementById(id)
    width.value = dom.clientWidth
    height.value = dom.clientHeight
  })

  return {
    width,
    height
  }
}
