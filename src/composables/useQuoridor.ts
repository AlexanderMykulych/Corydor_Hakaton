type QuoridorGame = {
  board: Board
}

type QuoridorGameState = {

}

type Player = {
  name: string
  position: Node
  walls: number
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
  player1: PlayerConfig
  player2: PlayerConfig
}

type PlayerConfig = {
  name: string
}

export function useQuoridor(config: QuoridorConfig = getDefaultQuoridorConfig()): QuoridorGame {
  const quoridorState = ref<QuoridorGameState>({
    board: createBoard(config),
    player1: createPlayer(config, config.player1),
    player2: createPlayer(config, config.player1),
  })


}

export function createBoard(config: QuoridorConfig): Board {
  const nodes: Node[] = generateNodes(config)

  return {
    nodes,
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
    },
    player1: {
      name: 'Player1'
    },
    player2: {
      name: 'Player2'
    }
  }
}

export function createPlayer(config: QuoridorConfig, playerConfig: PlayerConfig): Player {
  return {
    name: playerConfig.name,
    position: {
      x: Math.floor(config.size.width / 2),
      y: 0
    },
    walls: 10
  }
}