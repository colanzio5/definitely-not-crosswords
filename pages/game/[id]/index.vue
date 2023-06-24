<template>
    <div class="flex-1 flex flex-row overflow-y-hidden">
        <main class="flex-1 overflow-y-auto">
            <LoadingBar v-if="activeGameLoading" />
            <div v-else class="max-h-full flex flex-col flex-1">
                <GameBoard class="flex-1 flex"/>
                <QuestionsList class="flex flex-col flex-grow overflow-scroll" />
            </div>
        </main>
    </div>
    <footer><QuestionDirectionFilterBar /></footer>
</template>

  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useActiveGameStore } from '~/stores/activeGame'

const activeGameStore = useActiveGameStore()
const { activeGameLoading } = storeToRefs(activeGameStore)

await activeGameStore.load();
</script>
  