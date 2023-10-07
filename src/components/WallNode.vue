<template>
    <div class="wall-cell" @mouseover="$emit('hover')"  @click="$emit('click')">
        <img class="rock" src="https://www.svgrepo.com/download/407352/rock.svg" alt="">
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
.wall-cell {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.rock {
    position: absolute;
    width: 80%;
    height: 80%;
}
</style>