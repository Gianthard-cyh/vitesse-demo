<script setup lang="ts">
import { Graph } from '@antv/x6'
const el = ref(null)
const wrapper = ref(null)

const graphData = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
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
