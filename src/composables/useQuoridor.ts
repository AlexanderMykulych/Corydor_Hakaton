type QuoridorGame = {
  board: Board
}

type QuoridorGameState = {

}

type User = {

}

type Node = {
  x: number
  y: number
}

type Wall = {
  node1: Node
  node2: Node
  node3: Node
  node4: Node
}

type Board = {
  nodes: Node[]
  walls: Wall[]
}

type QuoridorConfig = {
  size: {
    width: number
    height: number
  }
}

export function useQuoridor(config: QuoridorConfig = getDefaultQuoridorConfig()): QuoridorGame {
  const quoridorState = ref<QuoridorGameState>({
    
  })


}

export function createBoard(config: QuoridorConfig): Board {
  const nodes: Node[] = generateNodes(config)
  
  return {
    nodes: [],
    walls: []
  }
}

export function generateNodes(config: QuoridorConfig): Node[] {
  return Array(config.size.width)
    .flatMap((_, x) => Array(config.size.height)
      .map((_, y) => ({ x, y }))
    )
}

export function getDefaultQuoridorConfig(): QuoridorConfig {
  return {
    size: {
      width: 9,
      height: 9
    }
  }
}