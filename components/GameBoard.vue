<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Cell } from '~/lib/game';
import { useActiveGameStore } from '~/stores/activeGame';

const activeGameStore = useActiveGameStore()
const { boardState, selectedQuestion } = storeToRefs(activeGameStore)
const { selectCoordinates } = activeGameStore


function isLetter(cell: Cell): boolean {
  return cell.correctState !== ''
}

function isSelected(cell: Cell): boolean {
  if (!selectedQuestion.value) return false
  if (!selectedQuestion.value?.answerMap) return false;
  return selectedQuestion.value.answerMap.some(c => c.cordX === cell.cordX && c.cordY === cell.cordY)
}


</script>

<template>
  <div class="flex-col">
    <div v-for="(cellRow, rowIndex) of boardState" :key="rowIndex" class="flex flex-row justify-center">
      <div v-for="cell of cellRow" :key="cell.cordX">
        <div v-if="!isLetter(cell)" class="box empty"></div>
        <div v-else>
          <div v-if="isSelected(cell)" class="box letter selected">{{ cell?.modifications?.at(0)?.state || "" }}</div>
          <div v-else class="box letter" @click="selectCoordinates(cell.cordX, cell.cordY)">{{
            cell?.modifications?.at(0)?.state || "" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>




<style>
.box {
  @apply w-6 h-6 border text-center text-black;
}

.empty {
  @apply bg-black;
}

.letter {
  @apply bg-white border-black;
}

.letter:hover {
  @apply border border-secondary-500;
}

.selected {
  @apply bg-highlight-300;
}
</style>
