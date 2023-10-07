export function useQuoridor(config: QuoridorConfig = getDefaultQuoridorConfig()): QuoridorGame {
  const state = ref<QuoridorGameState>({
    board: createBoard(config),
    player1: createPlayer(config, config.player1),
    player2: createPlayer(config, config.player2),
    activePlayer: 'player1',
  })

  const gameBoard = computeGameBoard(state, config)
  const hover = (gameItem: GameItem) => hoverItem({
    gameItem,
    state,
    config,
    gameBoard,
  })

  const click = (gameItem: GameItem) => clickItem({
    gameItem,
    state,
    config,
    gameBoard,
  })

  return {
    state,
    gameBoard,

    actions: {
      hover,
      click,
    }
  }
}

export function createBoard(config: QuoridorConfig): Board {
  const nodes: GameNode[] = generateNodes(config)

  return {
    nodes,
    walls: [],
    fakeWalls: [],
    fakeNodes: [],
  }
}

export function generateNodes(config: QuoridorConfig): GameNode[] {
  return [...Array(config.size.width)]
    .flatMap((_, x) => [...Array(config.size.height)]
      .map((_, y) => ({ x: x + 1, y: y + 1 }))
    )
}

export function getDefaultQuoridorConfig(): QuoridorConfig {
  return {
    size: {
      width: 9,
      height: 9
    },
    player1: {
      name: 'Player1',
      x: 5,
      y: 1,
    },
    player2: {
      name: 'Player2',
      x: 5,
      y: 9,
    }
  }
}

export function createPlayer(config: QuoridorConfig, playerConfig: PlayerConfig): Player {
  return {
    name: playerConfig.name,
    position: {
      x: playerConfig.x,
      y: playerConfig.y,
    },
    walls: 10
  }
}

export function computeGameBoard(state: Ref<QuoridorGameState>, config: QuoridorConfig): Ref<GameBoard> {
  return computed(() => {
    const fullGameWidth = 2 * config.size.width - 1
    const fullGameHeight = 2 * config.size.height - 1
    const fullGameBoard: GameItem[] = [
      ...Array(fullGameWidth * fullGameHeight)
    ]
      .map((_, index) => ({ type: 'empty', data: index, index, }))

    const { nodes, walls, fakeWalls, fakeNodes } = state.value.board

    fakeWalls
      .flatMap(wall => getGameItemsByWall(wall, fullGameWidth))
      .forEach(gameItem => fullGameBoard[gameItem.index] = {
        type: 'fake-wall',
        data: gameItem.data,
        index: gameItem.index,
      })

    nodes.forEach(node => {
      const fullGameIndex = getFullBoardIndexByNode(node, fullGameWidth)
      fullGameBoard[fullGameIndex] = {
        type: 'node',
        data: node,
        index: fullGameIndex,
      }
    })

    walls
      .flatMap(wall => getGameItemsByWall(wall, fullGameWidth))
      .forEach(gameItem => fullGameBoard[gameItem.index] = gameItem)
    
    fakeNodes
      .forEach(node => {
        const fullGameIndex = getFullBoardIndexByNode(node, fullGameWidth)
        fullGameBoard[fullGameIndex] = {
          type: 'fake-node',
          data: node,
          index: fullGameIndex,
        }
      })
    
    const player1FullGameIndex = getFullBoardIndexByNode(state.value.player1.position, fullGameWidth)
    const player2FullGameIndex = getFullBoardIndexByNode(state.value.player2.position, fullGameWidth)

    fullGameBoard[player1FullGameIndex] = {
      type: 'player-node',
      index: player1FullGameIndex,
      data: {
        player: state.value.player1,
        isActive: state.value.activePlayer === 'player1',
      },
    }
    fullGameBoard[player2FullGameIndex] = {
      type: 'player-node',
      index: player2FullGameIndex,
      data: {
        player: state.value.player2,
        isActive: state.value.activePlayer === 'player2',
      },
    }

    return {
      items: fullGameBoard,
      fullGameWidth,
      fullGameHeight,
    }
  })
}


export function getFullBoardNodeByNode(node: GameNode): Position {
  return {
    x: 2 * node.x - 1,
    y: 2 * node.y - 1
  }
}

export function getFullBoardIndexByNode(node: Position, fullGameWidth: number): number {
  const { x, y } = getFullBoardNodeByNode(node)
  return getFullBoardIndexByPosition({ x, y }, fullGameWidth)
}

export function getFullBoardIndexByPosition({ x, y }: Position, fullGameWidth: number): number {
  return 2 * x + (fullGameWidth - x) + (y - 2) * fullGameWidth - 1
}

export function getMinMax(a: number, b: number): { min: number, max: number } {
  return a < b ? { min: a, max: b } : { min: b, max: a }
}

export function generateTestWalls(): Wall[] {
  return [{
    type: 'horizontal',
    topNode1: {
      x: 1,
      y: 1
    },
    topNode2: {
      x: 2,
      y: 1
    },
    bottomNode1: {
      x: 1,
      y: 2
    },
    bottomNode2: {
      x: 2,
      y: 2
    }
  }, {
    type: 'vertical',
    leftNode1: {
        x: 5,
        y: 1
    },
    leftNode2: {
      x: 5,
      y: 2
    },
    rightNode1: {
      x: 6,
      y: 1
    },
    rightNode2: {
      x: 6,
      y: 2
    }
  }]
}

export function hoverItem({ gameItem, gameBoard, state }: HoverItemParam): void {
  const index = gameItem.index
  state.value.board.fakeWalls = []
  if (gameItem.type === 'empty' || gameItem.type === 'fake-wall') {
    state.value.board.fakeWalls = getWallOnGameItem(index, gameBoard)
  }
}

export function clickItem({ gameItem, gameBoard, state }: ClickItemParam): void {
  const index = gameItem.index
  state.value.board.fakeWalls = []
  state.value.board.fakeNodes = []
  console.log('click', gameItem)
  if (gameItem.type === 'fake-wall') {
    state.value.board.walls.push(...getWallOnGameItem(index, gameBoard))
  }

  if (gameItem.type === 'player-node') {
    let { x, y } = getPositionByIndex(index, gameBoard)
    //fix
    y += 1

    const playerType = getPlayerByPosition({ x, y }, state)

    if (playerType !== state.value.activePlayer) {
      return
    }

    state.value.board.fakeNodes = [
      {
        x: x - 1,
        y: y,
      },
      {
        x: x + 1,
        y: y,
      },
      {
        x: x,
        y: y - 1,
      },
      {
        x: x,
        y: y + 1,
      },
    ]
  }

  if (gameItem.type === 'fake-node') {
    let { x, y } = getPositionByIndex(index, gameBoard)
    //fix
    y += 1

    const player = state.value.activePlayer === 'player1' ? state.value.player1 : state.value.player2

    player.position = {
      x,
      y,
    }
    state.value.activePlayer = state.value.activePlayer === 'player1' ? 'player2' : 'player1'
  }
}

function getPlayerByPosition(position: Position, state: Ref<QuoridorGameState>): 'player1' | 'player2' {
  if (position.x === state.value.player1.position.x && position.y === state.value.player1.position.y) {
    return 'player1'
  }

  return 'player2'
}

export function getPositionByIndex(index: number, gameBoard: Ref<GameBoard>): Position {
  const column = Math.ceil((index % gameBoard.value.fullGameWidth + 1) / 2)
  const fullRow = (Math.ceil(index / gameBoard.value.fullGameWidth) + 1)
  const row = Math.ceil(fullRow / 2) - 1

  return {
    x: column,
    y: row,
  }
}

export function getWallOnGameItem(index: number, gameBoard: Ref<GameBoard>): Wall[] {
  const { x, y } = getPositionByIndex(index, gameBoard)

  const isHorizontal = Math.ceil(index / gameBoard.value.fullGameWidth) % 2 === 0

  if (isHorizontal) {
    return [{
      type: "horizontal",
      topNode1: {
        x: x,
        y: y,
      },
      topNode2: {
        x: x + 1,
        y: y,
      },
      bottomNode1: {
        x: x,
        y: y + 1,
      },
      bottomNode2: {
        x: x + 1,
        y: y + 1,
      },
    }]
  }

  return [{
    type: "vertical",
    leftNode1: {
      x: x,
      y: y,
    },
    leftNode2: {
      x: x,
      y: y + 1,
    },
    rightNode1: {
      x: x + 1,
      y: y,
    },
    rightNode2: {
      x: x + 1,
      y: y + 1,
    },
  }]

}

export function getGameItemsByWall(wall: Wall, fullGameWidth: number): GameItem[] {
    let fullGameIndex1 = 0
    let fullGameIndex2 = 0
    let fullGameIndex3 = 0

    if (wall.type === 'horizontal') {
      const { x: node1X, y: node1Y } = getFullBoardNodeByNode(wall.topNode1)
      const { x: node2X, y: node2Y } = getFullBoardNodeByNode(wall.topNode2)

      fullGameIndex1 = getFullBoardIndexByPosition({
        x: node1X,
        y: node1Y + 1,
      }, fullGameWidth)

      fullGameIndex2 = getFullBoardIndexByPosition({
        x: node2X,
        y: node2Y + 1,
      }, fullGameWidth)

      const { min } = getMinMax(node1X, node2X)
      fullGameIndex3 = getFullBoardIndexByPosition({
        x: min + 1,
        y: node2Y + 1,
      }, fullGameWidth)

    } else if (wall.type === 'vertical') {
      const { x: node1X, y: node1Y } = getFullBoardNodeByNode(wall.leftNode1)
      const { x: node2X, y: node2Y } = getFullBoardNodeByNode(wall.leftNode2)

      fullGameIndex1 = getFullBoardIndexByPosition({
        x: node1X + 1,
        y: node1Y,
      }, fullGameWidth)

      fullGameIndex2 = getFullBoardIndexByPosition({
        x: node2X + 1,
        y: node2Y,
      }, fullGameWidth)

      const { min } = getMinMax(node1Y, node2Y)
      fullGameIndex3 = getFullBoardIndexByPosition({
        x: node2X + 1,
        y: min + 1,
      }, fullGameWidth)
    }

    return [{
      type: 'wall',
      index: fullGameIndex1,
      data: wall,
    },{
      type: 'wall',
      index: fullGameIndex2,
      data: wall,
    },
    {
      type: 'wall',
      index: fullGameIndex3,
      data: wall,
    }]
}