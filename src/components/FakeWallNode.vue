<template>
    <div class="fake-wall-cell" @mouseover="$emit('hover')"  @click="$emit('click')"></div>
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
.fake-wall-cell {
    background-color: green;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
</style>