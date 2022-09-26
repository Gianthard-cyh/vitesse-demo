import { defineStore } from 'pinia'


export const useNodeDemoStore = defineStore('nodeDemo', { state: () => ({ isContainerMounted: false }) })