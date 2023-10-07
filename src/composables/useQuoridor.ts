type QuoridorGame = {

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

export function useQuoridor(): QuoridorGame {
  const quoridorState = ref<QuoridorGameState>({})
}