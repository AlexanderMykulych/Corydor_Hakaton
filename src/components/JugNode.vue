<template>
    <div class="jug-cell" @mouseover="$emit('hover')" :style="`transform: rotate(${degrees}deg)`"  @click="$emit('click')"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
    cell: GameItem;
}>();

const emits = defineEmits<{
    (e: 'hover'): void,
    (e: 'click'): void
  }>();

const degrees = ref(0);

onMounted(() => {
    degrees.value = Math.floor(Math.random() * 180);
})

</script>

<style scoped>
.jug-cell {
    background: url('https://flexboxfroggy.com/images/lilypad-green.svg') center;
    background-size: 90% 90%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
}
</style>