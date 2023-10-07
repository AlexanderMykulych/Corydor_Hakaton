<template>
    <div class="player-cell" @mouseover="$emit('hover')" @click="$emit('click')">
        <div class="frog" :class="{isActive: cell.data.isActive}"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    cell: GameItem;
}>();

const emits = defineEmits<{
    (e: 'hover'): void,
    (e: 'click'): void
  }>();


</script>

<style scoped>
.player-cell {
    background: url('https://flexboxfroggy.com/images/lilypad-green.svg') center;
    background-size: 90% 90%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.frog {
    background: url("https://flexboxfroggy.com/images/frog-green.svg") center;
    background-size: 60% 60%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
}

@keyframes pulse {
  0% {
    scale: 1;
  }
  50% {
    scale: 0.8;
  }
  100% {
    scale: 1;
  }
}

.frog.isActive {
    background-image: url("https://flexboxfroggy.com/images/frog-red.svg");
    animation: pulse 0.5s infinite;
}
</style>