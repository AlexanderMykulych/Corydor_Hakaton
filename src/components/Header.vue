<script setup lang="ts">

const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

const quoridor = useQuoridor()

const timerValue = ref(30); 

const timer = computed(() => {
  return timerValue.value > 0 ? `${timerValue.value} сек` : 'Час вийшов';
});

const startTimer = () => {
  const timerInterval = setInterval(() => {
    if (timerValue.value > 0) {
      timerValue.value--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000); 

  
  watchEffect(() => {
    timerValue.value = 30; // Сброс таймера до начального значения при изменении props.name
  });
};

startTimer();
// function show() {
//   console.log(9, quoridor.state.value.player1.walls);
// }




watchEffect(() => {
  user.setNewName(props.name)
})
</script>

<template>
  <div>
    <div class="player1"> 
    <p>
      {{props.name.split('+')[0] }}{{quoridor.state.value.player1.walls}}
    </p>

    <p class="mt-10">
      {{ t('intro.walls') }}: {{quoridor.state.value.player1.walls}}
    </p>
  </div>




  
    <div class="player2"> 
    <p>
      {{props.name.split('+')[1] }}
    </p>

    <p class="mt-10">
      {{ t('intro.walls') }}: {{quoridor.state.value.player2.walls}}
    </p>

    <p class="mt-10">
      {{ t('intro.time') }}: {{timer}}
    </p>
  </div>


    <div class="back">
      <button
        m="3 t6" text-sm btn
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
      <button
        m="3 t6" text-sm btn
        @click="startTimer"
      >
        s
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.player1 {
  position: absolute;
  top: 20px;
  left: 20px;
}

.player2 {
  position: absolute;
  top: 20px;
  right: 20px;
}

.back {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
