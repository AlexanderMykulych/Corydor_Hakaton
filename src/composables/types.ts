type QuoridorGame = {
  state: Ref<QuoridorGameState>
  gameBoard: Ref<GameBoard>
  actions: {
    hover: (item: GameItem) => void,
    click: (item: GameItem) => void,
  }
}

type QuoridorGameState = {
  board: Board
  player1: Player
  player2: Player
  activePlayer: 'player1' | 'player2',
}

type Player = {
  name: string
  position: GameNode
  walls: number
}


type Position = {
  x: number
  y: number
}

type GameNode = Position

type HorizontalWall = {
  type: 'horizontal'
  topNode1: GameNode
  topNode2: GameNode
  bottomNode1: GameNode
  bottomNode2: GameNode
}
type VerticalWall = {
  type: 'vertical'
  leftNode1: GameNode
  leftNode2: GameNode
  rightNode1: GameNode
  rightNode2: GameNode
}

type Wall = HorizontalWall | VerticalWall

type Board = {
  nodes: GameNode[]
  walls: Wall[]
  fakeWalls: Wall[]
  fakeNodes: GameNode[]
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
  x: number
  y: number
}

type TGameItem<TType extends string, TData> = {
  type: TType
  data: TData
  index: number
}

type GameItem = TGameItem<'wall', Wall> | TGameItem<'empty', number> | {
  type: 'player-node' | 'node' | 'fake-wall' | 'fake-node'
  data: any
  index: number
}

type GameBoard = {
  items: GameItem[]
  fullGameWidth: number
  fullGameHeight: number
}

type HoverItemParam = {
  gameItem: GameItem
  state: Ref<QuoridorGameState>
  config: QuoridorConfig
  gameBoard: Ref<GameBoard>
}

type ClickItemParam = {
  gameItem: GameItem
  state: Ref<QuoridorGameState>
  config: QuoridorConfig
  gameBoard: Ref<GameBoard>
}