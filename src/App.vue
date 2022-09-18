<script setup lang="ts">
interface IItem {
  name: string
  timeString: string
  time: Date
}

const list = ref<Array<IItem>>([])
const value = ref('')

function onSubmit() {
  if (value.value.length) {
    list.value.unshift({ name: value.value, timeString: useNow().value.toTimeString(), time: useNow().value })
    value.value = ''
  }
}

function onDelete(index: number) {
  list.value.splice(index, 1)
}
</script>

<template>
  <button i-carbon-moon mt5 ml5 text-lg @click="toggleDark()" />
  <Card>
    <p text-2xl font-bold pb-2>
      欢迎回来！
    </p>
    <p>
      看看我们都为你准备了什么
    </p>
    <button btn>
      确定
    </button>
    <button btn transition>
      取消
    </button>
  </Card>
  <card flex-col>
    <input v-model="value" type="text" text-xl w-full block p3 rounded border focus:bg-gray1 dark-focus:bg-gray-7 dark-bg-gray-9 light-bg-gray-2 outline-none transition @keydown.enter="onSubmit">
    <TransitionGroup name="list" tag="ul">
      <li v-for="item, index in list" :key="item.time.getMilliseconds()" p5 border rounded-2 my2 flex="~" items-center>
        <div flex-1>
          <p text-lg>
            {{ item.name }}
          </p>
          <p text-xs pt2>
            创建于{{ item.timeString }}
          </p>
        </div>
        <button i-carbon-trash-can h-12 px3 mx2 bg-red-7 dark-bg-red-4 @click="onDelete(index)" />
        <button i-carbon-checkmark h-12 text-xl px3 bg-green-7 mx2 dark-bg-green-4 @click="onDelete(index)" />
      </li>
    </TransitionGroup>
  </card>
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
