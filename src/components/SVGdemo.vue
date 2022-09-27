<script setup lang="ts">
const width = ref(1250)
const height = ref(300)

const refSVGContainer = ref(null)
const refEndController = ref(null)

const { x: cx, y: cy } = useElementBounding(refSVGContainer)

const x = ref(200)
const y = ref(200)
useDraggable(refEndController, {
  onMove(position) {
    x.value = position.x - cx.value
    y.value = position.y - cy.value
  },
})

const dx = computed(() => { return (x.value) / 2 })
const dy = computed(() => { return (y.value) / 2 })

const d = computed(() => { return `M 100 100 q ${dx.value / 2} 0 ${dx.value} ${dy.value} q ${dx.value / 2} ${dy.value} ${dx.value} ${dy.value}` })
</script>

<template>
  <Card>
    <h1>
      SVG
    </h1>
    {{ x }},{{ y }}
    <svg ref="refSVGContainer" :width="width" :height="height">
      <path
        id="lineAB" :d="d" stroke="red 3px"
        stroke-width="3" fill="none"
      />
      <circle r="5" cx="100" cy="100" fill="yellow" stroke="gray 2px" />
      <circle ref="refEndController" r="5" :cx="2 * dx" :cy="2 * dy" fill="yellow" stroke="gray 2px" cursor-pointer />
    </svg>
  </Card>
</template>

<style scoped>
h1{
    @apply text-xl font-bold
}
</style>
