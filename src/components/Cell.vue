<template>
  <div class="cell">
      <div style="position: absolute;">
        <slot />
      </div>
      <EmptyNode v-if="cell?.type === 'empty'" :cell="cell" @hover="$emit('hover')" @click="$emit('click')"/>
      <WallNode v-if="cell?.type === 'wall'" :cell="cell" @hover="$emit('hover')"  @click="$emit('click')"/>
      <PlayerNode v-if="cell?.type === 'player-node'" :cell="cell"  @hover="$emit('hover')"  @click="$emit('click')"/>
      <FakeWallNode v-if="cell?.type === 'fake-wall'" :cell="cell"  @hover="$emit('hover')"  @click="$emit('click')"/>
      <JugNode v-if="cell?.type === 'node'" :cell="cell"  @hover="$emit('hover')"  @click="$emit('click')"/>
      <FakeJugNode v-if="cell?.type === 'fake-node'" :cell="cell"  @hover="$emit('hover')"  @click="$emit('click')"/>
    </div>
  </template>
  
<script setup lang="ts">

  const props = defineProps<{
    cell: GameItem
  }>();

  const emits = defineEmits<{
    (e: 'hover'): void,
    (e: 'click'): void
  }>();
  
</script>

<style scoped>
</style>