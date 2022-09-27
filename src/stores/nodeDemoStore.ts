import { defineStore } from 'pinia'


export const useNodeDemoStore = defineStore('nodeDemo', { state: () => ({ isContainerMounted: false, isConnectiing: false, connectionGhost: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } } }) })