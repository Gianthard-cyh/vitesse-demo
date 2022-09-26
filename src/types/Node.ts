export interface IPort {
    id: number
    x: number
    y: number
}

export interface INode {
    id: number
    title: string
    x: number
    y: number
    ports: IPort[]
}