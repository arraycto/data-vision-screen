<template>
  <div class="transform-category">
    <div
      class="item"
      v-for="(item,index) in data" :key="index"
      :class="[item, index === current ? 'selected':'', index === hover ? 'hovered' : '']"
      @mouseenter="mouseIn(index)"
      @mouseleave="mouseOut()"
      @click="click(index)"
    >
      {{item.name}}
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from 'vue'

export default {
  name: 'TransformCategory',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    handler: {
      type: Function,
      default: () => {}
    }
  },
  setup (props) {
    let task
    const current = ref(0)
    const hover = ref(-1)

    onMounted(() => {
      start()
    })

    onUnmounted(() => {
      task && clearInterval(task)
    })

    watch(() => current.value, (newValue) => {
      props.handler && props.handler(props.data[newValue].key)
    })

    const start = () => {
      task = setInterval(() => {
        current.value = current.value + 1 < props.data.length ? current.value + 1 : 0
      }, 2000)
    }

    const mouseIn = (index) => {
      hover.value = index === current.value ? -1 : index
    }

    const mouseOut = () => {
      hover.value = -1
    }

    const click = (index) => {
      current.value = index
      hover.value = -1
      task && clearInterval(task)
      start()
    }

    return {
      current,
      hover,
      mouseIn,
      mouseOut,
      click
    }
  }
}
</script>

<style lang="scss" scoped>
.transform-category{
  width: 100%;
  height: 100%;
  display: flex;
  background: rgb(53, 57, 65);

  .item {
    flex: 1;
    font-size: 24px;
    color: rgb(144, 160, 174);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.selected{
      background: rgb(140, 160, 173);
      color: #fff;
    }

    &.hovered {
      background: rgb(80, 80, 80);
    }
  }
}
</style>
