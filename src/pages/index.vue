<script setup lang="ts">
import { ref, computed } from 'vue';

defineOptions({
  name: 'IndexPage',
})
const name1 = ref('')
const name2 = ref('')

const router = useRouter()
function go() {
  if (name1.value)
    router.push(`/game/${encodeURIComponent(`${name1.value}+`)}${encodeURIComponent(name2.value)}`)
}

const buttonAccess = computed(() => {
  return !name1.value || !name2.value;
});

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p class="title">
      {{ t('intro.logo') }}
    </p>

    <div py-5 />

    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>
    <TheInput
      v-model="name1"
      :placeholder="t('intro.whats-your-name1')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name1') }}</label>
    
    <div py-5 />
    
    <p>
      <em text-sm opacity-75>{{ t('intro.desc2') }}</em>
    </p>
    <TheInput
      v-model="name2"
      :placeholder="t('intro.whats-your-name2')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name2') }}</label>

    <div py-5 />

    <div>
      <button
        m-3 text-sm btn
        :disabled="buttonAccess"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<style>
.title {
  font-size: large;
  font-weight: 900;
}
</style>
