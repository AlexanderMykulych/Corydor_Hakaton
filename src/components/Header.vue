<script setup lang="ts">

const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

const quoridor = useQuoridor()

const timer10 = ref(true);
const timer20 = ref(false);

const timerValue1 = ref(30); 
const timerValue2 = ref(30); 

const timer1 = computed(() => {
  return timerValue1.value > 0 ? `${timerValue1.value} сек` : '0 сек';
});

const timer2 = computed(() => {
  return timerValue2.value > 0 ? `${timerValue2.value} сек` : '0 сек';
});

const startTimer1 = () => {
  const timerInterval = setInterval(() => {
    if (timerValue1.value > 0) {
      timerValue1.value--;
    } else {
      clearInterval(timerInterval);
      timerValue2.value = 30
      startTimer2();
      timer10.value = false
      timer20.value = true
    }
  }, 1000);
};

const startTimer2 = () => {
  const timerInterval = setInterval(() => {
    if (timerValue2.value > 0) {
      timerValue2.value--;
    } else {
      clearInterval(timerInterval);
      timerValue1.value = 30
      startTimer1();
      timer10.value = true
      timer20.value = false
    }
  }, 1000);
};

startTimer1();
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

    <p v-if="timer10" class="mt-10">
      {{ t('intro.time') }}: {{timer1}}
    </p>
  </div>




  
    <div class="player2"> 
    <p>
      {{props.name.split('+')[1] }}
    </p>

    <p class="mt-10">
      {{ t('intro.walls') }}: {{quoridor.state.value.player2.walls}}
    </p>

    <p v-if="timer20" class="mt-10">
      {{ t('intro.time') }}: {{timer2}}
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
