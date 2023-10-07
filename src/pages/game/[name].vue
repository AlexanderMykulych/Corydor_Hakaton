<template>
  <div class="flex flex-col items-center">
    <Header :name=props.name />
    <h1>Game</h1>
    <DefaultBoard />
  </div>
</template>

<script setup lang="ts">
import DefaultBoard from '~/components/DefaultBoard.vue';
import Header from '~/components/Header.vue';

const props = defineProps<{ name: string }>()
const user = useUserStore()

watchEffect(() => {
  user.setNewName(props.name)
})
</script>

<style scoped>
</style>
