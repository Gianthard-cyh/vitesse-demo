<script setup lang="ts">

</script>

<template>
  <button i-carbon-moon mt5 ml5 text-lg @click="toggleDark()" />
  <Welcome />
  <Todo />
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.125s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.list-leave-active {
  position: absolute;
}
.rounded{
  mask-image: paint(smooth-corners);
}
</style>
