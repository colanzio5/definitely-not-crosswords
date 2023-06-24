<template>
  <div class="border border-red-400">
    <LoadingBar v-if="activeGameLoading" />
    <div v-else>
      <GameBoard />
      <QuestionsList class="flex flex-col flex-grow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useActiveGameStore } from '~/stores/activeGame'

const activeGameStore = useActiveGameStore()
const { activeGameLoading } = storeToRefs(activeGameStore)

await activeGameStore.load();
</script>
