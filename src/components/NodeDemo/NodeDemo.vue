<script setup lang="ts">
import { useNodeDemoStore } from './stores/nodeDemoStore'
import type { INode, IPort } from './types/Node'

const Nodes = reactive<INode[]>([
  { id: 1, title: '节点标题', x: 50, y: 50, ports: [{ id: 1, x: 0, y: 50 }, { id: 2, x: 0, y: 50 }] },
  { id: 2, title: '节点标题', x: 50, y: 50, ports: [{ id: 2, x: 0, y: 50 }] },
])
const Ports = computed(() => {
  let Ports: IPort[] = []
  Nodes.forEach((item) => {
    Ports = Ports.concat(item.ports.map((portItem) => { return { id: portItem.id, x: portItem.x + item.x, y: portItem.y + item.y } }))
  })
  return Ports
})
const templateRef = { refContainer: ref<HTMLElement | undefined>() }
onMounted(() => {
  useNodeDemoStore().isContainerMounted = true
})
</script>

<template>
  <Card>
    <div text-xl font-semibold>
      Node
    </div>
    {{ Nodes }}
    <br>
    {{ Ports }}
    <br>
    <button @click="Nodes[0].title += '10'">
      id+
    </button>
    <svg :ref="templateRef.refContainer" height="1000" width="1000">
      <circle r="5" cx="10" cy="10" />
      <foreignObject x="0" y="0" width="1000" height="1000">
        <Node
          v-for="item, i in Nodes" :key="item.id" :ref-container="templateRef.refContainer" :node="item"
          @start="[Nodes[Nodes.length - 1], Nodes[i]] = [Nodes[i], Nodes[Nodes.length - 1]] "
          @end="(x, y) => { Nodes[i].x = x ;Nodes[i].y = y ; }"
        />
      </foreignObject>
    </svg>
  </Card>
</template>

<style scoped>
* {
  display: block;
  box-sizing: content-box;
}
</style>
