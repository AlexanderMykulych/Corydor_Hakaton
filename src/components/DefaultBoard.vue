<script setup lang="ts">
import CellVue from "~/components/Cell.vue"

const quoridor = useQuoridor()

// console.log(quoridor.gameBoard.value.items);


</script>

<template>
    <div class="board">
      <template v-for="cell in quoridor.gameBoard.value.items">
          <CellVue  :cell="cell" @hover="quoridor.actions.hover(cell)" @click="quoridor.actions.click(cell)">
            {{ cell.index }}
          </CellVue>
      </template>
    </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr;
  grid-template-rows: 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
  width: 800px;
  height: 800px;

  background: #1F5768;
  padding: 30px;
}
</style>
  