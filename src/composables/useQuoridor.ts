export function useQuoridor(config: QuoridorConfig = getDefaultQuoridorConfig()): QuoridorGame {
  const quoridorState = ref<QuoridorGameState>({
    board: createBoard(config),
    player1: createPlayer(config, config.player1),
    player2: createPlayer(config, config.player1),
  })


}

export function createBoard(config: QuoridorConfig): Board {
  const nodes: GameNode[] = generateNodes(config)

  return {
    nodes,
    walls: []
  }
}

export function generateNodes(config: QuoridorConfig): GameNode[] {
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