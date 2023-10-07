<template>
    <div class="empty-cell" @mouseover="$emit('hover')"></div>
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
.empty-cell {
    width: 100%;
    height: 100%;
}
</style>