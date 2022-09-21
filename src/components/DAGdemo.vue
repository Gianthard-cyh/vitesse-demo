<script setup lang="ts">
import { Graph } from '@antv/x6'
const el = ref(null)
const wrapper = ref(null)

const graphData = {
  // 节点
  nodes: [
    {
      id: 'node1',
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: 'hello',
    },
    {
      id: 'node2',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'world',
    },
  ],
  // 边
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
}
let graph: Graph
tryOnMounted(() => {
  graph = new Graph({
    container: el.value!,
  })
  graph.fromJSON(graphData)
})
useResizeObserver(wrapper, (entries) => {
  const { height, width } = entries[0].contentRect
  graph.resize(width, height)
  // console.log(entries)
})
</script>

<template>
  <Card>
    <div text-xl font-semibold>
      DAG
    </div>
    <div ref="wrapper" class="wrapper" h-100>
      <div id="el" ref="el" w-full />
    </div>
  </Card>
</template>

<style scoped>

</style>
