<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useDraggableNode } from '~/composables/useDraggableNode'
import { useNodeDemoStore } from '~/stores/nodeDemoStore'
import type { INode } from '~/types'

const props = defineProps<{ node: INode; refContainer: MaybeRef<HTMLElement | null | undefined> }>()
const emit = defineEmits<{ (e: 'end', x: number, y: number): void; (e: 'start', x: number, y: number): void }>()
const refNode = ref<HTMLElement>()
const { isContainerMounted } = storeToRefs(useNodeDemoStore())

const x = ref<number>(props.node.x)
const y = ref<number>(props.node.y)

if (isContainerMounted.value)
  useDraggableNode(refNode, props.refContainer, (posx, posy) => { emit('start', posx, posy) }, (posx, posy) => { x.value = posx; y.value = posy }, (posx, posy) => { emit('end', posx, posy) }, props.node.x, props.node.y)

watch(isContainerMounted, () => {
  if (isContainerMounted.value)
    useDraggableNode(refNode, props.refContainer, (posx, posy) => { emit('start', posx, posy) }, (posx, posy) => { x.value = posx; y.value = posy }, (posx, posy) => { emit('end', posx, posy) }, props.node.x, props.node.y)
})
</script>

<template>
  <div
    ref="refNode" fixed :style="{ left: `${x}px`, top: `${y}px` }" rounded-6px min-w-200px of-hidden border
    opacity-80 bg-white hover:opacity-90 transition
  >
    <div text-sm px2 py1 bg-orange-5 c-white>
      {{ props.node.title }}
    </div>
    <div px2 py1>
      {{ props.node.id }}
    </div>
  </div>
</template>

<style scoped>
* {
  @apply select-none
}
</style>
