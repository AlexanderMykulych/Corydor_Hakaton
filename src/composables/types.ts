type QuoridorGame = {
  state: QuoridorGameState
}

type QuoridorGameState = {
  board: Board
  player1: Player
  player2: Player
}

type Player = {
  name: string
  position: GameNode
  walls: number
}


type GameNode = {
  x: number
  y: number
}

type Wall = {
  node1: GameNode
  node2: GameNode
  node3: GameNode
  node4: GameNode
}

type Board = {
  nodes: GameNode[]
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