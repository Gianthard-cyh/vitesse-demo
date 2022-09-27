<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'
import { useDraggableNode } from '~/composables/useDraggableNode'
import type { INode } from '~/types'

const props = defineProps<{ node: INode; refContainer: MaybeRef<HTMLElement | null | undefined> }>()
const emit = defineEmits<{ (e: 'end', x: number, y: number): void; (e: 'start', x: number, y: number): void }>()
const refNode = ref<HTMLElement>()

const x = ref<number>(props.node.x)
const y = ref<number>(props.node.y)

onMounted(() => {
  nextTick(() => {
    if (props.refContainer)
      useDraggableNode(refNode, props.refContainer, (posx, posy) => { emit('start', posx, posy) }, (posx, posy) => { x.value = posx; y.value = posy }, (posx, posy) => { emit('end', posx, posy) }, props.node.x, props.node.y)
  })
})
</script>

<template>
  <div
    ref="refNode" fixed :style="{ left: `${x}px`, top: `${y}px` }" rounded-6px min-w-200px border opacity-80 bg-white
    hover:opacity-90 transition
  >
    <div text-sm px2 py1 bg-orange-5 c-white rounded-t>
      {{ props.node.title }}
    </div>
    <div flex="~ col">
      <div v-for="port in props.node.ports" :key="port.id" relative flex="~ row" items-center my1>
        <div rounded-full bg-purple h-10px w-10px border relative left--5px />
        <div>
          {{ port }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  @apply select-none
}
</style>
