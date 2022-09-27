import { MaybeRef } from "@vueuse/core"

export function useDraggableNode(target: MaybeRef<HTMLElement | undefined>, container: MaybeRef<HTMLElement | undefined | null>,
    onStart?: (x: number, y: number) => void,
    onMove?: (x: number, y: number) => void,
    onEnd?: (x: number, y: number) => void,
    initX?: number,
    initY?: number
) {
    const x = ref(initX ?? 0)
    const y = ref(initY ?? 0)

    const offsetX = ref(0)
    const offsetY = ref(0)

    const style = computed(() => `left:${x.value}px;top:${y.value}px;`)

    let isDragging = false

    console.log(unref(container))
    console.log(unref(target))
    const mouseInContainer = useMouseInElement(container)
    const mouseInTarget = useMouseInElement(target)

    useEventListener(target, 'pointerdown', () => {
        console.log('onpointerdown')
        offsetX.value = mouseInTarget.elementX.value
        offsetY.value = mouseInTarget.elementY.value
        isDragging = true
        onStart?.(x.value, y.value)
    })
    useEventListener(container, 'pointermove', () => {
        console.log('onpointermove')
        if (isDragging) {
            x.value = mouseInContainer.elementX.value - offsetX.value
            y.value = mouseInContainer.elementY.value - offsetY.value
            console.log(style.value)
        }
        onMove?.(x.value, y.value)
    })
    useEventListener(container, 'pointerup', () => {
        console.log('onpointerup')
        if (isDragging) {
            isDragging = false
            onEnd?.(x.value, y.value)
        }
    })

    return { x, y, style }
}